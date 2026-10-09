'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useTheme } from '@/themes/ThemeProvider';

export interface CrosshairProps {
  className?: string;
}

export function Crosshair({ className = '' }: CrosshairProps) {
  const { theme } = useTheme();
  const { isLite, isOff } = useMotionLevel();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef<number | null>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on desktop with fine pointer and full motion
    if (isLite || isOff) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check hovered element for data-cursor or clickable tags
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorEl) {
          setLabel(cursorEl.getAttribute('data-cursor'));
          setIsPointer(true);
        } else {
          const clickable = target.closest('a, button, input, textarea, select, [role="button"]');
          if (clickable) {
            setIsPointer(true);
            setLabel(null);
          } else {
            setIsPointer(false);
            setLabel(null);
          }
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const updatePosition = () => {
      setPos({ x: targetPos.current.x, y: targetPos.current.y });
      frameRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    frameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isLite, isOff]);

  if (theme === 'dream' || isLite || isOff || !isVisible || !pos) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed z-50 transition-opacity duration-150 ${className}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
      aria-hidden="true"
    >
      {/* Precision reticle */}
      <div className="relative -left-1/2 -top-1/2 flex items-center justify-center">
        {/* Horizontal crosshair lines */}
        <div
          className={`absolute h-[1px] bg-red transition-all duration-150 ${
            isPointer ? 'w-8 bg-red' : 'w-5 bg-line-strong'
          }`}
        />
        {/* Vertical crosshair lines */}
        <div
          className={`absolute w-[1px] bg-red transition-all duration-150 ${
            isPointer ? 'h-8 bg-red' : 'h-5 bg-line-strong'
          }`}
        />

        {/* Center indicator dot */}
        <div
          className={`h-1 w-1 rounded-none transition-all duration-150 ${
            isPointer ? 'bg-red scale-125' : 'bg-fg scale-100'
          }`}
        />

        {/* Reticle corner brackets when locked on target */}
        {isPointer && (
          <div className="absolute h-6 w-6 border border-line-strong/60 transition-transform duration-150" />
        )}

        {/* Context label badge */}
        {label && (
          <div className="absolute left-4 top-4 whitespace-nowrap bg-surface/95 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-fg border border-line shadow-sm">
            [{label}]
          </div>
        )}
      </div>
    </div>
  );
}
