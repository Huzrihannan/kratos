'use client';

import React, { useState, useEffect } from 'react';
import { EstimatorWizard } from '@/components/estimator/EstimatorWizard';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useQuality, QualityTier } from '@/themes/dream/world/governor';
import { useTheme } from '@/themes/ThemeProvider';
import { Poppy } from '@/themes/dream/art/flowers/Poppy';

export default function DreamEstimatorStudioPage() {
  const { theme, setTheme } = useTheme();
  const { level, setLevel } = useMotionLevel();
  const { tier, setTier } = useQuality();
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (theme !== 'dream') {
      setTheme('dream', 'url');
    }
  }, [theme, setTheme]);

  return (
    <div data-theme="dream" className="min-h-screen bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] p-4 sm:p-8">
      {/* Studio Header & Controls Toolbar */}
      <div className="max-w-6xl mx-auto mb-8 bg-[var(--dream-paper-2,#FFF1DC)] border border-[#E8DEC7] rounded-[28px] p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8DEC7]">
          <div>
            <div className="flex items-center gap-2">
              <Poppy state="bloom" size={18} />
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[var(--dream-ink,#2B2A52)]">
                Dream Studio — The Estimator (Garden Builder)
              </h1>
            </div>
            <p className="font-sans text-xs text-[var(--dream-ink-soft,#55537A)] mt-1">
              Interactive testbed for Prompt D10: tactile SeedOption cards, living GardenPlot growth, and outcome screens.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Viewport toggle */}
            <div className="flex items-center bg-[var(--dream-paper,#FFFAF0)] rounded-full p-1 border border-[#E8DEC7] text-xs">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                  viewport === 'desktop'
                    ? 'bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)]'
                    : 'text-[var(--dream-ink-soft,#55537A)]'
                }`}
              >
                1440 Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                  viewport === 'mobile'
                    ? 'bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)]'
                    : 'text-[var(--dream-ink-soft,#55537A)]'
                }`}
              >
                360 Mobile
              </button>
            </div>

            {/* Quality Tier selector */}
            <div className="flex items-center gap-1.5 bg-[var(--dream-paper,#FFFAF0)] px-3 py-1.5 rounded-full border border-[#E8DEC7] text-xs">
              <span className="font-serif italic text-[11px] text-[var(--dream-ink-soft,#55537A)]">Tier:</span>
              {(['T3', 'T2', 'T1', 'T0'] as QualityTier[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    tier === t
                      ? 'bg-[var(--dream-link,#3B3AA0)] text-white'
                      : 'text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Calm toggle */}
            <button
              type="button"
              onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                level === 'off'
                  ? 'bg-[var(--dream-grass-deep,#2A6B48)] text-white border-[var(--dream-grass-deep,#2A6B48)]'
                  : 'bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] border-[#E8DEC7]'
              }`}
            >
              Calm Mode: {level === 'off' ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[var(--dream-ink-soft,#55537A)]">
          <span>Active theme: <strong>Dream</strong> (Paper & Flowers)</span>
          <span className="font-serif italic">Tested against WCAG AA standards and Touch target ≥ 48px</span>
        </div>
      </div>

      {/* Main Canvas Viewport Frame */}
      <div className="flex justify-center">
        <div
          style={{ width: viewport === 'mobile' ? '360px' : '100%', maxWidth: viewport === 'mobile' ? '360px' : '1152px' }}
          className={`transition-all duration-300 ${
            viewport === 'mobile'
              ? 'border-4 border-[#3B3AA0]/20 rounded-[44px] shadow-2xl p-2 bg-[var(--dream-paper,#FFFAF0)]'
              : ''
          }`}
        >
          <div className="rounded-[32px] border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] p-4 sm:p-6 shadow-[0_12px_36px_rgba(43,42,82,0.06)]">
            <EstimatorWizard isModal={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
