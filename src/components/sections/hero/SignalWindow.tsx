"use client";

import React from "react";
import { Window } from "@/components/ui/Window";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface SignalWindowProps {
  draggable?: boolean;
  dragConstraints?: React.RefObject<Element | null> | { top?: number; left?: number; right?: number; bottom?: number };
  zIndex?: number;
  onBringToFront?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SignalWindow({
  draggable = false,
  dragConstraints,
  zIndex,
  onBringToFront,
  className = "",
  style,
}: SignalWindowProps) {
  const { isOff } = useMotionLevel();

  return (
    <Window
      title="module_03.signal"
      statusText="[CARRIER]"
      cornerBrackets={true}
      draggable={draggable}
      dragConstraints={dragConstraints}
      zIndex={zIndex}
      onBringToFront={onBringToFront}
      className={className}
      style={style}
    >
      <div className="flex flex-col gap-2 select-none">
        {/* Signal Meta */}
        <div className="flex items-center justify-between text-[10px] font-mono text-fg-muted uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
            <span>CHANNEL: 01</span>
          </span>
          <span>MODULATION: SYNC</span>
        </div>

        {/* Abstract Waveform SVG with Grid */}
        <div className="relative h-16 w-full overflow-hidden border border-line bg-surface/50">
          {/* Subtle Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
            aria-hidden="true"
          />

          {/* Animated Waveform */}
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 240 64"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Center Reference Line */}
            <line
              x1="0"
              y1="32"
              x2="240"
              y2="32"
              stroke="var(--line)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />

            {/* Carrier Wave */}
            <path
              d="M 0 32 Q 20 12, 40 32 T 80 32 T 120 32 T 160 32 T 200 32 T 240 32"
              fill="none"
              stroke="var(--fg-muted)"
              strokeWidth="1.2"
              className={isOff ? "" : "opacity-40"}
            />

            {/* Signal Wave */}
            <path
              d="M 0 32 C 30 8, 45 56, 75 32 C 105 8, 120 56, 150 32 C 180 8, 195 56, 225 32 L 240 32"
              fill="none"
              stroke="var(--red-text)"
              strokeWidth="1.8"
            />

            {/* Active Carrier Beacon LED */}
            {!isOff && (
              <circle
                cx="150"
                cy="32"
                r="3.5"
                fill="var(--red)"
                className="animate-ping origin-center"
              />
            )}
            <circle
              cx="150"
              cy="32"
              r="2.5"
              fill="var(--red)"
            />
          </svg>
        </div>

        {/* Status Line */}
        <div className="flex items-center justify-between text-[9px] font-mono text-fg-muted/60 uppercase tracking-widest pt-0.5">
          <span>TX: STABLE</span>
          <span>RX: VERIFIED</span>
        </div>
      </div>
    </Window>
  );
}
