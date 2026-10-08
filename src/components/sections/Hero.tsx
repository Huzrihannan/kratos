"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { GooeyBlobs } from "@/components/fx/GooeyBlobs";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Squish } from "@/components/fx/Squish";
import { Magnetic } from "@/components/fx/Magnetic";
import { siteConfig } from "@/content/site";
import { useLayoutModal } from "@/lib/modal-context";

export function Hero() {
  const { openEstimator } = useLayoutModal();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);

  // Defer heavy canvas blob mounting until after initial paint for instant LCP
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax tilt logic for the signature interactive portal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-180, 180], [8, -8]);
  const tiltY = useTransform(smoothMouseX, [-180, 180], [-8, 8]);

  const handlePortalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !portalRef.current) return;
    const rect = portalRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handlePortalMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const placeholderPartners = [
    "[PLACEHOLDER] NovaLab",
    "[PLACEHOLDER] Bloomly",
    "[PLACEHOLDER] PulseFlow",
    "[PLACEHOLDER] OrbitCraft",
  ];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden bg-cream px-4 sm:px-6 md:px-12 lg:px-16 pt-4 sm:pt-8 pb-12">
      {/* Background GooeyBlobs Layer — loaded after mount to guarantee instant LCP */}
      {mounted && (
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-80"
          aria-hidden="true"
        >
          <GooeyBlobs
            blobCount={5}
            speed={0.8}
            cursorAttraction={0.04}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Main Hero Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center flex-1 my-auto">
        {/* Left Column: Headlines, CTAs, and Trust Strip (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left pt-2 sm:pt-4">
          {/* Availability Pill */}
          <motion.div
            initial={prefersReducedMotion ? {} : { y: 8 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 24,
            }}
            className="mb-4 sm:mb-6"
          >
            <Pill variant="availability">
              {siteConfig.availability.chipText}
            </Pill>
          </motion.div>

          {/* Signature Headline (Fredoka, tight leading, spring overshoot, self-drawing underline blobs) */}
          <h1 className="font-display font-bold text-ink leading-[1.08] sm:leading-[1.05] tracking-tight text-[clamp(2.15rem,5.8vw,5.5rem)] text-balance">
            {/* "Software that's " */}
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? {} : { y: 12 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 20,
                delay: prefersReducedMotion ? 0 : 0.05,
              }}
            >
              Software that&apos;s&nbsp;
            </motion.span>

            {/* "strong" with self-drawing rounded underline blob */}
            <motion.span
              className="relative inline-block whitespace-nowrap text-ink"
              initial={prefersReducedMotion ? {} : { y: 12 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 20,
                delay: prefersReducedMotion ? 0 : 0.15,
              }}
            >
              <span>strong</span>
              {/* Hand-drawn rounded orange underline blob */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-2.5 sm:h-3 text-orange overflow-visible pointer-events-none"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M 2 6 Q 25 1 50 5 Q 75 9 98 4"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: prefersReducedMotion ? 0 : 0.45,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </svg>
            </motion.span>

            {/* " underneath." */}
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? {} : { y: 12 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 20,
                delay: prefersReducedMotion ? 0 : 0.22,
              }}
            >
              &nbsp;underneath.
            </motion.span>

            <br className="hidden sm:inline" />

            {/* "Friendly" with self-drawing rounded orange underline blob */}
            <motion.span
              className="relative inline-block whitespace-nowrap text-ink"
              initial={prefersReducedMotion ? {} : { y: 12 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 20,
                delay: prefersReducedMotion ? 0 : 0.3,
              }}
            >
              <span>Friendly</span>
              {/* Hand-drawn rounded orange underline blob */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-2.5 sm:h-3 text-orange overflow-visible pointer-events-none"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M 2 5 Q 30 9 55 5 Q 80 1 98 5"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: prefersReducedMotion ? 0 : 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </svg>
            </motion.span>

            {/* " on top." */}
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? {} : { y: 12 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 20,
                delay: prefersReducedMotion ? 0 : 0.38,
              }}
            >
              &nbsp;on top.
            </motion.span>
          </h1>

          {/* Sub-headline (Outfit, max 55ch) */}
          <motion.p
            initial={prefersReducedMotion ? {} : { y: 8 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 24,
            }}
            className="mt-5 mb-7 max-w-[55ch] text-base sm:text-lg md:text-xl text-ink-soft leading-relaxed font-body font-normal"
          >
            We build web apps, mobile apps and smart automations for teams who
            want results, without the jargon or the runaround.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={prefersReducedMotion ? {} : { y: 8 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 24,
            }}
            className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
          >
            <Magnetic strength={0.22}>
              <Button
                variant="primary"
                size="lg"
                href={siteConfig.cta.estimator.href}
                onClick={(e) => {
                  e.preventDefault();
                  openEstimator();
                }}
                withArrow
                className="w-full sm:w-auto text-base sm:text-lg min-h-[50px]"
              >
                {siteConfig.cta.estimator.label}
              </Button>
            </Magnetic>

            <Button
              variant="ghost"
              size="lg"
              href="/work"
              withArrow={false}
              className="w-full sm:w-auto text-base sm:text-lg min-h-[50px] border-ink/30 hover:border-ink hover:bg-peach/30"
            >
              See our work
            </Button>
          </motion.div>

          {/* Trust Strip Under CTAs */}
          <motion.div
            initial={prefersReducedMotion ? {} : { y: 8 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 350,
              damping: 25,
            }}
            className="mt-8 sm:mt-10 pt-5 border-t border-peach/80 w-full"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft/80 shrink-0 font-body">
                Trusted by founders &amp; teams at:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {placeholderPartners.map((partner) => (
                  <span
                    key={partner}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-peach/70 text-ink-soft text-xs font-medium border border-orange/15 shadow-2xs"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Signature Interactive Circular Portal (5 cols on lg) */}
        <div className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0">
          <div
            ref={portalRef}
            onMouseMove={handlePortalMouseMove}
            onMouseLeave={handlePortalMouseLeave}
            className="relative flex items-center justify-center cursor-default select-none perspective-1000"
          >
            {/* Circular Portal Frame (Portal motif echoing 'a' and 'o' logo counters) */}
            <motion.div
              style={{
                rotateX: prefersReducedMotion ? 0 : tiltX,
                rotateY: prefersReducedMotion ? 0 : tiltY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-br from-peach/85 via-peach/50 to-orange/20 border-4 border-orange/35 shadow-blob flex items-center justify-center overflow-hidden"
            >
              {/* Inner ambient glow blobs */}
              <div
                className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-orange/20 blur-2xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-butter/30 blur-2xl"
                aria-hidden="true"
              />

              {/* Scaled Cards Container to ensure perfect responsive fit */}
              <div className="relative w-full h-full scale-[0.74] sm:scale-[0.88] lg:scale-100 origin-center">
                {/* Card 1: Chat Bubble Card (Top Left) */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [-5, 5, -5],
                          rotate: [-1, 1, -1],
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 4.6,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 left-8 z-20 max-w-[210px] p-3.5 rounded-[22px] bg-cream/95 backdrop-blur-md shadow-card border border-orange/20"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-orange/25 text-ink flex items-center justify-center text-[10px] font-bold">
                      K
                    </span>
                    <span className="text-[11px] font-bold text-ink tracking-tight">
                      Sprint Chat
                    </span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-butter animate-pulse" />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="bg-peach/50 px-2.5 py-1.5 rounded-2xl text-ink-soft text-[11px]">
                      &ldquo;Can we ship to production?&rdquo;
                    </div>
                    <div className="bg-orange text-ink font-semibold px-2.5 py-1.5 rounded-2xl text-[11px] flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Deployed &amp; live! 🚀</span>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: Conversion Metric Pill Card (Center Right) */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [5, -7, 5],
                          rotate: [1, -1, 1],
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 5.2,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="absolute top-36 right-6 z-30 p-3.5 rounded-[26px] bg-cream/95 backdrop-blur-md shadow-card border border-orange/20 min-w-[195px]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 text-ink font-bold text-xs">
                      <TrendingUp className="w-4 h-4 stroke-[2.5] text-orange-deep" />
                      <span>Conversion</span>
                    </div>
                    <span className="text-[10px] bg-butter px-2 py-0.5 rounded-full font-bold text-ink">
                      +142%
                    </span>
                  </div>
                  {/* Mini SVG Sparkline */}
                  <svg
                    className="w-full h-7 text-orange"
                    viewBox="0 0 100 28"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 2 22 Q 25 20 45 12 T 75 10 T 98 4"
                      stroke="#FB9A5E"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="98" cy="4" r="3.5" fill="#F47B3A" />
                  </svg>
                  <div className="flex justify-between items-center text-[10px] text-ink-soft font-medium mt-0.5">
                    <span>99.9% uptime</span>
                    <span className="font-semibold text-ink">0.4s LCP</span>
                  </div>
                </motion.div>

                {/* Card 3: Quality Checkmark Chip (Bottom Center) */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [-4, 5, -4],
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 4.8,
                    ease: "easeInOut",
                    delay: 1.6,
                  }}
                  className="absolute bottom-8 left-10 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-cocoa text-cream shadow-card border border-butter/30 text-xs font-semibold"
                >
                  <div className="w-4 h-4 rounded-full bg-butter text-ink flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 stroke-[2.8]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-cream">
                      100% Type-Safe • 0 Jargon
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex justify-center pt-6 sm:pt-4">
        <Squish>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-peach/80 hover:bg-peach text-ink font-semibold text-xs uppercase tracking-wider transition-colors shadow-subtle border border-orange/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
            aria-label="Explore our solutions"
          >
            <span>Explore our solutions</span>
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.span>
          </Link>
        </Squish>
      </div>
    </section>
  );
}
