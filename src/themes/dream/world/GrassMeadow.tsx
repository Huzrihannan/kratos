'use client';

/**
 * Krat.OS Dream Theme — SVG Meadow Grass Fallback (GrassMeadow.tsx)
 *
 * Three-depth SVG undulating grass strips with staggered CSS sway:
 * - Far Layer: --grass-far (#A8D5A2)
 * - Mid Layer: --grass-mid (#6FB07A)
 * - Near Layer: --grass-near (#3E8C5A) with organic blade silhouettes
 *
 * Used as primary meadow visual in T2 / T1, and in T0 (static, motion off).
 */

import React from 'react';
import { useQuality } from './governor';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface GrassMeadowProps {
  className?: string;
}

export function GrassMeadow({ className = '' }: GrassMeadowProps) {
  const { tier } = useQuality();
  const { isOff } = useMotionLevel();
  const isStatic = tier === 'T0' || isOff;

  return (
    <div
      aria-hidden="true"
      data-meadow="svg-grass-layers"
      className={`absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-48 md:h-64 ${className}`}
    >
      {/* 1. Far Grass Strip */}
      <div
        className={`absolute inset-x-0 bottom-0 h-full w-[105%] -left-[2.5%] transition-transform ${
          isStatic ? '' : 'animate-sway-slow'
        }`}
        style={{ animationDuration: '8.5s', transformOrigin: 'bottom center' }}
      >
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 120 Q 360 80 720 110 T 1440 90 L 1440 220 L 0 220 Z"
            fill="var(--grass-far, #A8D5A2)"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      {/* 2. Mid Grass Strip */}
      <div
        className={`absolute inset-x-0 bottom-0 h-full w-[105%] -left-[2.5%] transition-transform ${
          isStatic ? '' : 'animate-sway-slow'
        }`}
        style={{ animationDuration: '6.2s', animationDelay: '-1.8s', transformOrigin: 'bottom center' }}
      >
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 110 Q 320 140 680 95 T 1440 120 L 1440 200 L 0 200 Z"
            fill="var(--grass-mid, #6FB07A)"
            fillOpacity="0.92"
          />
        </svg>
      </div>

      {/* 3. Near Grass Strip with Silhouetted Blade Tips */}
      <div
        className={`absolute inset-x-0 bottom-0 h-full w-[105%] -left-[2.5%] transition-transform ${
          isStatic ? '' : 'animate-sway-slow'
        }`}
        style={{ animationDuration: '4.6s', animationDelay: '-3.2s', transformOrigin: 'bottom center' }}
      >
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 90 Q 240 60 520 85 T 1040 70 Q 1240 85 1440 65 L 1440 180 L 0 180 Z"
            fill="var(--grass-near, #3E8C5A)"
          />
          {/* Subtle foreground blade crest */}
          <path
            d="M 0 120 Q 180 100 400 125 T 900 110 Q 1200 130 1440 115 L 1440 180 L 0 180 Z"
            fill="var(--grass-deep, #2A6B48)"
            fillOpacity="0.75"
          />
        </svg>
      </div>
    </div>
  );
}
