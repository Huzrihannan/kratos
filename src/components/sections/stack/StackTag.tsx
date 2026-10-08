"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

interface StackTagProps {
  name: string;
  category: string;
  tag: string;
}

const SCRAMBLE_CHARS = "_/\\#01+-";

export function StackTag({ name, category, tag }: StackTagProps) {
  const { isOff } = useMotionLevel();
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(name);
  const animFrameRef = useRef<number | null>(null);

  const targetCategory = `[${category.toUpperCase()}]`;

  useEffect(() => {
    if (isOff) {
      setDisplayText(isHovered ? targetCategory : name);
      return;
    }

    const target = isHovered ? targetCategory : name;
    let iteration = 0;
    const maxIterations = target.length;
    const totalFrames = 10;
    let currentFrame = 0;

    const tick = () => {
      currentFrame++;
      iteration = Math.floor((currentFrame / totalFrames) * maxIterations);

      const scrambled = target
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return target[index];
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (currentFrame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(target);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, isOff, name, targetCategory]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group/tag inline-flex items-center gap-2.5 px-4 py-2 border rounded-[2px] font-mono text-xs sm:text-sm tracking-wide transition-all duration-200 select-none cursor-crosshair",
        isHovered
          ? "border-line-strong bg-surface text-fg shadow-sm"
          : "border-line/70 bg-surface/70 text-fg hover:border-line-strong"
      )}
    >
      {/* Tiny Status Indicator */}
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full transition-colors duration-200",
          isHovered ? "bg-red shadow-[0_0_6px_var(--red)]" : "bg-line-strong"
        )}
        aria-hidden="true"
      />

      {/* Scrambling Text */}
      <span className={cn("font-bold transition-colors", isHovered && "text-red-text")}>
        {displayText}
      </span>

      {/* Sub-tag description */}
      <span
        className={cn(
          "text-[10px] uppercase tracking-wider text-fg-muted/70 transition-opacity",
          isHovered ? "opacity-90 text-fg-muted" : "opacity-60"
        )}
      >
        {tag}
      </span>
    </div>
  );
}
