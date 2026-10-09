'use client';

import React, { useState } from 'react';
import { StatItem, TestimonialItem } from '@/content/proof';
import { Odometer } from '@/components/fx/Odometer';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export interface GoldenHourSceneProps {
  stats: StatItem[];
  testimonials: TestimonialItem[];
}

export function GoldenHourScene({ stats, testimonials }: GoldenHourSceneProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const { isOff } = useMotionLevel();

  const currentTestimonial = testimonials[activeTestimonialIdx] || testimonials[0];

  return (
    <div
      data-testid="dream-golden-hour-scene"
      className="relative w-full py-6 select-none"
    >
      {/* 1. STATS AS BOTANICAL GROWTH RINGS / WOODEN GARDEN MILESTONES */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="relative rounded-3xl bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 shadow-[0_8px_24px_rgba(43,42,82,0.06)] flex flex-col items-center text-center overflow-hidden hover:shadow-[0_16px_36px_rgba(43,42,82,0.1)] transition-all duration-300"
            >
              {/* Decorative Concentric Growth Rings SVG */}
              <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 200 200" className="w-48 h-48" fill="none">
                  <circle cx="100" cy="100" r="30" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="3 2" />
                  <circle cx="100" cy="100" r="55" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="4 3" />
                  <circle cx="100" cy="100" r="80" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="5 3" />
                </svg>
              </div>

              {/* Ring Milestone Badge */}
              <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] mb-2 z-10">
                Milestone 0{idx + 1}
              </span>

              {/* Target Metric Value */}
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--dream-ink,#2B2A52)] mb-2 flex items-baseline z-10">
                {stat.prefix && <span className="text-xl sm:text-2xl mr-1">{stat.prefix}</span>}
                <Odometer value={stat.targetValue} />
                <span className="text-xl sm:text-2xl ml-1 text-[var(--dream-poppy-text,#C8102E)]">
                  {stat.suffix}
                </span>
              </div>

              {/* Metric Label & Description */}
              <div className="font-serif font-bold text-sm text-[var(--dream-ink,#2B2A52)] mb-1 z-10">
                {stat.label}
              </div>
              <p className="font-sans text-xs text-[var(--dream-ink-soft,#55537A)] leading-relaxed z-10">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 2. TESTIMONIALS AS LETTERS CARRIED IN BY PAPER AIRPLANES */}
      {testimonials.length > 0 && currentTestimonial && (
        <div className="max-w-4xl mx-auto rounded-[36px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-8 sm:p-12 shadow-[0_20px_54px_rgba(43,42,82,0.1)] relative overflow-hidden">
          {/* Top Row: Paper Airplane & Dispatch Title */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--dream-paper-2,#FFF1DC)] mb-6">
            <div className="flex items-center gap-3">
              {/* Origami Paper Airplane */}
              <div className={`w-10 h-10 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-center text-lg ${isOff ? '' : 'animate-float'}`}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--dream-link,#3B3AA0)]" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </div>
              <div>
                <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] block">
                  Dispatched via paper plane
                </span>
                <span className="font-serif text-sm font-bold text-[var(--dream-ink,#2B2A52)]">
                  Letter No. 0{activeTestimonialIdx + 1} of 0{testimonials.length}
                </span>
              </div>
            </div>

            {/* Testimonial Selectors */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => setActiveTestimonialIdx(tIdx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    tIdx === activeTestimonialIdx
                      ? 'bg-[var(--dream-poppy,#FD142B)] scale-125'
                      : 'bg-[var(--dream-paper-2,#FFF1DC)] hover:bg-[var(--dream-ink-soft,#55537A)]'
                  }`}
                  aria-label={`View letter ${tIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Letter Body Quote */}
          <div className="mb-8">
            <blockquote className="font-serif text-lg sm:text-2xl text-[var(--dream-ink,#2B2A52)] leading-relaxed italic">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>
          </div>

          {/* Letter Bottom: Signoff & Wax Seal Stamp */}
          <div className="pt-6 border-t border-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-between">
            <div>
              <div className="font-serif font-bold text-base text-[var(--dream-ink,#2B2A52)]">
                {currentTestimonial.author}
              </div>
              <div className="font-sans text-xs text-[var(--dream-ink-soft,#55537A)]">
                {currentTestimonial.role} &mdash;{' '}
                <span className="text-[var(--dream-link,#3B3AA0)] font-medium">
                  {currentTestimonial.company}
                </span>
              </div>
            </div>

            {/* Poppy Wax Seal Stamp */}
            <div className="w-12 h-12 rounded-full bg-[var(--dream-poppy,#FD142B)] text-white shadow-md flex items-center justify-center transform -rotate-6 select-none" aria-hidden="true">
              <span className="text-xs font-serif font-bold tracking-tighter">VERIFIED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
