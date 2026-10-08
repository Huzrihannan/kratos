'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface GlitchProps {
  children: React.ReactNode;
  className?: string;
  triggerOnHover?: boolean;
  disabled?: boolean;
}

export function Glitch({
  children,
  className = '',
  triggerOnHover = true,
  disabled = false,
}: GlitchProps) {
  const { isOff } = useMotionLevel();
  const [isGlitching, setIsGlitching] = useState(false);
  const lastGlitchTime = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlitch = useCallback(() => {
    if (disabled || isOff) return;

    const now = Date.now();
    // Strictly cap to < 3Hz (at least 400ms cooldown) to prevent any flashing
    if (now - lastGlitchTime.current < 450) {
      return;
    }
    lastGlitchTime.current = now;

    setIsGlitching(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Mechanical 1-2 frames (approx 120ms) duration
    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, 120);
  }, [disabled, isOff]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      triggerGlitch();
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {/* Primary content */}
      <div
        className={`transition-transform duration-75 ${
          isGlitching ? 'translate-x-[-1px] opacity-95' : ''
        }`}
      >
        {children}
      </div>

      {/* Red displacement clone */}
      {isGlitching && !isOff && (
        <div
          className="pointer-events-none absolute inset-0 select-none text-red opacity-80 mix-blend-screen"
          style={{
            transform: 'translate(2px, -1px)',
            clipPath: 'polygon(0 15%, 100% 15%, 100% 45%, 0 45%)',
          }}
          aria-hidden="true"
        >
          {children}
        </div>
      )}

      {/* Counter displacement clone */}
      {isGlitching && !isOff && (
        <div
          className="pointer-events-none absolute inset-0 select-none text-fg-muted opacity-70 mix-blend-difference"
          style={{
            transform: 'translate(-2px, 1px)',
            clipPath: 'polygon(0 60%, 100% 60%, 100% 85%, 0 85%)',
          }}
          aria-hidden="true"
        >
          {children}
        </div>
      )}
    </div>
  );
}
