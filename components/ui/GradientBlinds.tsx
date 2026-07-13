'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const MAX_COLORS = 8;
const hexToRGB = (hex: string) => {
  const c = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};
const prepStops = (stops?: string[]) => {
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);
  const arr: number[][] = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));
  return { arr, count };
};

interface GradientBlindsProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: 'left' | 'right';
  mixBlendMode?: string;
}

const GradientBlinds = ({
  className,
  dpr,
  paused = false,
  gradientColors,
  angle = 0,
  noise = 0.3,
  blindCount = 16,
  blindMinWidth = 60,
  mouseDampening = 0.15,
  mirrorGradient = false,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'lighten'
}: GradientBlindsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const programRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const geometryRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const mouseTargetRef = useRef([0, 0]);
  const lastTimeRef = useRef(0);
  const firstResizeRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),
      alpha: true,
      antialias: true
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    const canvas = gl.canvas;

    (canvas as HTMLCanvasElement).style.width = '100%';
    (canvas as HTMLCanvasElement).style.height = '100%';
    (canvas as HTMLCanvasElement).style.display = 'block';
    container.appendChild(canvas as HTMLCanvasElement);

    const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform float uColorCount;

uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec3 getColor(float t) {
  float idx = t * (uColorCount - 1.0);
  int i0 = int(floor(idx));
  float f = fract(idx);

  vec3 colors[8];
  colors[0] = uColor0;
  colors[1] = uColor1;
  colors[2] = uColor2;
  colors[3] = uColor3;
  colors[4] = uColor4;
  colors[5] = uColor5;
  colors[6] = uColor6;
  colors[7] = uColor7;

  vec3 c0 = colors[0];
  vec3 c1 = colors[1];

  for (int j = 0; j < 7; j++) {
    if (j == i0) {
      c0 = colors[j];
      c1 = colors[j + 1];
    }
  }

  return mix(c0, c1, smoothstep(0.0, 1.0, f));
}

void main() {
  vec2 uv = vUv;

  if (uDistort > 0.0) {
    uv.x += sin(uv.y * 6.2831 + iTime) * uDistort * 0.05;
    uv.y += cos(uv.x * 6.2831 + iTime) * uDistort * 0.05;
  }

  float ca = cos(uAngle);
  float sa = sin(uAngle);
  vec2 ruv = vec2(ca * uv.x - sa * uv.y, sa * uv.x + ca * uv.y);

  float n = uBlindCount;
  float blindIndex = floor(ruv.x * n);
  float localU = fract(ruv.x * n);

  float t = blindIndex / max(n - 1.0, 1.0);
  if (uMirror > 0.5) {
    t = 1.0 - abs(2.0 * t - 1.0);
  }

  vec3 baseColor = getColor(clamp(t, 0.0, 1.0));

  float shade;
  if (uShineFlip > 0.5) {
    shade = 0.3 + 0.7 * localU;
  } else {
    shade = 0.3 + 0.7 * (1.0 - localU);
  }

  vec3 col = baseColor * shade;

  vec2 mouseUV = iMouse / iResolution.xy;
  mouseUV.y = 1.0 - mouseUV.y;
  float aspect = iResolution.x / iResolution.y;
  vec2 diff = uv - mouseUV;
  diff.x *= aspect;
  float dist = length(diff);

  float minDim = min(iResolution.x, iResolution.y);
  float radius = uSpotlightRadius * (minDim / iResolution.x);

  float spot = 1.0 - smoothstep(0.0, radius, dist);
  spot = pow(spot, uSpotlightSoftness);

  col += col * spot * uSpotlightOpacity;

  if (uNoise > 0.0) {
    float n2 = hash(uv * iResolution.xy + iTime) * 2.0 - 1.0;
    col += n2 * uNoise * 0.15;
  }

  float edgeFade = smoothstep(0.0, 0.02, localU) * smoothstep(0.0, 0.02, 1.0 - localU);
  col *= edgeFade;

  gl_FragColor = vec4(col, 1.0);
}
`;

    const { arr: colorArr, count: colorCount } = prepStops(gradientColors);

    const uniforms: any = {
      iResolution: {
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]
      },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: (angle * Math.PI) / 180 },
      uNoise: { value: noise },
      uBlindCount: { value: Math.max(1, blindCount) },
      uSpotlightRadius: { value: spotlightRadius },
      uSpotlightSoftness: { value: spotlightSoftness },
      uSpotlightOpacity: { value: spotlightOpacity },
      uMirror: { value: mirrorGradient ? 1 : 0 },
      uDistort: { value: distortAmount },
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },
      uColor0: { value: colorArr[0] },
      uColor1: { value: colorArr[1] },
      uColor2: { value: colorArr[2] },
      uColor3: { value: colorArr[3] },
      uColor4: { value: colorArr[4] },
      uColor5: { value: colorArr[5] },
      uColor6: { value: colorArr[6] },
      uColor7: { value: colorArr[7] },
      uColorCount: { value: colorCount }
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms
    });
    programRef.current = program;

    const geometry = new Triangle(gl);
    geometryRef.current = geometry;
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];

      if (blindMinWidth && blindMinWidth > 0) {
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth));
        const effective = blindCount ? Math.min(blindCount, maxByMinWidth) : maxByMinWidth;
        uniforms.uBlindCount.value = Math.max(1, effective);
      } else {
        uniforms.uBlindCount.value = Math.max(1, blindCount);
      }

      if (firstResizeRef.current) {
        firstResizeRef.current = false;
        const cx = gl.drawingBufferWidth / 2;
        const cy = gl.drawingBufferHeight / 2;
        uniforms.iMouse.value = [cx, cy];
        mouseTargetRef.current = [cx, cy];
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect();
      const scale = (renderer as any).dpr || 1;
      const x = (e.clientX - rect.left) * scale;
      const y = (rect.height - (e.clientY - rect.top)) * scale;
      mouseTargetRef.current = [x, y];
      if (mouseDampening <= 0) {
        uniforms.iMouse.value = [x, y];
      }
    };
    (canvas as HTMLCanvasElement).addEventListener('pointermove', onPointerMove);

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      uniforms.iTime.value = t * 0.001;
      if (mouseDampening > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = (t - lastTimeRef.current) / 1000;
        lastTimeRef.current = t;
        const tau = Math.max(1e-4, mouseDampening);
        let factor = 1 - Math.exp(-dt / tau);
        if (factor > 1) factor = 1;
        const target = mouseTargetRef.current;
        const cur = uniforms.iMouse.value;
        cur[0] += (target[0] - cur[0]) * factor;
        cur[1] += (target[1] - cur[1]) * factor;
      } else {
        lastTimeRef.current = t;
      }
      if (!paused && programRef.current && meshRef.current) {
        try {
          renderer.render({ scene: meshRef.current });
        } catch (e) {
          console.error(e);
        }
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      (canvas as HTMLCanvasElement).removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      if ((canvas as HTMLCanvasElement).parentElement === container) {
        container.removeChild(canvas as HTMLCanvasElement);
      }
      const callIfFn = (obj: any, key: string) => {
        if (obj && typeof obj[key] === 'function') {
          obj[key].call(obj);
        }
      };
      callIfFn(programRef.current, 'remove');
      callIfFn(geometryRef.current, 'remove');
      callIfFn(meshRef.current, 'remove');
      callIfFn(rendererRef.current, 'destroy');
      programRef.current = null;
      geometryRef.current = null;
      meshRef.current = null;
      rendererRef.current = null;
    };
  }, [
    dpr,
    paused,
    gradientColors,
    angle,
    noise,
    blindCount,
    blindMinWidth,
    mouseDampening,
    mirrorGradient,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    distortAmount,
    shineDirection
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative ${className || ''}`}
      style={{
        ...(mixBlendMode && {
          mixBlendMode: mixBlendMode as any
        })
      }}
    />
  );
};

export default GradientBlinds;
