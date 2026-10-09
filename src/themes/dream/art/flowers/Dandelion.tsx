'use client';

/**
 * Krat.OS Dream Theme — Dandelion (AI & Automation)
 *
 * Intelligent, algorithmic, and wish-granting:
 * Supports two distinct sub-states:
 * 1. Radiant yellow blossom head (head)
 * 2. Gossamer white seed-puff globe (puff) with drifting parachutes on click/blow.
 * Symbolizes AI & Automation.
 */

import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { DandelionProps } from './types';
import { useFlowerBloom } from './useFlowerBloom';

export function Dandelion({
  state = 'bloom',
  size = 96,
  className = '',
  interactive = true,
  windStrength = 1.2,
  isPuff = false,
  dispersed = false,
  onBloomComplete,
  onClick,
}: DandelionProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDispersing, setIsDispersing] = useState(false);

  const { bindHover } = useFlowerBloom(svgRef, {
    state,
    interactive,
    windStrength,
    onBloomComplete,
  });

  // Disperse flying seed parachutes on click / blow
  const triggerDispersion = useCallback(() => {
    if (!isPuff || isDispersing) return;
    setIsDispersing(true);
    const svg = svgRef.current;
    if (!svg) return;

    const parachutes = svg.querySelectorAll<SVGElement>('.dandelion-parachute');
    if (parachutes.length > 0) {
      gsap.to(parachutes, {
        x: (i) => (i % 2 === 0 ? 35 + i * 8 : -25 - i * 6),
        y: (i) => -40 - i * 10,
        rotation: (i) => (i % 2 === 0 ? 45 : -40),
        opacity: 0,
        stagger: 0.04,
        duration: 1.4,
        ease: 'power1.out',
        onComplete: () => {
          // Reset after 3 seconds for continuous play
          setTimeout(() => {
            gsap.set(parachutes, { x: 0, y: 0, rotation: 0, opacity: 1 });
            setIsDispersing(false);
          }, 3000);
        },
      });
    }
  }, [isPuff, isDispersing]);

  React.useEffect(() => {
    if (dispersed && isPuff) {
      triggerDispersion();
    }
  }, [dispersed, isPuff, triggerDispersion]);

  const handleClick = () => {
    onClick?.();
    if (isPuff) {
      triggerDispersion();
    }
  };

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      width={size}
      height={(size * 120) / 100}
      role="img"
      aria-label="Dandelion"
      className={`inline-block select-none overflow-visible ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
      {...(interactive ? bindHover : {})}
    >
      {/* Seed */}
      <circle id="seed" cx="50" cy="112" r="2.8" fill="#5D4037" opacity="0" />

      {/* Slender Hollow Stem */}
      <path
        id="stem"
        d="M 50 114 C 49 90, 51 66, 50 48"
        fill="none"
        stroke="#5E9B6A"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Jagged / Toothed Lion Leaves */}
      <path
        id="leaf-l"
        d="M 49 86 C 40 82, 30 76, 26 73 L 34 76 C 26 71, 20 64, 18 60 L 28 65 C 22 58, 20 50, 22 45 C 26 56, 38 74, 49 88 Z"
        fill="#6FB07A"
        style={{ transformOrigin: '49px 87px' }}
      />
      <path
        id="leaf-r"
        d="M 51 76 C 60 72, 70 66, 74 63 L 66 66 C 74 61, 80 54, 82 50 L 72 55 C 78 48, 80 40, 78 35 C 74 46, 62 64, 51 78 Z"
        fill="#7BB77F"
        style={{ transformOrigin: '51px 77px' }}
      />

      {/* Flower Head */}
      <g id="head" style={{ transformOrigin: '50px 48px' }}>
        {isPuff ? (
          <g id="puff-globe">
            <circle cx="50" cy="48" r="4" fill="#8D6E63" />
            <g id="petals">
              {[
                { x: 50, y: 24 },
                { x: 68, y: 30 },
                { x: 74, y: 48 },
                { x: 32, y: 30 },
                { x: 26, y: 48 },
                { x: 59, y: 25 },
                { x: 41, y: 25 },
              ].map((spoke, idx) => (
                <g key={idx} className="dandelion-parachute" style={{ transformOrigin: '50px 48px' }}>
                  <line x1="50" y1="48" x2={spoke.x} y2={spoke.y} stroke="#D7CCC8" strokeWidth="0.8" />
                  <circle cx={spoke.x} cy={spoke.y} r="3.4" fill="#FFFFFF" fillOpacity="0.85" />
                  <circle cx={spoke.x} cy={spoke.y} r="1.4" fill="#EFEBE9" />
                </g>
              ))}
            </g>
          </g>
        ) : (
          /* ================= YELLOW BLOSSOM HEAD ================= */
          <g id="yellow-blossom">
            <g id="petals">
              {/* Multi-tier fine golden ray petals */}
              <path d="M 50 48 L 47 18 L 53 18 Z" fill="#FFC83D" />
              <path d="M 50 48 L 60 21 L 64 24 Z" fill="#FFB400" />
              <path d="M 50 48 L 71 30 L 74 36 Z" fill="#FFC83D" />
              <path d="M 50 48 L 76 44 L 75 51 Z" fill="#FFB400" />
              <path d="M 50 48 L 24 44 L 25 51 Z" fill="#FFB400" />
              <path d="M 50 48 L 29 30 L 26 36 Z" fill="#FFC83D" />
              <path d="M 50 48 L 40 21 L 36 24 Z" fill="#FFB400" />
              {/* Inner core petals */}
              <path d="M 50 48 L 48 28 L 52 28 Z" fill="#FFE066" />
              <path d="M 50 48 L 58 32 L 56 36 Z" fill="#FFE066" />
              <path d="M 50 48 L 42 32 L 44 36 Z" fill="#FFE066" />
            </g>
            <g id="centre">
              <circle cx="50" cy="48" r="4.5" fill="#E69500" />
            </g>
          </g>
        )}
      </g>

      <circle className="flower-pollen" cx="48" cy="28" r="1.3" fill="#FFF8E7" opacity="0" />
      <circle className="flower-pollen" cx="53" cy="26" r="1.1" fill="#FFF8E7" opacity="0" />
    </svg>
  );
}
