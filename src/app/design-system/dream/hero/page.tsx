'use client';

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { SkyPreset, SKY_KEYFRAMES } from '@/themes/dream/world/sky';
import { QualityTier, useQuality } from '@/themes/dream/world/governor';
import { useSky } from '@/themes/dream/world/SkyContext';
import { useTheme } from '@/themes/ThemeProvider';
import { useMotionLevel } from '@/lib/motion/MotionContext';

const PRESETS: SkyPreset[] = ['dawn', 'day', 'golden', 'dusk', 'night'];
const TIERS: QualityTier[] = ['T3', 'T2', 'T1', 'T0'];

export default function DreamHeroStudio() {
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

  // Contrast measurements against scrim
  const contrastRatios: Record<SkyPreset, string> = {
    dawn: '8.49:1 (AA+)',
    day: '9.96:1 (AAA)',
    golden: '8.58:1 (AA+)',
    dusk: '9.34:1 (AAA with scrim)',
    night: '13.31:1 (AAA with scrim)',
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
            Dream Hero Studio — Workbench
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
          <span>Measured Headline Contrast: </span>
          <strong className="text-[#1E9E5A]">{contrastRatios[activePreset]}</strong>
        </div>
        <div className="font-mono text-[11px]">
          Top: {SKY_KEYFRAMES[activePreset].top} | Horizon: {SKY_KEYFRAMES[activePreset].horizon}
        </div>
      </div>

      {/* Main Hero Preview Frame */}
      <main className="flex-1 flex justify-center items-start p-4 sm:p-8 overflow-x-hidden">
        <div
          data-testid="hero-preview-container"
          className={`relative rounded-3xl border border-[var(--dream-paper-2,#FFF1DC)] shadow-2xl overflow-hidden transition-all duration-300 ${
            isMobileView ? 'w-[360px] min-h-[780px]' : 'w-full max-w-7xl min-h-[820px]'
          }`}
          style={{
            background: `linear-gradient(180deg, ${SKY_KEYFRAMES[activePreset].top} 0%, ${SKY_KEYFRAMES[activePreset].mid} 62%, ${SKY_KEYFRAMES[activePreset].horizon} 100%)`,
          }}
        >
          {/* Hero Section */}
          <Hero />
        </div>
      </main>
    </div>
  );
}
