'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Hide the real cursor globally
    document.body.style.cursor = 'none';

    const handleMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    let rafId: number;
    const loop = () => {
      setPos((prev) => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.18,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.18,
      }));
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = 'auto';
    };
  }, [mounted]);

  // Listen for elements with data-cursor-label to expand the cursor
  useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor-label]');
      if (target) setLabel(target.getAttribute('data-cursor-label'));
    };
    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor-label]');
      if (target) setLabel(null);
    };
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <motion.div
        animate={{
          width: label ? 'auto' : 12,
          height: label ? 32 : 12,
          borderRadius: label ? 20 : 12,
          x: '-50%',
          y: '-50%',
          paddingInline: label ? 14 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        style={{
          background: 'rgba(0, 212, 255, 0.95)',
          boxShadow: '0 0 16px rgba(0, 212, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          fontSize: 10,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontWeight: 800,
          color: '#050508',
        }}
      >
        {label}
      </motion.div>
    </div>
  );
}

