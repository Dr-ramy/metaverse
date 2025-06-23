'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';
import * as THREE from 'three';

interface GLBModelProps extends Partial<RigidBodyProps> {
  url: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  withPhysics?: boolean;
  collider?: 'cuboid' | 'trimesh' | 'hull';
  playAnimation?: boolean;
  name?: string;
}

export default function GLBModel({ 
  url,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  withPhysics = true,
  collider = 'trimesh',
  playAnimation = true,
  name,
  ...rigidBodyProps
}: GLBModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  // تشغيل التحريكات عند التحمیل
  useEffect(() => {
    if (playAnimation && actions && animations.length > 0) {
      animations.forEach((clip) => {
        const action = actions[clip.name];
        action?.reset().play();
      });
    }
  }, [actions, animations, playAnimation]);

  // عمل نسخة عميقة للتأكد من التظليل والنور
  const model = useMemo(() => {
    const clonedScene = scene.clone(true);
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clonedScene;
  }, [scene]);

  return (
    <group
      ref={group}
      name={name}
      position={position}
      scale={scale}
      rotation={rotation}
      dispose={null}
    >
      {model.children.map((child, index) => {
        // تخزين التحويلات الأصلية للتطبيق على RigidBody
        const childPos = child.position.toArray();
        const childRotation = child.rotation.toArray();

        if (child.name.startsWith("building") && withPhysics) {
          return (
            <RigidBody
              key={index}
              colliders={collider}
              position={childPos}
              rotation={childRotation}
              type='fixed'
              {...rigidBodyProps}
            >
              <primitive object={child.clone(true)} />
            </RigidBody>
          );
        }
        return <primitive key={index} object={child.clone(true)} />;
      })}
    </group>
  );
}
