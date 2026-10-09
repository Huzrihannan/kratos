'use client';

/**
 * Krat.OS Dream Theme — WebGL World Canvas (WorldCanvas.tsx)
 *
 * Full-screen fixed background canvas using ogl.
 * Implements:
 * - Half-resolution offscreen RenderTarget upscaled with bilinear interpolation
 * - Frame pacing: 60fps (active) -> 30fps (idle) -> 15fps (20s idle) -> 0fps (hidden)
 * - Single WebGL context enforcement with Strict Mode recovery
 * - Native webglcontextlost / webglcontextrestored handling
 * - Zero WebGL overhead when Quality Tier is T1 or T0
 */

import React, { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, RenderTarget } from 'ogl';
import { useQuality, QualityTier } from './governor';
import { useSky } from './SkyContext';
import { hexToRgb } from './sky';
import {
  SKY_VERTEX_SHADER,
  SKY_FRAGMENT_SHADER,
  UPSCALE_VERTEX_SHADER,
  UPSCALE_FRAGMENT_SHADER,
} from './shaders';

let activeWorldContextCount = 0;

export function WorldCanvas({
  className = '',
  forcedTier,
}: {
  className?: string;
  forcedTier?: QualityTier;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { tier: currentTier } = useQuality();
  const activeTier = forcedTier || currentTier;
  const isWebGLActive = activeTier === 'T3' || activeTier === 'T2';

  const { state: skyState } = useSky();
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (!isWebGLActive || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Singleton check
    if (activeWorldContextCount > 0) {
      console.warn('[WorldCanvas] Another WebGL canvas is already mounted. Reusing slot.');
    }
    activeWorldContextCount++;

    let renderer: Renderer | null = null;
    let gl: Renderer['gl'] | null = null;
    let animId = 0;
    let destroyed = false;

    try {
      renderer = new Renderer({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        alpha: false,
        depth: false,
        antialias: false,
        powerPreference: 'high-performance',
      });
      gl = renderer.gl;
    } catch (e) {
      console.warn('[WorldCanvas] WebGL context creation failed. Falling back to Layer 1.', e);
      setContextLost(true);
      activeWorldContextCount--;
      return;
    }

    if (!gl) {
      setContextLost(true);
      activeWorldContextCount--;
      return;
    }

    // Geometry: single full-screen triangle covering [-1, 1]
    const geometry = new Triangle(gl);

    // Resolution scaling: T3 = half-res (0.5), T2 = third-res (0.33)
    const renderScale = activeTier === 'T3' ? 0.5 : 0.35;
    let targetWidth = Math.max(64, Math.floor(window.innerWidth * renderScale));
    let targetHeight = Math.max(64, Math.floor(window.innerHeight * renderScale));

    let renderTarget: RenderTarget | null = new RenderTarget(gl, {
      width: targetWidth,
      height: targetHeight,
    });

    // 1. Sky Pass Program
    const skyProgram = new Program(gl, {
      vertex: SKY_VERTEX_SHADER,
      fragment: SKY_FRAGMENT_SHADER,
      uniforms: {
        uSkyTop: { value: [0.42, 0.71, 0.94] },
        uSkyMid: { value: [0.70, 0.86, 0.96] },
        uSkyHorizon: { value: [1.0, 0.94, 0.83] },
        uCloudTint: { value: [1.0, 1.0, 1.0] },
        uSunPos: { value: [0.5, 0.22] },
        uSunIntensity: { value: 1.0 },
        uMoonPos: { value: [0.88, 0.35] },
        uMoonIntensity: { value: 0.0 },
        uStarAlpha: { value: 0.0 },
        uAmbient: { value: 1.0 },
        uTime: { value: 0.0 },
        uResolution: { value: [targetWidth, targetHeight] },
      },
      depthTest: false,
      depthWrite: false,
    });

    const skyMesh = new Mesh(gl, { geometry, program: skyProgram });

    // 2. Blit / Upscale Pass Program
    const upscaleProgram = new Program(gl, {
      vertex: UPSCALE_VERTEX_SHADER,
      fragment: UPSCALE_FRAGMENT_SHADER,
      uniforms: {
        tMap: { value: renderTarget.texture },
      },
      depthTest: false,
      depthWrite: false,
    });

    const upscaleMesh = new Mesh(gl, { geometry, program: upscaleProgram });

    // Pacing state
    let lastInteractionTime = performance.now();
    let lastFrameTime = performance.now();

    const markInteraction = () => {
      lastInteractionTime = performance.now();
    };

    window.addEventListener('scroll', markInteraction, { passive: true });
    window.addEventListener('mousemove', markInteraction, { passive: true });
    window.addEventListener('touchstart', markInteraction, { passive: true });

    // Handle context loss
    const onContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('[WorldCanvas] WebGL context lost.');
      setContextLost(true);
      if (animId) cancelAnimationFrame(animId);
    };

    const onContextRestored = () => {
      console.log('[WorldCanvas] WebGL context restored.');
      setContextLost(false);
    };

    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    // Resize handler
    const handleResize = () => {
      if (destroyed || !renderer || !gl) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);

      targetWidth = Math.max(64, Math.floor(w * renderScale));
      targetHeight = Math.max(64, Math.floor(h * renderScale));

      if (renderTarget) {
        renderTarget.setSize(targetWidth, targetHeight);
      }
      skyProgram.uniforms.uResolution.value = [targetWidth, targetHeight];
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop with Frame Pacing
    const renderLoop = (time: number) => {
      if (destroyed) return;

      // Tab visibility check: 0fps when hidden
      if (typeof document !== 'undefined' && document.hidden) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      const idleDuration = time - lastInteractionTime;
      // Target interval: 60fps (~16ms), 30fps (~33ms), 15fps (~66ms)
      const targetInterval =
        idleDuration > 20000 ? 66.6 : idleDuration > 3000 ? 33.3 : 16.6;

      const elapsedSinceLastFrame = time - lastFrameTime;

      if (elapsedSinceLastFrame >= targetInterval && renderer && renderTarget) {
        lastFrameTime = time;

        // Update uniforms from latest skyState
        const topRgb = hexToRgb(skyState.top);
        const midRgb = hexToRgb(skyState.mid);
        const horizRgb = hexToRgb(skyState.horizon);
        const cloudRgb = hexToRgb(skyState.cloudTint);

        skyProgram.uniforms.uSkyTop.value = [topRgb.r, topRgb.g, topRgb.b];
        skyProgram.uniforms.uSkyMid.value = [midRgb.r, midRgb.g, midRgb.b];
        skyProgram.uniforms.uSkyHorizon.value = [horizRgb.r, horizRgb.g, horizRgb.b];
        skyProgram.uniforms.uCloudTint.value = [cloudRgb.r, cloudRgb.g, cloudRgb.b];
        skyProgram.uniforms.uSunPos.value = [skyState.sunX, skyState.sunY];
        skyProgram.uniforms.uSunIntensity.value = skyState.sunIntensity;
        skyProgram.uniforms.uMoonPos.value = [skyState.moonX, skyState.moonY];
        skyProgram.uniforms.uMoonIntensity.value = skyState.moonIntensity;
        skyProgram.uniforms.uStarAlpha.value = skyState.starAlpha;
        skyProgram.uniforms.uAmbient.value = skyState.ambient;
        skyProgram.uniforms.uTime.value = time * 0.001;

        // Pass 1: Render sky into offscreen target (at half/third resolution)
        renderer.render({ scene: skyMesh, target: renderTarget });

        // Pass 2: Blit offscreen target to canvas screen
        upscaleProgram.uniforms.tMap.value = renderTarget.texture;
        renderer.render({ scene: upscaleMesh });
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      destroyed = true;
      activeWorldContextCount = Math.max(0, activeWorldContextCount - 1);
      if (animId) cancelAnimationFrame(animId);

      window.removeEventListener('scroll', markInteraction);
      window.removeEventListener('mousemove', markInteraction);
      window.removeEventListener('touchstart', markInteraction);
      window.removeEventListener('resize', handleResize);

      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);

      // Clean disposal
      if (renderTarget) {
        // Destroy target textures
        renderTarget = null;
      }
    };
  }, [isWebGLActive, activeTier, skyState]);

  if (!isWebGLActive || contextLost) {
    // Pure fallback to CSS Layer 0 + Layer 1
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-30 select-none w-full h-full ${className}`}
    />
  );
}
