'use client';

import React from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface VisitingCreatureProps {
  type?: 'bee' | 'butterfly';
  active: boolean;
  className?: string;
}

export function VisitingCreature({
  type = 'bee',
  active,
  className = '',
}: VisitingCreatureProps) {
  const { isOff } = useMotionLevel();

  if (!active && isOff) return null;

  return (
    <div
      className={`absolute pointer-events-none z-20 transition-all duration-700 ease-out ${
        active
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : 'opacity-0 translate-x-4 -translate-y-4 scale-75'
      } ${className}`}
      aria-hidden="true"
    >
      {type === 'bee' ? (
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 drop-shadow-sm transform -rotate-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wings with gentle flutter */}
          <g className={isOff ? '' : 'animate-pulse'}>
            <ellipse
              cx="13"
              cy="9"
              rx="6"
              ry="4"
              fill="#FFFFFF"
              fillOpacity="0.8"
              stroke="#D6CDB5"
              strokeWidth="0.8"
              transform="rotate(-25 13 9)"
            />
            <ellipse
              cx="19"
              cy="9"
              rx="6"
              ry="4"
              fill="#FFFFFF"
              fillOpacity="0.8"
              stroke="#D6CDB5"
              strokeWidth="0.8"
              transform="rotate(25 19 9)"
            />
          </g>

          {/* Chubby Bee Body */}
          <ellipse cx="16" cy="18" rx="7" ry="9" fill="#FFC83D" />
          {/* Dark stripes */}
          <path
            d="M 10 15 Q 16 17 22 15"
            stroke="#2B2A52"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 10 19 Q 16 21 22 19"
            stroke="#2B2A52"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Stinger */}
          <path d="M 16 27 L 16 29" stroke="#2B2A52" strokeWidth="1.2" strokeLinecap="round" />
          {/* Eyes & Cute Face */}
          <circle cx="13.5" cy="13" r="1.2" fill="#2B2A52" />
          <circle cx="18.5" cy="13" r="1.2" fill="#2B2A52" />
          {/* Antennae */}
          <path d="M 14 11 Q 12 7 10 8" stroke="#2B2A52" strokeWidth="1" strokeLinecap="round" />
          <path d="M 18 11 Q 20 7 22 8" stroke="#2B2A52" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 36 36"
          className="w-8 h-8 drop-shadow-sm transform rotate-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Butterfly Left Wing */}
          <path
            d="M 17 18 C 9 6, 2 12, 6 22 C 9 27, 16 22, 17 18 Z"
            fill="#9B8CE0"
            className={isOff ? '' : 'animate-pulse'}
          />
          <path
            d="M 17 18 C 11 10, 6 14, 8 20 C 10 23, 16 20, 17 18 Z"
            fill="#FFB7D1"
            opacity="0.8"
          />
          {/* Butterfly Right Wing */}
          <path
            d="M 19 18 C 27 6, 34 12, 30 22 C 27 27, 20 22, 19 18 Z"
            fill="#9B8CE0"
            className={isOff ? '' : 'animate-pulse'}
          />
          <path
            d="M 19 18 C 25 10, 30 14, 28 20 C 26 23, 20 20, 19 18 Z"
            fill="#FFB7D1"
            opacity="0.8"
          />
          {/* Slender Body */}
          <ellipse cx="18" cy="19" rx="1.5" ry="7" fill="#2B2A52" />
          <circle cx="18" cy="11.5" r="1.5" fill="#2B2A52" />
          {/* Antennae */}
          <path d="M 17 10 Q 14 6 12 7" stroke="#2B2A52" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 19 10 Q 22 6 24 7" stroke="#2B2A52" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}
