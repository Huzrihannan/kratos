"use client";

import React, { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Geometry } from "ogl";
import { useTheme } from "next-themes";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { SpotlightGrid } from "./SpotlightGrid";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { cn } from "@/lib/utils";

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
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTheme; // 0.0 = dark (#212121), 1.0 = light (#F6EFDD)

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 uv = vUv * aspect;
    vec2 mouse = uMouse * aspect;

    // Dot grid pitch
    float gridSize = 0.028;
    vec2 gridUv = fract(uv / gridSize) - 0.5;
    vec2 cellId = floor(uv / gridSize);

    // Distance from cell center to mouse
    vec2 cellCenter = (cellId + 0.5) * gridSize;
    float distToMouse = length(cellCenter - mouse);

    // Cursor displacement / magnetic warp
    float warp = smoothstep(0.35, 0.0, distToMouse) * 0.12;
    vec2 dir = normalize(cellCenter - mouse + 0.0001);
    vec2 warpedUv = gridUv - dir * warp;

    // Dot radius
    float dotRadius = 0.065 + smoothstep(0.25, 0.0, distToMouse) * 0.05;
    float dot = 1.0 - smoothstep(dotRadius - 0.02, dotRadius + 0.02, length(warpedUv));

    // Base dot colors (hairline lines matching tokens)
    vec3 dotBaseDark = vec3(0.48, 0.48, 0.48);  // line-strong
    vec3 dotBaseLight = vec3(0.54, 0.52, 0.45);
    vec3 dotColor = mix(dotBaseDark, dotBaseLight, uTheme);

    // Red laser signal at cursor: #FD142B
    vec3 redSignal = vec3(0.992, 0.078, 0.169);
    float redIntensity = smoothstep(0.35, 0.0, distToMouse);
    dotColor = mix(dotColor, redSignal, redIntensity * 0.95);

    // Soft cursor ambient glow
    float ambientGlow = smoothstep(0.42, 0.0, distToMouse) * 0.09;

    // Alpha composition (transparent canvas so Layer 1 SVG grid & red glow show through)
    float baseAlpha = dot * mix(0.35, 0.45, uTheme);
    float totalAlpha = clamp(baseAlpha + ambientGlow, 0.0, 0.85);

    vec3 finalRgb = mix(dotColor, redSignal, ambientGlow / max(totalAlpha, 0.001));

    gl_FragColor = vec4(finalRgb, totalAlpha);
  }
`;

export function ShaderField({ className = "", theme: themeProp }: ShaderFieldProps) {
  const { isFull } = useMotionLevel();
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlaying = useInViewPlayback(containerRef);

  const [isReady, setIsReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Active theme calculation (prop overrides context)
  const currentTheme = themeProp || (resolvedTheme === "light" ? "light" : "dark");

  useEffect(() => {
    if (!isFull || webglFailed || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer: Renderer | null = null;
    let animationFrameId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;

    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const gl = renderer.gl;

    // Intercept getShaderInfoLog to prevent spurious 'null' warnings in ogl
    const origGetShaderInfoLog = gl.getShaderInfoLog.bind(gl);
    gl.getShaderInfoLog = (shader: WebGLShader) => {
      const log = origGetShaderInfoLog(shader);
      return log === null ? "" : log;
    };

    // Handle context loss gracefully
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    // Fullscreen quad geometry
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [canvas.width, canvas.height] },
      uMouse: { value: [0.5, 0.5] },
      uTheme: { value: currentTheme === "light" ? 1.0 : 0.0 },
    };

    let program: Program;
    let mesh: Mesh;

    try {
      program = new Program(gl, {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
      });
      mesh = new Mesh(gl, { geometry, program });
    } catch {
      setWebglFailed(true);
      return;
    }

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

    // Sizing via ResizeObserver
    function handleResize(width: number, height: number) {
      if (!renderer || width <= 0 || height <= 0) return;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [canvas.width, canvas.height];
    }

    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          handleResize(width, height);
        }
      });
      resizeObserver.observe(containerRef.current);
    } else if (containerRef.current) {
      handleResize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }

    // Initial sizing check
    if (containerRef.current) {
      handleResize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }

    // Render Loop
    let lastTime = performance.now();
    let hasRenderedFirstFrame = false;

    function render(time: number) {
      if (!renderer || !isPlaying) return;

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      uniforms.uTime.value += delta;
      uniforms.uTheme.value = currentTheme === "light" ? 1.0 : 0.0;

      // Autonomous Lissajous drift when cursor is idle
      if (!hasPointerMoved) {
        const t = uniforms.uTime.value;
        targetMouseX = 0.5 + 0.28 * Math.sin(t * 0.55);
        targetMouseY = 0.5 + 0.22 * Math.sin(t * 0.85 + 1.0);
      }

      // Smooth cursor interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;
      uniforms.uMouse.value = [currentMouseX, currentMouseY];

      try {
        renderer.render({ scene: mesh });

        if (!hasRenderedFirstFrame) {
          hasRenderedFirstFrame = true;
          if (gl.getError() === gl.NO_ERROR) {
            setIsReady(true);
          } else {
            setWebglFailed(true);
          }
        }
      } catch {
        setWebglFailed(true);
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    if (isPlaying) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }

    // Teardown & Context Destruction on unmount
    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      window.removeEventListener("pointermove", handlePointerMove);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      try {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      } catch {
        // Safe catch on cleanup
      }
    };
  }, [isFull, isPlaying, currentTheme, webglFailed]);

  // Fallback to SpotlightGrid if motion is lite/off or WebGL fails
  if (!isFull || webglFailed) {
    return <SpotlightGrid className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden select-none transition-opacity duration-700 ease-out",
        isReady ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default ShaderField;
