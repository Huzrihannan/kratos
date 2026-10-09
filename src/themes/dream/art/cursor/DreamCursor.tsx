'use client';

/**
 * Krat.OS Dream Theme — Organic Dream Cursor (DreamCursor.tsx)
 *
 * Implements:
 * - Soft glowing golden pollen orb with short fading particle trail
 * - Transforms into blooming mini poppy glyph over interactive elements (a, button, input)
 * - Click petal burst (4 delicate petals scattering and fading)
 * - Touch tap expanding ripple
 * - Zero interference with interactions: strictly pointer-events: none
 * - Respects Calm toggle / MotionContext (disabled on touch/lite/off or tiers T1/T0)
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useQuality } from '../../world/governor';
import { useTheme } from '@/themes/ThemeProvider';

interface PetalBurst {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function DreamCursor() {
  const { theme } = useTheme();
  const { isLite, isOff } = useMotionLevel();
  const { tier } = useQuality();

  const isEnabled =
    theme === 'dream' &&
    !isLite &&
    !isOff &&
    (tier === 'T3' || tier === 'T2');

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bursts, setBursts] = useState<PetalBurst[]>([]);

  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const nextBurstId = useRef(1);

  // Click burst trigger
  const triggerBurst = useCallback((x: number, y: number) => {
    const burstId = nextBurstId.current++;
    const colors = ['#FD142B', '#FF4A5C', '#FFB7D1', '#FFA4B4'];

    setBursts((prev) => [
      ...prev.slice(-4), // keep max 4 simultaneous bursts
      { id: burstId, x, y, color: colors[burstId % colors.length] },
    ]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 700);
  }, []);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId = 0;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"]');
        setIsPointer(!!interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onClick = (e: MouseEvent) => {
      triggerBurst(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        triggerBurst(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth Cursor & Trail Animation Loop
    const loop = () => {
      if (cursorRef.current && isVisible) {
        const { x, y } = posRef.current;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        // Update trail history
        trailRef.current.unshift({ x, y });
        if (trailRef.current.length > 5) {
          trailRef.current.pop();
        }

        const trailDots = cursorRef.current.parentElement?.querySelectorAll<HTMLElement>('.pollen-trail-dot');
        if (trailDots) {
          trailDots.forEach((dot, idx) => {
            const historyPos = trailRef.current[idx + 1] || { x, y };
            dot.style.transform = `translate3d(${historyPos.x}px, ${historyPos.y}px, 0) scale(${1 - idx * 0.22})`;
            dot.style.opacity = `${(1 - idx * 0.25) * 0.5}`;
          });
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isEnabled, isVisible, triggerBurst]);

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-cursor="dream-cursor"
      className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden"
    >
      {/* 1. Pollen Trail Dots */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="pollen-trail-dot absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-flower-daisy/60 blur-[1px] will-change-transform pointer-events-none"
        />
      ))}

      {/* 2. Main Cursor Orb / Mini Poppy */}
      <div
        ref={cursorRef}
        className="absolute -left-3 -top-3 w-6 h-6 flex items-center justify-center will-change-transform pointer-events-none transition-transform duration-75"
      >
        {isPointer ? (
          /* Mini Blooming Poppy Icon on interactive hover */
          <div className="w-5 h-5 flex items-center justify-center animate-scale-in">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_2px_4px_rgba(253,20,43,0.35)]">
              {/* Sprout stem */}
              <path d="M 12 22 C 11 16, 13 14, 12 11" stroke="#5E9B6A" strokeWidth="2.2" strokeLinecap="round" />
              {/* Tiny leaf */}
              <path d="M 12 16 C 8 15, 6 13, 6 11 C 9 12, 11 14, 12 16 Z" fill="#7BB77F" />
              {/* Poppy bloom */}
              <circle cx="12" cy="8" r="5" fill="#FD142B" />
              <circle cx="12" cy="8" r="2" fill="#2A1B2E" />
            </svg>
          </div>
        ) : (
          /* Soft Golden Pollen Orb */
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-5 h-5 rounded-full bg-[#FFEAA7]/40 blur-[2px] animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFC83D] border border-white/80 shadow-[0_0_8px_rgba(255,200,61,0.8)]" />
          </div>
        )}
      </div>

      {/* 3. Click Petal Bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="absolute -left-2 -top-2 w-4 h-4 pointer-events-none"
          style={{ transform: `translate3d(${b.x}px, ${b.y}px, 0)` }}
        >
          {[0, 90, 180, 270].map((deg, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-1.5 rounded-full blur-[0.5px] animate-petal-puff"
              style={{
                backgroundColor: b.color,
                transform: `rotate(${deg}deg) translate(14px, 0)`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
