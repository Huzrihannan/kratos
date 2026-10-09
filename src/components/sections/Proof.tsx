"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Window } from "@/components/ui/Window";
import { Odometer } from "@/components/fx/Odometer";
import { Decode } from "@/components/fx/Decode";
import { TypeLines, TerminalLine } from "@/components/fx/TypeLines";
import { Button } from "@/components/ui/Button";
import { statsData, testimonialsData } from "@/content/proof";
import { useLayoutModal } from "@/lib/modal-context";

import { useTheme } from "@/themes/ThemeProvider";
import { GoldenHourScene } from "@/themes/dream/scenes/GoldenHourScene";
import { Poppy } from "@/themes/dream/art/flowers/Poppy";

export function Proof() {
  const { theme } = useTheme();
  const { openEstimator } = useLayoutModal();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const isDream = theme === "dream";
  const currentTestimonial = testimonialsData[activeTestimonialIdx];

  const testimonialLines: TerminalLine[] = [
    {
      prompt: ">",
      text: `SESSION // RECORD #${String(activeTestimonialIdx + 1).padStart(4, "0")}`,
      delay: 150,
    },
    {
      prompt: ">",
      text: `"${currentTestimonial?.quote || ""}"`,
      delay: 400,
    },
    {
      prompt: "✓",
      text: `VERIFIED: ${currentTestimonial?.author || ""}, ${currentTestimonial?.role || ""} — ${currentTestimonial?.company || ""}`,
      status: "ok",
    },
  ];

  return (
    <Section
      id="proof"
      eyebrow={isDream ? "Golden hour" : "/04 — SIGNAL"}
      dataTheme={isDream ? undefined : "light"}
      headline={
        isDream ? (
          <span className="font-serif font-semibold text-[var(--dream-ink,#2B2A52)]">
            Verified reliability
          </span>
        ) : (
          <span>
            Verified <Decode text="reliability" speed={40} delay={200} />
          </span>
        )
      }
      description="Zero handoffs to junior contractors. Direct communication with senior systems engineers who take accountability for production stability."
      hud={
        isDream ? (
          <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)]">
            Letters carried by paper planes
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            SIGNAL: VERIFIED // THEME: CREAM
          </span>
        )
      }
    >
      {/* DREAM THEME: Golden Hour Scene */}
      {isDream ? (
        <GoldenHourScene stats={statsData} testimonials={testimonialsData} />
      ) : (
        <>
          {/* 4 ODOMETER STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat, idx) => (
          <div
            key={stat.id}
            className="p-6 border border-line bg-surface flex flex-col justify-between rounded-[2px] transition-colors hover:border-line-strong"
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-fg-muted mb-2 tracking-wider">
                SYS_METRIC // 0{idx + 1}
              </div>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-fg tracking-tight mb-2">
                <Odometer
                  value={stat.targetValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-red-text"
                />
              </div>

              <div className="font-mono text-xs font-bold text-fg uppercase tracking-wide mb-1">
                {stat.label}
              </div>
            </div>

            <p className="font-sans text-xs text-fg-muted leading-relaxed mt-4 pt-3 border-t border-line/60">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* CLIENT FEEDBACK TERMINAL WINDOW */}
      <div className="max-w-4xl mx-auto w-full">
        <Window
          title="> client_feedback.log"
          statusText="[VERIFIED_CLIENT]"
          cornerBrackets={true}
          className="border-line-strong bg-surface shadow-card"
          headerRight={
            <div className="flex items-center gap-1.5 font-mono text-xs text-fg-muted">
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx(
                    (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
                  )
                }
                className="p-1 hover:text-fg hover:bg-bg/50 rounded-[1px] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] px-1">
                {activeTestimonialIdx + 1}/{testimonialsData.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length)
                }
                className="p-1 hover:text-fg hover:bg-bg/50 rounded-[1px] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          }
        >
          <div className="p-2 sm:p-4 min-h-[160px] flex flex-col justify-between">
            <TypeLines
              key={currentTestimonial.id}
              lines={testimonialLines}
              className="text-sm sm:text-base leading-relaxed text-fg"
            />

            <div className="mt-6 pt-3 border-t border-line flex flex-wrap items-center justify-between text-[11px] font-mono text-fg-muted gap-2">
              <span>STATUS: PRODUCTION CLIENT</span>
              <span className="text-red-text font-bold">INTEGRITY: 100% [SIGNED]</span>
            </div>
          </div>
        </Window>
      </div>
        </>
      )}

      {/* Estimator Bridge Footer */}
      {isDream ? (
        <div className="mt-12 pt-8 border-t border-[var(--dream-paper-2,#FFF1DC)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif text-base font-bold text-[var(--dream-ink,#2B2A52)]">
              Ready to grow your next system with us?
            </div>
            <div className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)]">
              Book a direct conversation with the engineers who actually build it.
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={openEstimator}
            className="rounded-full px-6 py-2.5 text-xs font-semibold flex items-center gap-2 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[#38376B] transition-all"
          >
            <Poppy state="bloom" size={16} />
            <span>Estimate my project</span>
          </Button>
        </div>
      ) : (
        <div className="mt-12 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono text-sm font-bold text-fg">
              Ready to deploy your next high-performance system?
            </div>
            <div className="font-sans text-xs text-fg-muted">
              Book a direct technical architecture call with our lead engineers.
            </div>
          </div>

          <Button variant="primary" size="md" onClick={openEstimator}>
            Estimate my project
          </Button>
        </div>
      )}
    </Section>
  );
}
