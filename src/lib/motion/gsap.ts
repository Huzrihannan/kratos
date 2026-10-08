"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type Lenis from "lenis";

// Ensure single registration in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Connect Lenis smooth scroll into GSAP's ScrollTrigger system.
 */
export function wireLenisToScrollTrigger(lenis: Lenis) {
  if (typeof window === "undefined" || !lenis) return;

  // Update ScrollTrigger when Lenis scrolls
  lenis.on("scroll", ScrollTrigger.update);

  // Synchronize ticker
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerCallback);
  };
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Strict-mode safe GSAP context hook.
 * Wraps animations in gsap.context() and guarantees complete revert on unmount.
 */
export function useGsapContext(
  animationCallback: (context: gsap.Context) => void,
  scope?: React.RefObject<HTMLElement | null>
) {
  const callbackRef = useRef(animationCallback);
  callbackRef.current = animationCallback;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context((self) => {
      callbackRef.current(self);
    }, scope?.current || undefined);

    return () => {
      ctx.revert();
    };
  }, [scope]);
}

export { gsap, ScrollTrigger };
