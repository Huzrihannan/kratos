"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Calendar } from "lucide-react";
import { processSteps } from "@/content/process";
import { Button } from "@/components/ui/Button";
import { useLayoutModal } from "@/lib/modal-context";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { openEstimator } = useLayoutModal();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="How we work"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-peach"
        >
          <Clock className="w-3.5 h-3.5 text-orange" />
          <span>how we work</span>
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-[1.12]"
        >
          Predictable milestones.&nbsp;
          <br className="hidden sm:inline" />
          <span className="text-orange-deep">Zero guesswork.</span>
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.15 }}
          className="font-body text-ink-soft text-base sm:text-lg md:text-xl mt-4 leading-relaxed max-w-2xl mx-auto"
        >
          A battle-tested 5-phase delivery model where you see working builds every Friday,
          not endless status reports.
        </motion.p>
      </div>

      {/* Desktop View: Horizontal Connected Pill Chain */}
      <div className="hidden lg:block relative mb-16">
        {/* Scroll-Linked Track Line Behind Cards */}
        <div className="absolute top-[48px] left-[5%] right-[5%] h-3 bg-peach/70 rounded-full z-0 overflow-hidden">
          <motion.div
            className="h-full bg-orange rounded-full"
            style={{ width: prefersReducedMotion ? "100%" : fillWidth }}
          />
        </div>

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 26,
                delay: prefersReducedMotion ? 0 : idx * 0.1,
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Step Pill Header Indicator */}
              <div className="w-24 h-24 rounded-full bg-cream border-4 border-peach flex flex-col items-center justify-center mb-6 shadow-card transition-transform duration-300 hover:scale-105 group">
                <span className="font-mono text-xs text-orange-deep font-bold">
                  STEP 0{step.number}
                </span>
                <span className="font-display font-bold text-ink text-sm">
                  {step.timeframe}
                </span>
              </div>

              {/* Step Card Body */}
              <div className="w-full p-5 rounded-[28px] bg-peach/50 border border-orange/20 shadow-subtle hover:bg-peach/70 transition-colors flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-display font-bold text-xl text-ink tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-ink-soft text-xs leading-relaxed mb-4">
                    {step.summary}
                  </p>
                </div>

                {/* Deliverables Chips */}
                <div className="pt-3 border-t border-orange/15 space-y-1.5">
                  {step.deliverables.slice(0, 2).map((del, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-ink font-body">
                      <CheckCircle2 className="w-3 h-3 text-orange shrink-0 stroke-[2.5]" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet View: Vertical Connected Timeline */}
      <div className="lg:hidden relative space-y-6 pl-6 sm:pl-8">
        {/* Vertical Track Line */}
        <div className="absolute top-4 bottom-4 left-[21px] sm:left-[29px] w-2 bg-peach rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-orange rounded-full"
            style={{ height: prefersReducedMotion ? "100%" : fillHeight }}
          />
        </div>

        {processSteps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 26,
              delay: prefersReducedMotion ? 0 : idx * 0.08,
            }}
            className="relative flex items-start gap-4 sm:gap-6"
          >
            {/* Step Node */}
            <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cream border-3 border-orange flex items-center justify-center font-display font-bold text-xs sm:text-sm text-ink shrink-0 shadow-sm mt-1">
              {step.number}
            </div>

            {/* Step Card Content */}
            <div className="flex-1 p-6 rounded-[28px] bg-peach/50 border border-orange/20 shadow-subtle text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-xl text-ink tracking-tight">
                  {step.title}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cream text-orange-deep font-mono text-xs font-semibold border border-orange/20">
                  <Calendar className="w-3 h-3" />
                  {step.timeframe}
                </span>
              </div>

              <p className="font-body text-ink-soft text-sm leading-relaxed mb-4">
                {step.summary}
              </p>

              <div className="pt-3 border-t border-orange/15 grid grid-cols-1 gap-1.5">
                {step.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-ink font-body">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange shrink-0 stroke-[2.5]" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Estimator Hook Button */}
      <div className="mt-14 sm:mt-16 text-center">
        <Button
          variant="secondary"
          size="md"
          onClick={(e) => {
            e.preventDefault();
            openEstimator();
          }}
          withArrow
          className="text-base"
        >
          Check sprint timeline for your project
        </Button>
      </div>
    </section>
  );
}
