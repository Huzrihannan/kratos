"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MessageSquare,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export function WhyKratos() {
  const prefersReducedMotion = useReducedMotion();

  const differentiators = [
    {
      id: "direct-engineers",
      title: "[PLACEHOLDER] Talk directly to the engineers building your code",
      shortSummary: "Zero account-manager telephone games. When you have a product question, you discuss architecture directly with senior engineers.",
      bullets: [
        "Dedicated shared Slack or Discord room",
        "Weekly working demo videos and sprint check-ins",
        "Async updates that respect your calendar",
      ],
      icon: MessageSquare,
      badge: "No Middlemen",
      span: "lg:col-span-7",
    },
    {
      id: "fixed-scope",
      title: "[PLACEHOLDER] Fixed milestones, zero surprise bills",
      shortSummary: "We scope projects down to concrete milestones before starting. What we quote is what you invest—guaranteed.",
      bullets: [
        "Transparent milestone payment schedule",
        "Free scope trade-offs during sprints",
        "100% IP ownership from day one",
      ],
      icon: ShieldCheck,
      badge: "Transparent Pricing",
      span: "lg:col-span-5",
    },
    {
      id: "post-launch",
      title: "[PLACEHOLDER] We stay in your corner after launch",
      shortSummary: "Shipping is just day one. We include 30 days of complimentary bug warranty and offer flexible monthly engineering retainers.",
      bullets: [
        "30-day comprehensive bug warranty included",
        "Proactive security & uptime monitoring",
        "On-call engineers for critical hotfixes",
      ],
      icon: HeartHandshake,
      badge: "Long-Term Partner",
      span: "lg:col-span-12",
    },
  ];

  return (
    <section
      aria-label="Why Kratos"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/80 text-ink-soft text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-peach"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>why kratos</span>
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-[1.12]"
        >
          The agency model is broken.&nbsp;
          <br className="hidden sm:inline" />
          <span className="text-orange-deep">Here is how we fixed it.</span>
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.15 }}
          className="font-body text-ink-soft text-base sm:text-lg md:text-xl mt-4 leading-relaxed max-w-2xl mx-auto"
        >
          High-trust partnerships built on clear communication, technical excellence,
          and zero bureaucratic runarounds.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
        {differentiators.map((diff, idx) => {
          const Icon = diff.icon;

          return (
            <motion.div
              key={diff.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 24,
                delay: prefersReducedMotion ? 0 : idx * 0.1,
              }}
              className={`${diff.span} p-8 sm:p-10 rounded-[36px] bg-peach/50 hover:bg-peach/75 border-2 border-orange/20 hover:border-orange transition-all duration-300 shadow-subtle flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-cream border-2 border-orange/40 flex items-center justify-center text-ink shadow-sm">
                    <Icon className="w-7 h-7 stroke-[2.2] text-orange-deep" />
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-butter text-ink shadow-xs">
                    {diff.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-3 leading-snug">
                  {diff.title}
                </h3>

                <p className="font-body text-ink-soft text-base leading-relaxed mb-6">
                  {diff.shortSummary}
                </p>
              </div>

              <div className="pt-6 border-t border-orange/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {diff.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-ink font-body">
                    <CheckCircle className="w-4 h-4 text-orange-deep shrink-0 stroke-[2.5]" />
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
