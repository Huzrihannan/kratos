"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { cn } from "@/lib/utils";

export function ChatStreamScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOff || !isPlaying) {
      setStep(3); // Final complete state
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2200);

    return () => clearInterval(interval);
  }, [isOff, isPlaying]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-bg/80 border border-line/80 rounded-[2px] p-3 sm:p-4 font-mono text-[11px] sm:text-xs select-none space-y-3"
      aria-hidden="true"
    >
      {/* Client Message */}
      <div
        className={cn(
          "flex flex-col gap-1 transition-opacity duration-300",
          step >= 0 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center justify-between text-fg-muted/70 text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            <span>FOUNDER // CLIENT</span>
          </span>
          <span>10:14:02 AM</span>
        </div>
        <div className="p-2 sm:p-2.5 bg-surface border border-line rounded-[2px] text-fg">
          Can we handle 50,000 concurrent WebSocket sessions without downtime?
        </div>
      </div>

      {/* Engineer Typing indicator or Response */}
      <div
        className={cn(
          "flex flex-col gap-1 transition-all duration-300",
          step >= 1 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center justify-between text-fg-muted/70 text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ok shadow-[0_0_6px_var(--ok)]" />
            <span className="text-fg font-bold">LEAD_ENGINEER // KRAT.OS</span>
          </span>
          <span>10:14:28 AM</span>
        </div>

        {step === 1 ? (
          <div className="p-2 sm:p-2.5 bg-surface/90 border border-line rounded-[2px] text-fg-muted flex items-center gap-1.5">
            <span>engineer is typing</span>
            <span className="animate-pulse">...</span>
          </div>
        ) : (
          <div className="p-2 sm:p-2.5 bg-surface/90 border border-line-strong rounded-[2px] text-fg space-y-1">
            <p>
              Yes. Redis Pub/Sub cluster + connection pooling deployed on staging.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[10px] text-ok">
              <span>✓ P99 latency verified: 34ms</span>
              <span className="text-fg-muted">•</span>
              <span className="text-fg-muted">zero queue lag [ok]</span>
            </div>
          </div>
        )}
      </div>

      {/* Direct Comms Channel Footer */}
      <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[10px] text-fg-muted">
        <span className="text-red-text font-bold">#direct-engineering-room</span>
        <span>ZERO MIDDLEMEN</span>
      </div>
    </div>
  );
}
