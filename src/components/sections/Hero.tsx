"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { StatusChip } from "@/components/ui/StatusChip";
import { Tape } from "@/components/ui/Tape";
import { Decode } from "@/components/fx/Decode";
import { Caret } from "@/components/fx/Caret";
import { Magnetic } from "@/components/fx/Magnetic";
import { HUDClock, HUDCoordinates } from "@/components/fx/HUD";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { useLayoutModal } from "@/lib/modal-context";
import { useTheme } from "@/themes/ThemeProvider";
import { siteConfig } from "@/content/site";
import { TerminalWindow } from "./hero/TerminalWindow";
import { CodeWindow } from "./hero/CodeWindow";
import { SignalWindow } from "./hero/SignalWindow";

import { caseStudiesData } from "@/content/work";
import { isPublishable } from "@/lib/content-status";

// Lazy-load ShaderField with no SSR so ogl never delays initial LCP paint in Dark/Light
const ShaderField = dynamic(
  () => import("@/components/fx/ShaderField").then((mod) => mod.ShaderField),
  { ssr: false }
);

import { VineUnderline } from "@/themes/dream/art/VineUnderline";
import { Poppy } from "@/themes/dream/art/flowers/Poppy";
import { DreamHeroScene } from "@/themes/dream/scenes/DreamHeroScene";
import { useSky } from "@/themes/dream/world/SkyContext";

export function Hero() {
  const { theme } = useTheme();
  const { state: skyState } = useSky();
  const { openEstimator } = useLayoutModal();
  const { isFull } = useMotionLevel();
  const [shaderMounted, setShaderMounted] = useState(false);
  const [activeWindow, setActiveWindow] = useState<"terminal" | "code" | "signal">("terminal");
  const [mounted, setMounted] = useState(false);
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const hasPublishedWork = caseStudiesData.some(isPublishable);

  const isDream = theme === "dream";
  const isDarkSky = isDream && (skyState?.heroFg === "#FFF6E5");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      (window as unknown as { __HERO_THEME__?: string }).__HERO_THEME__ = theme;
    }
  }, [theme]);

  // Defer ShaderField until after first paint on desktop viewports (Dark/Light only)
  useEffect(() => {
    if (isDream || !isFull || (typeof window !== "undefined" && window.innerWidth < 1024)) return;

    const triggerMount = () => setShaderMounted(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = (window as Window).requestIdleCallback(triggerMount, { timeout: 1200 });
      return () => (window as Window).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(triggerMount, 400);
      return () => clearTimeout(timer);
    }
  }, [isFull, isDream]);

  const handlePointerInteraction = () => {
    if (!isDream && !shaderMounted && isFull && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setShaderMounted(true);
    }
  };

  // Verified client logos only (empty until client permits display)
  const partnerLogos: string[] = [];

  return (
    <section
      onPointerMove={handlePointerInteraction}
      data-theme={theme}
      className={`relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 pt-12 sm:pt-14 pb-10 select-auto transition-colors duration-300 ${
        isDream
          ? isDarkSky
            ? "bg-transparent text-[#FFF6E5]"
            : "bg-transparent text-[var(--dream-ink,#2B2A52)]"
          : "bg-bg text-fg"
      }`}
    >
      {/* 1. THEMED ATMOSPHERE & BACKGROUND SCENE */}
      {isDream ? (
        <>
          {/* High-Contrast Readability Scrim Behind Typography in Living Sky */}
          <div
            className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500"
            style={{
              background: isDarkSky
                ? "radial-gradient(ellipse 75% 65% at 30% 40%, rgba(15, 20, 56, 0.72) 0%, rgba(15, 20, 56, 0.45) 45%, transparent 75%)"
                : "radial-gradient(ellipse 75% 65% at 30% 40%, rgba(255, 250, 240, 0.72) 0%, rgba(255, 250, 240, 0.45) 45%, transparent 75%)",
            }}
            aria-hidden="true"
          />
          {/* Dream Hero Atmospheric Scene (Hot-Air Balloon, Birds, Meadow Crest, Cloud Cards) */}
          {mounted && <DreamHeroScene />}
        </>
      ) : (
        <>
          {/* LAYER 1: Static Blueprint Dot Grid with + Registration Marks (Server Painted Instantly) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 select-none z-0"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="hero-blueprint-pattern"
                width="44"
                height="44"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="22" cy="22" r="1" fill="var(--line-strong)" opacity="0.6" />
                <path d="M 0 3 L 0 -3 M -3 0 L 3 0" stroke="var(--line-strong)" strokeWidth="1" opacity="0.45" />
                <path d="M 44 3 L 44 -3 M 41 0 L 47 0" stroke="var(--line-strong)" strokeWidth="1" opacity="0.45" />
                <path d="M 0 47 L 0 41 M -3 44 L 3 44" stroke="var(--line-strong)" strokeWidth="1" opacity="0.45" />
                <path d="M 44 47 L 44 41 M 41 44 L 47 44" stroke="var(--line-strong)" strokeWidth="1" opacity="0.45" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-blueprint-pattern)" />
          </svg>

          {/* Layer 1b: Soft Red Radial Glow (Server Painted) */}
          <div
            className="absolute inset-0 pointer-events-none select-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 30%, rgba(253, 20, 43, 0.08) 0%, rgba(253, 20, 43, 0.015) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* LAYER 2: Noise / Grain Overlay (3.5% mix-blend-overlay) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay select-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />

          {/* High-Contrast Readability Scrim Behind Typography & CTAs */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 30% 45%, var(--bg) 0%, transparent 80%)",
              opacity: 0.7,
            }}
            aria-hidden="true"
          />

          {/* LAYER 3: WebGL ShaderField (Loaded deferred on desktop; lite/off/mobile keeps layer 1 only) */}
          {shaderMounted && isFull && (
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0" aria-hidden="true">
              <ShaderField />
            </div>
          )}

          {/* HUD CORNERS (aria-hidden) */}
          <div
            className="absolute top-4 left-4 sm:top-5 sm:left-8 z-20 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-fg-muted/70 uppercase tracking-[0.08em] select-none"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 bg-red-text rounded-[1px]" />
            <span>KRAT.OS // SOFTWARE SOLUTIONS // V2.0</span>
          </div>

          <div
            className="absolute top-4 right-4 sm:top-5 sm:right-8 z-20 pointer-events-none flex items-center gap-2 select-none"
            aria-hidden="true"
          >
            <HUDClock timeZone="Asia/Colombo" label="CMB" />
          </div>

          <div
            className="absolute bottom-4 left-4 sm:bottom-5 sm:left-8 z-20 pointer-events-none hidden lg:flex items-center gap-2 select-none"
            aria-hidden="true"
          >
            <HUDCoordinates prefix="LOC" />
          </div>

          <div
            className="absolute bottom-4 right-4 sm:bottom-5 sm:right-8 z-20 pointer-events-none flex items-center gap-2 font-mono text-[10px] text-fg-muted/70 uppercase tracking-[0.08em] select-none"
            aria-hidden="true"
          >
            <span>scroll</span>
            <div className="h-5 w-[2px] bg-line relative overflow-hidden">
              <div className="absolute inset-x-0 h-2 bg-red animate-hero-scroll-pill" />
            </div>
          </div>
        </>
      )}

      {/* 2. MAIN HERO GRID (SHARED CONTENT ARCHITECTURE) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto pt-6 sm:pt-8 pb-8">
        {/* LEFT COLUMN: Typography, CTAs, Availability & Trust (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Availability Status Chip */}
          <div className="mb-4 sm:mb-6">
            {isDream ? (
              <div
                data-testid="dream-availability-chip"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--dream-paper,#FFFAF0)]/90 border border-[var(--dream-paper-2,#FFF1DC)] shadow-xs"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] animate-pulse" />
                <span className="text-xs font-sans font-medium text-[var(--dream-ink,#2B2A52)]">
                  {siteConfig.availability.status === "available"
                    ? "We're open for new projects"
                    : "We're resting. Leave us a note."}
                </span>
              </div>
            ) : (
              <StatusChip status="ok" label={siteConfig.availability.chipText} />
            )}
          </div>

          {/* Decorative Flair (Dream only) */}
          {isDream && (
            <div className="mb-2">
              <span
                className={`font-serif italic text-sm tracking-wide transition-colors duration-300 ${
                  isDarkSky ? "text-[#CFCBEA]" : "text-[var(--dream-ink-soft,#55537A)]"
                }`}
              >
                Plant an idea. Watch it bloom.
              </span>
            </div>
          )}

          {/* Headline (Exact words across themes; Fraunces in Dream, JetBrains Mono in Dark/Light) */}
          {isDream ? (
            <h1
              data-testid="hero-headline-dream"
              className={`font-serif font-semibold text-[clamp(2.35rem,5.8vw,5.5rem)] leading-[1.08] tracking-[-0.02em] mb-6 max-w-[16ch] transition-colors duration-300 ${
                isDarkSky ? "text-[#FFF6E5]" : "text-[var(--dream-ink,#2B2A52)]"
              }`}
            >
              We build the software{" "}
              <span className="inline sm:inline-block">your business</span>{" "}
              <span className="relative inline-block">
                runs
                <VineUnderline />
              </span>{" "}
              on.
            </h1>
          ) : (
            <h1 className="font-mono font-extrabold text-fg text-[clamp(1.85rem,5.2vw,5.25rem)] leading-[1.0] tracking-[-0.04em] mb-6">
              <span className="block overflow-hidden">
                <span className="inline-block animate-hero-line-1">
                  <span className="sm:hidden">We build the</span>
                  <span className="hidden sm:inline">We build the software</span>
                </span>
              </span>
              <span className="block overflow-hidden sm:hidden">
                <span className="inline-block animate-hero-line-2">
                  software your
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block animate-hero-line-3 sm:animate-hero-line-2">
                  <span className="hidden sm:inline">your </span>business{" "}
                  <span className="text-red font-mono font-extrabold inline-flex items-baseline">
                    <Decode text="runs on." speed={34} delay={300} />
                  </span>
                  <Caret className="ml-1 sm:ml-2" width={8} height="0.82em" />
                </span>
              </span>
            </h1>
          )}

          {/* Subhead (Exact words across themes; Figtree in Dream, Geist in Dark/Light) */}
          <p
            className={`font-sans leading-relaxed max-w-[55ch] mb-8 transition-colors duration-300 ${
              isDream
                ? isDarkSky
                  ? "text-[#CFCBEA] text-lg sm:text-xl font-normal"
                  : "text-[var(--dream-ink-soft,#55537A)] text-lg sm:text-xl font-normal"
                : "text-fg-muted text-base sm:text-lg"
            }`}
          >
            Web apps, mobile apps and automation, designed and engineered end to
            end. Plain talk, precise work.
          </p>

          {/* CTAs (Exact destinations across themes) */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {isDream ? (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full px-7 py-3 text-sm font-semibold shadow-md flex items-center gap-2.5 bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] border border-[var(--dream-paper-2,#FFF1DC)] hover:bg-[var(--dream-paper-2,#FFF1DC)] hover:scale-102 transition-all group"
                  onClick={openEstimator}
                >
                  <Poppy state="bloom" size={18} />
                  <span>Estimate my project</span>
                </Button>
                <Link
                  href={hasPublishedWork ? "/work" : "/services"}
                  className={`group relative inline-flex items-center py-2 px-3 font-sans text-sm font-medium transition-colors ${
                    isDarkSky
                      ? "text-[#FFF6E5] hover:text-[#FFC83D]"
                      : "text-[var(--dream-link,#3B3AA0)] hover:text-[var(--dream-ink,#2B2A52)]"
                  }`}
                >
                  <span>{hasPublishedWork ? "See our work" : "Explore modules"}</span>
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-[1.5px] transition-colors rounded-full ${
                      isDarkSky
                        ? "bg-[#FFF6E5]/40 group-hover:bg-[#FFC83D]"
                        : "bg-[var(--dream-link,#3B3AA0)]/40 group-hover:bg-[var(--dream-link,#3B3AA0)]"
                    }`}
                  />
                </Link>
              </>
            ) : (
              <>
                <Magnetic>
                  <Button variant="primary" size="lg" onClick={openEstimator}>
                    Estimate my project
                  </Button>
                </Magnetic>
                <Button
                  variant="ghost"
                  size="lg"
                  href={hasPublishedWork ? "/work" : "/services"}
                >
                  {hasPublishedWork ? "See our work" : "Explore modules"}
                </Button>
              </>
            )}
          </div>

          {/* Trust Strip Tape (Dark/Light only, rendered when verified client logos exist) */}
          {!isDream && partnerLogos.length > 0 && (
            <div className="w-full max-w-xl">
              <div className="text-[10px] font-mono text-fg-muted/60 uppercase tracking-[0.08em] mb-2 flex items-center gap-2 select-none">
                <span>TRUSTED ARCHITECTURE</span>
                <span className="h-px bg-line/80 flex-1" />
              </div>
              <Tape
                items={partnerLogos}
                separator="///"
                speed={34}
                className="border-line bg-surface/40"
              />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive OS Windows (Dark/Light) or Open Sky/Scene Area (Dream) */}
        {!isDream && (
          <div
            ref={dragContainerRef}
            className="lg:col-span-5 relative w-full flex flex-col lg:h-[480px] lg:justify-center items-center lg:items-end"
          >
            {/* WINDOW 1: Terminal Window */}
            <div className="w-full max-w-[420px] lg:absolute lg:top-8 lg:left-0 z-20">
              <TerminalWindow
                draggable={true}
                dragConstraints={dragContainerRef}
                zIndex={activeWindow === "terminal" ? 35 : 20}
                onBringToFront={() => setActiveWindow("terminal")}
                className="w-full shadow-card"
              />
            </div>

            {/* WINDOW 2: Code Window */}
            <div className="hidden lg:block w-[340px] absolute -top-4 right-0 z-10">
              <CodeWindow
                draggable={true}
                dragConstraints={dragContainerRef}
                zIndex={activeWindow === "code" ? 35 : 15}
                onBringToFront={() => setActiveWindow("code")}
                className="w-full shadow-card opacity-95 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* WINDOW 3: Signal Waveform Window */}
            <div className="hidden lg:block w-[290px] absolute bottom-2 right-4 z-10">
              <SignalWindow
                draggable={true}
                dragConstraints={dragContainerRef}
                zIndex={activeWindow === "signal" ? 35 : 10}
                onBringToFront={() => setActiveWindow("signal")}
                className="w-full shadow-card opacity-95 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        )}
        {isDream && (
          <div className="hidden lg:block lg:col-span-5 h-[480px] pointer-events-none" />
        )}
      </div>
    </section>
  );
}
