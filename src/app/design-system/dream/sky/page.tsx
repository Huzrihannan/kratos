'use client';

/**
 * Krat.OS Dream Theme — Living Sky Studio & Testbench (/design-system/dream/sky)
 *
 * Interactive studio bench for testing the 5 Living Sky states, OKLab interpolation,
 * Quality Governor tiers (T3-T0), context loss recovery, and WCAG contrast.
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Sliders, Layers, Sparkles, AlertTriangle } from 'lucide-react';
import { useSky } from '@/themes/dream/world/SkyContext';
import { useTheme } from '@/themes/ThemeProvider';
import {
  SKY_KEYFRAMES,
  SKY_PRESETS_LIST,
  SkyPreset,
  hexToRgb,
} from '@/themes/dream/world/sky';
import { useQuality, QualityTier } from '@/themes/dream/world/governor';
import { PaperCard } from '@/components/ui';
import { SkyDial } from '@/themes/dream/world/SkyDial';

export default function LivingSkyBench() {
  const { theme, setTheme } = useTheme();
  const {
    state,
    mode,
    setMode,
    fixedPreset,
    setFixedPreset,
    previewTime,
    setPreviewTime,
  } = useSky();
  const { tier, setTier } = useQuality();

  React.useEffect(() => {
    if (theme !== 'dream') {
      setTheme('dream', 'url');
    }
  }, [theme, setTheme]);

  const [hydrated, setHydrated] = useState(false);
  const [sliderVal, setSliderVal] = useState(0.2);
  const [hideWebGl, setHideWebGl] = useState(false);
  const [hideSprites, setHideSprites] = useState(false);
  const [showSkyDial, setShowSkyDial] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Time slider scrubber handler
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderVal(val);
    setPreviewTime(val);
  };

  const handleSelectPreset = (p: SkyPreset) => {
    setPreviewTime(null);
    setMode('fixed');
    setFixedPreset(p);
  };

  // Contrast calculator helper
  const getContrast = (fgHex: string, bgHex: string) => {
    const lum = (hex: string) => {
      const { r, g, b } = hexToRgb(hex);
      const toLinear = (c: number) =>
        c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };
    const l1 = lum(fgHex);
    const l2 = lum(bgHex);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  };

  const topContrast = getContrast(state.heroFg, state.top);
  const midContrast = getContrast(state.heroFg, state.mid);
  const horizonContrast = getContrast(state.heroFg, state.horizon);

  return (
    <div
      data-testid="sky-bench-container"
      data-theme="dream"
      data-hydrated={hydrated ? 'true' : 'false'}
      className="min-h-screen overflow-x-hidden pb-32 pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[var(--dream-ink,#2B2A52)]/10">
        <Link
          href="/design-system/dream"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dream Design System
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)] border border-[var(--dream-ink,#2B2A52)]/10">
            D4 Living Sky
          </span>
          <button
            type="button"
            onClick={() => setShowSkyDial(!showSkyDial)}
            className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[var(--dream-ink,#2B2A52)]/90 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            Toggle Sky Dial
          </button>
        </div>
      </div>

      {showSkyDial && (
        <div className="fixed top-20 right-8 z-50">
          <SkyDial onClose={() => setShowSkyDial(false)} className="w-80 shadow-2xl" />
        </div>
      )}

      {/* Hero Title */}
      <div className="py-8 space-y-2">
        <h1
          data-testid="sky-studio-title"
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--dream-ink,#2B2A52)]"
        >
          The Living Sky Studio
        </h1>
        <p className="text-base text-[var(--dream-ink-soft,#55537A)] max-w-2xl">
          Atmospheric state machine interpolating across 5 keyframes in OKLab.
          Features 3 decoupled render layers (CSS, DOM Sprites, ogl WebGL) with
          self-healing context loss and Quality Governor tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Controls Panel */}
        <div className="space-y-6 lg:col-span-1">
          {/* 1. Time Scrubber */}
          <PaperCard className="p-5 space-y-4 bg-white/90">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[var(--dream-poppy,#FD142B)]" />
                Journey Time Scrubber
              </label>
              <span className="text-xs font-mono font-bold text-[var(--dream-ink,#2B2A52)]">
                {(sliderVal * 100).toFixed(0)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sliderVal}
              onChange={handleSliderChange}
              className="w-full accent-[var(--dream-poppy,#FD142B)] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-[var(--dream-ink-soft,#55537A)] uppercase font-mono">
              <span>Day (0%)</span>
              <span>Golden (50%)</span>
              <span>Dusk (75%)</span>
              <span>Night (100%)</span>
            </div>
          </PaperCard>

          {/* 2. Mode Selector */}
          <PaperCard className="p-5 space-y-3 bg-white/90">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[var(--dream-poppy,#FD142B)]" />
              Operating Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['journey', 'live', 'fixed'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setPreviewTime(null);
                    setMode(m);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-medium capitalize transition-all ${
                    mode === m && previewTime === null
                      ? 'bg-[var(--dream-ink,#2B2A52)] text-white font-bold shadow-sm'
                      : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </PaperCard>

          {/* 3. Five Keyframe Presets */}
          <PaperCard className="p-5 space-y-3 bg-white/90">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--dream-poppy,#FD142B)]" />
              5 Keyframe Presets
            </label>
            <div className="grid grid-cols-5 gap-2">
              {SKY_PRESETS_LIST.map((preset) => {
                const kf = SKY_KEYFRAMES[preset];
                const active = mode === 'fixed' && fixedPreset === preset && previewTime === null;

                return (
                  <button
                    key={preset}
                    data-sky-preset={preset}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                      active
                        ? 'border-[var(--dream-poppy,#FD142B)] bg-[var(--dream-paper-2,#FFF1DC)] scale-105 shadow-sm'
                        : 'border-transparent hover:bg-[var(--dream-paper-2,#FFF1DC)]/60'
                    }`}
                  >
                    <div
                      className="w-full h-8 rounded-lg border border-black/10 shadow-inner"
                      style={{
                        background: `linear-gradient(to bottom, ${kf.top}, ${kf.mid} 60%, ${kf.horizon})`,
                      }}
                    />
                    <span className="text-[10px] font-medium capitalize text-[var(--dream-ink,#2B2A52)]">
                      {preset}
                    </span>
                  </button>
                );
              })}
            </div>
          </PaperCard>

          {/* 4. Quality Governor Tier Selector */}
          <PaperCard className="p-5 space-y-3 bg-white/90">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[var(--dream-poppy,#FD142B)]" />
                Quality Governor
              </label>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--dream-ink,#2B2A52)] text-white">
                Active: {tier}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['T3', 'T2', 'T1', 'T0'] as QualityTier[]).map((t) => (
                <button
                  key={t}
                  data-quality-tier={t}
                  type="button"
                  onClick={() => setTier(t)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    tier === t
                      ? 'border-[var(--dream-poppy,#FD142B)] bg-[var(--dream-paper-2,#FFF1DC)] font-bold'
                      : 'border-[var(--dream-ink,#2B2A52)]/10 hover:bg-[var(--dream-paper-2,#FFF1DC)]/50'
                  }`}
                >
                  <div className="font-bold text-[var(--dream-ink,#2B2A52)]">{t}</div>
                  <div className="text-[10px] text-[var(--dream-ink-soft,#55537A)]">
                    {t === 'T3'
                      ? 'Ultra WebGL (60fps)'
                      : t === 'T2'
                      ? 'Standard WebGL (30fps)'
                      : t === 'T1'
                      ? 'CSS + Sprites'
                      : 'Calm / Static (0fps)'}
                  </div>
                </button>
              ))}
            </div>
          </PaperCard>

          {/* 5. Forced Failure Simulation */}
          <PaperCard className="p-5 space-y-3 bg-white/90">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5 text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              Resilience & Fallback Testing
            </label>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setHideWebGl(!hideWebGl)}
                className={`w-full py-2 px-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                  hideWebGl ? 'bg-amber-100 border-amber-300' : 'border-gray-200'
                }`}
              >
                <span>Simulate WebGL Disabled</span>
                <span className="font-mono">{hideWebGl ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => setHideSprites(!hideSprites)}
                className={`w-full py-2 px-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                  hideSprites ? 'bg-amber-100 border-amber-300' : 'border-gray-200'
                }`}
              >
                <span>Simulate Sprites Disabled (Layer 0 only)</span>
                <span className="font-mono">{hideSprites ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </PaperCard>
        </div>

        {/* Right Column: Live Sky State Diagnostics & Preview Cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* Active State Telemetry */}
          <PaperCard className="p-6 bg-white/90 space-y-4">
            <h2 className="text-base font-bold font-serif text-[var(--dream-ink,#2B2A52)] flex items-center justify-between">
              <span data-testid="sky-telemetry-state">Live Atmospheric Telemetry: {state.name}</span>
              <span className="text-xs font-mono font-normal text-[var(--dream-ink-soft,#55537A)]">
                Sun: ({state.sunX.toFixed(2)}, {state.sunY.toFixed(2)}) | Stars:{' '}
                {state.starAlpha.toFixed(2)}
              </span>
            </h2>

            {/* Gradient Stops Matrix */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--dream-paper-2,#FFF1DC)] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[var(--dream-ink-soft,#55537A)]">
                  Top Stop (0%)
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-black/10"
                    style={{ backgroundColor: state.top }}
                  />
                  <span className="font-mono font-bold text-[var(--dream-ink,#2B2A52)]">
                    {state.top}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--dream-paper-2,#FFF1DC)] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[var(--dream-ink-soft,#55537A)]">
                  Mid Stop (62%)
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-black/10"
                    style={{ backgroundColor: state.mid }}
                  />
                  <span className="font-mono font-bold text-[var(--dream-ink,#2B2A52)]">
                    {state.mid}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--dream-paper-2,#FFF1DC)] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[var(--dream-ink-soft,#55537A)]">
                  Horizon (100%)
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-black/10"
                    style={{ backgroundColor: state.horizon }}
                  />
                  <span className="font-mono font-bold text-[var(--dream-ink,#2B2A52)]">
                    {state.horizon}
                  </span>
                </div>
              </div>
            </div>

            {/* Contrast Table */}
            <div className="pt-3 border-t border-[var(--dream-ink,#2B2A52)]/10">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--dream-ink,#2B2A52)] pb-2">
                <span>WCAG Contrast Against Text ({state.heroFg})</span>
                <span className="text-[10px] font-mono text-green-700">Target: ≥ 4.5:1</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg border border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-between">
                  <span>Top:</span>
                  <span
                    className={`font-mono font-bold ${
                      parseFloat(topContrast) >= 4.5 ? 'text-green-700' : 'text-amber-700'
                    }`}
                  >
                    {topContrast}:1
                  </span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-between">
                  <span>Mid (Hero):</span>
                  <span
                    className={`font-mono font-bold ${
                      parseFloat(midContrast) >= 4.5 ? 'text-green-700' : 'text-amber-700'
                    }`}
                  >
                    {midContrast}:1
                  </span>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-between">
                  <span>Horizon:</span>
                  <span
                    className={`font-mono font-bold ${
                      parseFloat(horizonContrast) >= 4.5 ? 'text-green-700' : 'text-amber-700'
                    }`}
                  >
                    {horizonContrast}:1
                  </span>
                </div>
              </div>
            </div>
          </PaperCard>

          {/* Headline Contrast Visual Preview Box */}
          <div
            className="relative rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl transition-all duration-700 min-h-[360px] flex flex-col justify-between"
            style={{
              background: `linear-gradient(180deg, ${state.top} 0%, ${state.mid} 62%, ${state.horizon} 100%)`,
            }}
          >
            {/* Dusk Scrim Overlay if active */}
            {state.hasScrim && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(27, 30, 75, 0.45) 0%, transparent 75%)',
                }}
              />
            )}

            <div className="relative z-10 flex items-center justify-between text-xs font-mono font-semibold">
              <span
                style={{ color: state.heroFg }}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md"
              >
                /01 — Living Sky Preview
              </span>
              <span style={{ color: state.heroFg }}>Active State: {state.name}</span>
            </div>

            <div className="relative z-10 space-y-4 my-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight"
                style={{ color: state.heroFg }}
              >
                We build the software your business runs on.
              </h2>
              <p
                className="text-base sm:text-lg max-w-xl opacity-90 leading-relaxed font-sans"
                style={{ color: state.heroFg }}
              >
                Plant an idea. Watch it bloom. High-performance software engineering
                crafted with storybook beauty and mechanical reliability.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-3 rounded-full font-bold text-sm bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Estimate my project</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--dream-poppy,#FD142B)]" />
              </button>
              <button
                type="button"
                className="px-6 py-3 rounded-full font-bold text-sm bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all border border-white/20"
                style={{ color: state.heroFg }}
              >
                See our work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
