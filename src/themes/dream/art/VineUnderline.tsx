'use client';

import React from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface VineUnderlineProps {
  className?: string;
}

export function VineUnderline({ className = '' }: VineUnderlineProps) {
  const { isOff } = useMotionLevel();

  return (
    <span
      className={`absolute left-0 -bottom-3 sm:-bottom-4 w-[110%] h-5 sm:h-6 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 28"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* Main curved vine stem */}
        <path
          d="M 2 16 Q 45 25, 90 18 T 152 14"
          stroke="#3E8C5A"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={isOff ? '' : 'animate-vine'}
        />

        {/* Tiny sprout leaf along the curve */}
        <path
          d="M 65 18 C 68 12, 75 11, 78 14 C 76 18, 69 19, 65 18 Z"
          fill="#5E9B6A"
          className={isOff ? '' : 'animate-vine-leaf'}
        />
        <path
          d="M 105 17 C 108 23, 115 24, 118 20 C 115 17, 109 16, 105 17 Z"
          fill="#6FB07A"
          className={isOff ? '' : 'animate-vine-leaf'}
        />

        {/* Terminus Blooming Poppy */}
        <g
          className={isOff ? '' : 'animate-poppy-terminus'}
          style={{ transformOrigin: '152px 14px' }}
        >
          {/* Outer Poppy Petals */}
          <path
            d="M 152 7 C 147 7, 144 11, 147 16 C 150 19, 155 19, 157 15 C 159 11, 157 7, 152 7 Z"
            fill="#C8102E"
          />
          <path
            d="M 152 7 C 157 7, 160 11, 157 16 C 154 19, 149 19, 147 15 C 145 11, 147 7, 152 7 Z"
            fill="#FD142B"
          />
          <path
            d="M 152 9 C 148 9, 147 13, 150 17 C 153 19, 157 18, 158 15 C 159 12, 156 9, 152 9 Z"
            fill="#E01B30"
          />
          {/* Dark Seed Center */}
          <circle cx="152" cy="14" r="2.2" fill="#2A1B2E" />
          <circle cx="152" cy="14" r="1" fill="#FFC83D" />
        </g>
      </svg>
    </span>
  );
}
