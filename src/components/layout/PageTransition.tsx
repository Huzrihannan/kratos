'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useTheme } from '@/themes/ThemeProvider';

export function PageTransition() {
  const pathname = usePathname();
  const { theme } = useTheme();
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

    // Phase 1: Covered at 320ms -> scroll to top & transfer focus
    const timerCover = setTimeout(() => {
      setStage('uncovering');
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

  // 1. Dream Theme: Soft Layered Cloud Wipe
  if (theme === 'dream') {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
        aria-hidden="true"
      >
        <div
          className={`absolute inset-y-0 w-[120vw] -left-[10vw] transition-transform duration-[340ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-stretch ${
            stage === 'idle' ? 'transition-none -translate-x-full' : ''
          }`}
          style={{
            transform:
              stage === 'covering'
                ? 'translateX(0%)'
                : stage === 'uncovering'
                ? 'translateX(100%)'
                : 'translateX(-100%)',
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-r from-[#6DB6F0] via-[#B4DDF7] to-[#FFF0D4] flex items-center justify-center shadow-xl">
            {/* Fluffy SVG cloud edge */}
            <div className="absolute inset-0 opacity-80 flex items-center justify-around pointer-events-none">
              <svg className="w-64 h-64 fill-white" viewBox="0 0 200 150">
                <circle cx="60" cy="90" r="45" />
                <circle cx="105" cy="70" r="50" />
                <circle cx="145" cy="90" r="40" />
              </svg>
              <svg className="w-72 h-72 fill-[#FFFAF0]" viewBox="0 0 200 150">
                <circle cx="50" cy="85" r="40" />
                <circle cx="100" cy="65" r="55" />
                <circle cx="150" cy="85" r="42" />
              </svg>
            </div>
            <div className="relative z-10 flex items-center gap-3 font-serif text-lg text-[#2B2A52]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FD142B] inline-block animate-ping" />
              <span className="font-semibold tracking-wide">
                {pathname === '/' ? 'Home' : pathname.replace('/', '').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Dark & Light Themes: Technical Red Bar Sweep
  const routeLabel = pathname === '/' ? '~/' : `~${pathname}`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
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
