'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { DreamLogo } from '@/themes/dream/logo/DreamLogo';

const STORAGE_KEY = 'krat_os_dream_intro_played';

export function DawnIntro() {
  const { theme } = useTheme();
  const { isFull } = useMotionLevel();
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'stars' | 'sunrise' | 'fly' | 'done'>('stars');
  const containerRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    setIsPlaying(false);
    setPhase('done');
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  useEffect(() => {
    if (theme !== 'dream' || !isFull) {
      return;
    }

    try {
      const alreadyPlayed = sessionStorage.getItem(STORAGE_KEY);
      if (alreadyPlayed === 'true') {
        return;
      }
    } catch {
      return;
    }

    // Begin intro sequence
    setIsPlaying(true);
    setPhase('stars');

    // 0.2s: Sunrise begins warming the sky
    const tSunrise = setTimeout(() => {
      setPhase('sunrise');
    }, 200);

    // 1.5s: Logo blooms and flies toward header
    const tFly = setTimeout(() => {
      setPhase('fly');
    }, 1500);

    // 2.2s: Sequence fully completed
    const tDone = setTimeout(() => {
      dismiss();
    }, 2200);

    // Any key or click dismisses immediately
    const handleKey = () => dismiss();
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(tSunrise);
      clearTimeout(tFly);
      clearTimeout(tDone);
      window.removeEventListener('keydown', handleKey);
    };
  }, [theme, isFull, dismiss]);

  if (!isPlaying || phase === 'done') return null;

  return (
    <div
      ref={containerRef}
      onClick={dismiss}
      role="status"
      aria-live="polite"
      aria-label="Dawn Welcome Sequence"
      className="fixed inset-0 z-[9990] flex items-center justify-center select-none cursor-pointer overflow-hidden transition-opacity duration-500 ease-out"
      style={{
        opacity: phase === 'fly' ? 0 : 1,
      }}
    >
      {/* Sky Canvas Background interpolating from Dark Indigo to Morning Sky */}
      <div
        className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
          phase === 'stars'
            ? 'bg-[#0F1438]'
            : 'bg-gradient-to-b from-[#6DB6F0] via-[#B4DDF7] to-[#FFE0B5]'
        }`}
      >
        {/* Twinkling Stars (visible in 'stars' phase, fading in 'sunrise') */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            phase === 'stars' ? 'opacity-90' : 'opacity-0'
          }`}
        >
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
              style={{
                top: `${(i * 19) % 85 + 5}%`,
                left: `${(i * 31) % 90 + 5}%`,
                animationDelay: `${(i % 5) * 180}ms`,
                opacity: 0.4 + ((i % 4) * 0.15),
              }}
            />
          ))}
        </div>

        {/* Rising Golden Sun Glow */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-3xl transition-all duration-[1400ms] ease-out ${
            phase === 'stars'
              ? 'w-48 h-48 bg-[#FFD47A]/0 translate-y-32'
              : 'w-[120vw] h-[60vh] bg-gradient-to-t from-[#FFD47A]/80 via-[#FFF0D4]/50 to-transparent translate-y-0'
          }`}
        />
      </div>

      {/* Center Blooming Logo transitioning and flying up */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          phase === 'fly'
            ? '-translate-y-[42vh] scale-75 opacity-0'
            : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        <div className="p-8 rounded-3xl bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-md shadow-2xl border border-[var(--dream-paper-2,#FFF1DC)] flex flex-col items-center gap-3">
          <DreamLogo size={54} showTagline={true} />
          <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] tracking-wider">
            Plant an idea. Watch it bloom.
          </span>
        </div>
      </div>

      {/* Skip Button Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="px-3 py-1.5 rounded-full text-xs font-serif bg-white/75 text-[var(--dream-ink,#2B2A52)] border border-[var(--dream-ink,#2B2A52)]/10 shadow-xs hover:bg-white transition-all"
        >
          Skip [Esc]
        </button>
      </div>
    </div>
  );
}
