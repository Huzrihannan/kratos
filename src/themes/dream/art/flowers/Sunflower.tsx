'use client';

/**
 * Krat.OS Dream Theme — Sunflower (E-Commerce)
 *
 * Rich, abundant, and sun-drenched: warm golden petals (#FFB400)
 * radiating around a textured dark seed disc (#4A2E18).
 * Symbolizes E-commerce & Storefronts.
 */

import React, { useRef } from 'react';
import { FlowerProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Sunflower({
  state = 'bloom',
  size = 96,
  className = '',
  interactive = true,
  windStrength = 0.9,
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
      aria-label="Sunflower"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        <radialGradient id="sunflowerDiscGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#5C381E" />
          <stop offset="70%" stopColor="#3B2211" />
          <stop offset="100%" stopColor="#241307" />
        </radialGradient>
      </defs>

      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="3.6" fill="#2E1C0C" opacity="0" />

      {/* Thick Sturdy Stem */}
      <path
        id="stem"
        d="M 50 114 C 49 92, 51 68, 50 48"
        fill="none"
        stroke="#4E8C58"
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Broad hearty leaves */}
      <path
        id="leaf-l"
        d="M 48 85 C 34 82, 18 73, 14 62 C 22 68, 38 83, 48 88 Z"
        fill="#6FB07A"
        style={{ transformOrigin: '48px 87px' }}
      />
      <path
        id="leaf-r"
        d="M 52 72 C 66 68, 82 58, 86 48 C 78 56, 62 70, 52 74 Z"
        fill="#5E9B6A"
        style={{ transformOrigin: '52px 73px' }}
      />

      {/* Flower Head */}
      <g id="head" style={{ transformOrigin: '50px 45px' }}>
        {/* Layer 1: Rear Golden Petals */}
        <g id="petals-back">
          <path d="M 50 45 L 43 14 L 57 14 Z" fill="#E69500" />
          <path d="M 50 45 L 72 22 L 78 34 Z" fill="#E69500" />
          <path d="M 50 45 L 81 48 L 76 60 Z" fill="#E69500" />
          <path d="M 50 45 L 64 74 L 50 78 Z" fill="#E69500" />
          <path d="M 50 45 L 36 74 L 23 66 Z" fill="#E69500" />
          <path d="M 50 45 L 19 48 L 22 36 Z" fill="#E69500" />
          <path d="M 50 45 L 28 22 L 38 16 Z" fill="#E69500" />
        </g>

        {/* Layer 2: Front Golden Petals */}
        <g id="petals">
          <path d="M 50 45 L 47 16 L 53 16 Z" fill="#FFB400" />
          <path d="M 50 45 L 68 25 L 72 32 Z" fill="#FFC83D" />
          <path d="M 50 45 L 77 44 L 75 52 Z" fill="#FFB400" />
          <path d="M 50 45 L 66 66 L 58 72 Z" fill="#FFC83D" />
          <path d="M 50 45 L 44 74 L 38 72 Z" fill="#FFB400" />
          <path d="M 50 45 L 26 62 L 23 54 Z" fill="#FFC83D" />
          <path d="M 50 45 L 23 42 L 25 34 Z" fill="#FFB400" />
          <path d="M 50 45 L 34 24 L 42 19 Z" fill="#FFC83D" />
        </g>

        {/* Large Textured Center Disc */}
        <g id="centre">
          <circle cx="50" cy="45" r="14" fill="url(#sunflowerDiscGrad)" />
          {/* Subtle concentric seed dots */}
          <circle cx="47" cy="42" r="1.5" fill="#8C532B" />
          <circle cx="53" cy="43" r="1.4" fill="#8C532B" />
          <circle cx="50" cy="48" r="1.6" fill="#8C532B" />
          <circle cx="45" cy="47" r="1.2" fill="#6E3D1A" />
          <circle cx="54" cy="48" r="1.2" fill="#6E3D1A" />
        </g>
      </g>

      <circle className="flower-pollen" cx="48" cy="30" r="1.4" fill="#FFD700" opacity="0" />
      <circle className="flower-pollen" cx="54" cy="28" r="1.2" fill="#FFD700" opacity="0" />
    </svg>
  );
}
