'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/content/process';
import { useMotionLevel } from '@/lib/motion/MotionContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATION_METAPHORS = [
  { stage: 'Seed', icon: '🌰', hint: 'The idea takes root' },
  { stage: 'Sprout', icon: '🌱', hint: 'First leaves and architecture' },
  { stage: 'Grow', icon: '🌿', hint: 'Strong stems and weekly code' },
  { stage: 'Bloom', icon: '🌸', hint: 'Opening to production light' },
  { stage: 'Flourish', icon: '🍀', hint: 'Ongoing care and expansion' },
];

export function PathSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const { isFull, isOff } = useMotionLevel();

  // Desktop Pinned Scrub (Full motion & desktop viewport only)
  useEffect(() => {
    if (isOff || !isFull || typeof window === 'undefined' || window.innerWidth < 1024) {
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top+=80',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const step = Math.min(
            processSteps.length - 1,
            Math.floor(self.progress * processSteps.length)
          );
          setActiveStepIdx(step);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isFull, isOff]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 lg:py-12"
      data-testid="dream-path-section"
    >
      {/* DESKTOP PINNED EXPERIENCE (lg: screens with full motion) */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Botanical Progress Bar & Stage Indicator */}
          <div className="mb-12 bg-[var(--dream-paper,#FFFAF0)] rounded-full p-2.5 border border-[var(--dream-paper-2,#FFF1DC)] shadow-xs flex items-center justify-between">
            {processSteps.map((step, idx) => {
              const meta = STATION_METAPHORS[idx] || STATION_METAPHORS[0];
              const isPassed = idx <= activeStepIdx;
              const isCurrent = idx === activeStepIdx;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIdx(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs font-medium ${
                    isCurrent
                      ? 'bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] shadow-sm scale-102'
                      : isPassed
                      ? 'text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-paper-2,#FFF1DC)]/60'
                      : 'text-[var(--dream-ink-soft,#55537A)] opacity-60'
                  }`}
                >
                  <span className="text-base">{meta.icon}</span>
                  <span className="font-serif font-bold">
                    0{step.number}. {meta.stage}
                  </span>
                  <span className="text-[10px] opacity-80 hidden xl:inline">({step.title})</span>
                </button>
              );
            })}
          </div>

          {/* Active Station Stage Showcase */}
          <div className="grid grid-cols-12 gap-8 items-center bg-[var(--dream-paper,#FFFAF0)] rounded-[36px] border border-[var(--dream-paper-2,#FFF1DC)] p-8 sm:p-12 shadow-[0_16px_48px_rgba(43,42,82,0.08)] relative overflow-hidden">
            {/* Soft decorative botanical backdrop */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 bg-[radial-gradient(circle,rgba(62,140,90,0.1)_0%,transparent_70%)] pointer-events-none rounded-full"
              aria-hidden="true"
            />

            {/* Left: Botanical Illustration & Wooden Signpost */}
            <div className="col-span-5 flex flex-col items-center text-center p-6 bg-[var(--dream-paper-2,#FFF1DC)]/40 rounded-3xl border border-[var(--dream-paper-2,#FFF1DC)]">
              {/* Botanical Sign Header */}
              <div className="w-16 h-16 rounded-2xl bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-center text-3xl shadow-xs mb-4">
                {STATION_METAPHORS[activeStepIdx].icon}
              </div>

              <div className="font-serif italic text-sm text-[var(--dream-ink-soft,#55537A)] mb-1">
                Station 0{processSteps[activeStepIdx].number} — {STATION_METAPHORS[activeStepIdx].stage}
              </div>
              <h3 className="font-serif text-3xl font-bold text-[var(--dream-ink,#2B2A52)] mb-2">
                {processSteps[activeStepIdx].title}
              </h3>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--dream-poppy-text,#C8102E)] font-semibold bg-[var(--dream-paper,#FFFAF0)] px-3 py-1 rounded-full border border-[var(--dream-paper-2,#FFF1DC)]">
                {processSteps[activeStepIdx].timeframe}
              </span>

              {/* Guiding Nature Note */}
              <p className="mt-5 text-xs text-[var(--dream-ink-soft,#55537A)] italic max-w-xs">
                &ldquo;{STATION_METAPHORS[activeStepIdx].hint}&rdquo;
              </p>
            </div>

            {/* Right: Station Details, Deliverables, & Client Commitment */}
            <div className="col-span-7 flex flex-col justify-between h-full pl-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wider text-[var(--dream-link,#3B3AA0)] mb-2">
                  What we engineer
                </div>
                <p className="font-sans text-base sm:text-lg text-[var(--dream-ink,#2B2A52)] leading-relaxed mb-6">
                  {processSteps[activeStepIdx].summary}
                </p>

                {/* Deliverables */}
                <div className="mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] mb-2.5">
                    What we deliver:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {processSteps[activeStepIdx].deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2.5 text-sm text-[var(--dream-ink,#2B2A52)] bg-[var(--dream-paper-2,#FFF1DC)]/50 px-3.5 py-2 rounded-xl"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#3E8C5A]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Commitment Prompt (Plain English) */}
              <div className="pt-4 border-t border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper-2,#FFF1DC)]/30 -mx-4 -mb-4 p-4 rounded-2xl">
                <div className="text-xs font-serif font-bold text-[var(--dream-ink,#2B2A52)] mb-1 flex items-center gap-1.5">
                  <span className="text-sm">🤝</span>
                  <span>What you&apos;ll need to do:</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed">
                  {processSteps[activeStepIdx].clientAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & FALLBACK VERTICAL STACK (Zero pinning, smooth scrolling) */}
      <div className="lg:hidden flex flex-col gap-6 max-w-2xl mx-auto px-4">
        {processSteps.map((step, idx) => {
          const meta = STATION_METAPHORS[idx] || STATION_METAPHORS[0];

          return (
            <div
              key={step.id}
              className="rounded-3xl bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--dream-paper-2,#FFF1DC)]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meta.icon}</span>
                  <div>
                    <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] block">
                      Station 0{step.number} — {meta.stage}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[var(--dream-ink,#2B2A52)]">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium text-[var(--dream-poppy-text,#C8102E)] bg-[var(--dream-paper-2,#FFF1DC)] px-2.5 py-1 rounded-full">
                  {step.timeframe}
                </span>
              </div>

              {/* Summary */}
              <p className="text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed">
                {step.summary}
              </p>

              {/* Deliverables */}
              <div className="space-y-1.5 pt-1">
                {step.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2 text-xs text-[var(--dream-ink,#2B2A52)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E8C5A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Client Commitment */}
              <div className="mt-2 pt-3 border-t border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper-2,#FFF1DC)]/40 -mx-6 -mb-6 p-4">
                <div className="text-[11px] font-serif font-bold text-[var(--dream-ink,#2B2A52)] mb-1 flex items-center gap-1">
                  <span>🤝</span>
                  <span>What you&apos;ll need to do:</span>
                </div>
                <p className="text-xs text-[var(--dream-ink-soft,#55537A)]">
                  {step.clientAction}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
