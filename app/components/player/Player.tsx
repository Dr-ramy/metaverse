'use client';

import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

interface PlayerProps {
  onPositionChange?: (position: THREE.Vector3) => void;
  movementInput?: { x: number; y: number };
  cameraRotation?: { x: number; y: number };
  sensitivity?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
  cameraH?: number;
  rotationSpeed?: number;
}

const SPEED = 5;

const Player = forwardRef<THREE.Object3D, PlayerProps>(
  (
    {
      onPositionChange,
      movementInput = { x: 0, y: 0 },
      cameraRotation = { x: 0, y: 0 },
      sensitivity = 0.05,
      position = [20, 1.5, 20], // Increased height
      scale = [1, 1, 1],
      cameraH = 2,
      rotationSpeed = 1.0,
    },
    externalRef
  ) => {
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const objectRef = useRef<THREE.Group>(null);

    const { camera } = useThree();

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();

    const yaw = useRef(0);
    const pitch = useRef(0);

    useImperativeHandle(externalRef, () => objectRef.current!);

    useFrame(() => {
      const joystickVector = new THREE.Vector3(movementInput.x, 0, movementInput.y);

      frontVector.set(0, 0, joystickVector.z);
      sideVector.set(joystickVector.x, 0, 0);

      direction
        .copy(frontVector)
        .add(sideVector)
        .normalize()
        .multiplyScalar(SPEED);

      yaw.current -= cameraRotation.x * sensitivity * rotationSpeed;
      pitch.current -= cameraRotation.y * sensitivity * rotationSpeed;
      pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));

      const rotation = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ');
      direction.applyEuler(rotation);

      const linvelY = rigidBodyRef.current?.linvel().y ?? 0;
      rigidBodyRef.current?.setLinvel(
        { x: direction.x, y: linvelY, z: direction.z },
        true
      );

      const pos = rigidBodyRef.current?.translation();
      if (pos) {
        // ⛑ Fallback: Reset if player falls
        if (pos.y < -20 && rigidBodyRef.current) {
          rigidBodyRef.current.setTranslation({ x: 20, y: 2, z: 20 }, true);
          rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          return;
        }


        camera.position.set(pos.x, pos.y + cameraH, pos.z);
        camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ');

        objectRef.current?.position.set(pos.x, pos.y, pos.z);

        onPositionChange?.(new THREE.Vector3(pos.x, pos.y, pos.z));
      }
    });

    return (
      <group ref={objectRef} key="player-group">
        <RigidBody
          ref={rigidBodyRef}
          name="player"
          type="dynamic"
          colliders={false}
          position={position}
          scale={scale}
          enabledRotations={[false, false, false]}
          mass={1}
          friction={1}
          linearDamping={2}
          angularDamping={2}
          canSleep={false}
        >
          <CapsuleCollider args={[0.5, 1]} />
          <mesh visible={false}>
            <capsuleGeometry args={[0.5, 1, 8, 16]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </RigidBody>
      </group>
    );
  }
);

Player.displayName = 'Player';
export default Player;
