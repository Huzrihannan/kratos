"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function DesignScene({ isHovered = false }: { isHovered?: boolean }) {
  const containerRef = useRef<SVGSVGElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();

  const animDuration = isHovered ? "4s" : "7s";

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 280 140"
      className="w-full h-32 overflow-hidden select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes wireframeFade {
          0%, 15% { opacity: 0.9; }
          40%, 85% { opacity: 0.15; }
          95%, 100% { opacity: 0.9; }
        }
        @keyframes hifiReveal {
          0%, 20% { opacity: 0; transform: translateY(4px); }
          45%, 85% { opacity: 1; transform: translateY(0); }
          95%, 100% { opacity: 0; }
        }
        @keyframes anchorHandlesAppear {
          0%, 35% { opacity: 0; transform: scale(0.6); }
          50%, 80% { opacity: 1; transform: scale(1); }
          92%, 100% { opacity: 0; }
        }
        .wireframe-layer { animation: wireframeFade ${animDuration} ease-in-out infinite; }
        .hifi-layer { animation: hifiReveal ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anchor-handles { transform-origin: 140px 58px; animation: anchorHandlesAppear ${animDuration} ease-out infinite; }
        ${!isPlaying || isOff ? "svg * { animation: none !important; opacity: 1 !important; transform: none !important; }" : ""}
      `}</style>

      {/* Canvas Frame */}
      <rect x="25" y="16" width="230" height="108" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
      {/* Top Ruler & Coordinates */}
      <line x1="25" y1="28" x2="255" y2="28" stroke="var(--line)" strokeWidth="1" />
      <text x="32" y="24" fill="var(--fg-muted)" fontSize="4" fontFamily="monospace">ARTBOARD_01 // 1440x900</text>

      {/* LAYER 1: Low-Fidelity Wireframe Lines */}
      <g className="wireframe-layer">
        <rect x="35" y="36" width="60" height="80" rx="1" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="45" y1="46" x2="85" y2="46" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="45" y1="56" x2="75" y2="56" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="45" y="68" width="40" height="24" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" />

        <rect x="105" y="36" width="140" height="42" rx="1" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="115" y1="54" x2="225" y2="54" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" />

        <rect x="105" y="84" width="66" height="32" rx="1" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="178" y="84" width="67" height="32" rx="1" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
      </g>

      {/* LAYER 2: High-Fidelity UI with Signal Red Accent */}
      <g className="hifi-layer">
        <rect x="35" y="36" width="60" height="80" rx="2" fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="42" y="44" width="46" height="6" rx="1" fill="var(--fg)" />
        <rect x="42" y="54" width="34" height="4" rx="1" fill="var(--line-strong)" />
        <rect x="42" y="64" width="46" height="22" rx="1" fill="var(--surface)" stroke="var(--line)" />
        {/* Signal Red Primary Button */}
        <rect x="42" y="94" width="46" height="12" rx="1" fill="var(--red)" />
        <text x="65" y="102" fill="#EFE3CF" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SUBMIT</text>

        <rect x="105" y="36" width="140" height="42" rx="2" fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="115" y="44" width="70" height="7" rx="1" fill="var(--fg)" />
        <rect x="115" y="55" width="110" height="3" rx="1" fill="var(--fg-muted)" />
        <rect x="115" y="62" width="90" height="3" rx="1" fill="var(--line)" />

        <rect x="105" y="84" width="66" height="32" rx="2" fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="112" y="90" width="30" height="5" rx="1" fill="var(--fg)" />
        <rect x="112" y="98" width="52" height="12" rx="1" fill="var(--surface)" />

        <rect x="178" y="84" width="67" height="32" rx="2" fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="185" y="90" width="30" height="5" rx="1" fill="var(--fg)" />
        <rect x="185" y="98" width="52" height="12" rx="1" fill="var(--surface)" />
      </g>

      {/* Vector Bezier Anchor Handles */}
      <g className="anchor-handles">
        <line x1="110" y1="58" x2="170" y2="58" stroke="var(--red-text)" strokeWidth="1" />
        <circle cx="110" cy="58" r="2.5" fill="var(--bg)" stroke="var(--red-text)" strokeWidth="1.5" />
        <rect x="137.5" y="55.5" width="5" height="5" fill="var(--red)" />
        <circle cx="170" cy="58" r="2.5" fill="var(--bg)" stroke="var(--red-text)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
