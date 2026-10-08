"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface WipeProps {
  children: React.ReactNode;
  trigger?: boolean;
  delay?: number;
  duration?: number; // ms or seconds
  direction?: "right" | "left" | "down" | "up";
  className?: string;
}

export function Wipe({
  children,
  trigger = true,
  delay = 0,
  duration = 650,
  direction = "right",
  className = "",
}: WipeProps) {
  const effectiveDuration = duration < 10 ? duration * 1000 : duration;
  const { isOff } = useMotionLevel();
  const [unmasked, setUnmasked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOff) {
      setUnmasked(true);
      return;
    }

    if (trigger) {
      const timeout = setTimeout(() => {
        setUnmasked(true);
      }, Math.max(50, delay));
      return () => clearTimeout(timeout);
    }
  }, [trigger, isOff, delay]);

  const initialClip =
    direction === "left"
      ? "inset(0% 0% 0% 100%)"
      : direction === "down"
      ? "inset(0% 0% 100% 0%)"
      : direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : "inset(0% 100% 0% 0%)";

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none", className)}
    >
      {/* Content with mechanical clip-path unmask */}
      <div
        className="w-full h-full transition-[clip-path] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          clipPath: unmasked || isOff ? "inset(0% 0% 0% 0%)" : initialClip,
          transitionDuration: `${effectiveDuration}ms`,
        }}
      >
        {children}
      </div>

      {/* Red Leading Edge Wipe Bar */}
      {!isOff && (
        <span
          className="absolute top-0 bottom-0 w-[4px] bg-red pointer-events-none transition-[left,opacity] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            left: unmasked ? "100%" : "0%",
            opacity: unmasked ? 0 : 1,
            transitionDuration: `${effectiveDuration}ms`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
