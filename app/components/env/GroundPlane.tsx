'use client';
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping, Euler } from 'three';
import { RigidBody } from '@react-three/rapier';

interface GroundPlaneProps {
  type?: 'grid' | 'concrete' | 'shadow';
}

export default function GroundPlane({ type = 'shadow' }: GroundPlaneProps) {
  const gridTexture = useLoader(TextureLoader, '/textures/grid.jpg');
  const concreteTexture = useLoader(TextureLoader, '/textures/conceret.jpg');

  useMemo(() => {
    [gridTexture, concreteTexture].forEach((tex) => {
      tex.wrapS = tex.wrapT = RepeatWrapping;
      tex.repeat.set(1, 1);
    });
  }, [gridTexture, concreteTexture]);

  const texture =
    type === 'grid' ? gridTexture :
    type === 'concrete' ? concreteTexture :
    null;

  const material =
    type === 'shadow'
      ? <shadowMaterial transparent opacity={0.2} />
      : <meshStandardMaterial map={texture} />;

  const size = 180;
  const thickness = 0.1;
  const wallHeight = 5;
  const wallThickness = 0.5;

  const walls: { position: [number, number, number]; rotation: Euler }[] = [
    { position: [0, wallHeight / 2, -size / 2], rotation: new Euler(0, 0, 0) },
    { position: [0, wallHeight / 2, size / 2], rotation: new Euler(0, 0, 0) },
    { position: [-size / 2, wallHeight / 2, 0], rotation: new Euler(0, Math.PI / 2, 0) },
    { position: [size / 2, wallHeight / 2, 0], rotation: new Euler(0, Math.PI / 2, 0) },
  ];

  return (
    <>
      {/* الأرضية */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, -thickness / 2, 0]}>
          <boxGeometry args={[size, thickness, size]} />
          {material}
        </mesh>
      </RigidBody>

      {/* الجدران المحيطة لمنع السقوط */}
      {walls.map((wall, index) => (
        <RigidBody key={index} type="fixed" colliders="cuboid">
          <mesh position={wall.position} rotation={wall.rotation}>
            <boxGeometry args={[size, wallHeight, wallThickness]} />
            <meshStandardMaterial color="gray" transparent opacity={0.001} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}