"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface TapeProps {
  items: string[];
  separator?: string;
  speed?: number; // base duration in seconds
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Tape({
  items,
  separator = "///",
  speed = 28,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: TapeProps) {
  const { isOff } = useMotionLevel();
  const [velocityFactor, setVelocityFactor] = useState(1);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  // Velocity boost on scroll
  useEffect(() => {
    if (isOff || typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    function handleScroll() {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY.current);
      const deltaTime = Math.max(now - lastScrollTime.current, 16);

      const velocity = deltaY / deltaTime; // pixels per ms
      const factor = Math.min(1 + velocity * 1.5, 3.5);
      setVelocityFactor(factor);

      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVelocityFactor(1);
      }, 150);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isOff]);

  const animationDuration = `${Math.max(speed / velocityFactor, 6)}s`;

  // Render duplicated content for seamless infinite marquee loop
  const content = items.map((item, idx) => (
    <span key={idx} className="inline-flex items-center gap-4 px-3 shrink-0">
      <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.08em] font-medium text-fg">
        {item}
      </span>
      <span className="font-mono text-xs text-red-text/80 select-none" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden border-y border-line bg-surface/70 py-2.5 sm:py-3 select-none",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center will-change-transform",
          !isOff &&
            (direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"),
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: isOff ? "0s" : animationDuration,
        }}
      >
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
