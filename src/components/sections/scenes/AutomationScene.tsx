"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export function AutomationScene({ isHovered = false }: { isHovered?: boolean }) {
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
        @keyframes aiThinkingPulse {
          0%, 30% { transform: scale(1); opacity: 0.9; }
          45%, 65% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 6px var(--red)); }
          80%, 100% { transform: scale(1); opacity: 0.9; }
        }
        @keyframes aiPacketFlow1 {
          0% { transform: translate(40px, 70px); opacity: 0; }
          15% { opacity: 1; }
          40% { transform: translate(110px, 42px); opacity: 1; }
          45%, 100% { opacity: 0; }
        }
        @keyframes aiPacketFlow2 {
          0% { transform: translate(40px, 70px); opacity: 0; }
          15% { opacity: 1; }
          40% { transform: translate(110px, 98px); opacity: 1; }
          45%, 100% { opacity: 0; }
        }
        @keyframes aiPacketToCore {
          0%, 40% { opacity: 0; }
          45% { transform: translate(110px, 42px); opacity: 1; }
          65% { transform: translate(175px, 70px); opacity: 1; }
          70%, 100% { opacity: 0; }
        }
        @keyframes aiOutputCheck {
          0%, 68% { opacity: 0; transform: scale(0.6); }
          78%, 95% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; }
        }
        .ai-core-node { transform-origin: 175px 70px; animation: aiThinkingPulse ${animDuration} ease-in-out infinite; }
        .ai-packet-1 { animation: aiPacketFlow1 ${animDuration} linear infinite; }
        .ai-packet-2 { animation: aiPacketFlow2 ${animDuration} linear infinite; }
        .ai-packet-core { animation: aiPacketToCore ${animDuration} linear infinite; }
        .ai-check { transform-origin: 242px 70px; animation: aiOutputCheck ${animDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        ${!isPlaying || isOff ? "svg * { animation: none !important; transform: none !important; opacity: 1 !important; filter: none !important; }" : ""}
      `}</style>

      {/* Grid Registration Marks */}
      <circle cx="140" cy="20" r="1" fill="var(--line-strong)" />
      <circle cx="140" cy="120" r="1" fill="var(--line-strong)" />

      {/* Edge Lines */}
      <path d="M 40 70 L 110 42 L 175 70" stroke="var(--line)" strokeWidth="1.2" />
      <path d="M 40 70 L 110 98 L 175 70" stroke="var(--line)" strokeWidth="1.2" />
      <path d="M 175 70 L 242 70" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* NODE 1: Ingestion */}
      <rect x="22" y="55" width="36" height="30" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
      <text x="40" y="68" fill="var(--fg)" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">INPUT</text>
      <text x="40" y="76" fill="var(--fg-muted)" fontSize="3.5" fontFamily="monospace" textAnchor="middle">STREAM</text>

      {/* NODE 2A: Transformer */}
      <rect x="94" y="28" width="32" height="28" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
      <text x="110" y="44" fill="var(--fg-muted)" fontSize="4" fontFamily="monospace" textAnchor="middle">FILTER</text>

      {/* NODE 2B: Queue */}
      <rect x="94" y="84" width="32" height="28" rx="2" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
      <text x="110" y="100" fill="var(--fg-muted)" fontSize="4" fontFamily="monospace" textAnchor="middle">QUEUE</text>

      {/* NODE 3: AI Inference Core (Pulsing) */}
      <g className="ai-core-node">
        <rect x="156" y="52" width="38" height="36" rx="2" fill="var(--surface)" stroke="var(--red)" strokeWidth="1.5" />
        <text x="175" y="68" fill="var(--red-text)" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">INFER</text>
        <circle cx="175" cy="78" r="2" fill="var(--red)" />
      </g>

      {/* NODE 4: Execution Output (Ticks a Check) */}
      <rect x="224" y="55" width="36" height="30" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
      <text x="242" y="66" fill="var(--fg)" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OUTPUT</text>
      <g className="ai-check">
        <circle cx="242" cy="75" r="4.5" fill="var(--ok)" />
        <path d="M 239.5 75 L 241.5 77 L 244.5 73" stroke="var(--bg)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Flowing Packets */}
      <circle cx="0" cy="0" r="2.5" fill="var(--fg)" className="ai-packet-1" />
      <circle cx="0" cy="0" r="2.5" fill="var(--fg)" className="ai-packet-2" />
      <circle cx="0" cy="0" r="3" fill="var(--red)" className="ai-packet-core" />
    </svg>
  );
}
