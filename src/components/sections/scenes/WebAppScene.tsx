"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function WebAppScene({ isHovered = false }: { isHovered?: boolean }) {
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
        @keyframes webAssembleSidebar {
          0% { transform: translateX(-40px); opacity: 0; }
          25%, 85% { transform: translateX(0); opacity: 1; }
          95%, 100% { transform: translateX(0); opacity: 0.9; }
        }
        @keyframes webAssembleCards {
          0%, 15% { transform: translateY(30px); opacity: 0; }
          40%, 85% { transform: translateY(0); opacity: 1; }
          95%, 100% { transform: translateY(0); opacity: 0.9; }
        }
        @keyframes webAssembleChart {
          0%, 30% { stroke-dashoffset: 120; opacity: 0; }
          55%, 85% { stroke-dashoffset: 0; opacity: 1; }
          95%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes webCursorClick {
          0%, 50% { transform: translate(180px, 110px); opacity: 0; }
          60% { transform: translate(145px, 68px); opacity: 1; }
          65% { transform: translate(145px, 68px) scale(0.85); opacity: 1; }
          72%, 100% { transform: translate(150px, 75px); opacity: 0; }
        }
        @keyframes webToastPopup {
          0%, 65% { transform: translateY(15px); opacity: 0; }
          75%, 90% { transform: translateY(0); opacity: 1; }
          98%, 100% { transform: translateY(-5px); opacity: 0; }
        }
        .web-sidebar { animation: webAssembleSidebar ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .web-cards { animation: webAssembleCards ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .web-chart { stroke-dasharray: 120; animation: webAssembleChart ${animDuration} ease-out infinite; }
        .web-cursor { animation: webCursorClick ${animDuration} ease-in-out infinite; }
        .web-toast { animation: webToastPopup ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        ${!isPlaying || isOff ? "svg * { animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important; transform: none !important; }" : ""}
      `}</style>

      {/* Browser Window Frame */}
      <rect x="8" y="8" width="264" height="124" rx="2" stroke="var(--line-strong)" strokeWidth="1" fill="var(--surface)" />
      <line x1="8" y1="26" x2="272" y2="26" stroke="var(--line)" strokeWidth="1" />
      {/* Chrome Controls */}
      <circle cx="18" cy="17" r="2.5" fill="var(--line-strong)" />
      <circle cx="26" cy="17" r="2.5" fill="var(--line-strong)" />
      <circle cx="34" cy="17" r="2.5" fill="var(--line-strong)" />
      <rect x="46" y="14" width="80" height="6" rx="1" fill="var(--line)" />

      {/* Assembling Sidebar */}
      <g className="web-sidebar">
        <line x1="60" y1="26" x2="60" y2="132" stroke="var(--line)" strokeWidth="1" />
        <rect x="16" y="36" width="34" height="4" rx="1" fill="var(--line-strong)" />
        <rect x="16" y="46" width="26" height="3" rx="1" fill="var(--line)" />
        <rect x="16" y="55" width="30" height="3" rx="1" fill="var(--line)" />
        <rect x="16" y="64" width="22" height="3" rx="1" fill="var(--line)" />
      </g>

      {/* Assembling Dashboard Cards & Chart */}
      <g className="web-cards">
        <rect x="70" y="34" width="90" height="42" rx="1" stroke="var(--line)" strokeWidth="1" fill="var(--bg)" />
        <rect x="78" y="40" width="40" height="4" rx="1" fill="var(--line-strong)" />
        <rect x="78" y="48" width="25" height="12" rx="1" fill="var(--line)" />
        <rect x="110" y="48" width="40" height="16" rx="1" stroke="var(--line)" fill="none" />
        <path d="M 112 60 L 122 54 L 132 57 L 146 50" className="web-chart" stroke="var(--red-text)" strokeWidth="1.5" fill="none" />

        {/* Action Button */}
        <rect x="125" y="64" width="30" height="9" rx="1" fill="var(--fg)" />
        <text x="140" y="70.5" fill="var(--bg)" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">COMMIT</text>

        <rect x="168" y="34" width="96" height="88" rx="1" stroke="var(--line)" strokeWidth="1" fill="var(--bg)" />
        <rect x="176" y="42" width="50" height="4" rx="1" fill="var(--line-strong)" />
        <rect x="176" y="52" width="80" height="2" fill="var(--line)" />
        <rect x="176" y="58" width="70" height="2" fill="var(--line)" />
        <rect x="176" y="64" width="75" height="2" fill="var(--line)" />
        <rect x="176" y="70" width="60" height="2" fill="var(--line)" />
        <rect x="176" y="76" width="68" height="2" fill="var(--line)" />
      </g>

      {/* Animated Cursor */}
      <g className="web-cursor">
        <path d="M 0 0 L 8 4 L 4 6 L 6 10 L 4 11 L 2 7 L 0 9 Z" fill="var(--red)" stroke="var(--bg)" strokeWidth="0.8" />
      </g>

      {/* Success Toast Notification */}
      <g className="web-toast">
        <rect x="70" y="86" width="88" height="22" rx="1" stroke="var(--red-text)" strokeWidth="1" fill="var(--surface)" />
        <circle cx="80" cy="97" r="3" fill="var(--ok)" />
        <text x="88" y="96" fill="var(--fg)" fontSize="5.5" fontFamily="monospace" fontWeight="bold">SYSTEM DEPLOYED</text>
        <text x="88" y="102" fill="var(--fg-muted)" fontSize="4" fontFamily="monospace">LATENCY: 42MS [OK]</text>
      </g>
    </svg>
  );
}
