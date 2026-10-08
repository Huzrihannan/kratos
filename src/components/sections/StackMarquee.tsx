"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";
import { stackRowOne, stackRowTwo } from "@/content/stack";
import { Marquee } from "@/components/ui/Marquee";

export function StackMarquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Technology Stack"
      className="relative py-16 sm:py-24 overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-peach"
        >
          <Code2 className="w-3.5 h-3.5 text-orange" />
          <span>our foundation</span>
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-[1.12]"
        >
          Modern tooling.&nbsp;
          <br className="hidden sm:inline" />
          <span className="text-orange-deep">Zero experimental fluff.</span>
        </motion.h2>
      </div>

      {/* Marquee Rows Container */}
      <div className="space-y-4 max-w-7xl mx-auto px-2">
        {/* Row 1: Frontend & Mobile (Moving Left) */}
        <Marquee direction="left" speed={32} pauseOnHover>
          {stackRowOne.map((item) => (
            <div
              key={item.name}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-peach/50 hover:bg-peach border border-orange/20 text-ink font-body text-sm sm:text-base font-semibold shadow-subtle hover:scale-105 transition-all duration-200 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-orange shrink-0" />
              <span>{item.name}</span>
              <span className="text-[11px] font-mono text-ink-soft/70 font-normal">
                {item.tag}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Backend, Cloud & Database (Moving Right) */}
        <Marquee direction="right" speed={36} pauseOnHover>
          {stackRowTwo.map((item) => (
            <div
              key={item.name}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-peach/50 hover:bg-peach border border-orange/20 text-ink font-body text-sm sm:text-base font-semibold shadow-subtle hover:scale-105 transition-all duration-200 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-orange-deep shrink-0" />
              <span>{item.name}</span>
              <span className="text-[11px] font-mono text-ink-soft/70 font-normal">
                {item.tag}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
