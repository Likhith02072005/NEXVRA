'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import { useRef, Suspense, useState, useEffect } from 'react';
import { useControls } from 'leva';
import * as THREE from 'three';

function TiltingObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const { color, distort, speed, scale } = useControls('Sphere Controller', {
    color: '#7c3aed',
    distort: { value: 0.4, min: 0, max: 1, step: 0.01 },
    speed: { value: 1.8, min: 0, max: 5, step: 0.1 },
    scale: { value: 1.0, min: 0.5, max: 3, step: 0.1 },
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle idle rotation
    meshRef.current.rotation.y += 0.002;
    // Lerp toward cursor position instead of snapping — this is what makes it feel premium
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -pointer.x * 0.3,
      0.05
    );
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 128, 128]} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.1}
        metalness={0.6}
      />
    </Sphere>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: '100%', height: '100vh', position: 'relative' }} />;
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} color="#00d4ff" />
          <directionalLight position={[-3, -2, -3]} intensity={0.6} color="#7c3aed" />
          <TiltingObject />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
