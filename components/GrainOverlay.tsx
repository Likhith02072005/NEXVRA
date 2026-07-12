'use client';

import { useEffect, useRef, useState } from 'react';

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 128; // small tile, scaled up via CSS for performance
    canvas.width = size;
    canvas.height = size;

    let frame = 0;
    let rafId: number;

    const draw = () => {
      const imageData = ctx.createImageData(size, size);
      const buffer = imageData.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const value = Math.random() * 255;
        buffer[i] = value;
        buffer[i + 1] = value;
        buffer[i + 2] = value;
        buffer[i + 3] = 18; // low alpha, subtle
      }
      ctx.putImageData(imageData, 0, 0);
      frame++;
      // Redraw every few frames instead of every frame — cheaper, still reads as animated
      rafId = window.setTimeout(() => requestAnimationFrame(draw), 90) as unknown as number;
    };

    draw();
    return () => clearTimeout(rafId);
  }, []);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'overlay',
        opacity: 0.5,
        imageRendering: 'pixelated',
      }}
    />
  );
}
