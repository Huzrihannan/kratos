'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { CaseStudy } from '@/content/work';
import { registerSway } from '../world/wind';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface PostcardsSceneProps {
  studies: CaseStudy[];
}

export function PostcardsScene({ studies }: PostcardsSceneProps) {
  const { isOff } = useMotionLevel();
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Register wind sway for each postcard
  useEffect(() => {
    if (isOff) return;

    const cleanups: (() => void)[] = [];

    cardRefs.current.forEach((el, idx) => {
      if (el) {
        const cleanup = registerSway(el, {
          strength: 0.75 + (idx % 2) * 0.3,
          maxAngle: 5,
          transformOrigin: 'top center',
        });
        cleanups.push(cleanup);
      }
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [isOff, studies]);

  if (!studies || studies.length === 0) return null;

  return (
    <div
      ref={lineRef}
      data-testid="dream-postcards-scene"
      className="relative w-full py-8 sm:py-12 select-none overflow-hidden"
    >
      {/* 1. RUSTIC WASHING LINE WITH CLOTHESPINS */}
      <div className="hidden sm:block absolute top-14 inset-x-8 h-8 pointer-events-none z-10" aria-hidden="true">
        {/* Sagging Hemp Rope Line */}
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <path
            d="M 0 10 Q 300 24, 600 26 Q 900 24, 1200 10"
            stroke="#A89A84"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            fill="none"
          />
        </svg>
      </div>

      {/* 2. POSTCARDS GRID (Desktop 3-column / Mobile Horizontal Snap) */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 px-4 sm:px-0 snap-x snap-mandatory">
        {studies.map((study, idx) => {
          // Subtle initial hanging tilt (-2deg to +2deg)
          const tiltDeg = ((idx % 3) - 1) * 2;

          return (
            <div
              key={study.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{ transform: isOff ? 'none' : `rotate(${tiltDeg}deg)` }}
              className="min-w-[300px] sm:min-w-0 w-full shrink-0 snap-center transition-transform duration-300 hover:rotate-0 hover:-translate-y-2 group"
            >
              {/* Wooden Clothespin / Peg */}
              <div className="hidden sm:flex justify-center -mb-3 relative z-20" aria-hidden="true">
                <div className="w-4 h-8 bg-[#C49A6C] rounded-sm border border-[#8B5A2B] shadow-xs flex flex-col items-center justify-between py-0.5">
                  <div className="w-2.5 h-0.5 bg-[#5C3A21]" />
                  <div className="w-3 h-1 bg-[#8B5A2B]" />
                  <div className="w-2.5 h-0.5 bg-[#5C3A21]" />
                </div>
              </div>

              {/* Postcard Body */}
              <div className="rounded-[28px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 shadow-[0_12px_32px_rgba(43,42,82,0.08)] group-hover:shadow-[0_24px_52px_rgba(43,42,82,0.14)] transition-shadow duration-300 flex flex-col justify-between h-full relative">
                {/* Postcard Top Row: Header, Postage Stamp & Postmark */}
                <div className="flex items-start justify-between pb-4 border-b border-[var(--dream-paper-2,#FFF1DC)]">
                  <div>
                    <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] block">
                      Postcard No. 0{idx + 1}
                    </span>
                    <span className="font-sans text-xs font-semibold text-[var(--dream-link,#3B3AA0)]">
                      {study.clientName}
                    </span>
                  </div>

                  {/* Stamp & Postmark */}
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {/* Circular Postmark */}
                    <div className="w-8 h-8 rounded-full border border-dashed border-[var(--dream-ink-soft,#55537A)]/50 flex items-center justify-center text-[7px] font-mono text-[var(--dream-ink-soft,#55537A)] transform -rotate-12">
                      KRAT.OS
                    </div>
                    {/* Postage Stamp */}
                    <div className="w-10 h-12 rounded-[2px] border-2 border-dashed border-[var(--dream-poppy,#FD142B)]/40 bg-[#FFF6E5] p-1 flex flex-col items-center justify-between shadow-2xs">
                      <span className="text-[10px]">🌸</span>
                      <span className="font-mono text-[7px] text-[var(--dream-poppy-text,#C8102E)] font-bold">1st</span>
                    </div>
                  </div>
                </div>

                {/* Postcard Middle: Title, Metric, & Summary */}
                <div className="py-4 flex-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--dream-ink,#2B2A52)] mb-2 leading-snug">
                    {study.title}
                  </h3>

                  {/* Key Metric Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] border border-[var(--dream-paper-2,#FFF1DC)] mb-3">
                    <span className="font-serif font-extrabold text-sm text-[var(--dream-poppy-text,#C8102E)]">
                      {study.metricValue}
                    </span>
                    <span className="text-xs text-[var(--dream-ink-soft,#55537A)]">
                      {study.metricLabel}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed line-clamp-3">
                    {study.summary}
                  </p>
                </div>

                {/* Postcard Footer: Link to Study */}
                <div className="pt-4 border-t border-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-between">
                  <Link
                    href={`/work/${study.slug}`}
                    className="font-sans text-xs font-semibold text-[var(--dream-link,#3B3AA0)] group-hover:text-[var(--dream-ink,#2B2A52)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Read dispatch</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <span className="text-[11px] font-mono text-[var(--dream-ink-soft,#55537A)]">
                    {study.industry}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
