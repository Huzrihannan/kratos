"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function SupportScene({ isHovered = false }: { isHovered?: boolean }) {
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
        @keyframes heartbeatWave {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes anomalySpike {
          0%, 25% { opacity: 0; transform: scaleY(0.2); }
          35%, 55% { opacity: 1; transform: scaleY(1); }
          68%, 100% { opacity: 0; transform: scaleY(0.1); }
        }
        @keyframes autoHealGate {
          0%, 45% { opacity: 0; transform: scaleX(0.4); }
          52%, 75% { opacity: 1; transform: scaleX(1); }
          85%, 100% { opacity: 0; }
        }
        @keyframes statusLedShift {
          0%, 30% { fill: var(--ok); }
          35%, 60% { fill: var(--red); }
          70%, 100% { fill: var(--ok); }
        }
        .ecg-path { stroke-dasharray: 400; animation: heartbeatWave ${animDuration} linear infinite; }
        .anomaly-spike { transform-origin: 155px 70px; animation: anomalySpike ${animDuration} ease-in-out infinite; }
        .heal-gate { transform-origin: 155px 70px; animation: autoHealGate ${animDuration} ease-out infinite; }
        .status-led { animation: statusLedShift ${animDuration} steps(1) infinite; }
        ${!isPlaying || isOff ? "svg * { animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important; transform: none !important; }" : ""}
      `}</style>

      {/* Monitor Outer Chrome */}
      <rect x="20" y="16" width="240" height="108" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
      {/* Top Telemetry Header */}
      <line x1="20" y1="32" x2="260" y2="32" stroke="var(--line)" strokeWidth="1" />
      <text x="30" y="27" fill="var(--fg-muted)" fontSize="4.5" fontFamily="monospace">HEARTBEAT // TELEMETRY</text>

      {/* Status LED & Badge */}
      <circle cx="245" cy="24" r="3.5" className="status-led" fill="var(--ok)" />

      {/* Oscilloscope Grid */}
      <g opacity="0.25">
        <line x1="30" y1="50" x2="250" y2="50" stroke="var(--line)" strokeDasharray="2 2" />
        <line x1="30" y1="70" x2="250" y2="70" stroke="var(--line-strong)" />
        <line x1="30" y1="90" x2="250" y2="90" stroke="var(--line)" strokeDasharray="2 2" />
        <line x1="75" y1="38" x2="75" y2="114" stroke="var(--line)" strokeDasharray="2 2" />
        <line x1="125" y1="38" x2="125" y2="114" stroke="var(--line)" strokeDasharray="2 2" />
        <line x1="175" y1="38" x2="175" y2="114" stroke="var(--line)" strokeDasharray="2 2" />
        <line x1="225" y1="38" x2="225" y2="114" stroke="var(--line)" strokeDasharray="2 2" />
      </g>

      {/* Nominal Heartbeat Line */}
      <path
        d="M 30 70 L 70 70 L 78 58 L 86 82 L 94 70 L 130 70 L 138 60 L 146 80 L 154 70 L 195 70 L 203 62 L 211 78 L 219 70 L 250 70"
        stroke="var(--fg-muted)"
        strokeWidth="1.5"
        fill="none"
        className="ecg-path"
      />

      {/* Red Anomaly Spike */}
      <g className="anomaly-spike">
        <path
          d="M 146 70 L 151 36 L 157 104 L 163 70"
          stroke="var(--red)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="151" cy="36" r="3" fill="var(--red)" />
      </g>

      {/* Auto-Heal Shield Gate (catches and suppresses spike) */}
      <g className="heal-gate">
        <rect x="140" y="42" width="30" height="56" rx="2" fill="var(--ok)" opacity="0.15" stroke="var(--ok)" strokeWidth="1" />
        <line x1="140" y1="70" x2="170" y2="70" stroke="var(--ok)" strokeWidth="1.5" />
        <text x="155" y="108" fill="var(--ok)" fontSize="4" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AUTO_HEAL</text>
      </g>

      {/* Bottom Telemetry Footer */}
      <line x1="20" y1="110" x2="260" y2="110" stroke="var(--line)" strokeWidth="1" />
      <text x="30" y="118" fill="var(--fg-muted)" fontSize="4" fontFamily="monospace">STATUS: NOMINAL</text>
      <text x="250" y="118" fill="var(--fg-muted)" fontSize="4" fontFamily="monospace" textAnchor="end">LATENCY: &lt;12MS</text>
    </svg>
  );
}
