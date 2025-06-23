'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Physics,RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// Components
import Player from '@/app/components/player/Player';
import Skybox from '@/app/components/env/Skybox';
import GroundPlane from '@/app/components/env/GroundPlane';
import CameraJoystick from '@/app/components/player/CameraJoystick';
import Joystick from '@/app/components/player/JoystickControls';
import GLBModel from '@/app/components/builds/GLBModel';
import SimpleDoor from '@/app/components/builds/SimpleDoor'
import Signboard from '@/app/components/builds/Signboard'

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
      <Physics gravity={[0, -9.81, 0]} >
          {/* Ground Plane */}
          <GroundPlane type="concrete" />
          {/* Room & NPCs 
          <SceneNPCs playerPosition={playerPos} />
          */}
          {/* Player */}
          <Player ref={playerRef} position={[20, 4, 20]} rotationSpeed={2} movementInput={movementInput}  //scale = {[1, 1, 1]}
            cameraRotation={cameraJoystickInput} sensitivity={sensitivity} onPositionChange={handlePositionChange} />
            
          <GLBModel url="/models/element1.glb" position={[0, 0.01, 0]} scale={[1, 1.5, 1]} rotation={[0, Math.PI / 2, 0]} withPhysics={true} collider="trimesh" playAnimation={true}/>

          <SimpleDoor playerRef={playerRef} url="/models/door.glb" position={[14.5, 0, 7.5]} scale={[1, 1, 1]}   redirectUrl="/scenes/room1"/>
          <Signboard text="prof.Maraw's lab" position={[14.5, 8, 7]} scale={[6, 2, 0.1]} />
          
          <SimpleDoor playerRef={playerRef} url="/models/door.glb"   rotation={[0, Math.PI / 2, 0]} position={[-35.6, 0, 43.4]} scale={[1, 1, 1]}   redirectUrl="/scenes/room2" />
          <Signboard text="lab1"  rotation={[0, Math.PI / 2, 0]} position={[-28.25, 7.4, 42]} scale={[6, 2.2, 0.1]} />
          
          <SimpleDoor playerRef={playerRef} url="/models/door.glb" position={[28.2, 0.01, 54.5]} scale={[1, 1, 1]}   redirectUrl="/scenes/room3"/>
          <Signboard text="lab3" rotation={[0, Math.PI , 0]} position={[28.3, 6.6, 54.5]} scale={[6, 2, 0.1]} />

          <SimpleDoor playerRef={playerRef} url="/models/door.glb"   rotation={[0, Math.PI / 2, 0]} position={[-21, 0, -80]} scale={[1, 1, 1]}   redirectUrl="/scenes/room4" />
          <Signboard text="lab4"  rotation={[0, Math.PI / 2, 0]} position={[-21.25, 6.8, -80]} scale={[6, 2.2, 0.1]} />

          <SimpleDoor playerRef={playerRef} url="/models/door.glb" position={[26.5, 0.09, -63.5]} scale={[1, 1, 1]}   redirectUrl="/scenes/room5"/>
          <Signboard text="lab5" rotation={[0, Math.PI , 0]}  position={[26.5,6.7, -63.5]} scale={[6, 2, 0.1]} />



            
            {/* Avatar (مثال) 
            <MultiplayerAvatar position={[10, 1, 10]} />
            */}

            <NPCModel
              ref={(el: RapierRigidBody | null) => { npcRefs.current['npc1'] = el;}} url="/models/npc1.glb"
              position={[50, 0, -50]} scale={1}  name="npc1" playerRef={playerRef} 
              onDialogueOpen={setActiveNpc} setShowDialogue={setShowDialogue} 
              path={[ [30, 0, 20], [40, 0, 30], [40, 0, -30], [70, 0, -70],[50, 0, -50]]}
            />
            <NPCModel
              ref={(el: RapierRigidBody | null) => { npcRefs.current['wpc3'] = el;}} url="/models/wpc3.glb"
              position={[-8, 0, 11]} scale={1}  name="wpc3" playerRef={playerRef} 
              onDialogueOpen={(npcName) => setActiveNpc(npcName)}
              setShowDialogue={setShowDialogue} 
              path={[ [-9, 0, -30], [-8, 0, -50], [-8, 0, -70],[-10, 0, -50],[-8, 0, 11]]}
            />
              <NPCModel
              ref={(el: RapierRigidBody | null) => { npcRefs.current['wpc2'] = el;}} url="/models/wpc2.glb"
              position={[30, 0, 11]} scale={1}  name="wpc2" playerRef={playerRef} 
              onDialogueOpen={(npcName) => setActiveNpc(npcName)}
              setShowDialogue={setShowDialogue} 
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
