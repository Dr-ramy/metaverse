'use client';

import React, { useRef, useEffect, useCallback } from 'react';

type JoystickProps = {
  size?: number;
  baseColor?: string;
  stickColor?: string;
  stickShape?: 'circle' | 'square';
  onMove: (data: { x: number; y: number }) => void;
  onStop: () => void;
  style?: React.CSSProperties;
};

const Joystick: React.FC<JoystickProps> = ({
  size = 100,
  baseColor = 'rgba(0, 0, 0, 0.3)',
  stickColor = 'white',
  stickShape = 'circle',
  onMove,
  onStop,
  style = {},
}) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const radius = size / 2;

  const updateStickPosition = useCallback((clientX: number, clientY: number) => {
    if (!baseRef.current || !stickRef.current) return;

    const rect = baseRef.current.getBoundingClientRect();
    const x = clientX - rect.left - radius;
    const y = clientY - rect.top - radius;

    const distance = Math.min(Math.sqrt(x * x + y * y), radius);
    const angle = Math.atan2(y, x);

    const limitedX = Math.cos(angle) * distance;
    const limitedY = Math.sin(angle) * distance;

    stickRef.current.style.transform = `translate(${limitedX}px, ${limitedY}px)`;
    onMove({
      x: +(limitedX / radius).toFixed(3),
      y: +(limitedY / radius).toFixed(3),
    });
  }, [onMove, radius]);

  const resetStick = useCallback(() => {
    if (stickRef.current) {
      stickRef.current.style.transform = `translate(0px, 0px)`;
    }
    onStop();
  }, [onStop]);

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    draggingRef.current = true;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    updateStickPosition(clientX, clientY);
  };

  const handleMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!draggingRef.current) return;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    updateStickPosition(clientX, clientY);
  }, [updateStickPosition]);

  const handleEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    resetStick();
  }, [resetStick]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <div
      ref={baseRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{
        width: size,
        height: size,
        background: baseColor,
        borderRadius: '50%',
        position: 'relative',
        touchAction: 'none',
        userSelect: 'none',
        zIndex: 2,
        ...style,
      }}
    >
      <div
        ref={stickRef}
        style={{
          width: size / 2,
          height: size / 2,
          background: stickColor,
          borderRadius: stickShape === 'circle' ? '50%' : '0%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(0px, 0px)',
          translate: '-50% -50%',
          transition: draggingRef.current ? 'none' : 'transform 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default Joystick;
