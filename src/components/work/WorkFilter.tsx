"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star, Clock, TrendingUp, Sparkles } from "lucide-react";
import { CaseStudy } from "@/content/work";
import { Squish } from "@/components/fx/Squish";

interface WorkFilterProps {
  initialStudies: CaseStudy[];
}

type FilterCategory = "all" | "web" | "mobile" | "automation";

const categories: Array<{ id: FilterCategory; label: string }> = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps & SaaS" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "automation", label: "AI & Automations" },
];

export function WorkFilter({ initialStudies }: WorkFilterProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const prefersReducedMotion = useReducedMotion();

  const filteredStudies =
    activeCategory === "all"
      ? initialStudies
      : initialStudies.filter((study) => study.serviceType === activeCategory);

  const renderMetricIcon = (metricValue: string) => {
    if (metricValue.includes("★")) return <Star className="w-4 h-4 fill-butter text-butter" />;
    if (metricValue.includes("-")) return <Clock className="w-4 h-4 text-orange" />;
    return <TrendingUp className="w-4 h-4 text-[#25D366]" />;
  };

  return (
    <div className="w-full">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-12 sm:mb-16">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Squish key={cat.id}>
              <button
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep select-none ${
                  isActive
                    ? "text-ink bg-orange shadow-sm font-bold"
                    : "text-ink/80 bg-peach/40 hover:bg-peach/70 hover:text-ink"
                }`}
              >
                {isActive && !prefersReducedMotion && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-orange -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            </Squish>
          );
        })}
      </div>

      {/* Grid of Case Studies */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study) => (
            <motion.article
              layout
              key={study.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="group relative flex flex-col justify-between rounded-[32px] bg-peach/40 hover:bg-peach/70 border-2 border-peach/80 hover:border-orange/50 p-6 sm:p-7 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                {/* Top Strip: Industry & Placeholder notice */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream text-ink text-xs font-bold uppercase tracking-wider border border-peach/60">
                    <Sparkles className="w-3 h-3 text-orange" />
                    {study.industry}
                  </span>
                  {study.isPlaceholder && (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-ink-soft/80 bg-peach/80 px-2 py-0.5 rounded-full">
                      Case Study
                    </span>
                  )}
                </div>

                {/* Circular Portal Visual Mockup */}
                <div className="relative w-full h-48 rounded-[24px] bg-cream/90 mb-6 overflow-hidden flex items-center justify-center border border-peach/40 group-hover:border-orange/40 transition-colors">
                  {/* Background Soft Blobs */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-peach/60 filter blur-xl" />
                  <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-butter/40 filter blur-lg" />

                  {/* Circular Portal Graphic */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-peach/80 to-cream border-3 border-orange/40 flex flex-col items-center justify-center p-3 text-center shadow-sm group-hover:scale-108 transition-transform duration-300">
                    <div className="flex items-center gap-1.5 justify-center">
                      {renderMetricIcon(study.metricValue)}
                      <span className="font-display font-bold text-2xl text-ink leading-tight">
                        {study.metricValue}
                      </span>
                    </div>
                    <span className="text-[10px] text-ink-soft leading-tight mt-0.5">
                      {study.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Client & Title */}
                <h2 className="font-display font-semibold text-xl sm:text-2xl text-ink mb-2 leading-snug group-hover:text-orange-deep transition-colors">
                  {study.title.replace("[PLACEHOLDER] ", "")}
                </h2>
                <p className="text-ink-soft text-sm leading-relaxed mb-6">
                  {study.summary}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-cream/80 text-ink-soft text-xs font-medium border border-peach/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Link */}
              <div className="pt-4 border-t border-peach/70 flex items-center justify-between">
                <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                  Read Case Study
                </span>
                <Link
                  href={`/work/${study.slug}`}
                  className="w-10 h-10 rounded-full bg-cream group-hover:bg-orange text-ink flex items-center justify-center border border-peach transition-all duration-200 group-hover:scale-105 shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
                  aria-label={`View ${study.title.replace("[PLACEHOLDER] ", "")} case study`}
                >
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
