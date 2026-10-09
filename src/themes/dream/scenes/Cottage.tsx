'use client';

import React from 'react';

export interface CottageProps {
  isAvailable: boolean;
  className?: string;
}

export function Cottage({ isAvailable, className = '' }: CottageProps) {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Cottage SVG Artwork */}
      <svg
        viewBox="0 0 240 160"
        className="w-48 sm:w-56 h-auto drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Rolling Hill Crest */}
        <path
          d="M0 150 Q60 130 120 135 T240 145 L240 160 L0 160 Z"
          fill="#2A6B48"
        />
        <path
          d="M20 152 Q70 136 120 140 T220 148 L220 160 L20 160 Z"
          fill="#1E5236"
        />

        {/* Chimney Smoke Puffs (animated rising) */}
        <g className="animate-pulse opacity-75">
          <circle cx="156" cy="35" r="5" fill="#CFCBEA" opacity="0.6" />
          <circle cx="160" cy="22" r="7" fill="#CFCBEA" opacity="0.4" />
          <circle cx="166" cy="8" r="9" fill="#CFCBEA" opacity="0.25" />
        </g>

        {/* Chimney */}
        <rect x="150" y="45" width="12" height="25" rx="1.5" fill="#8B4A3E" />
        <rect x="148" y="42" width="16" height="5" rx="1" fill="#6B3329" />

        {/* Cottage Main Walls */}
        <rect x="75" y="80" width="90" height="58" rx="4" fill="#FFF1DC" />
        {/* Wall timber accents */}
        <line x1="75" y1="108" x2="165" y2="108" stroke="#D6CDB5" strokeWidth="2" />
        <line x1="120" y1="80" x2="120" y2="138" stroke="#D6CDB5" strokeWidth="1.5" />

        {/* Curved Roof */}
        <path
          d="M60 84 Q120 54 180 84 L175 88 Q120 62 65 88 Z"
          fill="#B84233"
        />
        <path
          d="M62 84 Q120 58 178 84 L172 74 Q120 48 68 74 Z"
          fill="#D95343"
        />
        {/* Roof ridge cap */}
        <path
          d="M100 52 Q120 48 140 52"
          stroke="#8B2519"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Front Door */}
        <rect x="86" y="98" width="22" height="40" rx="3" fill="#6B3E26" />
        <circle cx="103" cy="118" r="2" fill="#FFD47A" />

        {/* Glowing Cottage Window */}
        <rect
          data-testid="cottage-window"
          x="124"
          y="94"
          width="28"
          height="28"
          rx="3"
          fill={isAvailable ? '#FFD47A' : '#33346F'}
          className={isAvailable ? 'transition-all duration-700' : ''}
          style={{
            filter: isAvailable ? 'drop-shadow(0 0 10px rgba(255, 212, 122, 0.9))' : 'none',
          }}
        />
        {/* Window Mullions / Panes */}
        <line
          x1="138"
          y1="94"
          x2="138"
          y2="122"
          stroke={isAvailable ? '#B8860B' : '#1B1E4B'}
          strokeWidth="2"
        />
        <line
          x1="124"
          y1="108"
          x2="152"
          y2="108"
          stroke={isAvailable ? '#B8860B' : '#1B1E4B'}
          strokeWidth="2"
        />
        {/* Warm Window Glow Spilling onto Ground */}
        {isAvailable && (
          <path
            d="M120 138 L156 138 L168 155 L108 155 Z"
            fill="url(#window-light-gradient)"
            opacity="0.45"
          />
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id="window-light-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD47A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD47A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Status Pill Badge */}
      <div className="mt-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B1E4B]/90 border border-[#54478C]/40 text-xs shadow-md backdrop-blur-xs">
        <span
          className={`w-2 h-2 rounded-full ${
            isAvailable ? 'bg-[#FFD47A] shadow-[0_0_8px_#FFD47A] animate-pulse' : 'bg-[#55537A]'
          }`}
        />
        <span className="font-serif text-[#FFF6E5] text-xs">
          {isAvailable ? "We're open for new projects" : "We're resting. Leave us a note."}
        </span>
      </div>
    </div>
  );
}
