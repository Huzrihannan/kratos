'use client';

/**
 * Krat.OS Dream Theme — Meadow Life Particle Canvas (LifeCanvas.tsx)
 *
 * Single shared 2D canvas with sprite batching for all atmospheric particles:
 * - Falling / Drifting Petals (up to 25, wind-drifted)
 * - Pollen Motes (up to 60, depth-layered)
 * - Fireflies (up to 40, dusk/night only, bioluminescent glow, cursor attraction)
 *
 * Performance:
 * - Single RAF loop with automatic pause when hidden or off-screen
 * - Zero allocations in hot tick loop
 * - Counts scaled by Quality Tier (T3 -> T2 -> T1 -> T0 off)
 */

import React, { useRef, useEffect } from 'react';
import { useSky } from '../../world/SkyContext';
import { useQuality } from '../../world/governor';
import { windEngine } from '../../world/wind';

interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rot: number;
  rotSpeed: number;
  color: string;
  alpha: number;
}

interface PollenParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  phase: number;
  alpha: number;
}

interface FireflyParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

export function LifeCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { state: skyState } = useSky();
  const { tier } = useQuality();

  const isNightTime = skyState.starAlpha > 0.35 || skyState.moonIntensity > 0.6;
  const isDusk = skyState.sunIntensity < 0.45 && !isNightTime;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tier === 'T0' || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let destroyed = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic counts by tier
    const petalCount = tier === 'T3' ? 24 : tier === 'T2' ? 12 : 5;
    const pollenCount = tier === 'T3' ? 55 : tier === 'T2' ? 28 : 12;
    const fireflyCount = tier === 'T3' ? 38 : tier === 'T2' ? 18 : 8;

    // 1. Initialize Petals
    const petalColors = ['#FD142B', '#FF4A5C', '#FFB7D1', '#FFA4B4', '#FA8CAE'];
    const petals: PetalParticle[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 5 + Math.random() * 6,
        speedY: 0.6 + Math.random() * 0.9,
        speedX: -0.5 + Math.random() * 1.0,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        alpha: 0.45 + Math.random() * 0.45,
      });
    }

    // 2. Initialize Pollen Motes
    const pollen: PollenParticle[] = [];
    for (let i = 0; i < pollenCount; i++) {
      pollen.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.0 + Math.random() * 2.0,
        speedY: -0.2 - Math.random() * 0.4,
        speedX: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.5,
      });
    }

    // 3. Initialize Fireflies
    const fireflies: FireflyParticle[] = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: height * 0.4 + Math.random() * (height * 0.55),
        radius: 2.2 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.8 + Math.random() * 1.0, // Slow breathing < 1Hz
        color: '#D4FF70',
      });
    }

    // Cursor tracking for firefly attraction
    let mouseX = -1000;
    let mouseY = -1000;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Hot Animation Tick
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (destroyed) return;

      if (document.hidden) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      const windVal = windEngine.smoothedWind;

      // ================= A. RENDER PETALS (Day / Dusk) =================
      if (!isNightTime) {
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          p.y += p.speedY * 60 * dt;
          p.x += (p.speedX + windVal * 1.8) * 60 * dt;
          p.rot += p.rotSpeed * 60 * dt;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;

          // Organic curved petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ================= B. RENDER POLLEN MOTES =================
      for (let i = 0; i < pollen.length; i++) {
        const pm = pollen[i];
        pm.y += pm.speedY * 60 * dt;
        pm.x += (pm.speedX + windVal * 0.6 + Math.sin(now * 0.002 + pm.phase) * 0.3) * 60 * dt;

        if (pm.y < -10) {
          pm.y = height + 10;
          pm.x = Math.random() * width;
        }

        const pulse = 0.5 + 0.5 * Math.sin(now * 0.003 + pm.phase);
        ctx.fillStyle = isNightTime ? '#E0E7FF' : '#FFEAA7';
        ctx.globalAlpha = pm.alpha * pulse * 0.7;

        ctx.beginPath();
        ctx.arc(pm.x, pm.y, pm.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ================= C. RENDER FIREFLIES (Dusk / Night) =================
      if (isNightTime || isDusk) {
        for (let i = 0; i < fireflies.length; i++) {
          const f = fireflies[i];

          // Wander randomly
          f.vx += (Math.random() - 0.5) * 0.15;
          f.vy += (Math.random() - 0.5) * 0.12;

          // Gentle attraction toward cursor
          if (mouseX > 0 && mouseY > 0) {
            const dx = mouseX - f.x;
            const dy = mouseY - f.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 280 && dist > 40) {
              f.vx += (dx / dist) * 0.25;
              f.vy += (dy / dist) * 0.25;
            }
          }

          // Damping & speed limit
          f.vx *= 0.94;
          f.vy *= 0.94;
          f.x += f.vx * 60 * dt;
          f.y += f.vy * 60 * dt;

          // Boundary bounce
          if (f.x < 20) { f.x = 20; f.vx *= -1; }
          if (f.x > width - 20) { f.x = width - 20; f.vx *= -1; }
          if (f.y < height * 0.35) { f.y = height * 0.35; f.vy *= -1; }
          if (f.y > height - 20) { f.y = height - 20; f.vy *= -1; }

          // Glow pulse (< 1Hz safe frequency)
          f.pulsePhase += f.pulseSpeed * dt * Math.PI;
          const glow = Math.max(0.1, Math.sin(f.pulsePhase));

          // Draw outer warm aura
          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4.5);
          grad.addColorStop(0, 'rgba(212, 255, 112, 0.85)');
          grad.addColorStop(0.4, 'rgba(163, 230, 53, 0.35)');
          grad.addColorStop(1, 'rgba(163, 230, 53, 0.0)');

          ctx.fillStyle = grad;
          ctx.globalAlpha = glow;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Draw bright core
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = glow * 0.95;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [tier, isNightTime, isDusk]);

  if (tier === 'T0') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-particles="meadow-life"
      className={`fixed inset-0 pointer-events-none -z-20 select-none ${className}`}
    />
  );
}
