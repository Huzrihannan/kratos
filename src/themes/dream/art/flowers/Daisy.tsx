'use client';

/**
 * Krat.OS Dream Theme — Daisy (Web Applications)
 *
 * Friendly, crisp, and radiant: radiating clean white petals (#FFFAF0)
 * around a vibrant golden yolk disc (#FFC83D).
 * Symbolizes Web Applications.
 */

import React, { useRef } from 'react';
import { FlowerProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Daisy({
  state = 'bloom',
  size = 96,
  className = '',
  interactive = true,
  windStrength = 1.0,
  onBloomComplete,
  onClick,
}: FlowerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { bindHover } = useFlowerBloom(svgRef, {
    state,
    interactive,
    windStrength,
    onBloomComplete,
  });

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      width={size}
      height={(size * 120) / 100}
      role="img"
      aria-label="Daisy"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        <radialGradient id="daisyDiscGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="65%" stopColor="#FFC83D" />
          <stop offset="100%" stopColor="#E69500" />
        </radialGradient>
      </defs>

      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="3" fill="#4E342E" opacity="0" />

      {/* Stem */}
      <path
        id="stem"
        d="M 50 114 C 52 92, 47 72, 50 46"
        fill="none"
        stroke="#5E9B6A"
        strokeWidth="3.0"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <path
        id="leaf-l"
        d="M 49 82 C 40 80, 28 72, 23 68 C 26 77, 36 86, 49 87 Z"
        fill="#7BB77F"
        style={{ transformOrigin: '49px 85px' }}
      />
      <path
        id="leaf-r"
        d="M 51 74 C 61 71, 72 65, 78 61 C 75 70, 64 79, 51 80 Z"
        fill="#6FB07A"
        style={{ transformOrigin: '51px 78px' }}
      />

      {/* Flower Head */}
      <g id="head" style={{ transformOrigin: '50px 44px' }}>
        {/* 12 Radiating Petals */}
        <g id="petals">
          {/* Top & diagonals */}
          <path d="M 50 44 C 47 30, 48 16, 50 14 C 52 16, 53 30, 50 44 Z" fill="#FFF8EB" />
          <path d="M 50 44 C 58 32, 69 22, 71 24 C 70 26, 58 37, 50 44 Z" fill="#FFF1DC" />
          <path d="M 50 44 C 62 40, 78 39, 80 42 C 78 45, 63 46, 50 44 Z" fill="#FFFAF0" />
          <path d="M 50 44 C 60 52, 72 64, 70 66 C 68 66, 57 54, 50 44 Z" fill="#FFF1DC" />
          <path d="M 50 44 C 52 58, 51 72, 49 74 C 47 72, 47 58, 50 44 Z" fill="#FFF8EB" />
          <path d="M 50 44 C 42 56, 30 67, 28 65 C 29 63, 41 52, 50 44 Z" fill="#FFFAF0" />
          <path d="M 50 44 C 36 46, 21 48, 19 45 C 21 42, 36 41, 50 44 Z" fill="#FFF8EB" />
          <path d="M 50 44 C 38 34, 27 24, 29 22 C 31 22, 42 33, 50 44 Z" fill="#FFF1DC" />

          {/* Intermediate overlapping petals */}
          <path d="M 50 44 C 55 31, 62 20, 64 21 C 63 24, 54 34, 50 44 Z" fill="#FFFFFF" />
          <path d="M 50 44 C 63 48, 77 56, 76 59 C 73 59, 60 50, 50 44 Z" fill="#FFFFFF" />
          <path d="M 50 44 C 45 57, 37 68, 35 67 C 36 64, 45 54, 50 44 Z" fill="#FFFFFF" />
          <path d="M 50 44 C 35 38, 22 30, 23 27 C 26 27, 39 36, 50 44 Z" fill="#FFFFFF" />
        </g>

        {/* Center Disc */}
        <g id="centre">
          <circle cx="50" cy="44" r="8.5" fill="url(#daisyDiscGrad)" />
          {/* Subtle textured seeds */}
          <circle cx="49" cy="42.5" r="1.5" fill="#FFEAA7" opacity="0.8" />
          <circle cx="52" cy="44.5" r="1.2" fill="#E69500" opacity="0.6" />
        </g>
      </g>

      <circle className="flower-pollen" cx="48" cy="36" r="1.3" fill="#FFC83D" opacity="0" />
      <circle className="flower-pollen" cx="53" cy="34" r="1.1" fill="#FFC83D" opacity="0" />
    </svg>
  );
}
