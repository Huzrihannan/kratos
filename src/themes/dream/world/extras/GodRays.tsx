'use client';

/**
 * Krat.OS Dream Theme — God Rays (GodRays.tsx)
 *
 * Soft, warm radial volumetric light streaks emanating from the sun
 * during Day and Golden Hour. Rendered via GPU-accelerated CSS conic gradients
 * and radial masks for zero canvas context overhead.
 */

import React from 'react';
import { useSky } from '../SkyContext';
import { useQuality } from '../governor';

export function GodRays({ className = '' }: { className?: string }) {
  const { state } = useSky();
  const { tier } = useQuality();

  // Only render during bright daylight and golden hour at T3/T2
  if (tier === 'T0' || state.sunIntensity < 0.6) {
    return null;
  }

  const sunX = Math.round(state.sunX * 100);
  const sunY = Math.round(state.sunY * 100);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-35 overflow-hidden select-none transition-opacity duration-1000 ${className}`}
      style={{
        opacity: state.sunIntensity * 0.45,
      }}
    >
      <div
        className="w-full h-full mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at ${sunX}% ${sunY}%, rgba(255, 248, 220, 0.45) 0%, rgba(255, 225, 160, 0.15) 35%, transparent 70%),
            repeating-conic-gradient(
              from 18deg at ${sunX}% ${sunY}%,
              rgba(255, 255, 240, 0.12) 0deg,
              rgba(255, 255, 240, 0.12) 8deg,
              transparent 12deg,
              transparent 28deg,
              rgba(255, 240, 200, 0.09) 32deg,
              transparent 42deg
            )
          `,
          maskImage: `radial-gradient(circle at ${sunX}% ${sunY}%, black 0%, black 50%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(circle at ${sunX}% ${sunY}%, black 0%, black 50%, transparent 85%)`,
        }}
      />
    </div>
  );
}
