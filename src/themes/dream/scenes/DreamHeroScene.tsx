'use client';

import React from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { siteConfig } from '@/content/site';
import { Cottage } from './Cottage';
import { CloudCards } from './CloudCards';
import { CloudDescent } from './CloudDescent';

export interface DreamHeroSceneProps {
  className?: string;
}

export function DreamHeroScene({ className = '' }: DreamHeroSceneProps) {
  const { isOff } = useMotionLevel();
  const isAvailable = siteConfig.availability.status === 'available';

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. HIGH SKY: Drifting Hot-Air Balloon with Poppy Emblem */}
      <div
        className={`absolute top-10 sm:top-14 right-8 sm:right-28 w-16 sm:w-20 h-auto z-10 transition-transform ${
          isOff ? 'opacity-85' : 'animate-float opacity-90'
        }`}
        style={{ animationDuration: '7s' }}
      >
        <svg
          viewBox="0 0 100 130"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Envelope */}
          <path
            d="M50 10 C25 10 15 35 25 65 C32 85 42 96 46 100 L54 100 C58 96 68 85 75 65 C85 35 75 10 50 10 Z"
            fill="#FFF1DC"
          />
          {/* Poppy red central stripes */}
          <path
            d="M50 10 C40 10 32 35 38 65 C42 85 47 96 48 100 L52 100 C53 96 58 85 62 65 C68 35 60 10 50 10 Z"
            fill="#FD142B"
          />
          <path
            d="M50 10 C46 10 44 35 46 65 C48 85 49 96 50 100 L50 100 C51 96 52 85 54 65 C56 35 54 10 50 10 Z"
            fill="#FFFAF0"
          />
          {/* Poppy circular insignia badge in center */}
          <circle cx="50" cy="48" r="8" fill="#FFFAF0" />
          <circle cx="50" cy="48" r="5" fill="#FD142B" />
          <circle cx="50" cy="48" r="1.5" fill="#2A1B2E" />

          {/* Ropes / Rigging */}
          <line x1="44" y1="100" x2="42" y2="110" stroke="#8B4A3E" strokeWidth="1.5" />
          <line x1="56" y1="100" x2="58" y2="110" stroke="#8B4A3E" strokeWidth="1.5" />
          {/* Basket */}
          <rect x="42" y="110" width="16" height="12" rx="2" fill="#B87333" />
          <line x1="42" y1="116" x2="58" y2="116" stroke="#8B4A3E" strokeWidth="1" />
        </svg>
      </div>

      {/* 2. HIGH SKY: Soaring Birds Silhouettes */}
      <div className="absolute top-20 left-12 sm:left-32 z-10 opacity-70">
        <svg viewBox="0 0 120 40" className="w-20 sm:w-28 h-auto" fill="none">
          {/* Bird 1 */}
          <path
            d="M 10 20 Q 20 12, 30 18 Q 40 12, 50 20"
            stroke="var(--dream-ink,#2B2A52)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          {/* Bird 2 (higher, smaller) */}
          <path
            d="M 55 10 Q 62 4, 70 9 Q 78 4, 85 10"
            stroke="var(--dream-ink,#2B2A52)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* Bird 3 (lagging) */}
          <path
            d="M 85 24 Q 92 18, 100 23 Q 108 18, 115 24"
            stroke="var(--dream-ink,#2B2A52)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* 3. DESKTOP FLOATING CLOUD CARDS (Right Column Area) */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-6 xl:right-16 w-[480px] z-10 pointer-events-auto">
        <CloudCards />
      </div>

      {/* 4. FOREGROUND MEADOW HILL CREST WITH COTTAGE & POPPIES */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Blue-Haze Hill */}
          <path
            d="M 0 140 Q 360 80 720 120 T 1440 100 L 1440 200 L 0 200 Z"
            fill="#6FB07A"
            fillOpacity="0.45"
          />
          {/* Mid Emerald Ridge */}
          <path
            d="M 0 160 Q 420 100 900 135 T 1440 130 L 1440 200 L 0 200 Z"
            fill="#3E8C5A"
            fillOpacity="0.75"
          />
          {/* Foreground Deep Meadow Ridge */}
          <path
            d="M 0 180 Q 480 125 1000 150 T 1440 155 L 1440 200 L 0 200 Z"
            fill="#2A6B48"
          />
        </svg>

        {/* Small Cottage on the Slope */}
        <div className="absolute bottom-6 right-12 sm:right-32 scale-75 sm:scale-90 origin-bottom-right z-15 pointer-events-auto">
          <Cottage isAvailable={isAvailable} showBadge={false} />
        </div>

        {/* Poppy Dotted Accents across the Hill Crest */}
        <div className="absolute bottom-4 left-8 sm:left-24 flex items-end gap-3 z-15">
          {/* Poppy 1 */}
          <svg viewBox="0 0 30 50" className="w-5 sm:w-6 h-auto" fill="none">
            <path d="M 15 50 Q 14 30 15 15" stroke="#3E8C5A" strokeWidth="2" strokeLinecap="round" />
            <circle cx="15" cy="14" r="7" fill="#FD142B" />
            <circle cx="15" cy="14" r="3" fill="#2A1B2E" />
          </svg>
          {/* Poppy 2 */}
          <svg viewBox="0 0 30 40" className="w-4 sm:w-5 h-auto -ml-1" fill="none">
            <path d="M 15 40 Q 18 25 15 12" stroke="#3E8C5A" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="15" cy="12" r="5.5" fill="#E01B30" />
            <circle cx="15" cy="12" r="2.2" fill="#2A1B2E" />
          </svg>
          {/* Wild Daisy Accent */}
          <svg viewBox="0 0 30 35" className="w-4 h-auto" fill="none">
            <path d="M 15 35 Q 12 25 15 10" stroke="#5E9B6A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="15" cy="10" r="5" fill="#FFFAF0" />
            <circle cx="15" cy="10" r="2" fill="#FFC83D" />
          </svg>
        </div>
      </div>

      {/* 5. SEAM CLOUD DESCENT */}
      <CloudDescent />
    </div>
  );
}
