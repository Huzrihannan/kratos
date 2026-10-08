"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface DecodeProps {
  text: string;
  trigger?: boolean;
  onComplete?: () => void;
  className?: string;
  speed?: number; // ms per scramble step
  as?: React.ElementType;
}

const GLYPHS = ["_", "/", "\\", "#", "0", "1", "X", "*", "+", "-", "<", ">"];

export function Decode({
  text,
  trigger = true,
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

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, trigger, inView, isOff, speed, onComplete]);

  return (
    <Component
      ref={elementRef as unknown as React.Ref<HTMLElement>}
      className={className}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </Component>
  );
}
