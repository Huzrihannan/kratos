"use client";

import React, { useState } from "react";
import { Window } from "@/components/ui/Window";
import { TypeLines, TerminalLine } from "@/components/fx/TypeLines";
import { useMotionLevel } from "@/lib/motion/MotionContext";

const PROJECT_SEQUENCES: { type: string; lines: TerminalLine[] }[] = [
  {
    type: "web-app",
    lines: [
      { prompt: "$", text: "krat new web-app", delay: 280 },
      { prompt: "→", text: "scaffold", progressBar: true, delay: 180 },
      { prompt: "→", text: "design system", progressBar: true, delay: 180 },
      { prompt: "→", text: "build", progressBar: true, delay: 180 },
      { prompt: "→", text: "deploy", progressBar: true, delay: 180 },
      { prompt: "✓", text: "web-app deployed [ready]", status: "ok", delay: 1200 },
    ],
  },
  {
    type: "mobile-app",
    lines: [
      { prompt: "$", text: "krat new mobile-app", delay: 280 },
      { prompt: "→", text: "scaffold", progressBar: true, delay: 180 },
      { prompt: "→", text: "design system", progressBar: true, delay: 180 },
      { prompt: "→", text: "build", progressBar: true, delay: 180 },
      { prompt: "→", text: "deploy", progressBar: true, delay: 180 },
      { prompt: "✓", text: "mobile-app binary built [ready]", status: "ok", delay: 1200 },
    ],
  },
  {
    type: "automation",
    lines: [
      { prompt: "$", text: "krat new automation", delay: 280 },
      { prompt: "→", text: "scaffold", progressBar: true, delay: 180 },
      { prompt: "→", text: "design system", progressBar: true, delay: 180 },
      { prompt: "→", text: "build", progressBar: true, delay: 180 },
      { prompt: "→", text: "deploy", progressBar: true, delay: 180 },
      { prompt: "✓", text: "pipeline operational [ready]", status: "ok", delay: 1200 },
    ],
  },
];

export interface TerminalWindowProps {
  draggable?: boolean;
  dragConstraints?: React.RefObject<Element | null> | { top?: number; left?: number; right?: number; bottom?: number };
  zIndex?: number;
  onBringToFront?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function TerminalWindow({
  draggable = false,
  dragConstraints,
  zIndex,
  onBringToFront,
  className = "",
  style,
}: TerminalWindowProps) {
  const { isOff } = useMotionLevel();
  const [seqIdx, setSeqIdx] = useState(0);

  const handleSequenceComplete = () => {
    if (isOff) return;
    setSeqIdx((prev) => (prev + 1) % PROJECT_SEQUENCES.length);
  };

  const currentSequence = PROJECT_SEQUENCES[seqIdx];

  return (
    <Window
      title="krat_os.terminal // v2.0"
      cornerBrackets={true}
      draggable={draggable}
      dragConstraints={dragConstraints}
      zIndex={zIndex}
      onBringToFront={onBringToFront}
      className={className}
      style={style}
      headerRight={
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ok uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
          <span>ACTIVE</span>
        </span>
      }
    >
      <div className="flex flex-col gap-2 min-h-[170px] sm:min-h-[185px]">
        {/* Subsystem Header */}
        <div className="flex items-center justify-between pb-2 border-b border-line text-[11px] font-mono text-fg-muted uppercase tracking-wider">
          <span>ENV: PRODUCTION</span>
          <span className="text-fg-muted/80">TARGET: {currentSequence.type}</span>
        </div>

        {/* Live Typing & Progress Bars */}
        <TypeLines
          key={currentSequence.type}
          lines={currentSequence.lines}
          onComplete={handleSequenceComplete}
          className="py-1"
        />
      </div>
    </Window>
  );
}
