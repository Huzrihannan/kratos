"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";
import { BallparkCalculation } from "@/content/estimator-config";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Squish } from "@/components/fx/Squish";
import { BlobConfetti } from "@/components/fx/BlobConfetti";
import { trackEvent } from "@/lib/analytics";

interface ResultScreenProps {
  calculation: BallparkCalculation;
  leadName: string;
  leadEmail: string;
  projectTypeName: string;
  onRestart: () => void;
  onClose?: () => void;
}

export function ResultScreen({
  calculation,
  leadName,
  leadEmail,
  projectTypeName,
  onRestart,
}: ResultScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    trackEvent("estimator_complete", {
      projectType: projectTypeName,
      estimateMin: calculation.estimateMin,
      estimateMax: calculation.estimateMax,
    });
  }, [calculation, projectTypeName]);

  const whatsappMessage = encodeURIComponent(
    `Hi Kratos! I just estimated a ${projectTypeName} project (${calculation.formattedRange}, ~${calculation.formattedTimeline}). My name is ${leadName}. Let's chat!`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center p-6 sm:p-8 rounded-[36px] bg-peach/60 border-2 border-orange/30 shadow-blob overflow-visible"
    >
      <BlobConfetti count={36} />
      {/* Success Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-butter text-ink text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Your Ballpark Estimate Is Ready</span>
      </div>

      {/* Greeting */}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink tracking-tight mb-2">
        Great to meet you, {leadName}!
      </h2>
      <p className="font-body text-ink-soft text-sm sm:text-base max-w-lg mb-8">
        Based on your requirements for a <strong>{projectTypeName}</strong>, here is our ballpark projection:
      </p>

      {/* Main Estimate Display Card */}
      <div className="w-full p-6 sm:p-8 rounded-[28px] bg-cream border border-orange/25 shadow-card mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-deep font-body">
          Estimated Investment Range
        </span>
        <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight my-2">
          {calculation.formattedRange}
        </div>

        <div className="flex items-center justify-center gap-2 text-ink-soft text-sm sm:text-base font-medium mt-3 pt-3 border-t border-peach/80">
          <Clock className="w-4 h-4 text-orange-deep stroke-[2.2]" />
          <span>Estimated timeline: <strong>{calculation.formattedTimeline}</strong></span>
        </div>
      </div>

      {/* Friendly Signature Line */}
      <p className="font-display text-xl sm:text-2xl text-ink font-semibold tracking-tight mb-2">
        &ldquo;A ballpark, not a quote. Let&apos;s make it real.&rdquo;
      </p>
      <p className="text-xs sm:text-sm text-ink-soft max-w-md mb-8">
        Every project is unique. Let&apos;s jump on a quick discovery chat to walk through your architecture and lock in fixed milestones.
      </p>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center mb-8">
        <Button
          variant="primary"
          size="lg"
          href={siteConfig.contact.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-h-[52px] text-base"
          withArrow
          onClick={() => trackEvent("booking_click", { source: "estimator_result" })}
        >
          Book a 15-min call
        </Button>

        <Button
          variant="secondary"
          size="lg"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-h-[52px] text-base gap-2 bg-[#25D366] text-ink hover:bg-[#20ba5a]"
          withArrow={false}
          onClick={() => trackEvent("whatsapp_click", { source: "estimator_result" })}
        >
          <MessageCircle className="w-5 h-5 stroke-[2.2]" />
          <span>Chat on WhatsApp</span>
        </Button>
      </div>

      {/* Confirmation & Restart */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-orange/20 text-xs text-ink-soft gap-4">
        <div className="flex items-center gap-2 text-ink-soft">
          <CheckCircle2 className="w-4 h-4 text-[#25D366] stroke-[2.5]" />
          <span>Details emailed to <strong>{leadEmail}</strong></span>
        </div>

        <Squish>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 font-semibold text-ink-soft hover:text-ink underline decoration-orange underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-deep rounded p-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start another estimate</span>
          </button>
        </Squish>
      </div>
    </motion.div>
  );
}
