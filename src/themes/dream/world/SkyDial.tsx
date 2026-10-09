'use client';

/**
 * Krat.OS Dream Theme — Sky Dial Popover (SkyDial.tsx)
 *
 * Interactive dial popover providing live selection between:
 * - Operating modes: Journey, Live, Fixed
 * - Five sky presets: Dawn, Day, Golden, Dusk, Night
 * - High-visibility Calm toggle
 */

import React from 'react';
import { useSky } from './SkyContext';
import { SkyPreset, SKY_KEYFRAMES, SKY_PRESETS_LIST } from './sky';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { Compass, Sliders, Sun, Feather, X } from 'lucide-react';

export function SkyDial({
  onClose,
  className = '',
}: {
  onClose?: () => void;
  className?: string;
}) {
  const { mode, setMode, fixedPreset, setFixedPreset, setPreviewTime } = useSky();
  const { level, setLevel } = useMotionLevel();

  const handleModeSelect = (newMode: 'journey' | 'live' | 'fixed') => {
    setPreviewTime(null);
    setMode(newMode);
  };

  const handlePresetSelect = (preset: SkyPreset) => {
    setPreviewTime(null);
    setMode('fixed');
    setFixedPreset(preset);
  };

  return (
    <div
      role="dialog"
      aria-label="Dream Sky Dial & Calm Controls"
      className={`p-4 bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-ink,#2B2A52)]/15 rounded-2xl shadow-xl text-xs select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--dream-ink,#2B2A52)]/10">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-[var(--dream-poppy,#FD142B)] animate-spin-slow" />
          <span className="font-bold tracking-wide text-[var(--dream-ink,#2B2A52)] font-serif">
            Living Sky Dial
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-paper-2,#FFF1DC)] transition-colors"
            aria-label="Close Sky Dial"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="py-3 space-y-4">
        {/* 1. Modes Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[var(--dream-poppy,#FD142B)]" />
            Mode
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--dream-paper-2,#FFF1DC)] rounded-xl">
            <button
              type="button"
              onClick={() => handleModeSelect('journey')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                mode === 'journey'
                  ? 'bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] font-bold shadow-xs'
                  : 'text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
              }`}
            >
              Journey
            </button>
            <button
              type="button"
              onClick={() => handleModeSelect('live')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                mode === 'live'
                  ? 'bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] font-bold shadow-xs'
                  : 'text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
              }`}
            >
              Live Clock
            </button>
            <button
              type="button"
              onClick={() => handleModeSelect('fixed')}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                mode === 'fixed'
                  ? 'bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] font-bold shadow-xs'
                  : 'text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)]'
              }`}
            >
              Fixed
            </button>
          </div>
        </div>

        {/* 2. Keyframes / Presets Matrix */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--dream-ink-soft,#55537A)] flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-[var(--dream-poppy,#FD142B)]" />
            Sky Palette
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {SKY_PRESETS_LIST.map((preset) => {
              const kf = SKY_KEYFRAMES[preset];
              const isSelected = mode === 'fixed' && fixedPreset === preset;

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  title={`${kf.name} sky`}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[var(--dream-poppy,#FD142B)] bg-[var(--dream-paper-2,#FFF1DC)] shadow-xs scale-105'
                      : 'border-transparent hover:bg-[var(--dream-paper-2,#FFF1DC)]/60'
                  }`}
                >
                  <div
                    className="w-full h-6 rounded-lg shadow-inner border border-black/10"
                    style={{
                      background: `linear-gradient(to bottom, ${kf.top}, ${kf.mid} 60%, ${kf.horizon})`,
                    }}
                  />
                  <span className="text-[9px] font-medium text-[var(--dream-ink,#2B2A52)] capitalize">
                    {preset}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Calm Mode Toggle */}
        <div className="pt-2 border-t border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-[var(--dream-grass-near,#3E8C5A)]" />
            <div>
              <div className="text-[11px] font-bold text-[var(--dream-ink,#2B2A52)]">
                Calm Mode
              </div>
              <div className="text-[9px] text-[var(--dream-ink-soft,#55537A)]">
                Slows drift & disables WebGL
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs ${
              level === 'off'
                ? 'bg-[var(--dream-poppy,#FD142B)] text-white'
                : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-ink,#2B2A52)]/10'
            }`}
          >
            {level === 'off' ? 'Calm On' : 'Calm Off'}
          </button>
        </div>
      </div>
    </div>
  );
}
