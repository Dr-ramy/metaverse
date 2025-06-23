'use client';
import React from 'react';
import { useCubeTexture } from '@react-three/drei';

interface SkyboxProps {
  folder?: string; // e.g., '/skybox/'
  files?: [string, string, string, string, string, string]; // px, nx, py, ny, pz, nz
}

export default function Skybox({
  folder = '/skybox/',
  files = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
}: SkyboxProps) {
  const texture = useCubeTexture(files, { path: folder });

  return <primitive attach="background" object={texture} />;
}
