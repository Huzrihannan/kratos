'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface CloudCardsProps {
  className?: string;
}

export function CloudCards({ className = '' }: CloudCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const { isOff } = useMotionLevel();

  useEffect(() => {
    if (isOff) return;

    const c1 = card1Ref.current;
    const c2 = card2Ref.current;
    const c3 = card3Ref.current;
    if (!c1 || !c2 || !c3) return;

    // High performance quickTo setters for 3D tilt
    const setTilt1X = gsap.quickTo(c1, 'rotateX', { duration: 0.8, ease: 'power2.out' });
    const setTilt1Y = gsap.quickTo(c1, 'rotateY', { duration: 0.8, ease: 'power2.out' });
    const setMove1X = gsap.quickTo(c1, 'x', { duration: 0.9, ease: 'power2.out' });
    const setMove1Y = gsap.quickTo(c1, 'y', { duration: 0.9, ease: 'power2.out' });

    const setTilt2X = gsap.quickTo(c2, 'rotateX', { duration: 1.0, ease: 'power2.out' });
    const setTilt2Y = gsap.quickTo(c2, 'rotateY', { duration: 1.0, ease: 'power2.out' });
    const setMove2X = gsap.quickTo(c2, 'x', { duration: 1.1, ease: 'power2.out' });
    const setMove2Y = gsap.quickTo(c2, 'y', { duration: 1.1, ease: 'power2.out' });

    const setTilt3X = gsap.quickTo(c3, 'rotateX', { duration: 0.85, ease: 'power2.out' });
    const setTilt3Y = gsap.quickTo(c3, 'rotateY', { duration: 0.85, ease: 'power2.out' });
    const setMove3X = gsap.quickTo(c3, 'x', { duration: 0.95, ease: 'power2.out' });
    const setMove3Y = gsap.quickTo(c3, 'y', { duration: 0.95, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to +1
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Card 1
      setTilt1X(-normY * 8);
      setTilt1Y(normX * 9);
      setMove1X(normX * 14);
      setMove1Y(normY * 12);

      // Card 2 (opposite sway)
      setTilt2X(-normY * 7);
      setTilt2Y(normX * 8);
      setMove2X(-normX * 12);
      setMove2Y(normY * 15);

      // Card 3
      setTilt3X(-normY * 9);
      setTilt3Y(normX * 7);
      setMove3X(normX * 16);
      setMove3Y(-normY * 10);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOff]);

  return (
    <div
      ref={containerRef}
      className={`hidden lg:block relative w-full h-[460px] select-none pointer-events-none perspective-[1000px] ${className}`}
      aria-hidden="true"
    >
      {/* CARD 1: App Screen Sketch (Top Left) */}
      <div
        ref={card1Ref}
        data-testid="cloud-card-app"
        className="absolute top-2 left-6 w-64 rounded-3xl border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-sm p-4 shadow-[0_16px_40px_rgba(43,42,82,0.1)] transition-shadow duration-300 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--dream-paper-2,#FFF1DC)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--dream-poppy,#FD142B)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC83D]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6FB07A]" />
          </div>
          <span className="w-14 h-2 rounded-full bg-[var(--dream-paper-2,#FFF1DC)]" />
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          <div className="h-14 rounded-2xl bg-[var(--dream-paper-2,#FFF1DC)]/70 flex items-center justify-center p-2">
            <svg viewBox="0 0 80 30" className="w-full h-full" fill="none">
              <rect x="5" y="6" width="30" height="18" rx="4" fill="#6FB07A" opacity="0.3" />
              <rect x="42" y="6" width="32" height="6" rx="2" fill="#55537A" opacity="0.4" />
              <rect x="42" y="16" width="22" height="5" rx="2" fill="#55537A" opacity="0.25" />
            </svg>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-9 rounded-xl bg-[var(--dream-paper-2,#FFF1DC)]/60 p-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-[var(--dream-link,#3B3AA0)]/20 flex items-center justify-center text-[10px] text-[var(--dream-link,#3B3AA0)]">●</span>
              <span className="w-10 h-1.5 rounded-full bg-[var(--dream-ink-soft,#55537A)]/30" />
            </div>
            <div className="flex-1 h-9 rounded-xl bg-[var(--dream-paper-2,#FFF1DC)]/60 p-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-[var(--dream-poppy,#FD142B)]/20 flex items-center justify-center text-[10px] text-[var(--dream-poppy,#FD142B)]">★</span>
              <span className="w-10 h-1.5 rounded-full bg-[var(--dream-ink-soft,#55537A)]/30" />
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Chat Bubble Sketch (Top Right / Middle) */}
      <div
        ref={card2Ref}
        data-testid="cloud-card-chat"
        className="absolute top-16 right-4 w-60 rounded-3xl border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-sm p-4 shadow-[0_16px_40px_rgba(43,42,82,0.12)] transition-shadow duration-300 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex flex-col gap-2.5">
          {/* User note */}
          <div className="self-start max-w-[85%] rounded-2xl rounded-bl-xs bg-[var(--dream-paper-2,#FFF1DC)] p-2.5">
            <span className="block w-24 h-2 rounded-full bg-[var(--dream-ink,#2B2A52)]/40 mb-1" />
            <span className="block w-16 h-1.5 rounded-full bg-[var(--dream-ink,#2B2A52)]/25" />
          </div>
          {/* Team reply */}
          <div className="self-end max-w-[88%] rounded-2xl rounded-br-xs bg-[var(--dream-ink,#2B2A52)] text-white p-2.5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--dream-poppy,#FD142B)]" />
              <span className="block w-20 h-2 rounded-full bg-[#FFF6E5]/80" />
            </div>
            <span className="block w-28 h-1.5 rounded-full bg-[#FFF6E5]/50" />
          </div>
        </div>
      </div>

      {/* CARD 3: Plant Growing From Chart Sketch (Bottom Center / Right) */}
      <div
        ref={card3Ref}
        data-testid="cloud-card-growth"
        className="absolute bottom-6 right-16 w-68 rounded-3xl border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)]/95 backdrop-blur-sm p-4 shadow-[0_20px_48px_rgba(43,42,82,0.14)] transition-shadow duration-300 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-serif font-semibold text-[var(--dream-ink,#2B2A52)]">Progress & Care</span>
          <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
        </div>
        <div className="h-20 w-full relative">
          <svg viewBox="0 0 200 70" className="w-full h-full overflow-visible" fill="none">
            {/* Grid dashes */}
            <line x1="0" y1="60" x2="200" y2="60" stroke="#FFF1DC" strokeWidth="1.5" />
            <line x1="0" y1="35" x2="200" y2="35" stroke="#FFF1DC" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Soft growth area */}
            <path
              d="M 10 58 Q 60 55, 110 38 T 180 14 L 180 60 L 10 60 Z"
              fill="url(#growthGradient)"
              opacity="0.35"
            />
            {/* Growth curve */}
            <path
              d="M 10 58 Q 60 55, 110 38 T 180 14"
              stroke="#3E8C5A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Blooming Sprout at top */}
            <circle cx="180" cy="14" r="4.5" fill="#FD142B" />
            <circle cx="180" cy="14" r="2" fill="#FFC83D" />
            {/* Small leaves along stem */}
            <path d="M 115 37 C 117 32, 122 31, 124 33 C 122 36, 117 37, 115 37 Z" fill="#6FB07A" />

            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6FB07A" />
                <stop offset="100%" stopColor="#FFF1DC" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
