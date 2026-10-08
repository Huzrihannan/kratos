"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function MobileAppScene({ isHovered = false }: { isHovered?: boolean }) {
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
        @keyframes mobileExplodeLayer1 {
          0%, 15% { transform: translate(0, 0); opacity: 0.9; }
          40%, 65% { transform: translate(-30px, 18px); opacity: 0.7; }
          85%, 100% { transform: translate(0, 0); opacity: 0.9; }
        }
        @keyframes mobileExplodeLayer2 {
          0%, 15% { transform: translate(0, 0); opacity: 0.95; }
          40%, 65% { transform: translate(0, 0); opacity: 0.95; }
          85%, 100% { transform: translate(0, 0); opacity: 0.95; }
        }
        @keyframes mobileExplodeLayer3 {
          0%, 15% { transform: translate(0, 0); opacity: 1; }
          40%, 65% { transform: translate(30px, -18px); opacity: 1; }
          85%, 100% { transform: translate(0, 0); opacity: 1; }
        }
        @keyframes mobileTapRipple {
          0%, 75% { transform: scale(0.2); opacity: 0; }
          80% { transform: scale(1); opacity: 0.8; }
          95%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .layer-bottom { animation: mobileExplodeLayer1 ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .layer-middle { animation: mobileExplodeLayer2 ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .layer-top { animation: mobileExplodeLayer3 ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .tap-ripple { transform-origin: 140px 75px; animation: mobileTapRipple ${animDuration} ease-out infinite; }
        ${!isPlaying || isOff ? "svg * { animation: none !important; transform: none !important; opacity: 1 !important; }" : ""}
      `}</style>

      {/* Background Registration Marks */}
      <path d="M 40 20 L 40 28 M 36 24 L 44 24" stroke="var(--line)" strokeWidth="1" />
      <path d="M 240 110 L 240 118 M 236 114 L 244 114" stroke="var(--line)" strokeWidth="1" />

      {/* Layer 1: Data / Engine Schema (Bottom Layer) */}
      <g className="layer-bottom">
        <rect x="100" y="25" width="80" height="90" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <line x1="108" y1="36" x2="172" y2="36" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="108" y="44" width="28" height="14" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <rect x="144" y="44" width="28" height="14" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <rect x="108" y="66" width="64" height="24" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <text x="140" y="80" fill="var(--fg-muted)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">NATIVE_BRIDGE</text>
      </g>

      {/* Layer 2: Component Architecture (Middle Layer) */}
      <g className="layer-middle">
        <rect x="100" y="25" width="80" height="90" rx="3" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="106" y="32" width="68" height="8" rx="1" fill="var(--bg)" />
        <rect x="106" y="45" width="32" height="22" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <rect x="142" y="45" width="32" height="22" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <rect x="106" y="72" width="68" height="34" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <circle cx="120" cy="56" r="4" fill="var(--red-text)" />
      </g>

      {/* Layer 3: Physical Device Chassis & Glass UI (Top Layer) */}
      <g className="layer-top">
        {/* Device Chassis */}
        <rect x="100" y="25" width="80" height="90" rx="6" fill="none" stroke="var(--fg)" strokeWidth="1.5" />
        {/* Dynamic Island / Speaker Notch */}
        <rect x="130" y="28" width="20" height="3" rx="1.5" fill="var(--fg)" />
        {/* Screen Content */}
        <rect x="107" y="35" width="66" height="72" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="112" y="42" width="34" height="5" rx="1" fill="var(--line-strong)" />
        <rect x="112" y="52" width="56" height="14" rx="2" fill="var(--bg)" />
        {/* Tap Target Button */}
        <rect x="112" y="72" width="56" height="12" rx="2" fill="var(--red)" />
        <text x="140" y="80" fill="#EFE3CF" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">EXECUTE</text>
      </g>

      {/* Tap Ripple */}
      <circle cx="140" cy="78" r="8" fill="none" stroke="var(--red-text)" strokeWidth="1.5" className="tap-ripple" />
    </svg>
  );
}
