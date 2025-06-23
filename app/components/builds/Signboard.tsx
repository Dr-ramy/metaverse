'use client';
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

interface SignboardProps {
  text: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

export default function Signboard({
  text,
  position = [0, 3, 0],
  scale = [2, 1, 0.1],
  rotation = [0, 0, 0],
}: SignboardProps) {
const boardRef = useRef<Mesh>(null);

  return (
    <group position={position} rotation={rotation}>
      {/* اللوحة نفسها */}
      <mesh ref={boardRef} scale={scale}>
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* النص فوق اللوحة */}
      <Text
        position={[0, 0, 0.06]} // قليل للأمام كي لا يتقاطع مع اللوحة
        fontSize={.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}
