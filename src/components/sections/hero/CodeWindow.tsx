"use client";

import React from "react";
import { Window } from "@/components/ui/Window";

export interface CodeWindowProps {
  draggable?: boolean;
  dragConstraints?: React.RefObject<Element | null> | { top?: number; left?: number; right?: number; bottom?: number };
  zIndex?: number;
  onBringToFront?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CodeWindow({
  draggable = false,
  dragConstraints,
  zIndex,
  onBringToFront,
  className = "",
  style,
}: CodeWindowProps) {
  return (
    <Window
      title="module_02.engine.ts"
      statusText="[SYNC]"
      cornerBrackets={true}
      draggable={draggable}
      dragConstraints={dragConstraints}
      zIndex={zIndex}
      onBringToFront={onBringToFront}
      className={className}
      style={style}
    >
      <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-fg-muted select-none">
        <div className="flex gap-2">
          {/* Line Numbers */}
          <div className="flex flex-col text-fg-muted/30 select-none text-right pr-2 border-r border-line/60">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
          </div>

          {/* Syntax Code Body */}
          <div className="flex flex-col overflow-x-hidden">
            <div>
              <span className="text-fg-muted/50 italic">{"// krat_os/engine.ts"}</span>
            </div>
            <div>
              <span className="text-red-text font-bold">export async function </span>
              <span className="text-fg font-semibold">runPipeline</span>
              <span className="text-fg-muted">(</span>
            </div>
            <div className="pl-3">
              <span className="text-fg">spec</span>
              <span className="text-fg-muted">: </span>
              <span className="text-red-text">SystemSpec</span>
            </div>
            <div>
              <span className="text-fg-muted">): </span>
              <span className="text-fg">Promise</span>
              <span className="text-fg-muted">&lt;</span>
              <span className="text-red-text">Result</span>
              <span className="text-fg-muted">&gt; &#123;</span>
            </div>
            <div className="pl-3">
              <span className="text-red-text font-bold">const </span>
              <span className="text-fg">sys </span>
              <span className="text-fg-muted">= </span>
              <span className="text-red-text font-bold">await </span>
              <span className="text-fg">mountKernel</span>
              <span className="text-fg-muted">(spec);</span>
            </div>
            <div className="pl-3">
              <span className="text-red-text font-bold">return </span>
              <span className="text-fg">sys.deploy</span>
              <span className="text-fg-muted">();</span>
            </div>
            <div>
              <span className="text-fg-muted">&#125;</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
