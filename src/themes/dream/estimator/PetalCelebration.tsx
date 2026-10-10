'use client';

import React, { useEffect, useRef } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useQuality } from '../world/governor';

const PETAL_COLORS = [
  '#FFB7D1', // Cherry petal pink
  '#FD142B', // Poppy red
  '#FFC83D', // Daisy yolk
  '#9B8CE0', // Lavender
  '#FFB400', // Sunflower amber
  '#FFF6E5', // Warm cream
];

export function PetalCelebration() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isOff } = useMotionLevel();
  const { tier } = useQuality();

  useEffect(() => {
    if (isOff || tier === 'T1' || tier === 'T0') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    const height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    interface Petal {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      angle: number;
      vAngle: number;
      color: string;
      alpha: number;
    }

    const count = tier === 'T3' ? 45 : 20;
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: -20 - Math.random() * 80,
      vx: (Math.random() - 0.5) * 1.5,
      vy: 1.2 + Math.random() * 2.2,
      size: 6 + Math.random() * 8,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.05,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      alpha: 0.85 + Math.random() * 0.15,
    }));

    let animId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.x += p.vx + Math.sin(p.angle) * 0.5;
        p.y += p.vy;
        p.angle += p.vAngle;

        // Draw organic petal shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Stop after 3.5 seconds
      if (elapsed < 3500) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOff, tier]);

  if (isOff || tier === 'T1' || tier === 'T0') return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
}
