"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Window } from "@/components/ui/Window";
import { Tilt } from "@/components/fx/Tilt";
import { Tape } from "@/components/ui/Tape";
import { Tag } from "@/components/ui/Tag";
import { Odometer } from "@/components/fx/Odometer";
import { Decode } from "@/components/fx/Decode";
import { Button } from "@/components/ui/Button";
import { caseStudiesData } from "@/content/work";
import { isPublishable } from "@/lib/content-status";
import { useLayoutModal } from "@/lib/modal-context";

const WORK_TITLES: Record<string, string> = {
  "fintech-portal": "project_01.novaledger",
  "healthtech-mobile": "project_02.vitalsync",
  "logistics-automation": "project_03.fleetroute",
};

const WORK_STATUSES: Record<string, string> = {
  "fintech-portal": "[PROD_V2]",
  "healthtech-mobile": "[RELEASE_1.4]",
  "logistics-automation": "[ACTIVE_DISPATCH]",
};

export function Work() {
  const { openEstimator } = useLayoutModal();
  const publishableStudies = caseStudiesData.filter(isPublishable);

  const projectTapeNames = publishableStudies.map(
    (s) => `${s.title.toUpperCase()} // ${s.industry.toUpperCase()}`
  );

  return (
    <Section
      id="work"
      eyebrow="/03 — SELECTED WORK"
      headline={
        <span>
          Things we&apos;re <Decode text="proud of" speed={40} delay={200} />
        </span>
      }
      description="Production systems engineered for measurable business outcomes. Real architecture, strict security audits, and zero bloat."
      hud={
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/80">
          ARCHIVE: 03_FLAGSHIP
        </span>
      }
    >
      {/* Ticker Tape of Flagship Projects */}
      {projectTapeNames.length > 0 && (
        <div className="mb-8">
          <Tape
            items={projectTapeNames}
            separator="///"
            speed={30}
            className="border-line bg-surface/30"
          />
        </div>
      )}

      {/* Case Studies Grid (Desktop 3-col grid; Mobile scrollable carousel) */}
      <div className="flex overflow-x-auto pb-6 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 snap-x snap-mandatory">
        {publishableStudies.map((study, idx) => {
          const windowTitle = WORK_TITLES[study.id] || `project_0${idx + 1}.sys`;
          const statusText = WORK_STATUSES[study.id] || "[VERIFIED]";

          // Parse metric value for Odometer
          const rawValue = study.metricValue.replace(/[^0-9.]/g, "");
          const prefix = study.metricValue.startsWith("+") ? "+" : "";
          const suffix = study.metricValue.endsWith("%")
            ? "%"
            : study.metricValue.endsWith("x")
            ? "x"
            : "";

          return (
            <div
              key={study.id}
              className="min-w-[280px] sm:min-w-0 w-full shrink-0 snap-center h-full"
            >
              <Tilt maxTilt={4} glare={true} className="h-full">
                <Window
                  title={windowTitle}
                  statusText={statusText}
                  cornerBrackets={true}
                  className="h-full flex flex-col justify-between border-line bg-surface/90 hover:border-line-strong transition-colors"
                >
                  <div className="flex flex-col gap-4">
                    {/* Architectural Mockup Header */}
                    <div className="relative w-full h-40 bg-bg border border-line/60 rounded-[2px] p-4 flex flex-col justify-between overflow-hidden select-none">
                      {/* Grid registration lines */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                        aria-hidden="true"
                      />

                      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-fg-muted/70 uppercase">
                        <span>{study.industry}</span>
                        <span className="text-red-text font-bold">CLIENT // ENCRYPTED</span>
                      </div>

                      {/* Mockup Center Graphic */}
                      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
                        <div className="font-mono text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
                          <Odometer
                            value={rawValue || 100}
                            prefix={prefix}
                            suffix={suffix}
                            className="text-red-text"
                          />
                        </div>
                        <span className="font-mono text-[10px] text-fg-muted uppercase tracking-wider mt-1">
                          {study.metricLabel}
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-fg-muted/60">
                        <span>LATENCY: &lt;80MS</span>
                        <span>STACK: VERIFIED</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-mono text-base sm:text-lg font-bold text-fg mb-1.5 leading-snug">
                        {study.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-fg-muted leading-relaxed line-clamp-3">
                        {study.summary}
                      </p>
                    </div>

                    {/* Technical Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line/50">
                      {study.tags.slice(0, 4).map((tag, tIdx) => (
                        <Tag key={tIdx}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Deep Link */}
                  <div className="pt-6 mt-4 border-t border-line/50 flex items-center justify-between">
                    <Link
                      href={`/work/${study.slug}`}
                      data-cursor="open"
                      className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg font-semibold hover:text-red-text transition-colors"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <ExternalLink className="h-3.5 w-3.5 text-fg-muted/50" />
                  </div>
                </Window>
              </Tilt>
            </div>
          );
        })}
      </div>

      {/* Estimator Bridge Footer */}
      <div className="mt-12 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="font-mono text-xs font-bold text-fg">
            Have a project with similar technical complexity?
          </div>
          <div className="font-sans text-xs text-fg-muted">
            We will review your architecture and provide an honest scope estimate.
          </div>
        </div>

        <Button variant="primary" size="md" onClick={openEstimator}>
          Estimate my project
        </Button>
      </div>
    </Section>
  );
}
