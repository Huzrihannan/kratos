"use client";

import React, { useRef } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SpotlightGrid } from "@/components/fx/SpotlightGrid";
import { Caret } from "@/components/fx/Caret";
import { TypeLines, TerminalLine } from "@/components/fx/TypeLines";
import { Magnetic } from "@/components/fx/Magnetic";
import { useLayoutModal } from "@/lib/modal-context";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useTheme } from "@/themes/ThemeProvider";
import { MakeAWishCta } from "@/themes/dream/scenes/MakeAWishCta";

const TERMINAL_LINES: TerminalLine[] = [
  { prompt: ">", text: "awaiting input_", delay: 1800 },
];

export function FinalCta() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = useInViewPlayback(containerRef);
  const { openEstimator } = useLayoutModal();

  const isDream = theme === "dream";

  if (isDream) {
    return (
      <section
        aria-label="Call to Action"
        className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-7xl mx-auto"
      >
        <MakeAWishCta />
      </section>
    );
  }

  return (
    <section
      aria-label="Call to Action"
      className="relative w-full overflow-hidden bg-bg text-fg border-t border-line py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 select-none"
    >
      <SpotlightGrid className="w-full">
        {/* Corner registration '+' marks */}
        <span
          className="absolute top-4 left-4 font-mono text-xs text-line-strong select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute top-4 right-4 font-mono text-xs text-line-strong select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-4 left-4 font-mono text-xs text-line-strong select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-4 right-4 font-mono text-xs text-line-strong select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>

        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-10 px-4 sm:px-6 pb-6 sm:pb-8"
        >
          {/* Status Bar Micro-Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-line rounded-[2px] mb-8 font-mono text-xs text-fg-muted uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-ok animate-pulse shadow-[0_0_6px_var(--ok)]" />
            <span>[SYSTEM_READY // INTAKE_OPEN]</span>
          </div>

          {/* Giant Display Headline with huge blinking red Caret */}
          <h2 className="font-mono font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] text-fg leading-[1.08] mb-6 text-balance">
            Got an idea?&nbsp;
            <br className="hidden sm:inline" />
            Let&apos;s build it.
            <Caret width={14} height="1em" className="ml-2 sm:ml-3" />
          </h2>

          {/* Subhead / Loop Typing Terminal Line */}
          <div className="mb-8 h-8 flex items-center justify-center">
            {isPlaying && (
              <TypeLines
                lines={TERMINAL_LINES}
                loop={true}
                className="text-xs sm:text-sm font-mono text-fg-muted"
              />
            )}
          </div>

          <p className="font-sans text-fg-muted text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xl text-balance">
            Skip the bloated proposals and endless sales calls. Get an instant ballpark estimate
            or speak directly with an engineering lead today.
          </p>

          {/* 3 Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-8">
            <Magnetic strength={7}>
              <Button
                variant="primary"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  openEstimator();
                }}
                withArrow
                className="w-full sm:w-auto min-h-[52px] text-xs sm:text-sm font-mono uppercase tracking-wider"
              >
                Estimate my project
              </Button>
            </Magnetic>

            {siteConfig.contact.bookingUrl ? (
              <Button
                variant="ghost"
                size="lg"
                href={siteConfig.contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                withArrow={false}
                className="w-full sm:w-auto min-h-[52px] text-xs sm:text-sm font-mono uppercase tracking-wider border-line hover:border-line-strong hover:bg-surface text-fg"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book a 15-min call</span>
              </Button>
            ) : null}
          </div>

          {/* Direct WhatsApp Channel Link (if configured) */}
          {siteConfig.contact.whatsappUrl ? (
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center flex-wrap gap-2 font-mono text-xs text-fg-muted hover:text-fg transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text max-w-sm text-center"
            >
              <MessageSquare className="w-3.5 h-3.5 text-ok group-hover:scale-110 transition-transform shrink-0" />
              <span className="underline decoration-line-strong underline-offset-4">
                Prefer WhatsApp? Chat directly with our founders
              </span>
              <span className="text-red-text font-bold shrink-0" aria-hidden="true">
                →
              </span>
            </a>
          ) : null}
        </div>
      </SpotlightGrid>
    </section>
  );
}
