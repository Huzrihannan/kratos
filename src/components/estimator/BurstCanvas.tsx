"use client";

import React, { useEffect, useRef } from "react";
import { useMotionLevel } from "@/lib/motion/MotionContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
}

export function BurstCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isOff, isLite } = useMotionLevel();

  useEffect(() => {
    if (isOff || isLite) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 600;
    const height = canvas.parentElement?.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = ["#FD142B", "#EFE3CF", "#FF4A5C", "#A8A294"];
    const count = 42;
    const particles: Particle[] = [];
    const originX = width / 2;
    const originY = height / 3;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 3;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 5 + 3, // sharp 3-8px squares
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.15,
        alpha: 1,
      });
    }

    const startTime = performance.now();
    const duration = 650; // 650ms max duration
    let animFrame: number;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      ctx.clearRect(0, 0, width, height);

      if (progress < 1) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // slight gravity
          p.rotation += p.vRot;
          p.alpha = Math.max(1 - progress * 1.3, 0);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          // Draw sharp square
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        animFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [isOff, isLite]);

  if (isOff || isLite) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-20 ${className}`}
      aria-hidden="true"
    />
  );
}
