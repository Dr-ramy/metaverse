'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';

type CameraJoystickProps = {
  size?: number;
  onRotate: (delta: { x: number; y: number }) => void;
  style?: React.CSSProperties;
};

const CameraJoystick: React.FC<CameraJoystickProps> = ({
  size = 100,
  onRotate,
  style = {},
}) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
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

    onRotate({ x: limitedX / radius, y: limitedY / radius });
  }, [onRotate, radius]);

  const resetStick = useCallback(() => {
    if (stickRef.current) {
      stickRef.current.style.transform = `translate(0px, 0px)`;
    }
    onRotate({ x: 0, y: 0 });
  }, [onRotate]);

  const handleStart = () => setDragging(true);

  const handleMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!dragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    updateStickPosition(clientX, clientY);
  }, [dragging, updateStickPosition]);

  const handleEnd = useCallback(() => {
    setDragging(false);
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
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 2,
        touchAction: 'none',
        ...style,
      }}
    >
      <div
        ref={stickRef}
        style={{
          width: size / 2,
          height: size / 2,
          background: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(0px, 0px)',
          translate: '-50% -50%',
          transition: dragging ? 'none' : 'transform 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default CameraJoystick;
