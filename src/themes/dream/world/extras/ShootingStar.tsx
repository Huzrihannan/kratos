'use client';

/**
 * Krat.OS Dream Theme — Shooting Star (ShootingStar.tsx)
 *
 * Rare, delicate shooting star streaking across the night sky.
 * Active when starAlpha >= 0.5 and motion is enabled.
 */

import React from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useSky } from '../SkyContext';

export function ShootingStar({ className = '' }: { className?: string }) {
  const { isOff } = useMotionLevel();
  const { state } = useSky();

  if (isOff || state.starAlpha < 0.4) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-36 overflow-hidden select-none ${className}`}
    >
      <style jsx>{`
        @keyframes shoot {
          0% {
            transform: translate(0, 0) rotate(-35deg) scaleX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translate(-40px, 30px) rotate(-35deg) scaleX(1);
          }
          35% {
            transform: translate(-220px, 160px) rotate(-35deg) scaleX(1.4);
            opacity: 0.8;
          }
          50%, 100% {
            transform: translate(-380px, 280px) rotate(-35deg) scaleX(0.2);
            opacity: 0;
          }
        }
        .shooting-star-streak {
          animation: shoot 18s ease-out infinite;
          animation-delay: 8s;
        }
      `}</style>

      <div
        className="shooting-star-streak absolute top-[12%] right-[18%] w-44 h-[2px] opacity-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,240,200,0.6) 40%, transparent 100%)',
          borderRadius: '9999px',
          boxShadow: '0 0 8px rgba(255,255,255,0.8)',
        }}
      />
    </div>
  );
}
