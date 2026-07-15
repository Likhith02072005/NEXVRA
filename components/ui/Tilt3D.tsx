'use client';

import { useRef, useState, ReactNode, MouseEvent, TouchEvent } from 'react';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  spotlightSize?: number;
  spotlightOpacity?: number;
  scale?: number;
  transitionDuration?: number;
  perspective?: number;
}

export function Tilt3D({
  children,
  className = '',
  maxTilt = 12,
  spotlightSize = 300,
  spotlightOpacity = 0.08,
  scale = 1.02,
  transitionDuration = 400,
  perspective = 1000,
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) scale(1)');
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  function handleMove(clientX: number, clientY: number) {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    setSpotlightPos({ x, y });
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    handleMove(e.clientX, e.clientY);
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function handleEnter() {
    setIsHovering(true);
  }

  function handleLeave() {
    setIsHovering(false);
    setTransform('rotateX(0deg) rotateY(0deg) scale(1)');
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={className}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        style={{
          transform: isHovering ? transform : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovering
            ? `transform ${transitionDuration * 0.3}ms ease-out`
            : `transform ${transitionDuration}ms ease-out`,
          transformStyle: 'preserve-3d',
          willChange: isHovering ? 'transform' : 'auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Spotlight overlay */}
        {isHovering && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 10,
              background: `radial-gradient(${spotlightSize}px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(178, 95, 76, ${spotlightOpacity}), transparent)`,
              borderRadius: 'inherit',
              transition: 'background 100ms ease-out',
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
