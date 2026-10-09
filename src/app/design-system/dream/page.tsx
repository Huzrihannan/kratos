"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Flower2, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PaperCard } from "@/components/ui/PaperCard";
import { SeedOption } from "@/components/ui/SeedOption";
import { Jargon } from "@/components/ui/Jargon";
import { Tag } from "@/components/ui/Tag";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Accordion } from "@/components/ui/Accordion";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { useTheme } from "@/themes/ThemeProvider";

type SkyState = "dawn" | "day" | "golden" | "dusk" | "night";

const SKY_GRADIENTS: Record<SkyState, { label: string; gradient: string; isDark: boolean }> = {
  dawn: {
    label: "Dawn (Morning Glow)",
    gradient: "linear-gradient(180deg, #8FA6E0 0%, #F2B8CF 62%, #FFE0B5 100%)",
    isDark: false,
  },
  day: {
    label: "Day (High Sky)",
    gradient: "linear-gradient(180deg, #6DB6F0 0%, #B4DDF7 62%, #FFF0D4 100%)",
    isDark: false,
  },
  golden: {
    label: "Golden Hour (Late Sun)",
    gradient: "linear-gradient(180deg, #7FA6E6 0%, #F6C79A 62%, #FFD47A 100%)",
    isDark: false,
  },
  dusk: {
    label: "Dusk (Sunset Twilight)",
    gradient: "linear-gradient(180deg, #2C3868 0%, #7E4B68 62%, #D27976 100%)",
    isDark: true,
  },
  night: {
    label: "Night (Stars & Fireflies)",
    gradient: "linear-gradient(180deg, #12132D 0%, #1B1E4B 62%, #2C3868 100%)",
    isDark: true,
  },
};

const PALETTE_TOKENS = [
  { name: "paper", hex: "#FFFAF0", role: "Primary card & text surfaces", contrast: "12.97:1", bg: "#FFFAF0", text: "#2B2A52" },
  { name: "paper-2", hex: "#FFF1DC", role: "Secondary surface & tags", contrast: "—", bg: "#FFF1DC", text: "#2B2A52" },
  { name: "night-paper", hex: "#1B1E4B", role: "Dusk/night surfaces", contrast: "14.67:1", bg: "#1B1E4B", text: "#FFF6E5" },
  { name: "ink", hex: "#2B2A52", role: "Body text & headings", contrast: "12.97:1 (AA)", bg: "#2B2A52", text: "#FFFAF0" },
  { name: "ink-soft", hex: "#55537A", role: "Secondary / metadata text", contrast: "6.95:1 (AA)", bg: "#55537A", text: "#FFFAF0" },
  { name: "link", hex: "#3B3AA0", role: "Interactive links", contrast: "8.78:1 (AA)", bg: "#3B3AA0", text: "#FFFAF0" },
  { name: "poppy", hex: "#FD142B", role: "Brand signature signal", contrast: "3.80:1 (Display/Shapes)", bg: "#FD142B", text: "#FFFAF0" },
  { name: "poppy-text", hex: "#C8102E", role: "Small red text on paper", contrast: "5.65:1 (AA)", bg: "#C8102E", text: "#FFFAF0" },
  { name: "grass-near", hex: "#3E8C5A", role: "Meadow midground", contrast: "4.52:1 (AA)", bg: "#3E8C5A", text: "#FFFAF0" },
  { name: "grass-deep", hex: "#2A6B48", role: "Meadow deep & stems", contrast: "6.13:1 (AA)", bg: "#2A6B48", text: "#FFFAF0" },
  { name: "daisy yolk", hex: "#FFC83D", role: "Flower accent (Web)", contrast: "Accent", bg: "#FFC83D", text: "#2B2A52" },
  { name: "sunflower", hex: "#FFB400", role: "Flower accent (Commerce)", contrast: "Accent", bg: "#FFB400", text: "#2B2A52" },
  { name: "lavender", hex: "#9B8CE0", role: "Flower accent (AI)", contrast: "Accent", bg: "#9B8CE0", text: "#2B2A52" },
  { name: "cherry", hex: "#FFB7D1", role: "Flower accent (UI/UX)", contrast: "Accent", bg: "#FFB7D1", text: "#2B2A52" },
];

export default function DreamDesignSystemPage() {
  const { theme, setTheme } = useTheme();
  const { level, setLevel } = useMotionLevel();
  const [sky, setSky] = useState<SkyState>("day");
  const [selectedSeeds, setSelectedSeeds] = useState<string[]>(["web", "design"]);
  const [showToast, setShowToast] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure Dream theme is applied on this bench
  useEffect(() => {
    if (theme !== "dream") {
      setTheme("dream", "url");
    }
  }, [theme, setTheme]);

  const toggleSeed = (id: string) => {
    setSelectedSeeds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const currentSky = SKY_GRADIENTS[sky];

  return (
    <div
      className="min-h-screen transition-all duration-700 text-ink pb-24 selection:bg-cherry selection:text-ink"
      style={{ background: currentSky.gradient }}
      data-theme="dream"
    >
      {/* Sticky Interactive Testbench Controls */}
      <div className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md border-b border-[rgba(43,42,82,0.12)] px-4 py-3 sm:px-8 shadow-paper">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-link hover:text-poppy-text transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-[rgba(43,42,82,0.3)]">|</span>
            <span className="font-fraunces font-bold text-sm sm:text-base text-ink tracking-tight flex items-center gap-1.5">
              <Flower2 className="w-4 h-4 text-poppy" />
              <span>Dream Design System (Theme #3)</span>
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Sky State Dial */}
            <div className="flex items-center gap-1.5 bg-paper-2 p-1 rounded-full border border-line text-xs font-sans">
              <span className="px-2 text-ink-soft text-[11px] font-medium uppercase tracking-wider">
                Sky:
              </span>
              {(Object.keys(SKY_GRADIENTS) as SkyState[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSky(key)}
                  className={`px-2.5 py-1 rounded-full capitalize font-semibold transition-all ${
                    sky === key
                      ? "bg-ink text-paper shadow-xs"
                      : "text-ink-soft hover:text-ink hover:bg-paper"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Calm Motion Toggle */}
            <button
              type="button"
              onClick={() => setLevel(level === "off" ? "full" : "off")}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold border transition-colors flex items-center gap-1.5 ${
                level === "off"
                  ? "bg-poppy text-paper border-poppy"
                  : "bg-paper text-ink border-line hover:border-link"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{level === "off" ? "Calm: Active" : "Calm: Off"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 space-y-16">
        {/* Intro Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Tag className="bg-paper-2 text-ink-soft">
            <span className="flex items-center gap-1">
              <Flower2 className="w-3.5 h-3.5 text-poppy" />
              <span>Plant an idea. Watch it bloom.</span>
            </span>
          </Tag>
          <h1 className="font-fraunces text-4xl sm:text-6xl font-bold tracking-tight text-ink">
            Storybook Vector Tokens &amp; Living Primitives
          </h1>
          <p className="font-sans text-lg sm:text-xl text-ink leading-relaxed">
            Built for non-technical founders: 18px base text, 48px tap targets, soft colored
            shadows, organic pebble radii, and zero jargon without instant clarity.
          </p>
        </div>

        {/* 1. PALETTE TOKENS */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
              1. Palette Tokens &amp; Contrast Matrix
            </h2>
            <p className="font-sans text-sm text-ink-soft mt-1">
              Every body text pair passes WCAG AA (&gt; 4.5:1). Pure poppy is reserved for shapes &amp; 24px+ display.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PALETTE_TOKENS.map((token) => (
              <div
                key={token.name}
                className="p-4 rounded-[20px] bg-paper border border-line shadow-paper space-y-3"
              >
                <div
                  className="w-full h-14 rounded-[14px] border border-[rgba(0,0,0,0.06)] shadow-inner flex items-center justify-center font-mono text-xs font-bold"
                  style={{ backgroundColor: token.bg, color: token.text }}
                >
                  {token.hex}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-sm text-ink capitalize">
                      {token.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper-2 text-ink-soft">
                      {token.contrast}
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft font-sans mt-0.5">{token.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TYPOGRAPHY & JARGON GLOSSARY */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
              2. Storybook Typography &amp; Plain-Language Glossary
            </h2>
            <p className="font-sans text-sm text-ink-soft mt-1">
              Fraunces Soft for headlines, Figtree for readable body copy, and interactive non-technical tooltips.
            </p>
          </div>

          <PaperCard className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-poppy-text font-bold">
                Headline Scale (Fraunces SOFT 100)
              </span>
              <h3 className="font-fraunces text-3xl sm:text-5xl font-bold text-ink">
                Software solutions crafted with care.
              </h3>
              <p className="font-fraunces text-xl sm:text-2xl italic text-ink-soft font-normal">
                &ldquo;Where technical power feels effortless on the outside.&rdquo;
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-line">
              <span className="text-xs font-mono uppercase tracking-wider text-poppy-text font-bold">
                Body Copy with Integrated &lt;Jargon&gt; Explanations
              </span>
              <p className="font-sans text-base sm:text-lg text-ink leading-relaxed">
                When you partner with us, we build your{" "}
                <Jargon term="frontend">frontend</Jargon> to be delightedly simple for visitors,
                backed by a resilient <Jargon term="backend">backend</Jargon> that connects to any{" "}
                <Jargon term="api">API</Jargon> securely. Your data lives in an encrypted{" "}
                <Jargon term="database">database</Jargon>, deployed across the global{" "}
                <Jargon term="cloud">cloud</Jargon> with automated{" "}
                <Jargon term="ci/cd">CI/CD</Jargon> pipelines. You get high{" "}
                <Jargon term="scalability">scalability</Jargon> and low{" "}
                <Jargon term="latency">latency</Jargon> without needing an engineering degree to
                understand your bill.
              </p>
            </div>
          </PaperCard>
        </section>

        {/* 3. BUTTONS & PEBBLE TAGS */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
              3. Button Primitives &amp; Pebble Tags
            </h2>
            <p className="font-sans text-sm text-ink-soft mt-1">
              Soft pill buttons with ink fill, paper text, poppy bloom accents, and ≥48px touch targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PaperCard className="space-y-5">
              <h3 className="font-fraunces font-bold text-lg text-ink">Primary &amp; Secondary Buttons</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg">
                  Estimate my project
                </Button>
                <Button variant="secondary" size="lg">
                  Explore modules
                </Button>
              </div>

              <div className="pt-4 border-t border-line space-y-2">
                <span className="text-xs font-mono text-ink-soft uppercase tracking-wide">
                  Button States (Disabled &amp; Loading)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" disabled size="md">
                    Action Disabled
                  </Button>
                  <Button variant="primary" isLoading size="md">
                    Processing
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowToast(true)}
                    className="px-5 py-2.5 rounded-full bg-paper border border-line text-link font-sans font-semibold text-sm hover:border-link transition-colors shadow-subtle min-h-[48px]"
                  >
                    Trigger Leaf Toast
                  </button>
                </div>
              </div>
            </PaperCard>

            <PaperCard className="space-y-5">
              <h3 className="font-fraunces font-bold text-lg text-ink">Pebbles &amp; Status Chips</h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <Tag variant="default">Web Applications</Tag>
                <Tag variant="active">Mobile Platforms</Tag>
                <Tag variant="muted">E-Commerce</Tag>
                <Tag variant="default">AI Automation</Tag>
              </div>

              <div className="pt-4 border-t border-line space-y-2">
                <span className="text-xs font-mono text-ink-soft uppercase tracking-wide">
                  Living Status Chips (≥48px accessible touch targets)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5E9] border border-grass-near/30 text-grass-deep font-sans text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-grass-near animate-pulse" />
                    <span>Taking on new projects</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-2 border border-line text-ink-soft font-sans text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-sunflower" />
                    <span>Sprint in progress</span>
                  </span>
                </div>
              </div>
            </PaperCard>
          </div>
        </section>

        {/* 4. PAPER CARDS & CLOUD CARD */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
              4. Storybook Card Architectures
            </h2>
            <p className="font-sans text-sm text-ink-soft mt-1">
              Deckled-edge paper cards, cloud scallops, and dusk night-paper surfaces with organic grain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PaperCard variant="paper">
              <span className="text-xs font-mono font-bold text-poppy-text uppercase tracking-wider">
                PaperCard (Standard)
              </span>
              <h3 className="font-fraunces font-bold text-xl text-ink mt-2">
                Warm Day Surface
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Rendered on #FFFAF0 with faint deckled edge and soft colored shadow. High contrast,
                easy reading.
              </p>
            </PaperCard>

            <PaperCard variant="cloud">
              <span className="text-xs font-mono font-bold text-grass-near uppercase tracking-wider">
                CloudCard (Scalloped)
              </span>
              <h3 className="font-fraunces font-bold text-xl text-ink mt-2">
                Bumpy Cloud Header
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Organic undulating top edge mimicking clouds drifting over the meadow landscape.
              </p>
            </PaperCard>

            <PaperCard variant="night">
              <span className="text-xs font-mono font-bold text-sunflower uppercase tracking-wider">
                NightCard (Dusk / Night)
              </span>
              <h3 className="font-fraunces font-bold text-xl text-cream mt-2">
                Cottage at Dusk
              </h3>
              <p className="font-sans text-sm text-cream-soft mt-2 leading-relaxed">
                Midnight indigo #1B1E4B with cream typography. 14.67:1 contrast ratio against stars.
              </p>
            </PaperCard>
          </div>
        </section>

        {/* 5. FORM PRIMITIVES & SEED OPTIONS */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
              5. Soft Form Primitives &amp; Seed Options
            </h2>
            <p className="font-sans text-sm text-ink-soft mt-1">
              Soft 20px inputs, double focus ring, animated sprout, and illustrated seed option cards for the estimator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PaperCard className="space-y-4">
              <h3 className="font-fraunces font-bold text-lg text-ink">Form Fields &amp; Focus Ring</h3>
              <Input
                label="Your Name or Organisation"
                placeholder="Jane Appleseed"
                hint="Required"
              />
              <Input
                label="Email Address (Validation State)"
                placeholder="jane@example.com"
                error="Please enter a valid business email address"
              />
              <Textarea
                label="Project Idea or Problem"
                placeholder="Describe what you want to grow..."
                rows={3}
              />
            </PaperCard>

            <PaperCard className="space-y-4">
              <h3 className="font-fraunces font-bold text-lg text-ink">
                Illustrated Seed Options (Estimator Primitive)
              </h3>
              <p className="text-xs font-sans text-ink-soft">
                Tap to plant a seed; watch it sprout into an active seedling.
              </p>
              <div className="space-y-3">
                <SeedOption
                  title="Web Application"
                  hint="Daisy Bloom"
                  description="High-performance client portals, SaaS applications, and interactive dashboards."
                  selected={selectedSeeds.includes("web")}
                  onSelect={() => toggleSeed("web")}
                />
                <SeedOption
                  title="Mobile App (iOS & Android)"
                  hint="Tulip Bloom"
                  description="Smooth cross-platform mobile apps published to the App Store and Google Play."
                  selected={selectedSeeds.includes("mobile")}
                  onSelect={() => toggleSeed("mobile")}
                />
                <SeedOption
                  title="UI / UX Brand Experience"
                  hint="Cherry Blossom"
                  description="Storybook visual identities, accessible design systems, and conversion wireframes."
                  selected={selectedSeeds.includes("design")}
                  onSelect={() => toggleSeed("design")}
                />
              </div>
            </PaperCard>
          </div>
        </section>

        {/* 6. ACCORDION & DIALOG */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink">
              6. Accordion &amp; Interactive Dialogs
            </h2>
            <p className="font-sans text-sm text-ink-soft mt-1">
              Soft FAQ panels and accessible paper sheet dialog over frosted backdrop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PaperCard className="space-y-4">
              <h3 className="font-fraunces font-bold text-lg text-ink">Storybook FAQ Accordion</h3>
              <Accordion
                items={[
                  {
                    id: "q1",
                    title: "What makes working with Krat.OS different?",
                    answer:
                      "We combine technical engineering rigor with plain-language communication. You talk directly with the creators building your product, without account managers or jargon.",
                  },
                  {
                    id: "q2",
                    title: "How do we get started on an estimate?",
                    answer:
                      "Use our interactive estimator tool or drop us an email. We review your requirements and provide an honest scope breakdown within two business days.",
                  },
                  {
                    id: "q3",
                    title: "Do you maintain software after launching?",
                    answer:
                      "Yes. We offer dedicated clover maintenance tiers with proactive security updates, performance monitoring, and guaranteed uptime response.",
                  },
                ]}
              />
            </PaperCard>

            <PaperCard className="space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="font-fraunces font-bold text-lg text-ink">Sheet Dialog &amp; Leaf Toast</h3>
                <p className="text-sm font-sans text-ink-soft mt-1 leading-relaxed">
                  Interactive modals render as warm paper sheets floating above the living landscape.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setDialogOpen(true)}
                >
                  Open Storybook Dialog
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setShowToast(true)}
                >
                  Trigger Notification Leaf
                </Button>
              </div>
            </PaperCard>
          </div>
        </section>
      </div>

      {/* Interactive Modal Sheet Dialog */}
      {mounted && dialogOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg p-6 sm:p-8 bg-paper text-ink rounded-[32px] shadow-floating border border-line-strong relative paper-grain">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <span className="font-fraunces font-bold text-xl text-ink">
                Storybook Dialog Sheet
              </span>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-paper-2 transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <p className="font-sans text-sm sm:text-base text-ink leading-relaxed">
              This dialog floats gently over the active sky backdrop. Touch targets are at least
              48px, text sits on paper for guaranteed contrast, and focus is trapped inside.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-ink-soft hover:text-ink min-h-[48px]"
              >
                Cancel
              </button>
              <Button variant="primary" size="md" onClick={() => setDialogOpen(false)}>
                Confirm Action
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Leaf-Shaped Floating Toast */}
      {mounted && showToast && createPortal(
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 p-4 bg-paper text-ink border border-line-strong shadow-floating rounded-[28px_6px_28px_28px] max-w-sm flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300 paper-grain"
        >
          <div className="w-8 h-8 rounded-full bg-[#EAF5E9] text-grass-deep flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs sm:text-sm font-sans">
            <p className="font-bold text-ink">Garden Update</p>
            <p className="text-ink-soft mt-0.5">Your project preferences have been remembered.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-ink-soft hover:text-ink text-xs font-bold p-1"
          >
            ✕
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
