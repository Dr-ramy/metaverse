'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { ThreeElements } from '@react-three/fiber';

type RoomProps = {
  modelPath: string;
  collider?: boolean;
  exitColliderPosition?: [number, number, number];
  redirectUrl?: string;
  scale?: [number, number, number];
} & ThreeElements['group'];

export default function Room({
  modelPath,
  scale = [1, 1, 1],
  collider = true,
  exitColliderPosition = [-12, 5, 8.5], // ← موقع المصادم
  redirectUrl = '/scenes',             // ← الرابط الذي يتم الذهاب إليه
  ...props
}: RoomProps) {
  const { scene } = useGLTF(modelPath);
  const router = useRouter();

  const handleCollision = () => {
    router.push(redirectUrl);
  };

  return (
    <Suspense fallback={null}>
      <group {...props} scale={scale}>
        {/* النموذج الرئيسي للغرفة */}
        <RigidBody type="fixed" colliders={collider ? 'trimesh' : false}>
          <primitive object={scene} />
        </RigidBody>

        {/* المصادم الأسود عند الباب */}
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider
            args={[24, 2.5, 0.1]}
            position={exitColliderPosition}
            rotation={[0, Math.PI, 0]}
            onCollisionEnter={handleCollision}
          />
          <mesh
            position={exitColliderPosition}
            rotation={[0, Math.PI , 0]}
            visible={true}
          >
            <boxGeometry args={[12, 10, 0.2]} />
            <meshStandardMaterial color="black" transparent opacity={.1} />
          </mesh>
        </RigidBody>
      </group>
    </Suspense>
  );
}

useGLTF.preload('/models/buildings/room2.glb');
