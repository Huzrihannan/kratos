"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Section } from "@/components/ui/Section";
import { Window } from "@/components/ui/Window";
import { TypeLines, TerminalLine } from "@/components/fx/TypeLines";
import { Wipe } from "@/components/fx/Wipe";
import { Button } from "@/components/ui/Button";
import { Decode } from "@/components/fx/Decode";
import { useLayoutModal } from "@/lib/modal-context";

// Lazy-load desktop pinned GSAP track with no SSR to keep initial mobile bundle ultra-light
const DesktopPipelineTrack = dynamic(
  () =>
    import("./pipeline/DesktopPipelineTrack").then(
      (m) => m.DesktopPipelineTrack
    ),
  { ssr: false }
);

interface PipelineStep {
  number: string;
  nodeKey: string;
  title: string;
  timeframe: string;
  summary: string;
  terminalLines: TerminalLine[];
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    number: "01",
    nodeKey: "01_discover",
    title: "Discover",
    timeframe: "[PLACEHOLDER] Week 1",
    summary: "We analyze technical constraints, user bottlenecks, and data boundaries to define clear milestones.",
    terminalLines: [
      { prompt: "$", text: "krat inspect --scope requirements", delay: 180 },
      { prompt: "→", text: "mapping system boundaries & schema models", progressBar: true },
      { prompt: "✓", text: "architecture spec sheet locked [ok]", status: "ok" },
    ],
  },
  {
    number: "02",
    nodeKey: "02_design",
    title: "Design",
    timeframe: "[PLACEHOLDER] Weeks 2–3",
    summary: "High-fidelity interactive components and token architecture that validate user flows before coding.",
    terminalLines: [
      { prompt: "$", text: "krat prototype --interactive", delay: 180 },
      { prompt: "→", text: "compiling design tokens & layout system", progressBar: true },
      { prompt: "✓", text: "user flows validated before writing code [ok]", status: "ok" },
    ],
  },
  {
    number: "03",
    nodeKey: "03_build",
    title: "Build",
    timeframe: "[PLACEHOLDER] Weeks 4–8",
    summary: "Two-week agile sprints with working staging builds every Friday, strict types, and zero outsourcing.",
    terminalLines: [
      { prompt: "$", text: "krat sprint --fullstack", delay: 180 },
      { prompt: "→", text: "agile delivery cycles with staging builds", progressBar: true },
      { prompt: "✓", text: "100% typed code & automated test suites passing [ok]", status: "ok" },
    ],
  },
  {
    number: "04",
    nodeKey: "04_launch",
    title: "Launch",
    timeframe: "[PLACEHOLDER] Week 9",
    summary: "Edge caching, security audit, DNS routing, and zero-downtime cutover with automated verification.",
    terminalLines: [
      { prompt: "$", text: "krat deploy --production", delay: 180 },
      { prompt: "→", text: "edge caching, dns routing & zero downtime cutover", progressBar: true },
      { prompt: "✓", text: "system live in production environment [ok]", status: "ok" },
    ],
  },
  {
    number: "05",
    nodeKey: "05_grow",
    title: "Grow",
    timeframe: "[PLACEHOLDER] Ongoing",
    summary: "Continuous telemetry, SLA monitoring, and monthly feature iteration cycles as your engineering partner.",
    terminalLines: [
      { prompt: "$", text: "krat monitor --telemetry", delay: 180 },
      { prompt: "→", text: "continuous performance tracking & security updates", progressBar: true },
      { prompt: "✓", text: "all systems operational [deployed]", status: "ok" },
    ],
  },
];

export function Process() {
  const { openEstimator } = useLayoutModal();

  return (
    <Section
      id="process"
      eyebrow="/02 — PIPELINE"
      headline={
        <span>
          How we <Decode text="work" speed={40} delay={200} />
        </span>
      }
      description="Predictable CI/CD engineering pipeline. Real progress lines, transparent staging environments, and zero guesswork."
      hud={
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/80">
          MODE: LINEAR_PIPELINE
        </span>
      }
      className="p-0 sm:py-0"
    >
      {/* DESKTOP PINNED PIPELINE SCENE (Lazy chunked with ssr: false) */}
      <DesktopPipelineTrack steps={PIPELINE_STEPS} />

      {/* MOBILE / LITE / OFF MODE: Unpinned Vertical Timeline Stack */}
      <div className="lg:hidden flex flex-col gap-6 py-6">
        {PIPELINE_STEPS.map((step, idx) => (
          <Wipe key={step.nodeKey} delay={idx * 0.08} direction="up">
            <Window
              title={step.nodeKey}
              statusText={`[${step.number}]`}
              cornerBrackets={true}
              className="border-line bg-surface"
              headerRight={
                idx === PIPELINE_STEPS.length - 1 ? (
                  <span className="font-mono text-[10px] text-ok font-bold uppercase tracking-wider">
                    [DEPLOYED]
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-fg-muted uppercase tracking-wider">
                    {step.timeframe}
                  </span>
                )
              }
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-mono text-base font-bold text-fg mb-1">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-fg-muted leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                <div className="border border-line bg-bg/80 p-3 rounded-[2px]">
                  <TypeLines lines={step.terminalLines} loop={false} />
                </div>
              </div>
            </Window>
          </Wipe>
        ))}
      </div>

      {/* Estimator Bridge Link */}
      <div className="mt-8 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-fg-muted">
          Ready to run your project through our pipeline?
        </span>
        <Button variant="secondary" size="sm" onClick={openEstimator}>
          Estimate your timeline
        </Button>
      </div>
    </Section>
  );
}
