"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pill, Chip } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { BubbleOption } from "@/components/ui/BubbleOption";
import { Marquee } from "@/components/ui/Marquee";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { Squish } from "@/components/fx/Squish";
import { GooeyBlobs } from "@/components/fx/GooeyBlobs";
import { CircleReveal } from "@/components/fx/CircleReveal";
import { CursorFollower } from "@/components/fx/CursorFollower";
import { Sparkles, Code2, Smartphone, Zap } from "lucide-react";

export default function DesignSystemPage() {
  const [bubble1, setBubble1] = useState(true);
  const [bubble2, setBubble2] = useState(false);
  const [bubble3, setBubble3] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <CursorFollower />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 text-center overflow-hidden border-b border-orange/20">
        <div className="absolute inset-0 -z-10 h-96">
          <GooeyBlobs blobCount={5} speed={0.8} />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <Pill variant="availability">
            Design System • Component Catalog
          </Pill>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink">
            Krat.OS Design System
          </h1>
          <p className="font-body text-lg md:text-xl text-ink-soft max-w-2xl">
            &ldquo;Strong underneath. Friendly on top.&rdquo; A tactile, blobby, pill-shaped design system built for speed, accessibility, and high conversion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-24">
        {/* 1. BUTTONS */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              UI Primitives
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Button Component</h2>
            <p className="text-ink-soft text-sm mt-1">
              Full pill shape with tactile spring squish (0.96 scale) and circular arrow badge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* On Cream */}
            <div className="p-8 rounded-card bg-peach/40 border border-orange/20 flex flex-col gap-6">
              <h3 className="font-display text-lg font-bold">On Cream / Peach Surface</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Estimate my project</Button>
                <Button variant="secondary">Book a 15-min call</Button>
                <Button variant="ghost">See our work</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" size="sm">Small Primary</Button>
                <Button variant="primary" size="lg">Large Primary</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>

            {/* On Cocoa */}
            <div className="p-8 rounded-card bg-cocoa text-cream flex flex-col gap-6">
              <h3 className="font-display text-lg font-bold text-peach">On Dark Cocoa Surface</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary on Dark</Button>
                <Button variant="secondary">Secondary on Dark</Button>
                <Button variant="ghost" className="border-cream text-cream hover:bg-cream/10">Ghost on Dark</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" withArrow={false}>Without Arrow</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PILLS & CHIPS */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              Badges & Status
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Pill & Chip Components</h2>
          </div>

          <div className="p-8 rounded-card bg-peach/40 border border-orange/20 flex flex-wrap items-center gap-4">
            <Pill variant="availability">Taking on new projects for October</Pill>
            <Pill variant="default">Web App / SaaS</Pill>
            <Pill variant="peach">Design & UI/UX</Pill>
            <Pill variant="orange">High Priority</Pill>
            <Pill variant="cocoa">Dark Tag</Pill>
            <Chip size="sm" variant="peach">Small Chip</Chip>
            <Chip size="sm" variant="orange" pulse>Live Alert</Chip>
          </div>
        </section>

        {/* 3. CARDS & PORTAL MOTIF */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              Containers
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Card Component & Portal Mask</h2>
            <p className="text-ink-soft text-sm mt-1">
              Minimum 28px border radius with circular cutout portal mask revealing image details on hover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="peach">
              <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center text-ink mb-4 shadow-subtle">
                <Code2 size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Web Application</h3>
              <p className="font-body text-ink-soft leading-relaxed">
                Full-stack web applications with Next.js, resilient APIs, and seamless database architectures.
              </p>
            </Card>

            <Card variant="peach">
              <div className="w-12 h-12 rounded-full bg-butter flex items-center justify-center text-ink mb-4 shadow-subtle">
                <Smartphone size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Mobile Apps</h3>
              <p className="font-body text-ink-soft leading-relaxed">
                Cross-platform iOS and Android apps engineered with native performance and delightful UI animations.
              </p>
            </Card>

            <Card variant="cocoa">
              <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center text-ink mb-4 shadow-subtle">
                <Zap size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2 text-cream">Cocoa Accent Card</h3>
              <p className="font-body text-peach/80 leading-relaxed">
                High-contrast dark surface used for testimonial speech-bubbles and rhythm breaks.
              </p>
            </Card>
          </div>
        </section>

        {/* 4. FORM PRIMITIVES & BUBBLE OPTIONS */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              Estimator & Lead Engine
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Form Inputs & BubbleOption</h2>
            <p className="text-ink-soft text-sm mt-1">
              Playful, tactile selectors designed for the Project Estimator and accessible contact forms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BubbleOptions (Estimator) */}
            <div className="p-8 rounded-card bg-peach/40 border border-orange/20 flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold mb-2">BubbleOption Selectors</h3>
              <BubbleOption
                label="Web App / SaaS"
                description="Custom dashboard, user auth, and scalable database"
                icon={<Code2 className="w-5 h-5 text-ink" />}
                selected={bubble1}
                onClick={() => setBubble1(!bubble1)}
              />
              <BubbleOption
                label="Mobile App (iOS & Android)"
                description="Fluid touch gestures and offline-first data sync"
                icon={<Smartphone className="w-5 h-5 text-ink" />}
                selected={bubble2}
                onClick={() => setBubble2(!bubble2)}
              />
              <BubbleOption
                label="AI & Automation Workflow"
                description="LLM integration, autonomous agents, and background jobs"
                icon={<Sparkles className="w-5 h-5 text-ink" />}
                selected={bubble3}
                onClick={() => setBubble3(!bubble3)}
              />
              <BubbleOption
                label="Legacy Migration"
                description="Currently unavailable"
                disabled
              />
            </div>

            {/* Standard Form Inputs */}
            <div className="p-8 rounded-card bg-peach/40 border border-orange/20 flex flex-col gap-5">
              <h3 className="font-display text-xl font-bold mb-2">Input, Select & Textarea</h3>
              <Input
                label="Your Name"
                placeholder="Jane Doe"
              />
              <Input
                label="Email Address"
                placeholder="jane@company.com"
                error="Please enter a valid work email"
              />
              <Select
                label="Project Timeline"
                options={[
                  { label: "As soon as possible", value: "asap" },
                  { label: "1 - 3 months", value: "1-3m" },
                  { label: "3 - 6 months", value: "3-6m" },
                  { label: "Just exploring", value: "exploring" },
                ]}
              />
              <Textarea
                label="Project Details"
                placeholder="A sentence is plenty..."
              />
            </div>
          </div>
        </section>

        {/* 5. MARQUEE */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              Motion
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Infinite Marquee</h2>
            <p className="text-ink-soft text-sm mt-1">
              Pauses on hover; automatically disables under prefers-reduced-motion.
            </p>
          </div>

          <div className="p-6 rounded-card bg-peach/30 border border-orange/20 flex flex-col gap-4 overflow-hidden">
            <Marquee direction="left" speed={20}>
              <Pill variant="peach" size="md">Next.js App Router</Pill>
              <Pill variant="orange" size="md">TypeScript Strict</Pill>
              <Pill variant="peach" size="md">Tailwind CSS</Pill>
              <Pill variant="cocoa" size="md">Framer Motion</Pill>
              <Pill variant="peach" size="md">Lenis Smooth Scroll</Pill>
              <Pill variant="orange" size="md">Supabase Leads</Pill>
              <Pill variant="peach" size="md">Resend Delivery</Pill>
            </Marquee>
          </div>
        </section>

        {/* 6. ACCORDION (FAQ) */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              Content Disclosures
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Accessible Accordion</h2>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <Accordion
              items={[
                {
                  title: "How much does a typical project cost?",
                  content:
                    "Projects typically range between $5,000 and $25,000 depending on scope, architecture complexity, and integrations. Our Project Estimator provides an instant ballpark before we speak.",
                },
                {
                  title: "Who owns the source code when we are done?",
                  content:
                    "You own 100% of the intellectual property and code from day one. Everything is committed directly into your private GitHub organization with full documentation.",
                },
                {
                  title: "Do you offer post-launch support and maintenance?",
                  content:
                    "Yes! We don't disappear after launch. We offer monthly maintenance, monitoring, feature updates, and performance tuning.",
                },
              ]}
            />
          </div>
        </section>

        {/* 7. FX PRIMITIVES (Squish & CircleReveal) */}
        <section className="flex flex-col gap-8">
          <div className="border-b border-orange/20 pb-4">
            <span className="font-body text-xs uppercase tracking-tagline text-orange-deep font-semibold">
              Tactile Effects
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">Squish & CircleReveal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-card bg-peach/40 border border-orange/20 flex flex-col items-center justify-center gap-4 text-center">
              <h3 className="font-display text-xl font-bold">Squish Wrapper</h3>
              <p className="text-sm text-ink-soft">Click and hold the blob below to feel the 0.96 tactile spring squish:</p>
              <Squish squishScale={0.92}>
                <div className="w-28 h-28 rounded-bubble bg-orange text-ink font-display font-bold flex items-center justify-center shadow-glow cursor-pointer select-none">
                  Press Me!
                </div>
              </Squish>
            </div>

            <div className="p-8 rounded-card bg-peach/40 border border-orange/20 flex flex-col items-center justify-center gap-4 text-center">
              <h3 className="font-display text-xl font-bold">CircleReveal (Portal)</h3>
              <p className="text-sm text-ink-soft">Scroll-triggered circular clip-path expansion:</p>
              <CircleReveal duration={1}>
                <div className="w-48 h-32 rounded-card bg-cocoa text-cream flex items-center justify-center font-display font-bold shadow-card">
                  Portal Revealed!
                </div>
              </CircleReveal>
            </div>
          </div>
        </section>

        {/* 8. SECTION WRAPPER PREVIEW */}
        <Section
          eyebrow="Section Wrapper"
          headline="Structured Vertical Rhythm"
          description="Consistent container, typography clamp, and rhythm alignment across the entire marketing site."
          variant="peach"
          className="rounded-card"
        >
          <div className="flex justify-center">
            <Button variant="primary">Explore Sections</Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
