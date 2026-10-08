'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface BootProps {
  force?: boolean; // For previewing in design lab
  onComplete?: () => void;
}

export function Boot({ force = false, onComplete }: BootProps) {
  const { isLite, isOff } = useMotionLevel();
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const dismiss = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    setExiting(true);
    try {
      sessionStorage.setItem('krat_os_booted', 'true');
    } catch {
      // Ignore private mode
    }
    const endTimeout = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, 280);
    timeoutRefs.current.push(endTimeout);
  }, [onComplete]);

  useEffect(() => {
    // Skip if lite or off motion, mobile screen, or already booted
    if (
      !force &&
      (isLite ||
        isOff ||
        (typeof window !== 'undefined' &&
          (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)))
    ) {
      setActive(false);
      return;
    }

    try {
      const alreadyBooted = sessionStorage.getItem('krat_os_booted');
      if (alreadyBooted && !force) {
        return;
      }
    } catch {
      // Ignore
    }

    setActive(true);

    const titleFull = 'Krat.OS';
    let charIdx = 0;

    // Typing Krat.OS
    const typeInterval = setInterval(() => {
      if (charIdx <= titleFull.length) {
        setTypedTitle(titleFull.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
      }
    }, 45);

    // Schedule log lines
    const t1 = setTimeout(() => setLogIndex(1), 500);
    const t2 = setTimeout(() => setLogIndex(2), 750);
    const t3 = setTimeout(() => setLogIndex(3), 1000);
    // Expand & wipe away by 1.4s (well under 1.6s budget)
    const tEnd = setTimeout(() => dismiss(), 1400);

    timeoutRefs.current.push(t1, t2, t3, tEnd);

    // Any key or pointer down skips immediately
    const handleSkip = () => dismiss();
    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('pointerdown', handleSkip, { once: true });

    const timeouts = timeoutRefs.current;

    return () => {
      clearInterval(typeInterval);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('pointerdown', handleSkip);
    };
  }, [isLite, isOff, force, dismiss]);

  if (!active) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto'
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-start gap-4 p-5 sm:p-8 border border-line bg-surface max-w-[calc(100vw-32px)] sm:max-w-sm w-full shadow-2xl">
        {/* Brand Bar & Typing Wordmark */}
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 bg-red shrink-0 animate-pulse" />
          <span className="font-mono text-xl font-extrabold uppercase tracking-tight text-fg">
            {typedTitle}
          </span>
        </div>

        {/* System Diagnostics Tick Stream */}
        <div className="flex flex-col gap-1 font-mono text-xs text-fg-muted mt-2 w-full">
          {logIndex >= 1 && (
            <div className="flex items-center gap-2 text-ok transition-opacity duration-150">
              <span>[ ok ]</span>
              <span className="text-fg">loading modules...</span>
            </div>
          )}
          {logIndex >= 2 && (
            <div className="flex items-center gap-2 text-ok transition-opacity duration-150">
              <span>[ ok ]</span>
              <span className="text-fg">compiling ideas...</span>
            </div>
          )}
          {logIndex >= 3 && (
            <div className="flex items-center gap-2 text-ok transition-opacity duration-150">
              <span>[ ok ]</span>
              <span className="text-fg font-semibold">ready.</span>
            </div>
          )}
        </div>

        {/* Skip hint */}
        <div className="mt-4 pt-3 border-t border-line w-full flex items-center justify-between text-[10px] font-mono text-fg-muted">
          <span>{'// BOOT_SEQ_V2.0'}</span>
          <span>[ PRESS ANY KEY TO SKIP ]</span>
        </div>

        {/* Expanding progress bar along bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-line overflow-hidden">
          <div
            className="h-full bg-red transition-all duration-300 ease-out"
            style={{ width: `${(logIndex / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
