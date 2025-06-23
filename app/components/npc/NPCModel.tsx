'use client';

import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  RigidBody,
  RapierRigidBody,
  CapsuleCollider,
} from '@react-three/rapier';

export interface NPCModelProps {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  name: string;
  playerRef: React.RefObject<THREE.Object3D>;
  onDialogueOpen: (name: string | null) => void;
  setShowDialogue: (state: boolean) => void;
  path?: [number, number, number][];
  tdistance?: number;
}

const NPCModel = forwardRef<RapierRigidBody, NPCModelProps>(
  (
    {
      url,
      position,
      scale = 1,
      rotation = [0, 0, 0],
      name,
      playerRef,
      onDialogueOpen,
      setShowDialogue,
      path,
      tdistance = 3,
    },
    ref
  ) => {
    const gltf = useGLTF(url);
    const rigidRef = useRef<RapierRigidBody>(null);
    const wasNear = useRef(false);

    const [animationState, setAnimationState] = useState<'idle' | 'talk' | 'walk'>('idle');
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);

    const pathIndex = useRef(0);
    const targetReached = useRef(true);
    const isPausedByPlayer = useRef(false);

    useImperativeHandle(ref, () => rigidRef.current!, []);

    useEffect(() => {
      if (!gltf || !gltf.animations.length) return;

      const mixer = new THREE.AnimationMixer(gltf.scene);
      mixerRef.current = mixer;

      return () => {
        mixer.stopAllAction();
      };
    }, [gltf, gltf.animations]); // ✅ تم تضمين gltf.animations

    useEffect(() => {
      if (!mixerRef.current || !gltf.animations.length) return;
      const clip = gltf.animations.find(a => a.name.toLowerCase() === animationState);
      if (!clip) return;

      mixerRef.current.stopAllAction();
      const action = mixerRef.current.clipAction(clip);
      action.reset().play();
    }, [animationState, gltf.animations]); // ✅ إضافة animations كاعتماد

    useFrame((_, delta) => {
      if (!playerRef.current || !rigidRef.current) return;

      const playerPos = new THREE.Vector3();
      playerRef.current.getWorldPosition(playerPos);

      const t = rigidRef.current.translation();
      const npcPos = new THREE.Vector3(t.x, t.y, t.z);

      const distance = playerPos.distanceTo(npcPos);
      const isNear = distance < tdistance;

      if (isNear && !wasNear.current) {
        wasNear.current = true;
        isPausedByPlayer.current = true;
        rigidRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        setAnimationState('talk');
        setShowDialogue(true);
        onDialogueOpen(name);
      }

      if (!isNear && wasNear.current) {
        wasNear.current = false;
        isPausedByPlayer.current = false;
        setShowDialogue(false);
        setAnimationState('idle');
        onDialogueOpen(null);
      }

      if (!isPausedByPlayer.current && path && path.length > 0 && rigidRef.current) {
        if (targetReached.current) {
          pathIndex.current = (pathIndex.current + 1) % path.length;
          targetReached.current = false;
        }

        const target = new THREE.Vector3(...path[pathIndex.current]);
        const dir = new THREE.Vector3().subVectors(target, npcPos);
        const distanceToTarget = dir.length();

        if (distanceToTarget < 0.2) {
          targetReached.current = true;
          setAnimationState('idle');
          rigidRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        } else {
          dir.normalize();

          const dummy = new THREE.Object3D();
          dummy.position.copy(npcPos);
          dummy.lookAt(npcPos.clone().add(dir));
          gltf.scene.quaternion.slerp(dummy.quaternion, 0.1);

          rigidRef.current.setLinvel({ x: dir.x * 1, y: 0, z: dir.z * 1 }, true);
          setAnimationState('walk');
        }
      }

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
    });

    return (
      <RigidBody
        ref={rigidRef}
        type="kinematicVelocity"
        colliders={false}
        position={position}
        rotation={rotation}
        name={name}
      >
        <CapsuleCollider args={[5, 1]} position={[0, 1, 0]} />
        <primitive object={gltf.scene} scale={scale} />
      </RigidBody>
    );
  }
);

NPCModel.displayName = 'NPCModel';
export default NPCModel;
