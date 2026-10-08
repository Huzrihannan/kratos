"use client";

import { useEffect, useState } from "react";

export interface UseInViewPlaybackOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook to pause animations, rAF loops, or WebGL canvases when the target element
 * is scrolled off-screen or the browser tab is hidden/backgrounded.
 */
export function useInViewPlayback(
  targetRef: React.RefObject<HTMLElement | null>,
  options: UseInViewPlaybackOptions = {}
): boolean {
  const { threshold = 0.05, rootMargin = "100px" } = options;
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // 1. Observe intersection
  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, threshold, rootMargin]);

  // 2. Observe tab visibility
  useEffect(() => {
    if (typeof document === "undefined") return;

    function handleVisibilityChange() {
      setIsTabVisible(!document.hidden);
    }

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isInView && isTabVisible;
}
