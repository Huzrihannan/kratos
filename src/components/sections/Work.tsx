"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { caseStudiesData } from "@/content/work";
import { Squish } from "@/components/fx/Squish";
import { Button } from "@/components/ui/Button";
import { useLayoutModal } from "@/lib/modal-context";

export function Work() {
  const prefersReducedMotion = useReducedMotion();
  const { openEstimator } = useLayoutModal();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const renderMetricIcon = (metricValue: string) => {
    if (metricValue.includes("★")) return <Star className="w-4 h-4 fill-butter text-butter" />;
    if (metricValue.includes("-")) return <Clock className="w-4 h-4 text-orange" />;
    return <TrendingUp className="w-4 h-4 text-[#25D366]" />;
  };

  return (
    <section
      id="work"
      aria-label="Things we're proud of"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
        <div>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-peach"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>things we&apos;re proud of</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-[1.12]"
          >
            Real products.&nbsp;
            <br className="hidden sm:inline" />
            <span className="text-orange-deep">Measurable impact.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="shrink-0"
        >
          <Squish>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-ink hover:text-orange-deep transition-colors py-2 px-4 rounded-full bg-peach/50 hover:bg-peach border border-peach focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
            >
              <span>View all case studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Squish>
        </motion.div>
      </div>

      {/* Case Study Cards: Grid on Desktop, Horizontal Scroll / Drag on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {caseStudiesData.map((study, idx) => {
          const isHovered = hoveredCard === study.id;

          return (
            <motion.div
              key={study.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 24,
                delay: prefersReducedMotion ? 0 : idx * 0.1,
              }}
              onMouseEnter={() => setHoveredCard(study.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group rounded-[36px] bg-peach/45 hover:bg-peach/80 border-2 border-orange/20 hover:border-orange transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between shadow-subtle hover:shadow-card overflow-hidden"
            >
              <div>
                {/* Visual Preview Container with Signature Circular Portal Mask */}
                <div className="relative w-full h-52 sm:h-56 rounded-[26px] bg-cream border border-orange/20 overflow-hidden mb-6 flex items-center justify-center p-4">
                  {/* Circular mask that expands on card hover */}
                  <div
                    className={`relative w-40 h-40 rounded-full bg-peach/80 border-2 border-orange/30 flex items-center justify-center transition-all duration-500 overflow-hidden ${
                      isHovered ? "scale-115 border-orange bg-orange/20" : "scale-100"
                    }`}
                  >
                    {/* Abstract architectural wireframe illustration inside portal */}
                    <div className="w-28 h-28 rounded-2xl bg-cream/90 shadow-sm border border-orange/25 p-3 flex flex-col justify-between transform -rotate-3 transition-transform duration-300 group-hover:rotate-0">
                      <div className="flex items-center justify-between">
                        <div className="w-4 h-4 rounded-full bg-orange/40" />
                        <div className="w-8 h-2 rounded-full bg-ink/10" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-full h-2 rounded-full bg-ink/15" />
                        <div className="w-3/4 h-2 rounded-full bg-ink/10" />
                      </div>
                      <div className="w-12 h-3 rounded-full bg-orange text-[9px] font-bold text-ink flex items-center justify-center">
                        Active
                      </div>
                    </div>
                  </div>

                  {/* Impact Metric Floating Badge */}
                  <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-cocoa text-cream text-xs font-bold flex items-center gap-2 shadow-sm border border-cream/20">
                    {renderMetricIcon(study.metricValue)}
                    <span className="font-display tracking-tight text-butter text-sm">
                      {study.metricValue}
                    </span>
                    <span className="text-[11px] font-normal text-cream/80">
                      {study.metricLabel}
                    </span>
                  </div>

                  {/* Industry tag top right */}
                  <span className="absolute top-3 right-3 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cream/90 text-ink-soft border border-peach/80">
                    {study.industry}
                  </span>
                </div>

                {/* Case Study Meta & Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-tight mb-2 leading-snug group-hover:text-orange-deep transition-colors">
                  {study.title}
                </h3>

                <p className="font-body text-ink-soft text-xs sm:text-sm leading-relaxed mb-6">
                  {study.summary}
                </p>

                {/* Tag Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cream text-ink-soft border border-orange/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link Footer */}
              <div className="pt-4 border-t border-orange/15 flex items-center justify-between">
                <Squish>
                  <Link
                    href={`/work#${study.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink hover:text-orange-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep rounded p-1"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </Squish>

                <span className="text-[11px] font-mono text-ink-soft/60">
                  {study.clientName}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Estimator Hook Button */}
      <div className="mt-14 sm:mt-16 text-center">
        <Button
          variant="primary"
          size="md"
          onClick={(e) => {
            e.preventDefault();
            openEstimator();
          }}
          withArrow
          className="text-base"
        >
          Have a similar project in mind? Let&apos;s talk
        </Button>
      </div>
    </section>
  );
}
