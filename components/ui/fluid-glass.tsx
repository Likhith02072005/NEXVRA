// @ts-nocheck
'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

function GlassLens() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Convert normalized mouse pointer coordinate (-1 to 1) to viewport 3D coordinates
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15]);
    const targetX = (state.pointer.x * viewport.width) / 2;
    const targetY = (state.pointer.y * viewport.height) / 2;
    
    // Smoothly interpolate the lens position towards target mouse position
    easing.damp3(meshRef.current.position, [targetX, targetY, 15], 0.1, delta);
    
    // Add subtle continuous rotation to the lens for organic refraction movement
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 15]} scale={0.45}>
      {/* Flattened sphere creates a gorgeous physical refractive magnifying glass lens */}
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshTransmissionMaterial
        backside={true}
        samples={16}
        resolution={512}
        transmission={1.0}
        roughness={0.08}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        ior={1.35}
        thickness={2.2}
        chromaticAberration={0.15}
        anisotropy={0.2}
        distortion={0.3}
        distortionScale={0.3}
        temporalDistortion={0.05}
        attenuationColor="#ffffff"
        color="#ffffff"
      />
    </mesh>
  );
}

function NeonParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 12;
  const particles = useRef<Array<{
    pos: [number, number, number];
    speed: number;
    scale: number;
    color: string;
    phase: number;
  }>>([]);

  if (particles.current.length === 0) {
    const colors = ['#00d4ff', '#7c3aed', '#b8860b'];
    particles.current = Array.from({ length: particleCount }, (_, idx) => ({
      pos: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        14.2 + Math.random() * 0.5,
      ],
      speed: 0.2 + Math.random() * 0.4,
      scale: 0.15 + Math.random() * 0.2,
      color: colors[idx % colors.length],
      phase: Math.random() * Math.PI * 2,
    }));
  }

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    groupRef.current.children.forEach((child, idx) => {
      const p = particles.current[idx];
      if (!p) return;
      // Drift particles gently over time in a smooth sine wave path
      child.position.y = p.pos[1] + Math.sin(time * p.speed + p.phase) * 0.4;
      child.position.x = p.pos[0] + Math.cos(time * p.speed * 0.8 + p.phase) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.current.map((p, idx) => (
        <mesh key={idx} position={p.pos} scale={p.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

export default function FluidGlass() {
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-transparent select-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 20]} intensity={1.5} />
        
        {/* Glowing floating background particles that the glass lens will refract */}
        <NeonParticles />
        
        {/* Glass lens tracking the cursor */}
        <GlassLens />
      </Canvas>
    </div>
  );
}
