"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface DecodeProps {
  text: string;
  trigger?: boolean;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  speed?: number; // ms per scramble step
  as?: React.ElementType;
}

const GLYPHS = ["_", "/", "\\", "#", "0", "1", "X", "*", "+", "-", "<", ">"];

export function Decode({
  text,
  trigger = true,
  delay = 0,
  onComplete,
  className = "",
  speed = 36,
  as: Component = "span",
}: DecodeProps) {
  const { isOff } = useMotionLevel();
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const frameRef = useRef<number | null>(null);

  // Intersection observer to auto-trigger when scrolled into view
  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOff || !trigger || !inView) {
      setDisplayText(text);
      return;
    }

    let currentStep = 0;
    const totalLength = text.length;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (time - lastTime >= speed) {
        lastTime = time;
        currentStep++;

        const settledCount = Math.max(0, currentStep - 6);
        let result = "";

        for (let i = 0; i < totalLength; i++) {
          if (text[i] === " " || text[i] === "\n") {
            result += text[i];
          } else if (i < settledCount) {
            result += text[i];
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (settledCount >= totalLength) {
          setDisplayText(text);
          onComplete?.();
          return;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    let delayTimer: NodeJS.Timeout | null = null;
    if (delay > 0) {
      delayTimer = setTimeout(() => {
        frameRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, trigger, inView, isOff, speed, delay, onComplete]);

  return (
    <Component
      ref={elementRef as unknown as React.Ref<HTMLElement>}
      className={cn("relative inline-block overflow-hidden align-baseline", className)}
    >
      <span className="sr-only">{text}</span>
      {/* Invisible layout placeholder reserves exact bounding box and line breaks */}
      <span className="invisible select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>
      {/* Absolute overlay renders animated scrambled text without affecting layout */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {displayText}
      </span>
    </Component>
  );
}
