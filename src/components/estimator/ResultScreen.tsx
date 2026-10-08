"use client";

import React, { useEffect } from "react";
import { MessageSquare, Clock, CheckCircle2, RotateCcw, Calendar, Mail } from "lucide-react";
import { BallparkCalculation, estimatorConfig } from "@/content/estimator-config";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Window } from "@/components/ui/Window";
import { Odometer } from "@/components/fx/Odometer";
import { BurstCanvas } from "./BurstCanvas";
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
  useEffect(() => {
    trackEvent("estimator_complete", {
      projectType: projectTypeName,
      estimateMin: calculation.estimateMin,
      estimateMax: calculation.estimateMax,
    });
  }, [calculation, projectTypeName]);

  const hasWhatsapp = Boolean(siteConfig.contact.whatsappNumber && siteConfig.contact.whatsappNumber.trim());
  const hasBooking = Boolean(siteConfig.contact.bookingUrl && siteConfig.contact.bookingUrl.trim());

  const whatsappMessage = encodeURIComponent(
    `Hi Krat.OS! I just estimated a ${projectTypeName} project. My name is ${leadName}. Let's chat!`
  );
  const whatsappUrl = hasWhatsapp
    ? `https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`
    : "";

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none py-4">
      {/* 600ms micro-burst of red and cream squares */}
      <BurstCanvas />

      <Window
        title="krat.result.terminal"
        statusText="[BUILD_COMPLETE]"
        cornerBrackets={true}
        className="w-full border-line bg-surface/95"
      >
        <div className="flex flex-col items-center text-center p-4 sm:p-6 space-y-6">
          {/* Header Status Bar */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-bg border border-line text-xs font-mono text-fg-muted uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-ok shadow-[0_0_8px_var(--ok)] animate-pulse" />
            <span>BUILD SPEC LOCKED // 100% COMPILED</span>
          </div>

          {/* Personalized Greeting */}
          <div className="space-y-1.5">
            <h2 className="font-mono font-bold text-2xl sm:text-3xl text-fg tracking-tight">
              Great to meet you, {leadName}!
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fg-muted max-w-md mx-auto">
              Based on your configuration for a <strong>{projectTypeName}</strong>, here is your production projection:
            </p>
          </div>

          {/* Main Estimate Display Tile (Suppressed if owner has not approved prices) */}
          {estimatorConfig.showEstimate ? (
            <div className="w-full p-6 sm:p-8 rounded-[2px] bg-bg border border-line space-y-3">
              <span className="font-mono text-xs text-red-text uppercase tracking-widest font-bold">
                ESTIMATED INVESTMENT RANGE
              </span>

              <div className="font-mono text-3xl sm:text-5xl lg:text-6xl text-fg font-extrabold tracking-[-0.04em] flex items-baseline justify-center gap-2 sm:gap-3 flex-wrap">
                <Odometer
                  value={calculation.estimateMin.toLocaleString()}
                  prefix="$"
                  className="text-fg"
                />
                <span className="text-line-strong font-normal">—</span>
                <Odometer
                  value={calculation.estimateMax.toLocaleString()}
                  prefix="$"
                  className="text-fg"
                />
              </div>

              <div className="flex items-center justify-center gap-2 pt-3 border-t border-line/60 font-mono text-xs sm:text-sm text-fg-muted">
                <Clock className="w-4 h-4 text-red-text shrink-0" />
                <span>
                  Estimated timeline: <strong className="text-fg font-bold">{calculation.formattedTimeline}</strong>
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full p-6 sm:p-8 rounded-[2px] bg-bg border border-line space-y-3">
              <span className="font-mono text-xs text-red-text uppercase tracking-widest font-bold">
                SPECIFICATION RECEIVED // REVIEW IN PROGRESS
              </span>

              <div className="font-mono text-xl sm:text-2xl text-fg font-bold leading-snug">
                Your custom scope estimate will be sent by email after an engineering review.
              </div>

              <div className="flex items-center justify-center gap-2 pt-3 border-t border-line/60 font-mono text-xs text-fg-muted">
                <span>
                  Timeline and milestone architecture will be confirmed with our engineering leads.
                </span>
              </div>
            </div>
          )}

          {/* Signature Quote */}
          <div className="space-y-1">
            <p className="font-mono text-lg sm:text-xl text-fg font-bold">
              &ldquo;A ballpark, not a quote. Let&apos;s make it real.&rdquo;
            </p>
            <p className="font-sans text-xs sm:text-sm text-fg-muted max-w-md mx-auto">
              Every system is unique. Let&apos;s jump on a quick discovery chat to walk through your architecture and lock in fixed milestones.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
            {hasBooking && (
              <Button
                variant="primary"
                size="lg"
                href={siteConfig.contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                withArrow
                className="w-full sm:w-auto font-mono text-xs uppercase"
                onClick={() => trackEvent("booking_click", { source: "estimator_result" })}
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book a 15-min call</span>
              </Button>
            )}

            {hasWhatsapp && (
              <Button
                variant="ghost"
                size="lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                withArrow={false}
                className="w-full sm:w-auto font-mono text-xs uppercase border-line hover:border-line-strong text-fg"
                onClick={() => trackEvent("whatsapp_click", { source: "estimator_result" })}
              >
                <MessageSquare className="w-4 h-4 mr-2 text-ok" />
                <span>Chat on WhatsApp</span>
              </Button>
            )}

            {!hasBooking && !hasWhatsapp && (
              <Button
                variant="primary"
                size="lg"
                href={`mailto:${siteConfig.contact.email}`}
                withArrow
                className="w-full sm:w-auto font-mono text-xs uppercase"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span>Email Engineering Team</span>
              </Button>
            )}
          </div>

          {/* Confirmation & Restart Footer */}
          <div className="w-full pt-4 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-fg-muted gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ok shrink-0" />
              <span>
                Details emailed to <strong className="text-fg">{leadEmail}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg underline decoration-line-strong underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text p-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start another estimate</span>
            </button>
          </div>
        </div>
      </Window>
    </div>
  );
}
