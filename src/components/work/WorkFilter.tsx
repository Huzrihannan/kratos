"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/content/work";
import { Window } from "@/components/ui/Window";
import { Odometer } from "@/components/fx/Odometer";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

interface WorkFilterProps {
  initialStudies: CaseStudy[];
}

type FilterCategory = "all" | "web" | "mobile" | "automation";

const categories: Array<{ id: FilterCategory; label: string }> = [
  { id: "all", label: "[ALL_PROJECTS]" },
  { id: "web", label: "[WEB_APPS]" },
  { id: "mobile", label: "[MOBILE_APPS]" },
  { id: "automation", label: "[AUTOMATION]" },
];

export function WorkFilter({ initialStudies }: WorkFilterProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const { isOff } = useMotionLevel();

  const filteredStudies =
    activeCategory === "all"
      ? initialStudies
      : initialStudies.filter((study) => study.serviceType === activeCategory);

  const handleCategorySelect = (cat: FilterCategory) => {
    if (cat === activeCategory) return;

    if (!isOff && gridRef.current) {
      const items = gridRef.current.querySelectorAll(".work-grid-item");
      flipStateRef.current = Flip.getState(items);
    }

    setActiveCategory(cat);
  };

  useLayoutEffect(() => {
    if (flipStateRef.current && gridRef.current && !isOff) {
      const items = gridRef.current.querySelectorAll(".work-grid-item");
      Flip.from(flipStateRef.current, {
        duration: 0.35,
        ease: "power2.inOut",
        targets: items,
        onEnter: (elements) => {
          gsap.fromTo(elements, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.25 });
        },
        onLeave: (elements) => {
          gsap.to(elements, { opacity: 0, scale: 0.98, duration: 0.2 });
        },
      });
      flipStateRef.current = null;
    }
  }, [activeCategory, isOff]);

  return (
    <div className="w-full font-mono">
      {/* Mono Tag Filter Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-10 sm:mb-14">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-[2px] text-xs uppercase tracking-mono border transition-all duration-150 select-none flex items-center gap-2",
                isActive
                  ? "bg-fg text-bg border-red font-bold shadow-sm"
                  : "bg-surface text-fg-muted border-line hover:border-line-strong hover:text-fg"
              )}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-red" aria-hidden="true" />
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Case Study Windows with GSAP Flip targets */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {filteredStudies.map((study, idx) => {
          const windowTitle = `case_0${idx + 1}.${study.slug.split("-")[0]}`;

          return (
            <article key={study.id} className="work-grid-item flex flex-col">
              <Window
                title={windowTitle}
                cornerBrackets
                className="h-full flex flex-col justify-between p-0 overflow-hidden"
              >
                <div className="p-5 sm:p-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Status & Industry Strip */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-line text-[11px]">
                      <span className="text-red-text font-bold uppercase">
                        {study.industry}
                      </span>
                      <span className="text-[10px] text-fg-muted uppercase">
                        [CASE_STUDY]
                      </span>
                    </div>

                    {/* Metric HUD Card with Odometer */}
                    <div className="p-4 rounded-[2px] bg-bg border border-line mb-5 flex flex-col justify-between">
                      <span className="text-[10px] text-fg-muted uppercase tracking-mono mb-1">
                        VERIFIED_IMPACT:
                      </span>
                      <div className="text-2xl sm:text-3xl font-bold text-fg tracking-tight my-1">
                        <Odometer value={study.metricValue} />
                      </div>
                      <span className="text-[11px] text-red-text font-medium">
                        {study.metricLabel}
                      </span>
                    </div>

                    {/* Client & Title */}
                    <h3 className="font-bold text-lg sm:text-xl text-fg mb-2 leading-snug">
                      {study.title.replace("[PLACEHOLDER] ", "")}
                    </h3>
                    <p className="font-sans text-xs text-fg-muted leading-relaxed mb-5">
                      {study.summary}
                    </p>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6 text-[10px]">
                      {study.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-[2px] bg-bg border border-line text-fg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read Case Study Footer */}
                  <div className="pt-3 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-[10px] text-fg-muted">
                      STATUS: DELIVERED
                    </span>
                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center gap-1.5 text-fg hover:text-red-text font-bold uppercase tracking-wider transition-colors"
                      aria-label={`Read case study for ${study.title.replace("[PLACEHOLDER] ", "")}`}
                    >
                      <span>Read Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Window>
            </article>
          );
        })}
      </div>
    </div>
  );
}
