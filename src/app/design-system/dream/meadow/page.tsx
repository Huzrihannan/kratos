'use client';

/**
 * Krat.OS Dream Theme — Meadow & Living Things Studio (/design-system/dream/meadow)
 *
 * Interactive studio testbench for:
 * - 8 Hand-crafted Flower Kit components + Wildflower cluster
 * - Flower lifecycle states (seed -> sprout -> bloom) and hover reactions
 * - Wind Engine real-time gauge, ambient gusts, and manual sway overrides
 * - Diurnal life simulation (day butterflies & bees vs night fireflies)
 * - Quality Governor live FPS counter and tier switcher (T3-T0)
 */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wind, Flower2, Bug, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { useSky } from '@/themes/dream/world/SkyContext';
import { useTheme } from '@/themes/ThemeProvider';
import { useQuality, QualityTier } from '@/themes/dream/world/governor';
import { windEngine, useWind } from '@/themes/dream/world/wind';
import { PaperCard, Button } from '@/components/ui';
import {
  Poppy,
  Daisy,
  Tulip,
  Sunflower,
  Dandelion,
  CherryBlossom,
  Clover,
  Lavender,
  WildflowerMix,
  FlowerState,
} from '@/themes/dream/art/flowers';
import { SkyPreset } from '@/themes/dream/world/sky';

export default function MeadowBench() {
  const { theme, setTheme } = useTheme();
  const { state: skyState, setMode, setFixedPreset } = useSky();
  const { tier, setTier } = useQuality();
  const { windSpeed, triggerGust } = useWind();

  useEffect(() => {
    if (theme !== 'dream') {
      setTheme('dream', 'url');
    }
  }, [theme, setTheme]);

  // Global flower state controls
  const [globalState, setGlobalState] = useState<FlowerState>('bloom');
  const [dandelionPuff, setDandelionPuff] = useState(false);
  const [cloverLucky, setCloverLucky] = useState(false);
  const [manualWind, setManualWind] = useState(0);

  // Live FPS Monitor
  const [fps, setFps] = useState(60);
  const frameTimes = useRef<number[]>([]);

  useEffect(() => {
    let animId = 0;
    const calcFps = (now: number) => {
      frameTimes.current.push(now);
      while (frameTimes.current.length > 0 && frameTimes.current[0] < now - 1000) {
        frameTimes.current.shift();
      }
      setFps(frameTimes.current.length);
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleManualGust = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setManualWind(val);
    windEngine.triggerGust(val);
  };

  const flowers = [
    {
      id: 'poppy',
      name: 'Poppy',
      role: 'Brand Mark & Primary Action',
      reserved: true,
      component: (st: FlowerState) => <Poppy state={st} size={96} />,
    },
    {
      id: 'daisy',
      name: 'Daisy',
      role: 'Web Applications',
      reserved: false,
      component: (st: FlowerState) => <Daisy state={st} size={96} />,
    },
    {
      id: 'tulip',
      name: 'Tulip',
      role: 'Mobile Applications',
      reserved: false,
      component: (st: FlowerState) => <Tulip state={st} size={96} />,
    },
    {
      id: 'sunflower',
      name: 'Sunflower',
      role: 'E-Commerce Platforms',
      reserved: false,
      component: (st: FlowerState) => <Sunflower state={st} size={96} />,
    },
    {
      id: 'dandelion',
      name: 'Dandelion',
      role: 'AI & Automations',
      reserved: false,
      extraToggle: (
        <button
          data-testid="toggle-dandelion-puff"
          onClick={() => setDandelionPuff(!dandelionPuff)}
          className="text-xs px-2 py-1 rounded-full bg-paper border border-line text-ink font-sans hover:bg-paper-2"
        >
          {dandelionPuff ? 'Mode: Seed Puff' : 'Mode: Flower Head'}
        </button>
      ),
      component: (st: FlowerState) => (
        <Dandelion state={st} size={96} isPuff={dandelionPuff} />
      ),
    },
    {
      id: 'cherry',
      name: 'Cherry Blossom',
      role: 'UI/UX Design',
      reserved: false,
      component: (st: FlowerState) => <CherryBlossom state={st} size={96} />,
    },
    {
      id: 'clover',
      name: 'Clover',
      role: 'Maintenance & Support',
      reserved: false,
      extraToggle: (
        <button
          data-testid="toggle-clover-lucky"
          onClick={() => setCloverLucky(!cloverLucky)}
          className="text-xs px-2 py-1 rounded-full bg-paper border border-line text-ink font-sans hover:bg-paper-2"
        >
          {cloverLucky ? 'Lucky: 4-Leaf' : 'Standard: 3-Leaf'}
        </button>
      ),
      component: (st: FlowerState) => (
        <Clover state={st} size={96} isLucky={cloverLucky} />
      ),
    },
    {
      id: 'lavender',
      name: 'Lavender',
      role: 'Wildflower & Borders',
      reserved: false,
      component: (st: FlowerState) => <Lavender state={st} size={96} />,
    },
    {
      id: 'cluster',
      name: 'Wildflower Mix',
      role: 'Border & Hero Cluster',
      reserved: false,
      component: (st: FlowerState) => <WildflowerMix state={st} />,
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 text-ink selection:bg-poppy selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <Link
              href="/design-system/dream"
              className="inline-flex items-center text-xs text-link font-sans hover:underline mb-2 gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dream Design System
            </Link>
            <div className="text-xs uppercase tracking-wider text-ink-soft font-sans font-medium">
              /05 — MEADOW & LIFE
            </div>
            <h1 className="font-fraunces text-3xl md:text-5xl font-semibold tracking-tight mt-1 text-ink">
              The Meadow, Wind & Flower Kit
            </h1>
            <p className="text-sm md:text-base text-ink-soft max-w-2xl mt-2 font-sans leading-relaxed">
              Hand-crafted SVG flower kit under 6 KB, unified Wind physics with GSAP quickSetters,
              instanced WebGL grass blades, and diurnal creature atmospheres.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <PaperCard className="p-3.5 flex items-center gap-4 bg-paper/90 backdrop-blur border-line">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-ink-soft font-sans">
                Live FPS
              </div>
              <div className="text-xl font-bold font-fraunces text-ink">{fps}</div>
            </div>
            <div className="w-[1px] h-8 bg-line" />
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-ink-soft font-sans">
                Tier
              </div>
              <div className="text-xl font-bold font-fraunces text-poppy">{tier}</div>
            </div>
            <div className="w-[1px] h-8 bg-line" />
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-ink-soft font-sans">
                Wind
              </div>
              <div className="text-xl font-bold font-fraunces text-ink">
                {windSpeed.toFixed(2)}
              </div>
            </div>
          </PaperCard>
        </div>

        {/* Console 1: Governor & Performance Controls */}
        <PaperCard className="p-5 md:p-6 space-y-4 bg-paper/95 border-line">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-poppy" />
              <h2 className="font-fraunces text-lg md:text-xl font-semibold text-ink">
                Quality Governor & Environmental Scaling
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-paper-2 p-1 rounded-full border border-line">
              {(['T3', 'T2', 'T1', 'T0'] as QualityTier[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-all ${
                    tier === t
                      ? 'bg-ink text-paper shadow-sm'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {t} {t === 'T3' ? '(Ultra)' : t === 'T2' ? '(Std)' : t === 'T1' ? '(SVG)' : '(Calm)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs font-sans text-ink-soft border-t border-line/60">
            <div>
              <span className="font-semibold text-ink">Instanced Grass: </span>
              {tier === 'T3' ? '8,000 blades (WebGL)' : tier === 'T2' ? '2,500 blades (WebGL)' : '0 (SVG Fallback)'}
            </div>
            <div>
              <span className="font-semibold text-ink">Life Particles: </span>
              {tier === 'T3' ? 'Full (85+ batch)' : tier === 'T2' ? 'Half (40 batch)' : tier === 'T1' ? 'Minimal (20)' : '0 (Static)'}
            </div>
            <div>
              <span className="font-semibold text-ink">Butterflies & Bees: </span>
              {tier === 'T3' ? '6-8 creatures' : tier === 'T2' ? '3 creatures' : '0 (Off)'}
            </div>
            <div>
              <span className="font-semibold text-ink">Wind Registrants: </span>
              <span className="text-ink font-semibold">
                {windEngine.getRegistrantCount()} / 60 max
              </span>
            </div>
          </div>
        </PaperCard>

        {/* Console 2: Wind Physics Engine */}
        <PaperCard className="p-5 md:p-6 space-y-4 bg-paper/95 border-line">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-link" />
              <h2 className="font-fraunces text-lg md:text-xl font-semibold text-ink">
                Unified Wind Engine Physics
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => triggerGust(1.8)}
                className="gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Trigger Strong Gust
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-sans text-ink-soft">
              <span>Manual Wind Scrubber (-2.0 to +2.0)</span>
              <span className="font-mono font-medium text-ink">
                Vector: {windSpeed.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="2.0"
              step="0.05"
              value={manualWind}
              onChange={handleManualGust}
              className="w-full accent-poppy cursor-pointer h-2 bg-paper-2 rounded-lg"
            />
          </div>
        </PaperCard>

        {/* Console 3: Diurnal Creature Atmosphere & Sky Presets */}
        <PaperCard className="p-5 md:p-6 space-y-4 bg-paper/95 border-line">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-[#2E7D32]" />
              <h2 className="font-fraunces text-lg md:text-xl font-semibold text-ink">
                Diurnal Life by Sky State
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['dawn', 'day', 'golden', 'dusk', 'night'] as SkyPreset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setMode('fixed');
                    setFixedPreset(p);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-sans font-medium capitalize transition-all ${
                    skyState.top === p
                      ? 'bg-link text-white shadow-sm'
                      : 'bg-paper-2 text-ink-soft hover:text-ink'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs font-sans text-ink-soft">
            • <strong>Day & Golden:</strong> 4-6 Butterflies flee cursor + 2-3 buzzing bees at noon + drifting petals.
            <br />
            • <strong>Dusk & Night:</strong> 20-40 Bioluminescent fireflies pulse under 1Hz with cursor attraction + night pollen.
          </p>
        </PaperCard>

        {/* Console 4: Flower Kit Showcase */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-poppy" />
              <h2 className="font-fraunces text-2xl font-semibold text-ink">
                Flower Species Gallery
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-paper-2 p-1 rounded-full border border-line">
              {(['seed', 'sprout', 'bloom'] as FlowerState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setGlobalState(st)}
                  className={`px-3 py-1 rounded-full text-xs font-sans font-medium capitalize transition-all ${
                    globalState === st
                      ? 'bg-ink text-paper shadow-sm'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  All {st}
                </button>
              ))}
              <button
                onClick={() => {
                  setGlobalState('seed');
                  setTimeout(() => setGlobalState('sprout'), 300);
                  setTimeout(() => setGlobalState('bloom'), 900);
                }}
                className="px-3 py-1 rounded-full text-xs font-sans text-link hover:underline inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Replay Bloom
              </button>
            </div>
          </div>

          {/* Grid of Flowers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flowers.map((fl) => (
              <PaperCard
                key={fl.id}
                className="p-6 flex flex-col items-center justify-between bg-paper/90 border-line hover:shadow-card transition-all"
              >
                <div className="w-full flex items-start justify-between">
                  <div>
                    <h3 className="font-fraunces text-lg font-semibold text-ink flex items-center gap-2">
                      {fl.name}
                      {fl.reserved && (
                        <span className="text-[10px] uppercase tracking-wide bg-poppy text-white px-2 py-0.5 rounded-full font-sans font-medium">
                          Brand Reserved
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-ink-soft font-sans mt-0.5">{fl.role}</p>
                  </div>
                  {fl.extraToggle}
                </div>

                {/* Animated Flower Canvas Container */}
                <div className="py-6 flex items-center justify-center min-h-[160px]">
                  {fl.component(globalState)}
                </div>

                <div className="w-full pt-3 border-t border-line/60 flex items-center justify-between text-[11px] font-sans text-ink-soft">
                  <span>Hover to flutter petals</span>
                  <span className="font-mono text-ink">SVG &lt; 6 KB</span>
                </div>
              </PaperCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
