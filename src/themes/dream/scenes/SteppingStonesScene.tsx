'use client';

import React from 'react';
import { useLayoutModal } from '@/lib/modal-context';
import { Poppy } from '../art/flowers/Poppy';

export function SteppingStonesScene() {
  const { openEstimator } = useLayoutModal();

  return (
    <div
      data-testid="dream-stepping-stones-scene"
      className="relative w-full py-6 select-none"
    >
      {/* Gentle Stream riverbed background */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-gradient-to-r from-[#8EC5FC]/20 via-[#E0C3FC]/20 to-[#8EC5FC]/20 rounded-full blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Stream water ripples SVG */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 pointer-events-none overflow-hidden -z-10 opacity-30">
        <svg viewBox="0 0 1200 120" className="w-full h-full text-[#5B9BD5]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 40 Q 150 20, 300 40 T 600 40 T 900 40 T 1200 40" strokeDasharray="6 12" />
          <path d="M0 80 Q 150 60, 300 80 T 600 80 T 900 80 T 1200 80" strokeDasharray="8 14" />
        </svg>
      </div>

      {/* Three Stepping Stone Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* STONE 1: Speech Clouds Trading Words */}
        <div
          data-testid="dream-stone-1"
          className="group relative flex flex-col justify-between rounded-[36px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-8 shadow-[0_8px_24px_rgba(43,42,82,0.06)] hover:shadow-[0_16px_36px_rgba(43,42,82,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Moss Patch on Stone Crest */}
          <div
            className="absolute top-0 right-8 w-24 h-5 rounded-b-full bg-[#6FB07A]/25 pointer-events-none"
            aria-hidden="true"
          />

          <div>
            {/* Top Stone Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--dream-paper-2,#FFF1DC)] mb-6">
              <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper-2,#FFF1DC)] px-3 py-1 rounded-full">
                Stone 01 — Direct Talk
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] shadow-2xs" />
            </div>

            {/* Animation 1: Speech Clouds Trading Words */}
            <div className="h-36 w-full rounded-2xl bg-[var(--dream-paper-2,#FFF1DC)]/50 p-3 mb-6 flex flex-col justify-center gap-2.5 overflow-hidden">
              {/* Cloud 1 (Left / Client) */}
              <div className="self-start flex items-center gap-2 bg-[var(--dream-paper,#FFFAF0)] px-3 py-1.5 rounded-full rounded-bl-xs shadow-xs border border-[var(--dream-ink,#2B2A52)]/10 animate-[bounce_4s_ease-in-out_infinite]">
                <span className="text-xs">💬</span>
                <span className="font-sans text-xs font-medium text-[var(--dream-ink,#2B2A52)]">
                  Can we inspect staging today?
                </span>
              </div>

              {/* Cloud 2 (Right / Engineer) */}
              <div className="self-end flex items-center gap-2 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] px-3 py-1.5 rounded-full rounded-br-xs shadow-xs animate-[bounce_4s_ease-in-out_2s_infinite]">
                <span className="font-sans text-xs font-medium">
                  Deployed! Let&apos;s review together.
                </span>
                <span className="text-xs">☕</span>
              </div>
            </div>

            {/* Title & Copy */}
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--dream-ink,#2B2A52)] mb-3 leading-snug">
              Talk directly to the people building your code
            </h4>
            <p className="font-sans text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed mb-6">
              Zero account-manager telephone games. When you have an architectural question, you speak directly with senior engineers who understand your product.
            </p>
          </div>

          {/* Reassuring Bullets */}
          <div className="space-y-2 pt-4 border-t border-[var(--dream-paper-2,#FFF1DC)] text-xs font-sans text-[var(--dream-ink,#2B2A52)]">
            <div className="flex items-center gap-2">
              <span className="text-[#3E8C5A]">🌱</span>
              <span>Shared Slack or Discord channel for daily async updates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#3E8C5A]">🌱</span>
              <span>Weekly clickable demo videos and transparent progress</span>
            </div>
          </div>
        </div>

        {/* STONE 2: Blooming Checklist */}
        <div
          data-testid="dream-stone-2"
          className="group relative flex flex-col justify-between rounded-[36px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-8 shadow-[0_8px_24px_rgba(43,42,82,0.06)] hover:shadow-[0_16px_36px_rgba(43,42,82,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Moss Patch */}
          <div
            className="absolute top-0 right-12 w-28 h-5 rounded-b-full bg-[#6FB07A]/25 pointer-events-none"
            aria-hidden="true"
          />

          <div>
            {/* Top Stone Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--dream-paper-2,#FFF1DC)] mb-6">
              <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper-2,#FFF1DC)] px-3 py-1 rounded-full">
                Stone 02 — Clear Commitments
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] shadow-2xs" />
            </div>

            {/* Animation 2: Blooming Checklist */}
            <div className="h-36 w-full rounded-2xl bg-[var(--dream-paper-2,#FFF1DC)]/50 p-4 mb-6 flex flex-col justify-center gap-2 overflow-hidden">
              <div className="flex items-center gap-2.5 bg-[var(--dream-paper,#FFFAF0)] px-3 py-1.5 rounded-xl border border-[var(--dream-ink,#2B2A52)]/10">
                <span className="text-sm">🌸</span>
                <span className="font-sans text-xs font-medium text-[var(--dream-ink,#2B2A52)]">
                  Fixed milestones locked upfront
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[var(--dream-paper,#FFFAF0)] px-3 py-1.5 rounded-xl border border-[var(--dream-ink,#2B2A52)]/10">
                <span className="text-sm">🌼</span>
                <span className="font-sans text-xs font-medium text-[var(--dream-ink,#2B2A52)]">
                  Zero surprise invoices or hidden extras
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[var(--dream-paper,#FFFAF0)] px-3 py-1.5 rounded-xl border border-[var(--dream-ink,#2B2A52)]/10">
                <span className="text-sm">🌻</span>
                <span className="font-sans text-xs font-medium text-[var(--dream-ink,#2B2A52)]">
                  100% IP ownership & credentials yours
                </span>
              </div>
            </div>

            {/* Title & Copy */}
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--dream-ink,#2B2A52)] mb-3 leading-snug">
              Fixed milestones, zero surprise bills
            </h4>
            <p className="font-sans text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed mb-6">
              We scope software into concrete milestones before writing a single line of code. What we quote is what you invest—guaranteed without fine print.
            </p>
          </div>

          {/* Reassuring Bullets */}
          <div className="space-y-2 pt-4 border-t border-[var(--dream-paper-2,#FFF1DC)] text-xs font-sans text-[var(--dream-ink,#2B2A52)]">
            <div className="flex items-center gap-2">
              <span className="text-[#3E8C5A]">🌱</span>
              <span>Transparent payment schedule tied to approved working stages</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#3E8C5A]">🌱</span>
              <span>Free scope swaps during active sprints as you gather feedback</span>
            </div>
          </div>
        </div>

        {/* STONE 3: Gentle Rain & Rainbow */}
        <div
          data-testid="dream-stone-3"
          className="group relative flex flex-col justify-between rounded-[36px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-8 shadow-[0_8px_24px_rgba(43,42,82,0.06)] hover:shadow-[0_16px_36px_rgba(43,42,82,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Moss Patch */}
          <div
            className="absolute top-0 right-10 w-24 h-5 rounded-b-full bg-[#6FB07A]/25 pointer-events-none"
            aria-hidden="true"
          />

          <div>
            {/* Top Stone Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--dream-paper-2,#FFF1DC)] mb-6">
              <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper-2,#FFF1DC)] px-3 py-1 rounded-full">
                Stone 03 — Long-Term Care
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] shadow-2xs" />
            </div>

            {/* Animation 3: Gentle Rain & Rainbow */}
            <div className="h-36 w-full rounded-2xl bg-[var(--dream-paper-2,#FFF1DC)]/50 p-4 mb-6 relative flex flex-col items-center justify-center overflow-hidden">
              {/* Rainbow arc */}
              <svg viewBox="0 0 160 80" className="w-32 h-16 opacity-80 mb-1" fill="none">
                <path d="M 10 75 A 70 70 0 0 1 150 75" stroke="#FFB7D1" strokeWidth="4" />
                <path d="M 16 75 A 64 64 0 0 1 144 75" stroke="#FFC83D" strokeWidth="4" />
                <path d="M 22 75 A 58 58 0 0 1 138 75" stroke="#A8D5A2" strokeWidth="4" />
                <path d="M 28 75 A 52 52 0 0 1 132 75" stroke="#5B9BD5" strokeWidth="4" />
              </svg>

              {/* Sprouting plant nourished below */}
              <div className="flex items-center gap-1.5">
                <span className="text-base animate-pulse">🌧️</span>
                <span className="text-xl">🌿</span>
                <span className="font-serif italic text-xs text-[var(--dream-ink,#2B2A52)] font-medium">
                  30-day warranty included
                </span>
              </div>
            </div>

            {/* Title & Copy */}
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--dream-ink,#2B2A52)] mb-3 leading-snug">
              We stay in your corner long after launch
            </h4>
            <p className="font-sans text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed mb-6">
              Shipping is just day one. Every build includes 30 days of comprehensive post-launch warranty, plus flexible care retainers to iterate with confidence.
            </p>
          </div>

          {/* Reassuring Bullets */}
          <div className="space-y-2 pt-4 border-t border-[var(--dream-paper-2,#FFF1DC)] text-xs font-sans text-[var(--dream-ink,#2B2A52)]">
            <div className="flex items-center gap-2">
              <span className="text-[#3E8C5A]">🌱</span>
              <span>Proactive uptime, database, and telemetry monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#3E8C5A]">🌱</span>
              <span>Direct on-call engineer access for production iterations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estimator Bridge Banner */}
      <div className="mt-10 rounded-[32px] border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_8px_24px_rgba(43,42,82,0.04)]">
        <div className="space-y-1">
          <div className="font-serif text-lg sm:text-xl font-bold text-[var(--dream-ink,#2B2A52)]">
            Ready to cross the stream with confidence?
          </div>
          <p className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)]">
            Plan your technical scope, target launch window, and investment in two minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={openEstimator}
          className="shrink-0 rounded-full px-6 py-2.5 text-xs font-semibold shadow-xs flex items-center gap-2 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[#38376B] transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)]"
        >
          <Poppy state="bloom" size={16} />
          <span>Estimate my project</span>
        </button>
      </div>
    </div>
  );
}
