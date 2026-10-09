'use client';

/**
 * Krat.OS Dream Theme — Layer 1 Clouds (Layer1Clouds.tsx)
 *
 * Parallax DOM sprite clouds and painterly SVG hills.
 * Uses 8 pre-generated WebP alpha-masks with CSS mask-image and
 * background-color: var(--cloud-tint) for instant, zero-re-download color grading.
 */

import React, { useMemo } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';

interface CloudInstance {
  id: string;
  sprite: string;
  depth: 'far' | 'mid' | 'near';
  topPercent: number;
  leftPercent: number;
  width: number;
  height: number;
  durationSeconds: number;
  delaySeconds: number;
  opacity: number;
}

const CLOUD_CONFIGS: CloudInstance[] = [
  // Far Layer (High, subtle, slow drift)
  {
    id: 'cloud-far-1',
    sprite: '/textures/clouds/cloud-3.webp',
    depth: 'far',
    topPercent: 8,
    leftPercent: 12,
    width: 280,
    height: 140,
    durationSeconds: 160,
    delaySeconds: -30,
    opacity: 0.55,
  },
  {
    id: 'cloud-far-2',
    sprite: '/textures/clouds/cloud-8.webp',
    depth: 'far',
    topPercent: 18,
    leftPercent: 68,
    width: 240,
    height: 120,
    durationSeconds: 180,
    delaySeconds: -75,
    opacity: 0.50,
  },
  // Mid Layer (Hero elevation, primary billows)
  {
    id: 'cloud-mid-1',
    sprite: '/textures/clouds/cloud-1.webp',
    depth: 'mid',
    topPercent: 15,
    leftPercent: -5,
    width: 440,
    height: 220,
    durationSeconds: 110,
    delaySeconds: -15,
    opacity: 0.82,
  },
  {
    id: 'cloud-mid-2',
    sprite: '/textures/clouds/cloud-2.webp',
    depth: 'mid',
    topPercent: 28,
    leftPercent: 45,
    width: 420,
    height: 210,
    durationSeconds: 125,
    delaySeconds: -50,
    opacity: 0.85,
  },
  {
    id: 'cloud-mid-3',
    sprite: '/textures/clouds/cloud-6.webp',
    depth: 'mid',
    topPercent: 12,
    leftPercent: 82,
    width: 460,
    height: 230,
    durationSeconds: 115,
    delaySeconds: -80,
    opacity: 0.80,
  },
  // Near Layer (Foreground, atmospheric depth)
  {
    id: 'cloud-near-1',
    sprite: '/textures/clouds/cloud-4.webp',
    depth: 'near',
    topPercent: 35,
    leftPercent: 20,
    width: 520,
    height: 260,
    durationSeconds: 75,
    delaySeconds: -10,
    opacity: 0.92,
  },
  {
    id: 'cloud-near-2',
    sprite: '/textures/clouds/cloud-5.webp',
    depth: 'near',
    topPercent: 22,
    leftPercent: 70,
    width: 500,
    height: 250,
    durationSeconds: 85,
    delaySeconds: -40,
    opacity: 0.88,
  },
  {
    id: 'cloud-near-3',
    sprite: '/textures/clouds/cloud-7.webp',
    depth: 'near',
    topPercent: 42,
    leftPercent: 85,
    width: 560,
    height: 280,
    durationSeconds: 70,
    delaySeconds: -5,
    opacity: 0.90,
  },
];

export function Layer1Clouds({ className = '' }: { className?: string }) {
  const { isOff } = useMotionLevel();

  // Cloud items
  const clouds = useMemo(() => CLOUD_CONFIGS, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-40 overflow-hidden select-none ${className}`}
    >
      <style jsx>{`
        @keyframes cloudDrift {
          0% {
            transform: translateX(-15vw);
          }
          100% {
            transform: translateX(115vw);
          }
        }
        .animate-cloud-drift {
          animation: cloudDrift linear infinite;
        }
      `}</style>

      {/* Cloud Sprites */}
      {clouds.map((c) => {
        const isFar = c.depth === 'far';
        const isNear = c.depth === 'near';

        return (
          <div
            key={c.id}
            className={`absolute ${
              isOff ? '' : 'animate-cloud-drift'
            } will-change-transform`}
            style={{
              top: `${c.topPercent}%`,
              left: `${c.leftPercent}%`,
              width: `${c.width}px`,
              height: `${c.height}px`,
              opacity: c.opacity,
              animationDuration: `${c.durationSeconds}s`,
              animationDelay: `${c.delaySeconds}s`,
              filter: isFar ? 'blur(2.5px)' : isNear ? 'none' : 'blur(0.5px)',
            }}
          >
            <div
              className="w-full h-full transition-colors duration-500"
              style={{
                backgroundColor: 'var(--cloud-tint, #FFFFFF)',
                maskImage: `url(${c.sprite})`,
                WebkitMaskImage: `url(${c.sprite})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
          </div>
        );
      })}

      {/* Atmospheric Haze Gradient Above Horizon Hills */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            'linear-gradient(to top, var(--sky-horizon, #FFF0D4) 0%, transparent 100%)',
          opacity: 0.45,
        }}
      />
    </div>
  );
}
