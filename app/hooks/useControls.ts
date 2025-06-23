"use client";

import { createWithEqualityFn } from 'zustand/traditional';

type Controls = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

// Define equality function for Controls
const controlsEqualityFn = ((a: Controls, b: Controls) =>
  a.forward === b.forward &&
  a.backward === b.backward &&
  a.left === b.left &&
  a.right === b.right &&
  a.jump === b.jump) as <U>(a: U, b: U) => boolean;

// Create Zustand store
export const useKeyboardControls = createWithEqualityFn<Controls>(
  () => ({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  }),
  controlsEqualityFn
);

// Key mapping for keyboard events
const keyMap: Record<string, keyof Controls> = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'right',
  KeyD: 'left',
  Space: 'jump',
};

// Attach key listeners in browser
if (typeof window !== 'undefined') {
  const updateKey = (pressed: boolean) => (e: KeyboardEvent) => {
    const action = keyMap[e.code];
    if (action) {
      useKeyboardControls.setState({ [action]: pressed });
    }
  };

  window.addEventListener('keydown', updateKey(true));
  window.addEventListener('keyup', updateKey(false));
}
