'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useRef, Suspense, useState, useEffect } from 'react';
import { useControls } from 'leva';
import * as THREE from 'three';

function TiltingObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Bind global mouse move listener so interaction works even if container has pointer-events-none
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const { color, distort, speed, scale, thickness, ior } = useControls('Sphere Controller', {
    color: '#7c3aed',
    distort: { value: 0.35, min: 0, max: 1, step: 0.01 },
    speed: { value: 1.5, min: 0, max: 5, step: 0.1 },
    scale: { value: 1.6, min: 0.5, max: 3, step: 0.1 },
    thickness: { value: 1.0, min: 0.1, max: 3, step: 0.1 },
    ior: { value: 1.5, min: 1.0, max: 2.5, step: 0.05 },
  });

  const isDesktop = viewport.width > 5.5;
  const positionX = isDesktop ? viewport.width * 0.16 : 0;
  const positionY = isDesktop ? 0 : -viewport.height * 0.05;
  const finalScale = scale * (isDesktop ? 1.2 : 0.95);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle idle rotation
    meshRef.current.rotation.y += 0.002;
    
    // Lerp toward cursor position using normalized global coordinates
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouseRef.current.y * 0.25,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -mouseRef.current.x * 0.25,
      0.05
    );

    // Apply organic liquid-glass scale wobble based on speed and distort values
    const time = state.clock.getElapsedTime();
    const wobbleX = 1 + Math.sin(time * speed) * 0.06 * distort;
    const wobbleY = 1 + Math.cos(time * speed * 1.2) * 0.06 * distort;
    const wobbleZ = 1 + Math.sin(time * speed * 1.5) * 0.06 * distort;
    meshRef.current.scale.set(wobbleX, wobbleY, wobbleZ);

    // Sync glow shell rotation and animate opacity
    if (glowMeshRef.current) {
      glowMeshRef.current.rotation.x = meshRef.current.rotation.x;
      glowMeshRef.current.rotation.y = meshRef.current.rotation.y;
      glowMeshRef.current.rotation.z = meshRef.current.rotation.z;
      
      // Sync wobble scale
      glowMeshRef.current.scale.set(wobbleX * 1.05, wobbleY * 1.05, wobbleZ * 1.05);

      const pulseOpacity = 0.15 + Math.sin(time * 1.5) * 0.075; // pulses between 0.075 and 0.225
      
      if (glowMeshRef.current.material) {
        (glowMeshRef.current.material as THREE.Material).opacity = pulseOpacity;
      }
    }
  });

  return (
    <group position={[positionX, positionY, 0]} scale={finalScale}>
      {/* Faceted Core Low-Poly Glass Icosahedron */}
      <Icosahedron ref={meshRef} args={[1.4, 1]}>
        {isDesktop ? (
          <MeshTransmissionMaterial
            color={color}
            attach="material"
            thickness={thickness}
            roughness={0.08}
            transmission={1.0}
            ior={ior}
            chromaticAberration={0.03}
            backside={true}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        ) : (
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={distort}
            speed={speed}
            roughness={0.15}
            metalness={0.65}
          />
        )}
      </Icosahedron>

      {/* Volumetric Pulsing Glow Shell */}
      <Icosahedron ref={glowMeshRef} args={[1.48, 1]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.6}
          metalness={0.1}
          transparent={true}
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Icosahedron>
    </group>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <div style={{ width: '100%', height: '100%', position: 'relative' }} />;
  }

  const isDesktop = width > 768;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          {/* Three-point luxury lighting rig */}
          <ambientLight intensity={0.25} />
          
          {/* Key Light (Blue, Upper-Right) */}
          <directionalLight position={[4, 4, 3]} intensity={1.8} color="#00d4ff" />
          
          {/* Fill Light (Purple, Lower-Left) */}
          <directionalLight position={[-4, -3, -2]} intensity={0.9} color="#7c3aed" />
          
          {/* Rim / Back Light (Pale Gold, Behind) */}
          <directionalLight position={[0, 1, -5]} intensity={2.2} color="#ffecd1" />
          
          <TiltingObject />
          <Environment preset="city" />
          
          {/* Post-processing pass for desktop users */}
          {isDesktop && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.8} intensity={0.35} />
              <Vignette eskil={false} offset={0.15} darkness={0.95} />
              <ChromaticAberration offset={new THREE.Vector2(0.0018, 0.0018)} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
