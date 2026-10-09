'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Sparkles, Sliders, Layers, Eye } from 'lucide-react';
import { DreamLogo } from '@/themes/dream/logo';
import { PaperCard } from '@/components/ui';

interface SkyConfig {
  name: string;
  top: string;
  mid: string;
  horizon: string;
  colorScheme: 'day' | 'night';
  contrast: string;
  hasScrim?: boolean;
}

const SKY_PRESETS: SkyConfig[] = [
  {
    name: 'Dawn',
    top: '#8FA6E0',
    mid: '#F2B8CF',
    horizon: '#FFE0B5',
    colorScheme: 'day',
    contrast: '5.59:1 (AA)',
  },
  {
    name: 'Day',
    top: '#6DB6F0',
    mid: '#B4DDF7',
    horizon: '#FFF0D4',
    colorScheme: 'day',
    contrast: '6.17:1 (AA)',
  },
  {
    name: 'Golden Hour',
    top: '#7FA6E6',
    mid: '#F6C79A',
    horizon: '#FFD47A',
    colorScheme: 'day',
    contrast: '5.46:1 (AA)',
  },
  {
    name: 'Dusk',
    top: '#33346F',
    mid: '#7A4A8C',
    horizon: '#FF9E6B',
    colorScheme: 'night',
    contrast: '10.45:1 (AA)',
    hasScrim: true,
  },
  {
    name: 'Night',
    top: '#0F1438',
    mid: '#252A66',
    horizon: '#54478C',
    colorScheme: 'night',
    contrast: '16.91:1 (AAA)',
  },
];

export default function DreamLogoPage() {
  const [replayKey, setReplayKey] = useState(0);
  const [calmMode, setCalmMode] = useState(false);
  const [showTagline, setShowTagline] = useState(true);
  const [compareMode, setCompareMode] = useState<'split' | 'overlay'>('split');
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <main
      data-theme="dream"
      className="min-h-screen bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] font-sans antialiased pb-24 paper-grain"
    >
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-md border-b border-[var(--dream-ink,#2B2A52)]/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/design-system/dream"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dream Primitives
            </Link>
            <span className="text-[var(--dream-ink-soft,#55537A)]/40">•</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--dream-poppy,#FD142B)]">
              Prompt D3: The Dream Logo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[var(--dream-ink,#2B2A52)]/90 transition-all shadow-sm active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Replay Bloom
            </button>
            <button
              onClick={() => setCalmMode(!calmMode)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                calmMode
                  ? 'bg-[var(--dream-poppy,#FD142B)] text-white border-[var(--dream-poppy,#FD142B)]'
                  : 'bg-white/80 text-[var(--dream-ink,#2B2A52)] border-[var(--dream-ink,#2B2A52)]/20 hover:border-[var(--dream-ink,#2B2A52)]/40'
              }`}
            >
              {calmMode ? 'Calm Mode: On' : 'Calm Mode: Off'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-16">
        {/* Title Header */}
        <section className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--dream-ink,#2B2A52)]">
            The Dream Logo: <span className="text-[var(--dream-poppy,#FD142B)]">In Bloom</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--dream-ink-soft,#55537A)] max-w-3xl leading-relaxed">
            The technical red bar becomes a living sprout (the idea), and the status LED dot becomes a blooming poppy (the finished software). Wordmark in Fraunces Soft 100, tagline in Figtree. Built with an adaptive size ladder, 1.6s GSAP bloom choreography, and organic wind sway.
          </p>
        </section>

        {/* 1. Hero Animation Studio */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--dream-poppy,#FD142B)]" />
              1. Bloom & Sway Studio (1.6s Timeline)
            </h2>
            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showTagline}
                  onChange={(e) => setShowTagline(e.target.checked)}
                  className="rounded text-[var(--dream-poppy,#FD142B)]"
                />
                Show Tagline
              </label>
            </div>
          </div>

          <PaperCard className="p-8 sm:p-14 bg-[#FFF1DC]/50 flex flex-col items-center justify-center min-h-[300px] border border-[var(--dream-ink,#2B2A52)]/10 shadow-lg text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="p-6 sm:p-10 bg-white/70 backdrop-blur-sm rounded-3xl border border-[var(--dream-ink,#2B2A52)]/10 shadow-md">
                <DreamLogo
                  key={replayKey}
                  size={96}
                  ladderLevel="full"
                  showTagline={showTagline}
                  animated={!calmMode}
                  interactive={true}
                  forcePlay={true}
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--dream-ink-soft,#55537A)]">
                <span className="inline-flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full border border-[var(--dream-ink,#2B2A52)]/10">
                  🌱 Stem Draw (0.0s)
                </span>
                <span className="inline-flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full border border-[var(--dream-ink,#2B2A52)]/10">
                  🍃 Leaves 120ms Stagger (0.22s)
                </span>
                <span className="inline-flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full border border-[var(--dream-ink,#2B2A52)]/10">
                  🔴 Bud Swell (0.45s)
                </span>
                <span className="inline-flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full border border-[var(--dream-ink,#2B2A52)]/10">
                  🌺 Poppy Overshoot (0.65s)
                </span>
                <span className="inline-flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full border border-[var(--dream-ink,#2B2A52)]/10">
                  ✨ Pollen Puff (1.05s)
                </span>
              </div>
              <p className="text-xs text-[var(--dream-ink-soft,#55537A)]/80 italic">
                Hover over the poppy above to see petal shed and bloom expansion.
              </p>
            </div>
          </PaperCard>
        </section>

        {/* 2. Surfaces & Sky Environments Matrix */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--dream-poppy,#FD142B)]" />
            2. Sky Environments & Text Contrast (WCAG AA)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Surfaces */}
            <div className="p-6 rounded-3xl bg-[var(--dream-paper,#FFFAF0)] border-2 border-[var(--dream-ink,#2B2A52)]/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink,#2B2A52)]">
                  Day Nav & Cards (Paper)
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Contrast: 12.97:1
                </span>
              </div>
              <div className="py-6 flex items-center justify-center">
                <DreamLogo size={46} colorScheme="day" showTagline={true} animated={false} />
              </div>
              <p className="text-[11px] text-[var(--dream-ink-soft,#55537A)]">
                Surface #FFFAF0 with Ink #2B2A52. Maximum readability on light pages.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#1B1E4B] border-2 border-white/10 shadow-sm space-y-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFF6E5]">
                  Night Footer & Cards
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  Contrast: 14.67:1
                </span>
              </div>
              <div className="py-6 flex items-center justify-center">
                <DreamLogo size={46} colorScheme="night" showTagline={true} animated={false} />
              </div>
              <p className="text-[11px] text-[#CFCBEA]">
                Night-paper #1B1E4B with Cream #FFF6E5. Used for dusk/night surfaces.
              </p>
            </div>

            {/* Sky States */}
            {SKY_PRESETS.map((sky) => (
              <div
                key={sky.name}
                className="p-6 rounded-3xl border border-black/10 shadow-sm space-y-4 relative overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, ${sky.top} 0%, ${sky.mid} 62%, ${sky.horizon} 100%)`,
                }}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      sky.colorScheme === 'night' ? 'text-white' : 'text-[#2B2A52]'
                    }`}
                  >
                    {sky.name} Sky
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      sky.colorScheme === 'night'
                        ? 'text-emerald-300 bg-black/40'
                        : 'text-emerald-900 bg-white/70'
                    }`}
                  >
                    Contrast: {sky.contrast}
                  </span>
                </div>
                <div className="py-6 flex items-center justify-center relative z-10">
                  <div
                    className={
                      sky.hasScrim ? 'bg-black/20 backdrop-blur-sm px-4 py-2 rounded-2xl' : ''
                    }
                  >
                    <DreamLogo
                      size={46}
                      colorScheme={sky.colorScheme}
                      showTagline={false}
                      animated={false}
                    />
                  </div>
                </div>
                <p
                  className={`text-[11px] relative z-10 ${
                    sky.colorScheme === 'night' ? 'text-[#CFCBEA]' : 'text-[#2B2A52]/80'
                  }`}
                >
                  Interpolated OKLab stops: {sky.top} to {sky.horizon}.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Adaptive Size Ladder */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--dream-poppy,#FD142B)]" />
              3. Adaptive Size Ladder (Responsive Hierarchy)
            </h2>
            <span className="text-xs text-[var(--dream-ink-soft,#55537A)]">
              Collapses gracefully to prevent capital &quot;I&quot; confusion
            </span>
          </div>

          <div className="space-y-6">
            {/* Ladder Level: Full Lockup (>=120px) */}
            <PaperCard className="p-6 bg-white/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--dream-ink,#2B2A52)]">
                  Tier 1: Full Lockup (120px and above)
                </span>
                <span className="text-[var(--dream-ink-soft,#55537A)]">
                  Sprout + Fraunces Wordmark + Poppy + Tagline
                </span>
              </div>
              <div className="py-4 overflow-x-auto flex items-center justify-center">
                <DreamLogo size={56} ladderLevel="full" showTagline={true} animated={false} />
              </div>
            </PaperCard>

            {/* Ladder Level: Mark Only (48-120px) */}
            <PaperCard className="p-6 bg-white/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--dream-ink,#2B2A52)]">
                  Tier 2: Botanical Mark (48px to 120px)
                </span>
                <span className="text-[var(--dream-ink-soft,#55537A)]">
                  Sprout & Poppy on Baseline (Wordmark omitted for clarity)
                </span>
              </div>
              <div className="py-4 flex items-center justify-center gap-12">
                <div className="text-center space-y-2">
                  <div className="h-16 flex items-center justify-center">
                    <DreamLogo size={56} ladderLevel="mark" animated={false} />
                  </div>
                  <span className="text-[11px] text-[var(--dream-ink-soft,#55537A)]">
                    56px height
                  </span>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-16 flex items-center justify-center">
                    <DreamLogo size={42} ladderLevel="mark" animated={false} />
                  </div>
                  <span className="text-[11px] text-[var(--dream-ink-soft,#55537A)]">
                    42px height
                  </span>
                </div>
              </div>
            </PaperCard>

            {/* Ladder Level: Mark Simple (24-48px) */}
            <PaperCard className="p-6 bg-white/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--dream-ink,#2B2A52)]">
                  Tier 3: Original Brand Core (24px to 48px)
                </span>
                <span className="text-[var(--dream-ink-soft,#55537A)]">
                  Collapses to flat red rounded bar + dot (100% brand continuity)
                </span>
              </div>
              <div className="py-4 flex items-center justify-center gap-12">
                <div className="text-center space-y-2">
                  <div className="h-12 flex items-center justify-center">
                    <DreamLogo size={36} ladderLevel="simple" animated={false} />
                  </div>
                  <span className="text-[11px] text-[var(--dream-ink-soft,#55537A)]">
                    36px toolbar
                  </span>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-12 flex items-center justify-center">
                    <DreamLogo size={24} ladderLevel="simple" animated={false} />
                  </div>
                  <span className="text-[11px] text-[var(--dream-ink-soft,#55537A)]">
                    24px icon
                  </span>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-12 flex items-center justify-center">
                    <DreamLogo size={16} ladderLevel="simple" animated={false} />
                  </div>
                  <span className="text-[11px] text-[var(--dream-ink-soft,#55537A)]">
                    16px favicon
                  </span>
                </div>
              </div>
            </PaperCard>
          </div>
        </section>

        {/* 4. Comparison with Reference Concept Sheet */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--dream-poppy,#FD142B)]" />
              4. Verification: Concept Sketch vs Clean Production Vector
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareMode('split')}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  compareMode === 'split'
                    ? 'bg-[var(--dream-ink,#2B2A52)] text-white border-[var(--dream-ink,#2B2A52)]'
                    : 'bg-white text-[var(--dream-ink,#2B2A52)] border-[var(--dream-ink,#2B2A52)]/20'
                }`}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setCompareMode('overlay')}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  compareMode === 'overlay'
                    ? 'bg-[var(--dream-ink,#2B2A52)] text-white border-[var(--dream-ink,#2B2A52)]'
                    : 'bg-white text-[var(--dream-ink,#2B2A52)] border-[var(--dream-ink,#2B2A52)]/20'
                }`}
              >
                Onion Skin Overlay
              </button>
            </div>
          </div>

          <PaperCard className="p-6 sm:p-10 bg-white/90 space-y-6">
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
              <span className="font-bold">Fixed Known Issues from Reference Sketch:</span>
              <ul className="list-disc list-inside space-y-0.5">
                <li>
                  <strong>Breathing space:</strong> Added 18.6px gap between &quot;t&quot; and poppy stem (sketch was uncomfortably cramped).
                </li>
                <li>
                  <strong>Kerning:</strong> Balanced optical gap between poppy flower and &quot;OS&quot; (19px spacing).
                </li>
                <li>
                  <strong>Petal depth:</strong> Dual-layer petals with deep crimson shadow, radiant brand poppy red, and translucent crinkle ridges.
                </li>
                <li>
                  <strong>Botany:</strong> Convincing leaf curves, 14 golden stamens, and organic bud tip in brand red.
                </li>
              </ul>
            </div>

            {compareMode === 'split' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)]">
                    Clean Production Vector (New SVG)
                  </span>
                  <div className="p-8 rounded-2xl bg-[#FFF1DC]/50 border border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-center min-h-[220px]">
                    <DreamLogo size={68} ladderLevel="full" showTagline={true} animated={false} />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--dream-ink-soft,#55537A)]">
                    Original Concept Sketch (Reference)
                  </span>
                  <div className="p-4 rounded-2xl bg-[#FFF1DC]/50 border border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-center min-h-[220px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/brand/source/dream/concept-sheet.png"
                      alt="Concept Sheet Reference"
                      className="max-h-[190px] object-contain rounded-xl shadow-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-xs text-[var(--dream-ink-soft,#55537A)] font-medium">
                    Overlay Opacity: {Math.round(overlayOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                    className="w-48 accent-[var(--dream-poppy,#FD142B)]"
                  />
                </div>

                <div className="relative p-8 rounded-2xl bg-[#FFF1DC]/50 border border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-center min-h-[260px] overflow-hidden">
                  <div className="relative z-10">
                    <DreamLogo size={74} ladderLevel="full" showTagline={true} animated={false} />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity"
                    style={{ opacity: overlayOpacity }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/brand/source/dream/concept-sheet.png"
                      alt="Concept Sheet Overlay"
                      className="max-h-[230px] object-contain mix-blend-multiply"
                    />
                  </div>
                </div>
              </div>
            )}
          </PaperCard>
        </section>
      </div>
    </main>
  );
}
