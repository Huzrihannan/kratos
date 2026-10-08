'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import {
  Button,
  Window,
  Tag,
  StatusChip,
  Input,
  Textarea,
  Select,
  KeyOption,
  Tape,
  Accordion,
  Section,
  Logo,
} from '@/components/ui';
import {
  Caret,
  Decode,
  TypeLines,
  SpotlightGrid,
  Pipeline,
  Odometer,
  Wipe,
  Tilt,
  Magnetic,
  Crosshair,
  HUD,
  HUDClock,
  HUDCoordinates,
  Glitch,
} from '@/components/fx';

// Lazy-load WebGL canvas to keep chunk isolated
const ShaderField = dynamic(
  () => import('@/components/fx/ShaderField').then((mod) => mod.ShaderField),
  { ssr: false, loading: () => <div className="h-64 w-full bg-surface/40 flex items-center justify-center font-mono text-xs text-fg-muted border border-line">[ LOADING WEBGL SHADER... ]</div> }
);

export default function DesignSystemPage() {
  const { theme, setTheme } = useTheme();
  const { level, setLevel } = useMotionLevel();
  const [mounted, setMounted] = useState(false);

  // Interactive component test states
  const [keyOption1, setKeyOption1] = useState(true);
  const [keyOption2, setKeyOption2] = useState(false);
  const [keyOption3, setKeyOption3] = useState(false);
  const [odometerVal, setOdometerVal] = useState(14850);
  const [decodeKey, setDecodeKey] = useState(0);
  const [wipeTrigger, setWipeTrigger] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-red selection:text-white transition-colors duration-200">
      {/* Precision Reticle Cursor (Active on Desktop Full) */}
      <Crosshair />

      {/* Control Top Bar / OS HUD */}
      <header className="sticky top-0 z-40 w-full border-b border-line bg-bg/90 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Glitch>
              <Logo variant="auto" showTagline={false} className="h-6" />
            </Glitch>
            <span className="hidden sm:inline font-mono text-xs text-fg-muted">
              {'// DESIGN_SYSTEM_V2.LAB'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Switcher */}
            {mounted && (
              <div className="flex items-center border border-line bg-surface p-0.5">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`px-2.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                    theme === 'dark'
                      ? 'bg-fg text-bg font-bold'
                      : 'text-fg-muted hover:text-fg'
                  }`}
                  data-cursor="click"
                >
                  DARK
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`px-2.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                    theme === 'light'
                      ? 'bg-fg text-bg font-bold'
                      : 'text-fg-muted hover:text-fg'
                  }`}
                  data-cursor="click"
                >
                  LIGHT
                </button>
              </div>
            )}

            {/* Motion Level Switcher */}
            {mounted && (
              <div className="flex items-center border border-line bg-surface p-0.5">
                {(['full', 'lite', 'off'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setLevel(m)}
                    className={`px-2.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                      level === m
                        ? 'bg-red text-white font-bold'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                    data-cursor="click"
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}

            <HUDClock label="COLOMBO" className="hidden md:inline-flex" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-12 flex flex-col gap-20">
        {/* Lab Introduction Hero */}
        <div className="border border-line bg-surface/40 p-6 md:p-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <StatusChip status="operational" label="SYSTEM V2 ONLINE" pulse />
              <Tag>[ MOTION: {level.toUpperCase()} ]</Tag>
            </div>
            <h1 className="font-mono text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-fg">
              KRAT.OS COMPONENT & MOTION LAB
              <Caret />
            </h1>
            <p className="font-sans text-base md:text-lg text-fg-muted leading-relaxed">
              Interactive test bench for the Krat.OS v2 mechanical design language. Sharp rectangles,
              hairline 1px borders, precision monospace type, token-aware contrast, and zero-squish motion.
            </p>
          </div>
          <div className="absolute right-4 bottom-4 pointer-events-none opacity-20 hidden md:block">
            <HUDCoordinates />
          </div>
        </div>

        {/* 01 — BRAND DNA & PALETTE TOKENS */}
        <Section
          index="01"
          eyebrow="BRAND DNA"
          headline="Color Tokens & Contrast Verification"
          description="Sampled from the master vector wordmark. Red is a laser pointer (< 10% viewport), never a paint bucket."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { token: 'bg', hex: '#212121 / #F6EFDD', role: 'Viewport Background' },
              { token: 'surface', hex: '#2B2B2B / #EBE3CD', role: 'Windows & Cards' },
              { token: 'fg', hex: '#EFE3CF / #292926', role: 'Primary Monospace / Body' },
              { token: 'fg-muted', hex: '#A8A294 / #6B665A', role: 'Secondary Metadata' },
              { token: 'line', hex: '#3A3A3A / #D6CDB5', role: '1px Decorative Hairlines' },
              { token: 'line-strong', hex: '#7A7A7A / #8A8473', role: 'Inputs & Perceivable Borders' },
              { token: 'red', hex: '#FD142B', role: 'Signal Bar, LED, Caret' },
              { token: 'red-text', hex: '#FF4A5C / #C8102E', role: 'Accessible Small Red Type' },
              { token: 'ok', hex: '#3DDC84 / #1E9E5A', role: 'Operational LED Only' },
            ].map((c) => (
              <div key={c.token} className="border border-line bg-surface p-4 flex flex-col gap-2">
                <div className="font-mono text-xs font-bold text-red uppercase">--color-{c.token}</div>
                <div className="font-mono text-xs text-fg">{c.hex}</div>
                <div className="text-[11px] text-fg-muted">{c.role}</div>
              </div>
            ))}
          </div>

          {/* Logo Showcase with Glitch */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-line bg-bg p-8 flex flex-col items-center justify-center gap-4 text-center">
              <span className="font-mono text-xs text-fg-muted">{'// DARK THEME WORDMARK (HOVER TO GLITCH)'}</span>
              <Glitch>
                <Logo variant="dark" />
              </Glitch>
            </div>
            <div className="border border-line bg-[#F6EFDD] text-[#292926] p-8 flex flex-col items-center justify-center gap-4 text-center" data-theme="light">
              <span className="font-mono text-xs text-[#6B665A]">{'// LIGHT THEME WORDMARK (HOVER TO GLITCH)'}</span>
              <Glitch>
                <Logo variant="light" />
              </Glitch>
            </div>
          </div>
        </Section>

        {/* 02 — BUTTON PRIMITIVES & STATES */}
        <Section
          index="02"
          eyebrow="UI PRIMITIVES"
          headline="Mechanical Button Suite"
          description="Sharp rectangles (radius 0). Primary is cream fill with charcoal text and trailing red square. 1px press translate."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard Theme Buttons */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-6">
              <span className="font-mono text-xs text-fg-muted">{'// STANDARD SURFACE VARIANTS'}</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Estimate my project</Button>
                <Button variant="secondary">Book a 15-min call</Button>
                <Button variant="ghost">Read engineering logs</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-line">
                <Button variant="primary" size="sm">Small Primary</Button>
                <Button variant="primary" size="lg">Large Primary</Button>
                <Button variant="primary" isLoading>Processing...</Button>
                <Button variant="primary" disabled>System Locked</Button>
              </div>
            </div>

            {/* Inverted Light Section Override */}
            <div className="border border-[#D6CDB5] bg-[#EBE3CD] text-[#292926] p-6 flex flex-col gap-6" data-theme="light">
              <span className="font-mono text-xs text-[#6B665A]">{'// INVERTED LIGHT SURFACE (DATA-THEME="LIGHT")'}</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Estimate my project</Button>
                <Button variant="secondary">Secondary Outline</Button>
                <Button variant="ghost">Ghost Underline</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#D6CDB5]">
                <Button variant="primary" size="sm">Small Light</Button>
                <Button variant="secondary" size="sm">Outline Light</Button>
                <Button variant="primary" isLoading>Loading State</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* 03 — FORM CONTROLS & ESTIMATOR SELECTORS */}
        <Section
          index="03"
          eyebrow="INPUT INTERFACES"
          headline="Technical Form Primitives & KeyOptions"
          description="1px line-strong borders. Red caret expands on active focus. Monospace option rows designed for the project configurator."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard Inputs */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-5">
              <span className="font-mono text-xs text-fg-muted">{'// TEXT INPUTS & DROPDOWNS'}</span>
              <Input
                label="CLIENT_HANDLE"
                placeholder="founder@company.com"
                hint="We respond within 4 business hours"
              />
              <Input
                label="BUDGET_TARGET"
                placeholder="$15,000 USD"
                error="Value must be a valid positive range"
              />
              <Select
                label="PROJECT_TIMELINE"
                options={[
                  { label: "Immediate (Under 3 weeks)", value: "urgent" },
                  { label: "Standard (4 - 8 weeks)", value: "standard" },
                  { label: "Q4 Roadmap", value: "roadmap" },
                ]}
              />
              <Textarea
                label="SYSTEM_BRIEF"
                placeholder="Describe product architecture, current bottlenecks, or desired integrations..."
              />
            </div>

            {/* KeyOption Selectors */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <span className="font-mono text-xs text-fg-muted">{'// ESTIMATOR SELECTORS (CLICK TO TOGGLE)'}</span>
              <KeyOption
                label="Full-Stack Web Platform"
                description="Next.js App Router, Supabase auth, resilient backend APIs"
                shortcut="1"
                selected={keyOption1}
                onClick={() => setKeyOption1(!keyOption1)}
              />
              <KeyOption
                label="Mobile App Suite (iOS & Android)"
                description="Cross-platform React Native engine with offline sync"
                shortcut="2"
                selected={keyOption2}
                onClick={() => setKeyOption2(!keyOption2)}
              />
              <KeyOption
                label="Autonomous AI Pipeline & Agents"
                description="Custom tool orchestration, background jobs, structured LLM reasoning"
                shortcut="3"
                selected={keyOption3}
                onClick={() => setKeyOption3(!keyOption3)}
              />
              <KeyOption
                label="Legacy COBOL Migration"
                description="Module currently decommissioned"
                shortcut="4"
                disabled
              />
            </div>
          </div>
        </Section>

        {/* 04 — WINDOWS & OS METAPHOR */}
        <Section
          index="04"
          eyebrow="OS METAPHOR"
          headline="Window Panels & Draggable Frames"
          description="Every card is a window with a monospace title bar, 3 square control buttons, and 1px border. Drag me to test inertial movement."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative min-h-[360px]">
            {/* Static Window */}
            <Window
              title="service_spec.web"
              statusText="READY"
              cornerBrackets
              className="h-full"
            >
              <div className="flex flex-col gap-3">
                <Tag>[ NEXT.JS ARCHITECTURE ]</Tag>
                <h4 className="font-mono text-xl font-bold text-fg">Modern Web Systems</h4>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Fast, accessible, search-engine-indexed software platforms engineered with strict TypeScript
                  and microsecond database latency.
                </p>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                  <span className="font-mono text-xs text-red">LATENCY &lt; 20ms</span>
                  <Button variant="secondary" size="sm">Inspect Spec</Button>
                </div>
              </div>
            </Window>

            {/* Draggable Window */}
            <div className="relative border border-dashed border-line p-4 min-h-[320px] flex items-center justify-center">
              <span className="absolute top-2 left-2 font-mono text-[10px] text-fg-muted uppercase">
                {'// DRAGGABLE PLAYGROUND BOUNDARY'}
              </span>
              <Window
                title="interactive_terminal.sh"
                statusText="DRAGGABLE"
                draggable
                cornerBrackets
                className="w-full max-w-sm"
              >
                <div className="flex flex-col gap-2 font-mono text-xs">
                  <div className="text-red">&gt; window.init_drag()</div>
                  <div className="text-fg-muted">Click the top bar to drag this window around.</div>
                  <div className="text-ok">[ ok ] drag boundary active</div>
                  <div className="text-fg-muted">[ ok ] pointer cursor set to [drag]</div>
                </div>
              </Window>
            </div>
          </div>
        </Section>

        {/* 05 — ACCORDION & DISCLOSURES */}
        <Section
          index="05"
          eyebrow="DISCLOSURES"
          headline="Technical Accordion"
          description="Indexed rows (Q01..Qnn) with clean + to − glyph transitions, clip-path reveals, and red carets."
        >
          <div className="max-w-3xl mx-auto w-full">
            <Accordion
              items={[
                {
                  id: 'Q01',
                  title: 'How does Krat.OS estimate project timelines and scope?',
                  content:
                    'We break every engagement into discrete, verifiable modules with fixed budgets and exact deliverables. No open-ended hourly billing, no surprise invoices.',
                },
                {
                  id: 'Q02',
                  title: 'Who owns the intellectual property and repositories?',
                  content:
                    'You retain 100% full ownership of all code, assets, documentation, and infrastructure keys from commit zero.',
                },
                {
                  id: 'Q03',
                  title: 'What happens after our initial deployment goes live?',
                  content:
                    'We offer ongoing automated health monitoring, uptime alerting, and modular engineering sprints as your business scales.',
                },
              ]}
            />
          </div>
        </Section>

        {/* 06 — VELOCITY TAPE TICKER */}
        <Section
          index="06"
          eyebrow="MOTION TICKER"
          headline="Scroll-Reactive Tape"
          description="Mechanical mono ticker whose velocity dynamically accelerates with scroll speed. Pauses on hover."
        >
          <div className="border border-line bg-surface p-4 overflow-hidden">
            <Tape
              items={[
                'NEXT.JS 15 APP ROUTER',
                'TYPESCRIPT STRICT',
                'GSAP SCROLLTRIGGER',
                'WEBGL SHADERS',
                'SUPABASE LEADS',
                'RESEND DELIVERY',
                'LENIS SMOOTH SCROLL',
                'ZERO SQUISH MOTION',
              ]}
              speed={45}
            />
          </div>
        </Section>

        {/* 07 — NAMED FX LABORATORY */}
        <Section
          index="07"
          eyebrow="FX LABORATORY"
          headline="Named Effects Suite"
          description="Standardized FX components cataloged in src/components/fx/. Zero one-off ad-hoc animations."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FX 1: Decode */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Tag>[ FX.DECODE ]</Tag>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDecodeKey((k) => k + 1)}
                >
                  Retrigger
                </Button>
              </div>
              <div className="h-16 flex items-center">
                <Decode
                  key={decodeKey}
                  text="AUTONOMOUS_PIPELINE_OK"
                  className="font-mono text-xl font-bold text-fg"
                />
              </div>
              <span className="text-xs text-fg-muted">
                Scrambles through technical glyphs (_ / \ # 0 1) before settling left-to-right. Semantic DOM preserved.
              </span>
            </div>

            {/* FX 2: Odometer */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Tag>[ FX.ODOMETER ]</Tag>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setOdometerVal((v) => v + 1250)}
                  >
                    +1250
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setOdometerVal((v) => Math.max(1000, v - 1250))}
                  >
                    -1250
                  </Button>
                </div>
              </div>
              <div className="h-16 flex items-center">
                <Odometer
                  value={odometerVal}
                  prefix="$"
                  suffix=" USD"
                  className="text-2xl font-bold text-red"
                />
              </div>
              <span className="text-xs text-fg-muted">
                Mechanical rolling digit columns for stats and dynamic project pricing estimates.
              </span>
            </div>

            {/* FX 3: Tilt */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <Tag>[ FX.TILT ]</Tag>
              <Tilt maxAngle={6} glare className="h-32">
                <div className="h-full border border-line bg-bg p-4 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-sm font-bold text-fg">HOVER FOR 3D TILT</span>
                  <span className="text-[11px] text-fg-muted mt-1">Capped at 6deg with hairline glare</span>
                </div>
              </Tilt>
              <span className="text-xs text-fg-muted">
                3D perspective tracking with subtle glare. Automatically disabled under lite/off motion.
              </span>
            </div>

            {/* FX 4: Magnetic */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <Tag>[ FX.MAGNETIC ]</Tag>
              <div className="h-28 flex items-center justify-center">
                <Magnetic distance={8}>
                  <Button variant="primary">Magnetic CTA</Button>
                </Magnetic>
              </div>
              <span className="text-xs text-fg-muted">
                Mechanical 6–8px pull toward pointer. Disabled on touch and lite/off.
              </span>
            </div>

            {/* FX 5: Wipe */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Tag>[ FX.WIPE ]</Tag>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setWipeTrigger((t) => t + 1)}
                >
                  Sweep
                </Button>
              </div>
              <div className="h-28 relative overflow-hidden border border-line flex items-center justify-center">
                <Wipe key={wipeTrigger} direction="right" duration={0.6}>
                  <div className="bg-surface/80 p-4 font-mono text-sm text-fg">
                    REVEALED CONTENT BLOCK
                  </div>
                </Wipe>
              </div>
              <span className="text-xs text-fg-muted">
                Signal red bar sweep with precision clip-path reveal.
              </span>
            </div>

            {/* FX 6: HUD & Glitch */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <Tag>[ FX.HUD &amp; GLITCH ]</Tag>
              <div className="h-28 flex flex-col items-center justify-center gap-2">
                <Glitch>
                  <span className="font-mono text-lg font-bold text-fg uppercase tracking-widest cursor-pointer">
                    KRAT.OS [HOVER ME]
                  </span>
                </Glitch>
                <HUD showCoordinates showClock timeZone="Asia/Colombo" />
              </div>
              <span className="text-xs text-fg-muted">
                1–2 frame RGB displacement split (capped &lt; 3Hz) and micro-type live telemetry.
              </span>
            </div>
          </div>

          {/* TypeLines Terminal Sequence */}
          <div className="mt-8 border border-line bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <Tag>[ FX.TYPELINES TERMINAL SEQUENCE ]</Tag>
              <span className="font-mono text-xs text-ok">[ SYSTEM ONLINE ]</span>
            </div>
            <TypeLines
              lines={[
                { text: 'sys.boot(krat.os_kernel_v2.0)', status: 'ok', prompt: '$' },
                { text: 'connecting cloudflare edge nodes...', status: 'ok', delay: 200 },
                { text: 'verifying security tokens and rate limits...', status: 'ok', delay: 300 },
                { text: 'calibrating mechanical motion engine (GSAP + ogl)...', status: 'ok', delay: 400 },
                { text: 'lead engine /api/lead ready for incoming requests.', status: 'info', delay: 500 },
              ]}
            />
          </div>

          {/* Pipeline Circuit Draw */}
          <div className="mt-8 border border-line bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <Tag>[ FX.PIPELINE PACKET RUNNER ]</Tag>
              <span className="font-mono text-xs text-fg-muted">{'// 4-STAGE PROCESS'}</span>
            </div>
            <Pipeline
              nodes={[
                { id: '1', label: '01.SPEC' },
                { id: '2', label: '02.BUILD' },
                { id: '3', label: '03.TEST' },
                { id: '4', label: '04.DEPLOY' },
              ]}
              currentNodeId="2"
            />
          </div>
        </Section>

        {/* 08 — WEBGL SHADER & SPOTLIGHT GRID */}
        <Section
          index="08"
          eyebrow="BACKGROUND CANVASES"
          headline="WebGL Shader & Blueprint Dot Grid"
          description="High-performance dot matrix canvas warped by pointer position with red light source. Reverts cleanly to static blueprint grid in lite/off."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spotlight Grid */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <Tag>[ SPOTLIGHT BLUEPRINT GRID ]</Tag>
              <div className="relative h-64 border border-line overflow-hidden bg-bg">
                <SpotlightGrid dotSpacing={24} spotlightRadius={180} />
                <div className="relative z-10 flex h-full items-center justify-center font-mono text-xs text-fg-muted">
                  [ MOVE POINTER OVER GRID ]
                </div>
              </div>
              <span className="text-xs text-fg-muted">
                Blueprint grid with registration (+) marks and radial cursor glow. CSS fallback in lite/off.
              </span>
            </div>

            {/* WebGL ShaderField */}
            <div className="border border-line bg-surface p-6 flex flex-col gap-4">
              <Tag>[ OGL WEBGL SHADERFIELD ]</Tag>
              <div className="relative h-64 border border-line overflow-hidden bg-bg">
                <ShaderField />
                <div className="pointer-events-none absolute bottom-2 right-2 font-mono text-[10px] text-fg-muted bg-surface/90 px-1.5 py-0.5 border border-line">
                  GL_CANVAS_ACTIVE
                </div>
              </div>
              <span className="text-xs text-fg-muted">
                Single WebGL canvas using ogl, capped DPR at 1.5, automatically destroyed on unmount.
              </span>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer OS Status Bar */}
      <footer className="mt-20 border-t border-line bg-surface/80 px-4 py-3 font-mono text-xs text-fg-muted">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ok" />
            <span className="text-fg font-medium">KRAT.OS_SYS_V2.0</span>
            <span>{'// ALL RUNTIMES HEALTHY'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>BRANCH: REDESIGN/KRAT-OS-V2</span>
            <span>[NOINDEX]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
