"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function PageTransition() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const initialLoadRef = useRef(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Skip animation on initial page mount
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [pathname, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <div
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          aria-hidden="true"
        >
          {/* Pill-shaped orange mask sweep */}
          <motion.div
            initial={{ x: "105%", skewX: -6 }}
            animate={{
              x: ["105%", "0%", "-105%"],
              skewX: [-6, 0, 6],
            }}
            transition={{
              duration: 0.52,
              times: [0, 0.48, 1],
              ease: [0.65, 0, 0.35, 1],
            }}
            className="absolute inset-y-0 -left-[10vw] -right-[10vw] bg-orange rounded-[9999px] shadow-2xl"
          >
            {/* Inner bubbly gloss highlight */}
            <div className="absolute inset-x-12 top-6 h-6 rounded-full bg-peach/40 blur-[2px]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
