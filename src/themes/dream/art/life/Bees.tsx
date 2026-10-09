'use client';

/**
 * Krat.OS Dream Theme — Bees (Bees.tsx)
 *
 * Chubby bumblebees buzzing among the midday meadow flowers:
 * - Active at noon / midday when sun is brightest
 * - High-frequency vibrating wings
 * - Bobbing hovering motion
 */

import React, { useRef, useEffect, useState } from 'react';
import { useSky } from '../../world/SkyContext';
import { useQuality } from '../../world/governor';
import { useMotionLevel } from '@/lib/motion/MotionContext';

interface BeeData {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function Bees({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { state: skyState } = useSky();
  const { tier } = useQuality();
  const { isOff } = useMotionLevel();

  // Active during bright midday
  const isMidday = skyState.sunIntensity > 0.75 && skyState.starAlpha < 0.1;
  const isEnabled = isMidday && !isOff && (tier === 'T3' || tier === 'T2');
  const count = tier === 'T3' ? 3 : tier === 'T2' ? 1 : 0;

  const [bees, setBees] = useState<BeeData[]>([]);

  useEffect(() => {
    if (!isEnabled) {
      setBees([]);
      return;
    }

    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;

    const initial: BeeData[] = [];
    for (let i = 0; i < count; i++) {
      initial.push({
        id: i,
        x: Math.random() * (w * 0.7) + w * 0.15,
        y: h * 0.5 + Math.random() * (h * 0.35),
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.2,
        size: 16,
      });
    }

    setBees(initial);
  }, [isEnabled, count]);

  useEffect(() => {
    if (!isEnabled || bees.length === 0) return;

    let animId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) * 0.001, 0.1);
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const elements = containerRef.current?.querySelectorAll<HTMLElement>('.dream-bee');
      if (elements) {
        bees.forEach((b, idx) => {
          const el = elements[idx];
          if (!el) return;

          // Bobbing hover jitter
          b.vx += (Math.random() - 0.5) * 0.5;
          b.vy += (Math.random() - 0.5) * 0.45;

          b.vx *= 0.95;
          b.vy *= 0.95;
          b.x += b.vx * 60 * dt;
          b.y += b.vy * 60 * dt;

          if (b.x < 40) { b.x = 40; b.vx *= -1; }
          if (b.x > w - 40) { b.x = w - 40; b.vx *= -1; }
          if (b.y < h * 0.35) { b.y = h * 0.35; b.vy *= -1; }
          if (b.y > h - 80) { b.y = h - 80; b.vy *= -1; }

          const facing = b.vx >= 0 ? 1 : -1;
          const bob = Math.sin(now * 0.008 + b.id) * 4;

          el.style.transform = `translate3d(${b.x}px, ${b.y + bob}px, 0) scaleX(${facing})`;

          // Rapid wing buzz
          const wings = el.querySelector<HTMLElement>('.bee-wings');
          if (wings) {
            wings.style.transform = `scaleY(${0.4 + Math.sin(now * 0.04) * 0.6})`;
          }
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [isEnabled, bees]);

  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-life="bees"
      className={`fixed inset-0 pointer-events-none -z-15 select-none overflow-hidden ${className}`}
    >
      {bees.map((b) => (
        <div
          key={b.id}
          className="dream-bee absolute left-0 top-0 will-change-transform"
          style={{ width: b.size, height: b.size }}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Buzzing translucent wings */}
            <div className="bee-wings absolute -top-2 left-1/2 -translate-x-1/2 flex space-x-1 origin-bottom">
              <div className="w-2 h-2.5 bg-white/70 rounded-full border border-white/90" />
              <div className="w-2 h-2.5 bg-white/70 rounded-full border border-white/90" />
            </div>
            {/* Striped chubby bee body */}
            <svg viewBox="0 0 24 16" className="w-full h-full">
              <ellipse cx="12" cy="8" rx="10" ry="7" fill="#FFC83D" />
              <path d="M 9 2 L 9 14" stroke="#2B2A52" strokeWidth="2.5" />
              <path d="M 14 2 L 14 14" stroke="#2B2A52" strokeWidth="2.5" />
              <circle cx="18" cy="6" r="1.2" fill="#2B2A52" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
