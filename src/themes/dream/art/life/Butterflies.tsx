'use client';

/**
 * Krat.OS Dream Theme — Butterflies (Butterflies.tsx)
 *
 * Diurnal winged creatures fluttering across the meadow:
 * - 4-6 butterflies in T3, 2-3 in T2, 0 in T1/T0
 * - 3D perspective wing flapping (rotateY)
 * - Bezier-like drifting flight trajectories
 * - Cursor evasion: rapidly flutters away when cursor approaches within 130px
 * - Active during Dawn, Day, and Golden Hour
 */

import React, { useRef, useEffect, useState } from 'react';
import { useSky } from '../../world/SkyContext';
import { useQuality } from '../../world/governor';
import { useMotionLevel } from '@/lib/motion/MotionContext';

interface ButterflyData {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  wingAngle: number;
  flapSpeed: number;
  size: number;
}

const BUTTERFLY_PALETTES = [
  '#FFB400', // Sunflower Amber
  '#9B8CE0', // Lavender
  '#FF8DA1', // Soft Pink
  '#6DB6F0', // Sky Blue
  '#FFC83D', // Golden Yolk
];

export function Butterflies({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { state: skyState } = useSky();
  const { tier } = useQuality();
  const { isOff } = useMotionLevel();

  const isNightTime = skyState.starAlpha > 0.35 || skyState.moonIntensity > 0.6;
  const isEnabled = !isNightTime && !isOff && (tier === 'T3' || tier === 'T2');

  const count = tier === 'T3' ? 5 : tier === 'T2' ? 2 : 0;
  const [butterflies, setButterflies] = useState<ButterflyData[]>([]);

  useEffect(() => {
    if (!isEnabled) {
      setButterflies([]);
      return;
    }

    const initial: ButterflyData[] = [];
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;

    for (let i = 0; i < count; i++) {
      initial.push({
        id: i,
        x: Math.random() * (w * 0.8) + w * 0.1,
        y: Math.random() * (h * 0.5) + h * 0.25,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.0,
        color: BUTTERFLY_PALETTES[i % BUTTERFLY_PALETTES.length],
        wingAngle: 0,
        flapSpeed: 10 + Math.random() * 4,
        size: 18 + Math.random() * 6,
      });
    }

    setButterflies(initial);
  }, [isEnabled, count]);

  useEffect(() => {
    if (!isEnabled || butterflies.length === 0) return;

    let animId = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) * 0.001, 0.1);
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const elements = containerRef.current?.querySelectorAll<HTMLElement>('.dream-butterfly');
      if (elements) {
        butterflies.forEach((b, idx) => {
          const el = elements[idx];
          if (!el) return;

          // 1. Natural organic wandering
          b.vx += (Math.random() - 0.5) * 0.4;
          b.vy += (Math.random() - 0.5) * 0.35;

          // 2. Cursor evasion: flee quickly when within 130px
          const dx = b.x - mouseX;
          const dy = b.y - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < 130 && dist > 0) {
            const fleeForce = (130 - dist) * 0.08;
            b.vx += (dx / dist) * fleeForce;
            b.vy += (dy / dist) * fleeForce;
          }

          // Damping and speed bounds
          b.vx *= 0.96;
          b.vy *= 0.96;
          b.x += b.vx * 60 * dt;
          b.y += b.vy * 60 * dt;

          // Boundaries
          if (b.x < 30) { b.x = 30; b.vx *= -1; }
          if (b.x > w - 30) { b.x = w - 30; b.vx *= -1; }
          if (b.y < 80) { b.y = 80; b.vy *= -1; }
          if (b.y > h - 120) { b.y = h - 120; b.vy *= -1; }

          // Wing flapping
          const flap = Math.sin(now * 0.015 * b.flapSpeed);
          const heading = Math.atan2(b.vy, b.vx) * (180 / Math.PI);

          // Update transform
          el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${heading * 0.35}deg)`;

          const leftWing = el.querySelector<HTMLElement>('.wing-left');
          const rightWing = el.querySelector<HTMLElement>('.wing-right');
          if (leftWing) leftWing.style.transform = `scaleX(${Math.cos(flap)})`;
          if (rightWing) rightWing.style.transform = `scaleX(${Math.cos(flap)})`;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isEnabled, butterflies]);

  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-life="butterflies"
      className={`fixed inset-0 pointer-events-none -z-15 select-none overflow-hidden ${className}`}
    >
      {butterflies.map((b) => (
        <div
          key={b.id}
          className="dream-butterfly absolute left-0 top-0 will-change-transform"
          style={{ width: b.size, height: b.size }}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Left Wing */}
            <svg
              viewBox="0 0 20 24"
              className="wing-left w-1/2 h-full origin-right transition-transform"
            >
              <path
                d="M 20 12 C 14 2, 2 2, 2 10 C 2 16, 12 22, 20 16 Z"
                fill={b.color}
                fillOpacity="0.9"
              />
            </svg>
            {/* Body */}
            <div className="w-[2px] h-3 bg-ink rounded-full z-10" />
            {/* Right Wing */}
            <svg
              viewBox="0 0 20 24"
              className="wing-right w-1/2 h-full origin-left transition-transform"
            >
              <path
                d="M 0 12 C 6 2, 18 2, 18 10 C 18 16, 8 22, 0 16 Z"
                fill={b.color}
                fillOpacity="0.9"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
