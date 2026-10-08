"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterItem {
  metric: string;
  architecture: string;
  state: string;
  details: string[];
}

interface BeforeAfterSliderProps {
  before?: BeforeAfterItem;
  after?: BeforeAfterItem;
  className?: string;
}

const DEFAULT_BEFORE: BeforeAfterItem = {
  metric: "3,800ms LATENCY",
  architecture: "LEGACY MONOLITH (CLIENT POLLING)",
  state: "HIGH TIMEOUT & ERROR RISK",
  details: [
    "Cascading database timeout locks on concurrent transactions",
    "Client polling every 1,500ms causing server exhaustion",
    "Cryptic modal failure messages with zero recovery state",
    "Manual spreadsheet reconciliation required at close",
  ],
};

const DEFAULT_AFTER: BeforeAfterItem = {
  metric: "82ms ROUND-TRIP",
  architecture: "KRAT.OS EVENT-DRIVEN EDGE ARCHITECTURE",
  state: "ATOMIC SETTLEMENT & 100% RELIABILITY",
  details: [
    "PostgreSQL ledger with optimistic balance concurrency locks",
    "Real-time WebSocket event broadcast with zero polling",
    "Instant inline recovery and automated retry workers",
    "Automated PDF settlement receipts with one-click export",
  ],
};

export function BeforeAfterSlider({
  before = DEFAULT_BEFORE,
  after = DEFAULT_AFTER,
  className,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // non-fatal
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(10, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(90, prev + 5));
    }
  };

  return (
    <div
      className={cn(
        "rounded-[2px] border border-line bg-surface/90 overflow-hidden font-mono select-none",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-surface">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80 hover:bg-red" />
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80" />
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80" />
          </div>
          <span className="text-[11px] text-fg-muted uppercase tracking-mono font-medium">
            architecture_diff.sh [BEFORE vs. AFTER]
          </span>
        </div>
        <div className="text-[10px] text-fg-muted/70 hidden sm:block">
          DRAG BAR OR USE [← / →] KEYS
        </div>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        tabIndex={0}
        role="slider"
        aria-label="Before and after architecture comparison"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={10}
        aria-valuemax={90}
        onKeyDown={handleKeyDown}
        className="relative min-h-[380px] cursor-ew-resize overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-red-text"
      >
        {/* AFTER LAYER (FULL BACKGROUND) */}
        <div className="absolute inset-0 p-6 sm:p-8 bg-surface flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ok" />
              <span className="text-xs font-bold text-fg">[AFTER: KRAT.OS ARCHITECTURE]</span>
            </div>
            <span className="text-xs font-bold text-ok">{after.metric}</span>
          </div>

          <div className="my-6">
            <div className="text-[11px] text-fg-muted uppercase tracking-mono mb-1">
              {after.state}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-fg mb-4">
              {after.architecture}
            </h4>
            <ul className="space-y-2 text-xs text-fg-muted/90">
              {after.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-ok font-bold">[✓]</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-line text-[10px] text-ok flex items-center justify-between">
            <span>VERIFIED IN PRODUCTION</span>
            <span>ERROR_RATE: 0.00%</span>
          </div>
        </div>

        {/* BEFORE LAYER (CLIPPED ON TOP) */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="absolute inset-0 p-6 sm:p-8 bg-bg flex flex-col justify-between border-r border-red"
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red" />
              <span className="text-xs font-bold text-fg">[BEFORE: LEGACY BASELINE]</span>
            </div>
            <span className="text-xs font-bold text-red-text">{before.metric}</span>
          </div>

          <div className="my-6">
            <div className="text-[11px] text-fg-muted uppercase tracking-mono mb-1">
              {before.state}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-fg mb-4">
              {before.architecture}
            </h4>
            <ul className="space-y-2 text-xs text-fg-muted/80">
              {before.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-text font-bold">[✕]</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-line text-[10px] text-red-text flex items-center justify-between">
            <span>UNSTABLE UNDER LOAD</span>
            <span>ERROR_RATE: 4.82%</span>
          </div>
        </div>

        {/* DRAGGABLE SIGNAL RED BAR CARET */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-red -translate-x-1/2 pointer-events-none z-30 flex items-center justify-center"
        >
          <div className="w-7 h-7 rounded-[2px] bg-bg border border-red flex items-center justify-center shadow-lg text-[10px] font-bold text-red-text">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}
