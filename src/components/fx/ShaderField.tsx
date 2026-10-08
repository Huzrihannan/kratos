"use client";

import React, { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Geometry } from "ogl";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { SpotlightGrid } from "./SpotlightGrid";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";

export interface ShaderFieldProps {
  className?: string;
  theme?: "dark" | "light";
}

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTheme; // 0.0 = dark (#212121), 1.0 = light (#F6EFDD)

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv * aspect;
    vec2 mouse = uMouse * aspect;

    // Dot grid pitch (50 dots horizontally)
    float gridSize = 0.024;
    vec2 gridUv = fract(uv / gridSize) - 0.5;
    vec2 cellId = floor(uv / gridSize);

    // Distance from cell center to mouse
    vec2 cellCenter = (cellId + 0.5) * gridSize;
    float distToMouse = length(cellCenter - mouse);

    // Cursor displacement / warp (subtle repulsion)
    float warp = smoothstep(0.35, 0.0, distToMouse) * 0.12;
    vec2 dir = normalize(cellCenter - mouse + 0.0001);
    vec2 warpedUv = gridUv - dir * warp;

    // Dot radius: base 0.06, expands slightly near cursor
    float dotRadius = 0.07 + smoothstep(0.25, 0.0, distToMouse) * 0.05;
    float dot = 1.0 - smoothstep(dotRadius - 0.02, dotRadius + 0.02, length(warpedUv));

    // Base background colors
    vec3 bgDark = vec3(0.129, 0.129, 0.129);  // #212121
    vec3 bgLight = vec3(0.965, 0.937, 0.867); // #F6EFDD
    vec3 bg = mix(bgDark, bgLight, uTheme);

    // Dot base colors (hairline lines)
    vec3 dotBaseDark = vec3(0.24, 0.24, 0.24);  // #3D3D3D
    vec3 dotBaseLight = vec3(0.84, 0.80, 0.71); // #D6CDB5
    vec3 dotColor = mix(dotBaseDark, dotBaseLight, uTheme);

    // Red signal light at cursor: #FD142B
    vec3 redSignal = vec3(0.992, 0.078, 0.169);
    float redIntensity = smoothstep(0.38, 0.0, distToMouse);
    dotColor = mix(dotColor, redSignal, redIntensity * 0.95);

    // Composite final color
    vec3 finalColor = mix(bg, dotColor, dot);

    // Subtle radial glow around cursor
    float ambientGlow = smoothstep(0.45, 0.0, distToMouse) * 0.06;
    finalColor += redSignal * ambientGlow;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function ShaderField({ className = "", theme }: ShaderFieldProps) {
  const { isFull } = useMotionLevel();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (!isFull || webglFailed || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer: Renderer | null = null;
    let animationFrameId: number | null = null;

    try {
      renderer = new Renderer({
        canvas,
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.5),
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const gl = renderer.gl;

    // Fullscreen quad geometry
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [canvas.width, canvas.height] },
      uMouse: { value: [0.5, 0.5] },
      uTheme: { value: theme === "light" ? 1.0 : 0.0 },
    };

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Pointer tracking
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let hasPointerMoved = false;

    function handlePointerMove(e: PointerEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL Y is inverted
      hasPointerMoved = true;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Resize handling
    function resize() {
      if (!containerRef.current || !renderer) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [width, height];
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Render Loop
    let lastTime = performance.now();

    function render(time: number) {
      if (!renderer || !isPlaying) return;

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      uniforms.uTime.value += delta;

      // If no user pointer movement, drift on an autonomous Lissajous curve
      if (!hasPointerMoved) {
        const t = uniforms.uTime.value;
        targetMouseX = 0.5 + 0.28 * Math.sin(t * 0.55);
        targetMouseY = 0.5 + 0.22 * Math.sin(t * 0.85 + 1.0);
      }

      // Smooth cursor interpolation (mechanical damping)
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;
      uniforms.uMouse.value = [currentMouseX, currentMouseY];

      renderer.render({ scene: mesh });

      animationFrameId = requestAnimationFrame(render);
    }

    if (isPlaying) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }

    // Teardown & Context Destruction on unmount
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      try {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      } catch {
        // Ignore context loss errors during unmount
      }
    };
  }, [isFull, isPlaying, theme, webglFailed]);

  // Fallback to SpotlightGrid if motion is lite/off or WebGL is unsupported
  if (!isFull || webglFailed) {
    return <SpotlightGrid className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default ShaderField;
