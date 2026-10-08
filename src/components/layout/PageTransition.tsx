'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export function PageTransition() {
  const pathname = usePathname();
  const { isLite, isOff } = useMotionLevel();
  const initialLoadRef = useRef(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stage, setStage] = useState<'idle' | 'covering' | 'uncovering'>('idle');

  useEffect(() => {
    // Skip on initial page mount
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    if (isLite || isOff) {
      // Natural instant transition
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
      return;
    }

    setIsTransitioning(true);
    setStage('covering');

    // Phase 1: Covered at 280ms
    const timerCover = setTimeout(() => {
      setStage('uncovering');
      // Scroll to top and shift focus to main
      window.scrollTo(0, 0);
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    }, 320);

    // Phase 2: Fully uncovered by 700ms
    const timerEnd = setTimeout(() => {
      setIsTransitioning(false);
      setStage('idle');
    }, 700);

    return () => {
      clearTimeout(timerCover);
      clearTimeout(timerEnd);
    };
  }, [pathname, isLite, isOff]);

  if (isLite || isOff || !isTransitioning) {
    return null;
  }

  const routeLabel = pathname === '/' ? '~/' : `~${pathname}`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Red Leading Edge Bar Sweep */}
      <div
        className="absolute inset-y-0 w-full bg-bg border-l-4 border-red transition-all duration-[340ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-center justify-center"
        style={{
          transform:
            stage === 'covering'
              ? 'translateX(0%)'
              : stage === 'uncovering'
              ? 'translateX(100%)'
              : 'translateX(-100%)',
        }}
      >
        <div className="flex items-center gap-3 font-mono text-xl sm:text-2xl font-bold uppercase tracking-wider text-fg">
          <span className="h-6 w-1 bg-red" />
          <span className="text-red-text">{routeLabel}</span>
        </div>
      </div>
    </div>
  );
}
