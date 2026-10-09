'use client';

/**
 * Krat.OS Dream Theme — Cherry Blossom (UI/UX Design)
 *
 * Refined, crafted, and harmonious: 5-petal blossom in delicate pinks (#FFB7D1),
 * subtle cleft tips, on an elegant woody branch with deep rose stamens.
 * Symbolizes UI/UX Design & Creative Direction.
 */

import React, { useRef } from 'react';
import { FlowerProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function CherryBlossom({
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
      aria-label="Cherry Blossom"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(interactive ? bindHover : {})}
    >
      <defs>
        <radialGradient id="cherryPetalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2F6" />
          <stop offset="65%" stopColor="#FFB7D1" />
          <stop offset="100%" stopColor="#FA8CAE" />
        </radialGradient>
      </defs>

      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="3" fill="#3E2723" opacity="0" />

      {/* Woody Branch / Stem */}
      <path
        id="stem"
        d="M 50 114 C 47 94, 52 74, 50 50"
        fill="none"
        stroke="#6D4C41"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Delicate young leaf buds */}
      <path
        id="leaf-l"
        d="M 49 84 C 41 81, 33 76, 29 73 C 32 79, 39 86, 49 87 Z"
        fill="#81C784"
        style={{ transformOrigin: '49px 85px' }}
      />
      <path
        id="leaf-r"
        d="M 51 76 C 59 73, 67 68, 71 65 C 68 71, 61 78, 51 79 Z"
        fill="#66BB6A"
        style={{ transformOrigin: '51px 77px' }}
      />

      {/* 5-Petal Flower Blossom */}
      <g id="head" style={{ transformOrigin: '50px 48px' }}>
        <g id="petals">
          {/* Top Petal */}
          <path
            d="M 50 48 C 41 38, 36 24, 46 16 C 50 14, 50 14, 54 16 C 64 24, 59 38, 50 48 Z"
            fill="url(#cherryPetalGrad)"
          />
          {/* Top-Right Petal */}
          <path
            d="M 50 48 C 58 40, 72 38, 78 48 C 80 52, 79 54, 76 56 C 64 63, 56 55, 50 48 Z"
            fill="url(#cherryPetalGrad)"
          />
          {/* Bottom-Right Petal */}
          <path
            d="M 50 48 C 54 58, 62 70, 56 77 C 52 79, 50 78, 47 75 C 41 64, 45 55, 50 48 Z"
            fill="url(#cherryPetalGrad)"
          />
          {/* Bottom-Left Petal */}
          <path
            d="M 50 48 C 42 56, 30 65, 25 58 C 23 54, 25 51, 28 48 C 39 40, 46 45, 50 48 Z"
            fill="url(#cherryPetalGrad)"
          />
          {/* Top-Left Petal */}
          <path
            d="M 50 48 C 38 45, 24 38, 26 28 C 28 25, 31 25, 35 28 C 44 35, 46 42, 50 48 Z"
            fill="url(#cherryPetalGrad)"
          />
        </g>

        {/* Delicate Stamens & Pistil */}
        <g id="centre">
          <circle cx="50" cy="48" r="5" fill="#E91E63" fillOpacity="0.8" />
          <line x1="50" y1="48" x2="48" y2="40" stroke="#FF4081" strokeWidth="1" />
          <circle cx="48" cy="40" r="1.2" fill="#FFEB3B" />

          <line x1="50" y1="48" x2="56" y2="42" stroke="#FF4081" strokeWidth="1" />
          <circle cx="56" cy="42" r="1.2" fill="#FFEB3B" />

          <line x1="50" y1="48" x2="54" y2="54" stroke="#FF4081" strokeWidth="1" />
          <circle cx="54" cy="54" r="1.2" fill="#FFEB3B" />

          <line x1="50" y1="48" x2="44" y2="52" stroke="#FF4081" strokeWidth="1" />
          <circle cx="44" cy="52" r="1.2" fill="#FFEB3B" />
        </g>
      </g>

      <circle className="flower-pollen" cx="48" cy="24" r="1.2" fill="#FFD1DC" opacity="0" />
      <circle className="flower-pollen" cx="54" cy="22" r="1.0" fill="#FFD1DC" opacity="0" />
    </svg>
  );
}
