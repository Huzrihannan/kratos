'use client';

/**
 * Krat.OS Dream Theme — Birds in V Formation (Birds.tsx)
 *
 * Delicate decorative silhouettes of birds in gentle V-formation
 * crossing the sky periodically (every 30-45 seconds) during daylight.
 * Purely decorative, aria-hidden, disabled when motion is off.
 */

import React from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useSky } from '../SkyContext';

export function Birds({ className = '' }: { className?: string }) {
  const { isOff } = useMotionLevel();
  const { state } = useSky();

  // Only visible during dawn, day, and golden hour (sunIntensity > 0.4)
  if (isOff || state.sunIntensity < 0.4) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-38 overflow-hidden select-none ${className}`}
    >
      <style jsx>{`
        @keyframes birdsFlight {
          0% {
            transform: translate(-10vw, 35vh) scale(0.65);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translate(115vw, 15vh) scale(0.85);
            opacity: 0;
          }
        }
        @keyframes wingFlap {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.4);
          }
        }
        .birds-flock {
          animation: birdsFlight 38s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          animation-delay: 4s;
        }
        .bird-wing {
          transform-origin: center center;
          animation: wingFlap 1.1s ease-in-out infinite;
        }
      `}</style>

      {/* V Formation Flock (5 birds) */}
      <div className="birds-flock absolute top-0 left-0 w-32 h-20 opacity-0">
        <svg
          viewBox="0 0 120 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[var(--dream-ink,#2B2A52)]"
          style={{ opacity: 0.65 }}
        >
          {/* Lead Bird (center) */}
          <path
            d="M 60 15 Q 55 8, 48 12 Q 55 16, 60 20 Q 65 16, 72 12 Q 65 8, 60 15 Z"
            fill="currentColor"
            className="bird-wing"
          />

          {/* Left Wing Birds */}
          <path
            d="M 40 28 Q 36 22, 30 25 Q 36 29, 40 32 Q 44 29, 50 25 Q 44 22, 40 28 Z"
            fill="currentColor"
            className="bird-wing"
            style={{ animationDelay: '0.15s' }}
          />
          <path
            d="M 22 42 Q 18 36, 12 39 Q 18 43, 22 46 Q 26 43, 32 39 Q 26 36, 22 42 Z"
            fill="currentColor"
            className="bird-wing"
            style={{ animationDelay: '0.3s' }}
          />

          {/* Right Wing Birds */}
          <path
            d="M 80 28 Q 76 22, 70 25 Q 76 29, 80 32 Q 84 29, 90 25 Q 84 22, 80 28 Z"
            fill="currentColor"
            className="bird-wing"
            style={{ animationDelay: '0.18s' }}
          />
          <path
            d="M 98 42 Q 94 36, 88 39 Q 94 43, 98 46 Q 102 43, 108 39 Q 102 36, 98 42 Z"
            fill="currentColor"
            className="bird-wing"
            style={{ animationDelay: '0.35s' }}
          />
        </svg>
      </div>
    </div>
  );
}
