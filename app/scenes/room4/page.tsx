'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment,  } from '@react-three/drei';
import { Physics,RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
// Components
import Player from '@/app/components/player/Player';
import Skybox from '@/app/components/env/Skybox';
import CameraJoystick from '@/app/components/player/CameraJoystick';
import Joystick from '@/app/components/player/JoystickControls';

import Room from '@/app/scenes/room4/Room';
import NPCModel from '@/app/components/npc/NPCModel'
import DialogueHandler from '@/app/components/npc/DialogueHandler'

export default function HomePage() {


  const lastPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const [, setPlayerPos] = useState(new THREE.Vector3(0, 0, 0)); // فقط نستخدم setter
  const [cameraJoystickInput, setCameraJoystickInput] = useState({ x: 0, y: 0 });
  const [movementInput, setMovementInput] = useState({ x: 0, y: 0 });
  const [sensitivity] = useState(0.005); // لا حاجة لـ setSensitivity

  const playerRef = useRef<THREE.Object3D>(null!);
  const npcRefs = useRef<{ [key: string]: RapierRigidBody | null }>({});

  const [activeNpc, setActiveNpc] = useState<string | null>(null);
  const [showDialogue, setShowDialogue] = useState(false);

  // تحديث موقع اللاعب فقط إذا تحرك
  const handlePositionChange = useCallback((pos: THREE.Vector3) => {
    if (pos.distanceToSquared(lastPosRef.current) > 0.0001) {
      lastPosRef.current.copy(pos);
      setPlayerPos(pos.clone());
    }
  }, []);
  
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
            {/* عناصر UI خارج Canvas */}
      <Joystick onMove={(data) => setMovementInput(data)} onStop={() => setMovementInput({ x: 0, y: 0 })} style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10 }}/>
      <CameraJoystick onRotate={(data) => setCameraJoystickInput(data)} style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10 }}/>
  
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }} gl={{ antialias: true }}>
        <Skybox />
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[10, 15, 10]} intensity={1} shadow-mapSize-width={1024}  shadow-mapSize-height={1024} />
        <Environment preset="sunset" background={false} />

        {/* Physics */}
      <Physics gravity={[0, -9.81, 0]}>
        <Room modelPath="/models/buildings/room4.glb" position={[0, 0, 0]} />

            <NPCModel ref={(el: RapierRigidBody | null) => { npcRefs.current['prof10'] = el;}} url="/models/prof10.glb"
              position={[-4, 1, -15]} scale={1}  name="prof10" playerRef={playerRef}
              tdistance={3} onDialogueOpen={(npcName) => setActiveNpc(npcName)} setShowDialogue={setShowDialogue}  />

            <NPCModel ref={(el: RapierRigidBody | null) => { npcRefs.current['prof8'] = el;}} url="/models/prof8.glb"
              position={[5, 1, -15]} scale={1}  name="prof8" playerRef={playerRef} 
              tdistance={3} onDialogueOpen={(npcName) => setActiveNpc(npcName)} setShowDialogue={setShowDialogue} 
              />

            <Player  position={[-4,5, 0]}  scale = {[1, 1.5, 1]} cameraH = {1.5} rotationSpeed={3} // دوران أسرع
              movementInput={movementInput} cameraRotation={cameraJoystickInput}  sensitivity={sensitivity}
              onPositionChange={handlePositionChange} ref={playerRef}
            />

      </Physics>
      </Canvas>
        <div style={{ position: 'absolute', zIndex: 20 }}>
          {showDialogue && (
            <DialogueHandler
              npcName={activeNpc}
              onClose={() => {
                setShowDialogue(false);
                setActiveNpc(null);
              }}
            />
          )}
        </div>
    </main>
  );
}
