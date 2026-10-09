'use client';

/**
 * Krat.OS Dream Theme — Lavender (Wildflower Accent)
 *
 * Fragrant, graceful, and slender: upright spike with layered whorls
 * of purple-violet florets (#9B8CE0) and narrow silver-green leaves.
 * Adds texture and movement to meadow borders.
 */

import React, { useRef } from 'react';
import { FlowerProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Lavender({
  state = 'bloom',
  size = 96,
  className = '',
  interactive = true,
  windStrength = 1.3,
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
      aria-label="Lavender"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        <linearGradient id="lavenderGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C5CAE9" />
          <stop offset="50%" stopColor="#9B8CE0" />
          <stop offset="100%" stopColor="#7966D6" />
        </linearGradient>
      </defs>

      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="2.6" fill="#311B92" opacity="0" />

      {/* Slender Flexible Stem */}
      <path
        id="stem"
        d="M 50 114 C 48 88, 52 56, 50 20"
        fill="none"
        stroke="#5E9B6A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Slender needle-like leaves */}
      <path
        id="leaf-l"
        d="M 49 90 C 39 88, 30 84, 25 80 C 31 83, 41 87, 49 89 Z"
        fill="#81C784"
        style={{ transformOrigin: '49px 89px' }}
      />
      <path
        id="leaf-r"
        d="M 51 82 C 61 80, 70 76, 75 72 C 69 75, 59 79, 51 81 Z"
        fill="#66BB6A"
        style={{ transformOrigin: '51px 81px' }}
      />

      {/* Spire of Violet Florets */}
      <g id="head" style={{ transformOrigin: '50px 50px' }}>
        <g id="petals">
          {/* Top tip bud */}
          <circle cx="50" cy="20" r="3.2" fill="#B39DDB" />

          {/* Tier 1 Whorl (High) */}
          <ellipse cx="45" cy="28" rx="4" ry="3" fill="url(#lavenderGrad)" />
          <ellipse cx="55" cy="28" rx="4" ry="3" fill="url(#lavenderGrad)" />
          <circle cx="50" cy="27" r="3" fill="#9B8CE0" />

          {/* Tier 2 Whorl */}
          <ellipse cx="44" cy="37" rx="4.5" ry="3.2" fill="url(#lavenderGrad)" />
          <ellipse cx="56" cy="37" rx="4.5" ry="3.2" fill="url(#lavenderGrad)" />
          <circle cx="50" cy="36" r="3.2" fill="#8C7AE6" />

          {/* Tier 3 Whorl */}
          <ellipse cx="43" cy="46" rx="5" ry="3.5" fill="url(#lavenderGrad)" />
          <ellipse cx="57" cy="46" rx="5" ry="3.5" fill="url(#lavenderGrad)" />
          <circle cx="50" cy="45" r="3.5" fill="#7966D6" />

          {/* Tier 4 Whorl (Low) */}
          <ellipse cx="44" cy="55" rx="4.8" ry="3.2" fill="url(#lavenderGrad)" />
          <ellipse cx="56" cy="55" rx="4.8" ry="3.2" fill="url(#lavenderGrad)" />
          <circle cx="50" cy="54" r="3.2" fill="#7966D6" />
        </g>
      </g>

      <circle className="flower-pollen" cx="48" cy="16" r="1.1" fill="#D1C4E9" opacity="0" />
      <circle className="flower-pollen" cx="52" cy="14" r="1.0" fill="#D1C4E9" opacity="0" />
    </svg>
  );
}
