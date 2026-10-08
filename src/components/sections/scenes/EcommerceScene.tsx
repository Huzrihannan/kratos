"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function EcommerceScene({ isHovered = false }: { isHovered?: boolean }) {
  const containerRef = useRef<SVGSVGElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();

  const animDuration = isHovered ? "4.5s" : "7.5s";

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
        @keyframes ecomPacketMove {
          0% { transform: translate(45px, 70px); opacity: 0; }
          10% { transform: translate(45px, 70px); opacity: 1; }
          40% { transform: translate(140px, 70px); opacity: 1; }
          50% { transform: translate(140px, 70px); opacity: 1; }
          80% { transform: translate(235px, 70px); opacity: 1; }
          90%, 100% { transform: translate(235px, 70px); opacity: 0; }
        }
        @keyframes ecomCartCounter {
          0%, 38% { opacity: 0; transform: translateY(4px); }
          45%, 85% { opacity: 1; transform: translateY(0); }
          95%, 100% { opacity: 0; }
        }
        @keyframes ecomSuccessPulse {
          0%, 78% { transform: scale(0.6); opacity: 0; }
          84% { transform: scale(1.1); opacity: 1; }
          92%, 100% { transform: scale(1); opacity: 1; }
        }
        .ecom-packet { animation: ecomPacketMove ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .cart-counter { animation: ecomCartCounter ${animDuration} ease-out infinite; }
        .success-pulse { transform-origin: 235px 70px; animation: ecomSuccessPulse ${animDuration} ease-out infinite; }
        ${!isPlaying || isOff ? "svg * { animation: none !important; transform: none !important; opacity: 1 !important; }" : ""}
      `}</style>

      {/* Connecting Circuit Pipeline */}
      <line x1="45" y1="70" x2="235" y2="70" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* STATION 1: Product Tile */}
      <g>
        <rect x="20" y="38" width="52" height="64" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="26" y="44" width="40" height="26" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <rect x="26" y="75" width="28" height="4" rx="1" fill="var(--line-strong)" />
        <rect x="26" y="82" width="18" height="3" rx="1" fill="var(--red-text)" />
        <text x="26" y="94" fill="var(--fg-muted)" fontSize="4.5" fontFamily="monospace">SKU_01</text>
      </g>

      {/* STATION 2: Cart Hub */}
      <g>
        <rect x="114" y="38" width="52" height="64" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
        {/* Cart Icon / Frame */}
        <rect x="122" y="44" width="36" height="26" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <path d="M 128 54 L 132 54 L 136 62 L 148 62 L 151 56 L 133 56" stroke="var(--fg)" strokeWidth="1" fill="none" />
        <circle cx="137" cy="65" r="1.5" fill="var(--fg)" />
        <circle cx="147" cy="65" r="1.5" fill="var(--fg)" />

        {/* Counter Badge */}
        <g className="cart-counter">
          <rect x="144" y="42" width="16" height="9" rx="1" fill="var(--red)" />
          <text x="152" y="48.5" fill="#EFE3CF" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">+1</text>
        </g>
        <text x="140" y="86" fill="var(--fg-muted)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">CART_SYNC</text>
      </g>

      {/* STATION 3: Checkout Terminal */}
      <g>
        <rect x="208" y="38" width="54" height="64" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
        <rect x="214" y="44" width="42" height="26" rx="1" fill="var(--bg)" stroke="var(--line)" />
        <line x1="218" y1="52" x2="252" y2="52" stroke="var(--line)" strokeWidth="1" />
        <rect x="218" y="58" width="20" height="4" rx="1" fill="var(--line-strong)" />

        {/* Success Pulse Badge */}
        <g className="success-pulse">
          <circle cx="235" cy="70" r="10" fill="var(--ok)" opacity="0.2" />
          <circle cx="235" cy="70" r="7" fill="var(--ok)" />
          <path d="M 232 70 L 234 72 L 238 68" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <text x="235" y="94" fill="var(--ok)" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SETTLED</text>
      </g>

      {/* Animated Traveling Packet Dot */}
      <circle cx="0" cy="0" r="3.5" fill="var(--red)" className="ecom-packet">
        <animate attributeName="r" values="3;4.5;3" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
