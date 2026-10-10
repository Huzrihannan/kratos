'use client';

import React, { useState } from 'react';
import { Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { useLayoutModal } from '@/lib/modal-context';
import { Poppy } from '../art/flowers/Poppy';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export function MakeAWishCta() {
  const { openEstimator } = useLayoutModal();
  const { isOff } = useMotionLevel();
  const [seedsBlown, setSeedsBlown] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  const handleBlowDandelion = () => {
    setSeedsBlown(true);
    setBurstCount((prev) => prev + 1);
    setTimeout(() => setSeedsBlown(false), 2400);
  };

  return (
    <div
      data-testid="dream-make-a-wish-cta"
      className="relative w-full rounded-[44px] overflow-hidden px-6 py-16 sm:py-24 md:py-28 text-center select-none shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, #232756 0%, #353366 50%, #523E68 100%)',
      }}
    >
      {/* Dusk / Early Night Sky with Twinkling First Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Star 1 */}
        <span className="absolute top-10 left-[15%] w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {/* Star 2 */}
        <span className="absolute top-16 right-[22%] w-2 h-2 rounded-full bg-[#FFD43F] animate-[pulse_3s_ease-in-out_infinite]" />
        {/* Star 3 */}
        <span className="absolute top-28 left-[30%] w-1 h-1 rounded-full bg-white/80" />
        {/* Star 4 */}
        <span className="absolute top-20 right-[10%] w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
        {/* Star 5 */}
        <span className="absolute top-36 right-[35%] w-1 h-1 rounded-full bg-white/70" />
        {/* Soft Evening Glow Scrim behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(43,42,82,0.4)_0%,transparent_75%)] pointer-events-none" />
      </div>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center z-10">
        {/* Status Chip / Starlight Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6 text-xs text-[#CFCBEA]">
          <span className="w-2 h-2 rounded-full bg-[#3DDC84] animate-pulse shadow-[0_0_8px_#3DDC84]" />
          <span className="font-serif italic">Open for new projects</span>
        </div>

        {/* Shared Headline: Got an idea? Let's build it. */}
        <h2 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-[#FFF6E5] leading-[1.1] mb-6 text-balance">
          Got an idea? <br className="hidden sm:inline" />
          Let&apos;s build it.
        </h2>

        {/* Subhead */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#CFCBEA] leading-relaxed mb-8 max-w-xl text-balance">
          Skip the bloated proposals and endless sales calls. Get an instant ballpark estimate
          or speak directly with an engineering lead today.
        </p>

        {/* Interactive Giant Dandelion Seed Blow */}
        <div className="relative my-4 flex flex-col items-center">
          <button
            type="button"
            onClick={handleBlowDandelion}
            aria-label="Blow the giant dandelion seeds to make a wish"
            className="group relative flex flex-col items-center p-3 rounded-3xl hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#FFB400]"
          >
            {/* Dandelion SVG Head */}
            <div className="relative w-20 h-20 text-[#FFD43F] group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Stem */}
                <path d="M32 38V60" stroke="#3E8C5A" strokeWidth="2.5" strokeLinecap="round" />
                {/* Seed Head */}
                <circle cx="32" cy="32" r="5" fill="#FFB400" />
                {/* Radiating seed florets */}
                <path d="M32 27V12M32 12L28 8M32 12L36 8" strokeLinecap="round" />
                <path d="M36 28L47 19M47 19L46 14M47 19L51 17" strokeLinecap="round" />
                <path d="M28 28L17 19M17 19L18 14M17 19L13 17" strokeLinecap="round" />
                <path d="M37 32L51 32M51 32L53 28M51 32L54 35" strokeLinecap="round" />
                <path d="M27 32L13 32M13 32L11 28M13 32L10 35" strokeLinecap="round" />
                <path d="M35 35L46 45M46 45L45 49M46 45L49 48" strokeLinecap="round" />
                <path d="M29 35L18 45M18 45L19 49M18 45L15 48" strokeLinecap="round" />
              </svg>
            </div>

            <span className="mt-1 flex items-center gap-1.5 font-serif italic text-xs text-[#FFD43F] group-hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tap to blow seeds &amp; make a wish</span>
            </span>
          </button>

          {/* Seed Particles Floating Across Screen when blown */}
          {seedsBlown && !isOff && (
            <div
              key={burstCount}
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-base animate-ping"
                  style={{
                    left: `${20 + (i * 22) % 60}%`,
                    top: `${10 + (i * 15) % 80}%`,
                    animationDuration: `${1.2 + (i % 3) * 0.4}s`,
                    opacity: 0.8,
                  }}
                >
                  🌾
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Primary Action Buttons (Always Visible & Unobstructed) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md my-6">
          {/* Primary Action: Estimate My Project */}
          <button
            type="button"
            onClick={openEstimator}
            className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 rounded-full font-serif font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] border border-[var(--dream-paper-2,#FFF1DC)] hover:bg-[var(--dream-paper-2,#FFF1DC)] hover:scale-102 transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#FFB400]"
          >
            <Poppy state="bloom" size={18} />
            <span>Estimate my project</span>
          </button>

          {/* Book a Call */}
          {siteConfig.contact.bookingUrl ? (
            <a
              href={siteConfig.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[50px] px-6 py-3.5 rounded-full font-sans font-semibold text-xs uppercase tracking-wider text-[#FFF6E5] bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#FFB400]"
            >
              <Calendar className="w-4 h-4 text-[#FFD43F]" />
              <span>Book a 15-min call</span>
            </a>
          ) : null}
        </div>

        {/* WhatsApp Channel Link */}
        {siteConfig.contact.whatsappUrl ? (
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-sans text-xs text-[#CFCBEA] hover:text-[#FFF6E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400] pt-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#3DDC84] shrink-0" />
            <span className="underline decoration-white/30 underline-offset-4">
              Prefer WhatsApp? Chat directly with our founders
            </span>
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
