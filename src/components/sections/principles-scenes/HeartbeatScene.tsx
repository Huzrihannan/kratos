"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function HeartbeatScene() {
  const containerRef = useRef<SVGSVGElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();

  return (
    <div className="w-full bg-bg/80 border border-line/80 rounded-[2px] p-3 sm:p-4 font-mono text-[11px] sm:text-xs select-none space-y-2.5">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between text-fg-muted/70 text-[10px] pb-1.5 border-b border-line/60">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-ok animate-pulse shadow-[0_0_8px_var(--ok)]" />
          <span className="text-fg font-bold">TELEMETRY: RUNTIME_PULSE</span>
        </span>
        <span className="text-ok font-bold">99.99% OPERATIONAL</span>
      </div>

      {/* Heartbeat SVG Waveform Canvas */}
      <div className="relative w-full h-24 bg-surface/50 border border-line/60 rounded-[2px] overflow-hidden flex items-center">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <svg
          ref={containerRef}
          viewBox="0 0 400 80"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <style>{`
            @keyframes heartbeatScan {
              0% { stroke-dashoffset: 400; }
              100% { stroke-dashoffset: 0; }
            }
            .heartbeat-path {
              stroke-dasharray: 400;
              stroke-dashoffset: 0;
              animation: ${isPlaying && !isOff ? "heartbeatScan 3.2s linear infinite" : "none"};
            }
          `}</style>

          {/* Reference Center Baseline */}
          <line
            x1="0"
            y1="40"
            x2="400"
            y2="40"
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Heartbeat Waveform Line */}
          <path
            className="heartbeat-path"
            d="M 0 40 L 80 40 L 95 40 L 105 20 L 115 65 L 125 10 L 135 55 L 145 40 L 200 40 L 215 40 L 225 22 L 235 62 L 245 12 L 255 52 L 265 40 L 330 40 L 340 25 L 350 55 L 360 40 L 400 40"
            stroke="var(--ok)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Faint Shadow Glow Waveform */}
          <path
            className="heartbeat-path"
            d="M 0 40 L 80 40 L 95 40 L 105 20 L 115 65 L 125 10 L 135 55 L 145 40 L 200 40 L 215 40 L 225 22 L 235 62 L 245 12 L 255 52 L 265 40 L 330 40 L 340 25 L 350 55 L 360 40 L 400 40"
            stroke="var(--ok)"
            strokeWidth="6"
            strokeOpacity="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Live scanning pulse dot */}
        <div className="absolute right-3 top-2 px-2 py-0.5 bg-bg/90 border border-ok/40 rounded-[2px] text-[9px] text-ok font-mono">
          HEARTBEAT: ACTIVE
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="pt-1.5 border-t border-line/60 flex items-center justify-between text-[10px] text-fg-muted">
        <span>30-DAY BUG WARRANTY INCLUDED</span>
        <span className="text-ok font-bold">P99 SLA GUARANTEED</span>
      </div>
    </div>
  );
}
