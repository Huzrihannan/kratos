"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { statsData, testimonialsData } from "@/content/proof";
import { CountUp } from "@/components/fx/CountUp";
import { Squish } from "@/components/fx/Squish";

export function Proof() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const currentT = testimonialsData[activeTestimonial];

  return (
    <section
      id="proof"
      aria-label="Social Proof and Impact"
      className="relative my-16 sm:my-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cocoa text-cream rounded-[40px] sm:rounded-[56px] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-48 -right-48 w-96 h-96 rounded-full bg-orange/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-peach/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Dev Placeholder Warning Notice */}
        <div className="mb-10 p-3 sm:p-3.5 rounded-2xl bg-orange/15 border border-orange/30 text-butter flex items-center justify-between gap-3 text-xs font-mono max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-butter shrink-0" />
            <span>[PLACEHOLDER] Notice: Statistics and testimonials are marked sample data.</span>
          </div>
          <span className="opacity-70 text-[10px] hidden sm:inline">PROD QA</span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream/10 text-butter text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-cream/15"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-butter" />
            <span>numbers that matter</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-cream tracking-tight leading-[1.12]"
          >
            Built for engineering rigor.&nbsp;
            <br className="hidden sm:inline" />
            <span className="text-butter">Proven in production.</span>
          </motion.h2>
        </div>

        {/* 4 Big Stat Blobs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 24,
                delay: prefersReducedMotion ? 0 : idx * 0.08,
              }}
              className="p-6 sm:p-7 rounded-[32px] bg-cream/5 border border-cream/10 hover:border-orange/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-orange tracking-tight mb-2">
                  <CountUp
                    value={stat.targetValue}
                    decimals={stat.targetValue % 1 !== 0 ? 1 : 0}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <h3 className="font-display font-semibold text-sm sm:text-base text-cream mb-1">
                  {stat.label}
                </h3>
              </div>
              <p className="font-body text-cream/60 text-xs sm:text-xs leading-relaxed mt-2">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Speech Bubble Slider */}
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-[40px] bg-cream/10 border-2 border-cream/15 shadow-2xl backdrop-blur-sm">
            {/* Speech bubble pointer indicator */}
            <div
              className="absolute -bottom-4 left-14 w-8 h-8 bg-cream/10 border-r-2 border-b-2 border-cream/15 rotate-45"
              aria-hidden="true"
            />

            <Quote className="w-10 h-10 text-butter/70 mb-4 stroke-[1.5]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentT.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6"
              >
                <p className="font-display text-xl sm:text-2xl md:text-3xl text-cream font-medium leading-snug">
                  &ldquo;{currentT.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-cream/15">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-full ${currentT.avatarColor} text-ink font-display font-bold text-base flex items-center justify-center`}
                    >
                      {currentT.author.charAt(currentT.author.indexOf("]") + 2)}
                    </div>
                    <div className="text-left">
                      <div className="font-display font-bold text-base text-cream">
                        {currentT.author}
                      </div>
                      <div className="text-xs text-cream/70 font-body">
                        {currentT.role} • {currentT.company}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <Squish>
                      <button
                        type="button"
                        onClick={prevTestimonial}
                        aria-label="Previous testimonial"
                        className="w-10 h-10 rounded-full bg-cream/10 hover:bg-orange hover:text-ink text-cream flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange"
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </Squish>

                    <Squish>
                      <button
                        type="button"
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                        className="w-10 h-10 rounded-full bg-cream/10 hover:bg-orange hover:text-ink text-cream flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </Squish>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
