'use client';

/**
 * Krat.OS Dream Theme — Layer 0 Sky (Layer0Sky.tsx)
 *
 * Server-rendered CSS gradient and organic hill silhouettes.
 * Operates purely via CSS custom properties (--sky-top, --sky-mid, --sky-horizon),
 * guaranteeing a beautiful background even if JavaScript is disabled.
 */

import React from 'react';

export function Layer0Sky({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none ${className}`}
      style={{
        background:
          'linear-gradient(180deg, var(--sky-top, #6DB6F0) 0%, var(--sky-mid, #B4DDF7) 62%, var(--sky-horizon, #FFF0D4) 100%)',
      }}
    >
      {/* Distant Serene Hills Silhouette (Vector Curves on Horizon) */}
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[220px] md:h-[280px] lg:h-[320px] transition-colors duration-500"
      >
        {/* Far atmospheric ridge */}
        <path
          d="M0 160 C 240 120, 480 180, 720 140 C 960 100, 1200 150, 1440 130 L 1440 320 L 0 320 Z"
          fill="var(--dream-grass-far, #A8D5A2)"
          opacity="0.45"
        />

        {/* Mid rolling hill */}
        <path
          d="M0 210 C 320 180, 640 240, 960 190 C 1180 160, 1340 200, 1440 210 L 1440 320 L 0 320 Z"
          fill="var(--dream-grass-mid, #6FB07A)"
          opacity="0.65"
        />

        {/* Near foreground crest */}
        <path
          d="M0 260 C 280 230, 560 280, 840 240 C 1120 210, 1320 260, 1440 250 L 1440 320 L 0 320 Z"
          fill="var(--dream-grass-near, #3E8C5A)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
