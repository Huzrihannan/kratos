"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  speed = 35,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex flex-wrap gap-3 overflow-x-auto py-2", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex overflow-hidden select-none w-full",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => pauseOnHover && setIsPaused(true)}
      onBlur={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-cream to-transparent" />

      {/* Marquee Track Duplicated for continuous loop */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 py-2",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          isPaused && "[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden="false"
      >
        {children}
      </div>

      <div
        className={cn(
          "flex shrink-0 items-center gap-4 py-2",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          isPaused && "[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
