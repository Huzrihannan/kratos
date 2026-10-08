"use client";

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Magnetic } from "@/components/fx/Magnetic";
import { useLayoutModal } from "@/lib/modal-context";

export function FinalCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { openEstimator } = useLayoutModal();

  // Gentle cursor reactive drift inside the CTA container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const blob1X = useTransform(smoothX, [-200, 200], [-25, 25]);
  const blob1Y = useTransform(smoothY, [-200, 200], [-25, 25]);
  const blob2X = useTransform(smoothX, [-200, 200], [20, -20]);
  const blob2Y = useTransform(smoothY, [-200, 200], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      aria-label="Call to Action"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-[44px] sm:rounded-[60px] bg-orange text-ink p-8 sm:p-14 md:p-20 shadow-blob border-4 border-orange-deep/20 text-center flex flex-col items-center justify-center"
      >
        {/* Floating cursor-reactive soft blobs inside orange card */}
        <motion.div
          className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-peach/40 blur-2xl"
          style={{
            x: prefersReducedMotion ? 0 : blob1X,
            y: prefersReducedMotion ? 0 : blob1Y,
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-butter/35 blur-3xl"
          style={{
            x: prefersReducedMotion ? 0 : blob2X,
            y: prefersReducedMotion ? 0 : blob2Y,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Availability Pill */}
          <div className="mb-6">
            <Pill variant="availability" className="bg-cream/90 text-ink shadow-sm">
              {siteConfig.availability.chipText}
            </Pill>
          </div>

          {/* Headline */}
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.08] mb-6 text-balance">
            Got an idea?&nbsp;
            <br className="hidden sm:inline" />
            Let&apos;s make it real.
          </h2>

          <p className="font-body text-ink/85 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-balance">
            Skip the bloated proposals and endless sales calls. Get an instant ballpark estimate
            or talk directly with an engineer today.
          </p>

          {/* Action Button Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg mb-8">
            <Magnetic strength={0.22}>
              <Button
                variant="secondary"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  openEstimator();
                }}
                withArrow
                className="w-full sm:w-auto min-h-[54px] text-base sm:text-lg bg-ink text-cream hover:bg-cocoa shadow-card"
              >
                Estimate my project
              </Button>
            </Magnetic>

            <Button
              variant="ghost"
              size="lg"
              href={siteConfig.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              withArrow={false}
              className="w-full sm:w-auto min-h-[54px] text-base border-ink/40 hover:border-ink hover:bg-cream/30 text-ink"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>Book a 15-min call</span>
            </Button>
          </div>

          {/* Bottom WhatsApp Link */}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-ink/75 transition-colors underline decoration-ink/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded p-1"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Prefer WhatsApp? Chat directly with our founders</span>
          </a>
        </div>
      </div>
    </section>
  );
}
