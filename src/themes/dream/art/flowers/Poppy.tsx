'use client';

/**
 * Krat.OS Dream Theme — Poppy (Brand Flower & Primary Actions)
 *
 * The signature poppy: velvety layered red petals (#FD142B / #A80A1C),
 * dark seed capsule center (#2A1B2E) with delicate radiating stamens.
 * Strictly reserved for the Krat.OS brand mark and primary call-to-action moments.
 */

import React, { useRef } from 'react';
import { FlowerProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Poppy({
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
      aria-label="Poppy"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        {/* Sun lit upper-left linear gradients */}
        <linearGradient id="poppyPetalGrad" x1="0.2" y1="0.1" x2="0.8" y2="0.9">
          <stop offset="0%" stopColor="#FF4A5C" />
          <stop offset="50%" stopColor="#FD142B" />
          <stop offset="100%" stopColor="#A80A1C" />
        </linearGradient>
        <linearGradient id="poppyStemGrad" x1="0.3" y1="0.1" x2="0.7" y2="0.9">
          <stop offset="0%" stopColor="#6FB07A" />
          <stop offset="100%" stopColor="#3E8C5A" />
        </linearGradient>
      </defs>

      {/* Seed (hidden in bloom state) */}
      <circle id="seed" cx="50" cy="112" r="3.5" fill="#3E2723" opacity="0" />

      {/* Stem */}
      <path
        id="stem"
        d="M 50 114 C 48 95, 52 70, 50 48"
        fill="none"
        stroke="url(#poppyStemGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        id="leaf-l"
        d="M 49 84 C 41 81, 31 73, 26 68 C 28 76, 37 87, 49 89 Z"
        fill="#7BB77F"
        style={{ transformOrigin: '49px 87px' }}
      />

      {/* Right Leaf */}
      <path
        id="leaf-r"
        d="M 51 72 C 59 69, 70 63, 75 58 C 73 66, 64 77, 51 77 Z"
        fill="#6FB07A"
        style={{ transformOrigin: '51px 75px' }}
      />

      {/* Flower Head */}
      <g id="head" style={{ transformOrigin: '50px 46px' }}>
        {/* Back Petals */}
        <g id="petals-back">
          <path
            d="M 50 46 C 35 32, 28 18, 42 12 C 52 8, 62 16, 50 46 Z"
            fill="#B80C1E"
          />
          <path
            d="M 50 46 C 65 32, 73 20, 60 14 C 48 9, 39 20, 50 46 Z"
            fill="#C91024"
          />
        </g>

        {/* Front Petals */}
        <g id="petals">
          {/* Left petal */}
          <path
            d="M 50 46 C 30 45, 18 32, 24 20 C 31 7, 48 18, 50 46 Z"
            fill="url(#poppyPetalGrad)"
          />
          {/* Right petal */}
          <path
            d="M 50 46 C 70 45, 82 33, 76 21 C 69 8, 52 19, 50 46 Z"
            fill="url(#poppyPetalGrad)"
          />
          {/* Main front cup petal */}
          <path
            d="M 32 30 C 40 40, 60 40, 68 30 C 72 42, 62 52, 50 51 C 38 52, 28 42, 32 30 Z"
            fill="#FD142B"
          />
        </g>

        {/* Center Seed Pod & Stamens */}
        <g id="centre">
          {/* Delicate stamens */}
          <circle cx="50" cy="38" r="8" fill="none" stroke="#1A111C" strokeWidth="1.2" strokeDasharray="1.5 2.5" />
          {/* Dark velvety seed capsule */}
          <circle cx="50" cy="38" r="4.5" fill="#2A1B2E" />
          <circle cx="49" cy="37" r="1.5" fill="#5A3D63" />
        </g>
      </g>

      {/* Floating pollen particles emitted on bloom / hover */}
      <circle className="flower-pollen" cx="46" cy="28" r="1.5" fill="#FFC83D" opacity="0" />
      <circle className="flower-pollen" cx="54" cy="25" r="1.2" fill="#FFC83D" opacity="0" />
      <circle className="flower-pollen" cx="50" cy="20" r="1.4" fill="#FFC83D" opacity="0" />
    </svg>
  );
}
