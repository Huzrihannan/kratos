'use client';

/**
 * Krat.OS Dream Theme — Tulip (Mobile Applications)
 *
 * Smooth, sleek, and tactile: elegant cup-shaped coral/rose petals (#FF6B81),
 * with broad curving leaves wrapping the stem.
 * Symbolizes Mobile Applications.
 */

import React, { useRef } from 'react';
import { FlowerProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Tulip({
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
      aria-label="Tulip"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        <linearGradient id="tulipPetalGrad" x1="0.2" y1="0.1" x2="0.8" y2="0.9">
          <stop offset="0%" stopColor="#FFA4B4" />
          <stop offset="40%" stopColor="#FF6B81" />
          <stop offset="100%" stopColor="#D93850" />
        </linearGradient>
      </defs>

      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="3.2" fill="#4E342E" opacity="0" />

      {/* Stem */}
      <path
        id="stem"
        d="M 50 114 C 49 90, 51 68, 50 48"
        fill="none"
        stroke="#5E9B6A"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Broad wrapping leaves */}
      <path
        id="leaf-l"
        d="M 50 96 C 36 90, 24 74, 22 52 C 28 64, 40 82, 50 90 Z"
        fill="#7BB77F"
        style={{ transformOrigin: '50px 92px' }}
      />
      <path
        id="leaf-r"
        d="M 50 88 C 64 82, 76 68, 78 48 C 72 60, 60 76, 50 84 Z"
        fill="#6FB07A"
        style={{ transformOrigin: '50px 86px' }}
      />

      {/* Flower Head */}
      <g id="head" style={{ transformOrigin: '50px 46px' }}>
        {/* Rear center petal */}
        <path
          d="M 50 46 C 42 36, 40 22, 50 16 C 60 22, 58 36, 50 46 Z"
          fill="#D93850"
        />

        {/* Outer side petals */}
        <g id="petals">
          {/* Left petal */}
          <path
            d="M 50 48 C 36 46, 28 32, 34 20 C 42 22, 48 34, 50 48 Z"
            fill="url(#tulipPetalGrad)"
          />
          {/* Right petal */}
          <path
            d="M 50 48 C 64 46, 72 32, 66 20 C 58 22, 52 34, 50 48 Z"
            fill="url(#tulipPetalGrad)"
          />
          {/* Front center cup */}
          <path
            d="M 38 32 C 45 42, 55 42, 62 32 C 60 48, 40 48, 38 32 Z"
            fill="#FF8095"
          />
        </g>

        {/* Subtle center stamen tip */}
        <g id="centre">
          <circle cx="50" cy="27" r="1.5" fill="#FFC83D" />
        </g>
      </g>

      <circle className="flower-pollen" cx="49" cy="18" r="1.2" fill="#FFB4C0" opacity="0" />
      <circle className="flower-pollen" cx="52" cy="16" r="1.0" fill="#FFB4C0" opacity="0" />
    </svg>
  );
}
