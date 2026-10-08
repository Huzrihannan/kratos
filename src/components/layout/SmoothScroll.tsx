"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { wireLenisToScrollTrigger } from "@/lib/motion/gsap";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOff } = useMotionLevel();

  useEffect(() => {
    // Respect prefers-reduced-motion, motion level off, or touch devices (native momentum scroll is faster)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch || isOff) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Synchronize Lenis with GSAP ScrollTrigger ticker and updates
    const cleanupTicker = wireLenisToScrollTrigger(lenis);

    return () => {
      cleanupTicker?.();
      lenis.destroy();
    };
  }, [isOff]);

  return <>{children}</>;
};
