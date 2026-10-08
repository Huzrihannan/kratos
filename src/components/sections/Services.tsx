"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  Palette,
  ShieldCheck,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/content/services";
import { Squish } from "@/components/fx/Squish";
import { Button } from "@/components/ui/Button";
import { useLayoutModal } from "@/lib/modal-context";

export function Services() {
  const prefersReducedMotion = useReducedMotion();
  const { openEstimator } = useLayoutModal();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getServiceIcon = (iconName: ServiceItem["iconName"]) => {
    const iconClass = "w-7 h-7 stroke-[2.2] text-ink";
    switch (iconName) {
      case "Globe":
        return <Globe className={iconClass} />;
      case "Smartphone":
        return <Smartphone className={iconClass} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconClass} />;
      case "Cpu":
        return <Cpu className={iconClass} />;
      case "Palette":
        return <Palette className={iconClass} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
      default:
        return <Globe className={iconClass} />;
    }
  };

  return (
    <section
      id="services"
      aria-label="Services"
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
          <span>what we build</span>
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.08 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight leading-[1.12]"
        >
          Strong architecture underneath.&nbsp;
          <br className="hidden sm:inline" />
          <span className="text-orange-deep">Friendly to use</span> on top.
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.15 }}
          className="font-body text-ink-soft text-base sm:text-lg md:text-xl mt-4 leading-relaxed max-w-2xl mx-auto"
        >
          Every product we build is designed for zero jargon, rock-solid stability,
          and immediate business outcomes.
        </motion.p>
      </div>

      {/* 6 Large Squishy Pill-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {servicesData.map((service, index) => {
          const isHovered = hoveredCard === service.id;

          return (
            <motion.div
              key={service.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 24,
                delay: prefersReducedMotion ? 0 : index * 0.06,
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group rounded-[32px] sm:rounded-[36px] bg-peach/45 hover:bg-peach/80 border-2 border-orange/20 hover:border-orange transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between shadow-subtle hover:shadow-card overflow-hidden"
            >
              {/* Background ambient circular portal glow */}
              <div
                className={`absolute -right-12 -top-12 w-44 h-44 rounded-full bg-orange/15 transition-all duration-500 pointer-events-none blur-2xl ${
                  isHovered ? "scale-150 opacity-100 bg-orange/25" : "scale-100 opacity-50"
                }`}
                aria-hidden="true"
              />

              <div>
                {/* Header: Portal Circle + Title */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  {/* Signature Circular Portal Cutout Icon */}
                  <div
                    className={`relative w-14 h-14 rounded-full bg-cream border-2 border-orange/40 flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isHovered ? "scale-110 bg-orange border-orange-deep shadow-glow" : ""
                    }`}
                  >
                    {getServiceIcon(service.iconName)}
                  </div>

                  {/* Tags Pill */}
                  <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-cream/90 text-ink-soft border border-peach/80">
                    {service.tags[0]}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-[1.65rem] text-ink tracking-tight mb-2.5 group-hover:text-ink transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="font-body text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
                  {service.shortPromise}
                </p>

                {/* 3 Bullet Outcomes */}
                <ul className="space-y-2.5 mb-8">
                  {service.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/85 font-body">
                      <div className="w-5 h-5 rounded-full bg-orange/25 text-ink-soft flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3] text-ink" />
                      </div>
                      <span className="leading-snug">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Learn More Link with Squish */}
              <div className="pt-4 border-t border-orange/15 flex items-center justify-between">
                <Squish>
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-orange-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep rounded-full py-1 px-1"
                  >
                    <span>Explore service</span>
                    <div className="w-6 h-6 rounded-full bg-ink text-cream group-hover:bg-orange group-hover:text-ink flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </Link>
                </Squish>

                <span className="text-xs font-mono text-ink-soft/70">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mid-Page Path to Estimator */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="mt-14 sm:mt-16 text-center"
      >
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-2 sm:p-2.5 rounded-full bg-peach/40 border border-peach/80">
          <span className="text-sm text-ink-soft font-body px-4">
            Not sure which architecture fits your roadmap?
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              openEstimator();
            }}
            withArrow
            className="text-sm min-h-[42px]"
          >
            Calculate ballpark estimate
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
