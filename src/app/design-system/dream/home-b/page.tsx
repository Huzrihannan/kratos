'use client';

import React, { useState, useEffect } from 'react';
import { StackMarquee } from '@/components/sections/StackMarquee';
import { Principles } from '@/components/sections/Principles';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { SkyPreset, SKY_KEYFRAMES } from '@/themes/dream/world/sky';
import { QualityTier, useQuality } from '@/themes/dream/world/governor';
import { useSky } from '@/themes/dream/world/SkyContext';
import { useTheme } from '@/themes/ThemeProvider';
import { useMotionLevel } from '@/lib/motion/MotionContext';

const PRESETS: SkyPreset[] = ['dawn', 'day', 'golden', 'dusk', 'night'];
const TIERS: QualityTier[] = ['T3', 'T2', 'T1', 'T0'];

export default function HomeSectionsBStudio() {
  const { theme, setTheme } = useTheme();
  const { setFixedPreset } = useSky();
  const { setTier } = useQuality();
  const { level, setLevel } = useMotionLevel();

  const [activePreset, setActivePreset] = useState<SkyPreset>('day');
  const [activeTier, setActiveTier] = useState<QualityTier>('T3');
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (theme !== 'dream') {
      setTheme('dream', 'url');
    }
  }, [theme, setTheme]);

  const handlePresetChange = (p: SkyPreset) => {
    setActivePreset(p);
    setFixedPreset(p);
  };

  const handleTierChange = (t: QualityTier) => {
    setActiveTier(t);
    setTier(t);
  };

  return (
    <div
      data-theme="dream"
      className="min-h-screen bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] flex flex-col font-sans transition-colors duration-300"
    >
      {/* Studio Header Toolbar */}
      <header className="sticky top-0 z-50 bg-[var(--dream-paper-2,#FFF1DC)]/90 backdrop-blur-md border-b border-[var(--dream-paper-2,#FFF1DC)] px-4 sm:px-6 py-3.5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[var(--dream-poppy,#FD142B)] animate-pulse" />
          <h1 className="font-serif font-bold text-base sm:text-lg text-[var(--dream-ink,#2B2A52)]">
            Dream Home Sections B — Studio (Seed Shed, Stepping Stones, Dandelion FAQ, Make a Wish)
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* Preset Selector */}
          <div className="flex items-center bg-[var(--dream-paper,#FFFAF0)] rounded-full p-1 border border-[var(--dream-ink,#2B2A52)]/10 shadow-xs">
            {PRESETS.map((p) => (
              <button
                key={p}
                data-testid={`preset-${p}`}
                onClick={() => handlePresetChange(p)}
                className={`px-2.5 py-1 rounded-full font-medium capitalize transition-all ${
                  activePreset === p
                    ? 'bg-[var(--dream-poppy,#FD142B)] text-white shadow-xs'
                    : 'text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Tier Selector */}
          <div className="flex items-center bg-[var(--dream-paper,#FFFAF0)] rounded-full p-1 border border-[var(--dream-ink,#2B2A52)]/10 shadow-xs">
            {TIERS.map((t) => (
              <button
                key={t}
                data-testid={`tier-${t}`}
                onClick={() => handleTierChange(t)}
                className={`px-2 py-1 rounded-full font-mono text-[11px] font-semibold transition-all ${
                  activeTier === t
                    ? 'bg-[var(--dream-ink,#2B2A52)] text-white'
                    : 'text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Mobile Frame Toggle */}
          <button
            type="button"
            data-testid="toggle-mobile-frame"
            onClick={() => setIsMobileView(!isMobileView)}
            className={`px-3 py-1.5 rounded-full font-semibold border transition-all ${
              isMobileView
                ? 'bg-[var(--dream-link,#3B3AA0)] text-white border-transparent'
                : 'bg-[var(--dream-paper,#FFFAF0)] border-[var(--dream-ink,#2B2A52)]/10 text-[var(--dream-ink,#2B2A52)]'
            }`}
          >
            {isMobileView ? 'Mobile (360px)' : 'Desktop (1440px)'}
          </button>

          {/* Calm Toggle */}
          <button
            type="button"
            data-testid="toggle-calm-motion"
            onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
            className={`px-3 py-1.5 rounded-full font-semibold border transition-all ${
              level === 'off'
                ? 'bg-[#3DDC84] text-[#1B1E4B] border-transparent'
                : 'bg-[var(--dream-paper,#FFFAF0)] border-[var(--dream-ink,#2B2A52)]/10 text-[var(--dream-ink,#2B2A52)]'
            }`}
          >
            Calm: {level === 'off' ? 'ON' : 'OFF'}
          </button>
        </div>
      </header>

      {/* Info Pill */}
      <div className="bg-[var(--dream-paper-2,#FFF1DC)]/60 border-b border-[var(--dream-paper-2,#FFF1DC)] px-6 py-2 flex flex-wrap items-center justify-between text-xs text-[var(--dream-ink-soft,#55537A)]">
        <div>
          <span>Sky preset: </span>
          <strong className="text-[var(--dream-ink,#2B2A52)] capitalize">{activePreset}</strong>
          <span className="mx-2">|</span>
          <span>Quality Tier: </span>
          <strong className="text-[#1E9E5A]">{activeTier}</strong>
        </div>
        <div className="font-mono text-[11px]">
          Top: {SKY_KEYFRAMES[activePreset].top} | Horizon: {SKY_KEYFRAMES[activePreset].horizon}
        </div>
      </div>

      {/* Main Preview Container */}
      <main className="flex-1 flex justify-center items-start p-4 sm:p-8 overflow-x-hidden">
        <div
          data-testid="home-b-preview-container"
          className={`relative rounded-3xl border border-[var(--dream-paper-2,#FFF1DC)] shadow-2xl overflow-hidden transition-all duration-300 bg-[var(--dream-paper,#FFFAF0)] ${
            isMobileView ? 'w-[360px]' : 'w-full max-w-7xl'
          }`}
        >
          {/* SECTION 5: The Seed Shed (Stack) */}
          <div className="border-b border-[var(--dream-paper-2,#FFF1DC)]">
            <StackMarquee />
          </div>

          {/* SECTION 6: Stepping Stones (Principles) */}
          <div className="border-b border-[var(--dream-paper-2,#FFF1DC)]">
            <Principles />
          </div>

          {/* SECTION 7: Dandelion FAQ */}
          <div className="border-b border-[var(--dream-paper-2,#FFF1DC)]">
            <Faq />
          </div>

          {/* SECTION 8: Make a Wish (Final CTA) */}
          <div>
            <FinalCta />
          </div>
        </div>
      </main>
    </div>
  );
}
