"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  meta: string;
}

const ITEMS: ChecklistItem[] = [
  { id: "01", label: "01_SPEC_LOCKDOWN", meta: "Architecture signed off" },
  { id: "02", label: "02_STAGING_EVERY_FRIDAY", meta: "Live clickable build" },
  { id: "03", label: "03_FIXED_PRICE_AGREEMENT", meta: "Zero unexpected fees" },
  { id: "04", label: "04_100%_CODE_OWNERSHIP", meta: "GitHub & AWS keys transferred" },
];

export function ScopeChecklistScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();

  const [checkedCount, setCheckedCount] = useState(ITEMS.length);

  useEffect(() => {
    if (isOff || !isPlaying) {
      setCheckedCount(ITEMS.length);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % (ITEMS.length + 2);
      setCheckedCount(current);
    }, 1400);

    return () => clearInterval(interval);
  }, [isOff, isPlaying]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-bg/80 border border-line/80 rounded-[2px] p-3 sm:p-4 font-mono text-[11px] sm:text-xs select-none space-y-2.5"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-fg-muted/70 text-[10px] pb-1.5 border-b border-line/60">
        <span>CONTRACT // SCOPE_GUARANTEE</span>
        <span className="text-ok flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-ok shadow-[0_0_6px_var(--ok)]" />
          <span>{Math.min(checkedCount, ITEMS.length)}/{ITEMS.length} VERIFIED</span>
        </span>
      </div>

      <div className="space-y-2">
        {ITEMS.map((item, idx) => {
          const isDone = checkedCount > idx;

          return (
            <div
              key={item.id}
              className={cn(
                "p-2 border rounded-[2px] flex items-center justify-between transition-all duration-200",
                isDone
                  ? "border-line-strong bg-surface/90 text-fg"
                  : "border-line/60 bg-surface/30 text-fg-muted opacity-60"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-4 h-4 rounded-[1px] border flex items-center justify-center text-[10px] transition-colors",
                    isDone
                      ? "border-ok bg-ok/10 text-ok font-bold"
                      : "border-line-strong text-transparent"
                  )}
                >
                  ✓
                </span>
                <span className={cn("font-bold tracking-wide", isDone ? "text-fg" : "text-fg-muted")}>
                  {item.label}
                </span>
              </div>

              <span className="text-[10px] text-fg-muted hidden sm:inline">
                {item.meta}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-1.5 border-t border-line/60 flex items-center justify-between text-[10px] text-fg-muted">
        <span>SCOPE DRIFT: 0.0%</span>
        <span className="text-red-text font-bold">100% TRANSPARENT</span>
      </div>
    </div>
  );
}
