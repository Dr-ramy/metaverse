'use client';
import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, RigidBodyProps, RapierRigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber';

interface SimpleDoorProps extends Partial<RigidBodyProps> {
  url: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  playerRef: React.RefObject<THREE.Object3D>;
  redirectUrl: string;
}

export default function SimpleDoor({
  url,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  playerRef,
  redirectUrl,
  ...rigidBodyProps
}: SimpleDoorProps) {
  const group = useRef<THREE.Group>(null);
  const doorRefs = useRef<Record<string, THREE.Object3D>>({});
  const rigidBodyRefs = useRef<Record<string, RapierRigidBody>>({});
  const originalPositions = useRef<Record<string, { x: number; y: number; z: number }>>({});
  const doorOpenStates = useRef<Record<string, boolean>>({});
  const hasCollided = useRef(false);
  const router = useRouter();

  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  useFrame(() => {
    if (!playerRef.current) return;

    const playerPos = new THREE.Vector3();
    playerRef.current.getWorldPosition(playerPos);

    Object.entries(rigidBodyRefs.current).forEach(([name, body]) => {
      const doorObject = doorRefs.current[name];
      if (!doorObject) return;

      const doorPos = new THREE.Vector3();
      doorObject.getWorldPosition(doorPos);

      const distance = playerPos.distanceTo(doorPos);

      const disopen = 8;
      const disclos = 10;

      if (distance < disopen && !doorOpenStates.current[name]) {
        if (!originalPositions.current[name]) {
          const pos = body.translation();
          originalPositions.current[name] = { x: pos.x, y: pos.y, z: pos.z };
        }

        const pos = body.translation();
        body.setTranslation({ x: pos.x - 2.5, y: pos.y, z: pos.z }, true);
        doorOpenStates.current[name] = true;
      }

      if (distance >= disclos && doorOpenStates.current[name]) {
        const original = originalPositions.current[name];
        if (original) {
          body.setTranslation(original, true);
          doorOpenStates.current[name] = false;
        }
      }
    });
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation}>
      {model.children.map((child, i) => {
        const isDoor = child.name.toLowerCase().includes('door');
        const childClone = child.clone(true);

        if (isDoor) {
          doorRefs.current[child.name] = childClone;

          return (
            <group key={i}>
              {/* الباب المتحرك */}
              <RigidBody
                ref={(ref) => {
                  if (ref) rigidBodyRefs.current[child.name] = ref;
                }}
                type="fixed"
                colliders="cuboid"
                {...rigidBodyProps}
              >
                <primitive object={childClone} />
              </RigidBody>

              {/* الباب الأسود المرئي - كاشف الاصطدام */}
              <RigidBody
                type="fixed"
                colliders={false}
                position={child.position}
                rotation={child.rotation}
              >
                <CuboidCollider
                  args={[1, 3, 0.1]}
                  position={[1.3, 3, -0.11]}
                  onCollisionEnter={({ other }) => {
                    const otherName = other.rigidBodyObject?.name;
                    if (otherName === 'player' && !hasCollided.current) {
                      hasCollided.current = true;
                      console.log(`🔁 انتقال إلى: ${redirectUrl}`);
                      router.push(redirectUrl);
                    }
                  }}
                />
                <mesh position={[0, 3, -0.11]}>
                  <boxGeometry args={[5, 6, 0.2]} />
                  <meshStandardMaterial color="white" transparent opacity={.5} />
                </mesh>
              </RigidBody>
            </group>
          );
        }

        return <primitive key={i} object={childClone} />;
      })}
    </group>
  );
}
