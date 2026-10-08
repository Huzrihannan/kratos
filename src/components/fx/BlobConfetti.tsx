"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlobParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  color: string;
  borderRadius: string;
  size: number;
}

const BRAND_COLORS = [
  "#FB9A5E", // brand orange
  "#F47B3A", // orange deep
  "#FFD9B8", // peach
  "#FFC857", // butter
  "#3B2218", // tiny cocoa accent
];

const BLOB_RADII = [
  "50% 50% 50% 50%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "40% 60% 60% 40% / 50% 40% 60% 50%",
  "70% 30% 50% 50% / 30% 60% 40% 70%",
];

export function BlobConfetti({ count = 30 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<BlobParticle[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const generated: BlobParticle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = 80 + Math.random() * 160;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 40; // Slight upward bias
      const size = 10 + Math.random() * 16;
      const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
      const borderRadius = BLOB_RADII[Math.floor(Math.random() * BLOB_RADII.length)];

      generated.push({
        id: i,
        x,
        y,
        scale: 0.6 + Math.random() * 0.8,
        rotate: Math.random() * 360,
        color,
        borderRadius,
        size,
      });
    }
    setParticles(generated);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 2200);

    return () => clearTimeout(timer);
  }, [count, prefersReducedMotion]);

  if (prefersReducedMotion || particles.length === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible flex items-center justify-center z-50"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: p.x,
            y: [0, p.y * 0.8, p.y + 60], // burst up, then gentle gravity float
            scale: [0, p.scale, p.scale * 0.8, 0],
            rotate: p.rotate,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 1.8,
            ease: [0.18, 0.89, 0.32, 1.28], // spring overshoot bezier
          }}
          style={{
            position: "absolute",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
          }}
        />
      ))}
    </div>
  );
}
