'use client';

/**
 * Krat.OS Dream Theme — Clover (Maintenance & Support)
 *
 * Resilient, dependable, and perennial: emerald leaflets with soft white
 * inner chevrons, paired with a white clover head.
 * Includes easter egg prop `isLucky` to render a 4-leaf clover.
 * Symbolizes Maintenance, Support & Reliability.
 */

import React, { useRef } from 'react';
import { CloverProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Clover({
  state = 'bloom',
  size = 96,
  className = '',
  interactive = true,
  windStrength = 0.8,
  isLucky = false,
  onBloomComplete,
  onClick,
}: CloverProps) {
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
      aria-label={isLucky ? 'Four-Leaf Clover' : 'Clover'}
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        <radialGradient id="cloverHeadGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E8F5E9" />
          <stop offset="100%" stopColor="#C8E6C9" />
        </radialGradient>
      </defs>

      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="2.8" fill="#3E2723" opacity="0" />

      {/* Supple Stem */}
      <path
        id="stem"
        d="M 50 114 C 47 92, 53 72, 50 48"
        fill="none"
        stroke="#43A047"
        strokeWidth="3.0"
        strokeLinecap="round"
      />

      {/* Clover Foliage */}
      <g id="head" style={{ transformOrigin: '50px 58px' }}>
        <g id="petals">
          {/* Leaf 1: Top / North */}
          <path
            d="M 50 58 C 42 48, 32 38, 42 28 C 48 24, 52 24, 58 28 C 68 38, 58 48, 50 58 Z"
            fill="#388E3C"
          />
          {/* Leaf 1 Inner chevron highlight */}
          <path d="M 46 36 Q 50 34 54 36" stroke="#C8E6C9" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Leaf 2: Right / East */}
          <path
            d="M 50 58 C 60 50, 70 40, 80 50 C 84 56, 84 60, 80 66 C 70 76, 60 66, 50 58 Z"
            fill="#2E7D32"
          />
          <path d="M 72 54 Q 74 58 72 62" stroke="#C8E6C9" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Leaf 3: Left / West */}
          <path
            d="M 50 58 C 40 50, 30 40, 20 50 C 16 56, 16 60, 20 66 C 30 76, 40 66, 50 58 Z"
            fill="#43A047"
          />
          <path d="M 28 54 Q 26 58 28 62" stroke="#C8E6C9" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Leaf 4: Bottom / South (Lucky 4-leaf Easter Egg) */}
          {isLucky && (
            <>
              <path
                d="M 50 58 C 42 68, 32 78, 42 88 C 48 92, 52 92, 58 88 C 68 78, 58 68, 50 58 Z"
                fill="#2E7D32"
              />
              <path d="M 46 80 Q 50 82 54 80" stroke="#C8E6C9" strokeWidth="1.5" fill="none" opacity="0.6" />
            </>
          )}
        </g>

        {/* Center Knot */}
        <g id="centre">
          <circle cx="50" cy="58" r="3.2" fill="#1B5E20" />
        </g>

        {/* Small White Clover Flower Blossom Dome */}
        <g id="clover-flower" transform="translate(0, -32)">
          <path
            d="M 42 24 C 42 16, 58 16, 58 24 C 62 28, 58 34, 50 34 C 42 34, 38 28, 42 24 Z"
            fill="url(#cloverHeadGrad)"
          />
          <circle cx="47" cy="22" r="1.5" fill="#FFFFFF" />
          <circle cx="53" cy="24" r="1.3" fill="#FFFFFF" />
          <circle cx="50" cy="28" r="1.4" fill="#E8F5E9" />
        </g>
      </g>

      <circle className="flower-pollen" cx="47" cy="18" r="1.1" fill="#E8F5E9" opacity="0" />
      <circle className="flower-pollen" cx="53" cy="16" r="1.0" fill="#E8F5E9" opacity="0" />
    </svg>
  );
}
