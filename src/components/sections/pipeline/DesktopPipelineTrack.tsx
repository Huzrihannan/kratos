"use client";

import React, { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Window } from "@/components/ui/Window";
import { TypeLines, TerminalLine } from "@/components/fx/TypeLines";
import { useGsapContext } from "@/lib/motion/gsap";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface PipelineStep {
  number: string;
  nodeKey: string;
  title: string;
  timeframe: string;
  summary: string;
  terminalLines: TerminalLine[];
}

export interface DesktopPipelineTrackProps {
  steps: PipelineStep[];
}

export function DesktopPipelineTrack({ steps }: DesktopPipelineTrackProps) {
  const { isFull } = useMotionLevel();
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  useGsapContext(() => {
    if (!isFull || typeof window === "undefined") return;
    if (!pinnedSectionRef.current || !trackRef.current) return;

    ScrollTrigger.create({
      trigger: pinnedSectionRef.current,
      start: "top top",
      end: "+=180%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
        setActiveNodeIndex(index);

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }
      },
    });
  }, pinnedSectionRef);

  const activeStep = steps[activeNodeIndex];

  return (
    <div
      ref={pinnedSectionRef}
      className="hidden lg:flex flex-col justify-center min-h-[90vh] py-16"
    >
      <div ref={trackRef} className="max-w-6xl mx-auto w-full px-4">
        {/* Pipeline Horizontal Circuit Track */}
        <div className="relative w-full mb-12 select-none">
          {/* Background Hairline Track */}
          <div className="h-[2px] w-full bg-line relative">
            {/* Scrubbed Signal Red Progress Line */}
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-red transition-all duration-75"
              style={{ width: `${(activeNodeIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Nodes along the track */}
          <div className="absolute -top-3 inset-x-0 flex justify-between pointer-events-none">
            {steps.map((step, idx) => {
              const isPassed = idx <= activeNodeIndex;
              const isCurrent = idx === activeNodeIndex;
              const isFinal = idx === steps.length - 1;

              return (
                <div
                  key={step.nodeKey}
                  className="flex flex-col items-center pointer-events-auto cursor-pointer"
                  onClick={() => setActiveNodeIndex(idx)}
                >
                  {/* Node Dot / Marker */}
                  <div
                    className={`h-7 w-7 rounded-[2px] border flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 ${
                      isCurrent
                        ? isFinal
                          ? "border-ok bg-surface text-ok shadow-glow"
                          : "border-red bg-surface text-red shadow-glow"
                        : isPassed
                        ? "border-fg text-fg bg-surface"
                        : "border-line text-fg-muted/60 bg-bg"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Node Label */}
                  <span
                    className={`mt-2 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                      isCurrent ? "text-fg font-bold" : "text-fg-muted/70"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Node Detail Window (Scrubbed with scroll) */}
        <div className="max-w-3xl mx-auto w-full pt-8">
          <Window
            key={activeStep.nodeKey}
            title={activeStep.nodeKey}
            statusText={activeNodeIndex === steps.length - 1 ? "[DEPLOYED]" : `[NODE_${activeStep.number}]`}
            cornerBrackets={true}
            className="border-line-strong bg-surface shadow-card"
            headerRight={
              activeNodeIndex === steps.length - 1 ? (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-ok uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
                  <span>OPERATIONAL</span>
                </span>
              ) : undefined
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-red-text font-bold">
                    {`PHASE ${activeStep.number} // ${activeStep.timeframe}`}
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold text-fg">
                  {activeStep.title}
                </h3>
                <p className="font-sans text-sm text-fg-muted leading-relaxed">
                  {activeStep.summary}
                </p>
              </div>

              {/* Live Diagnostic TypeLines for active step */}
              <div className="md:col-span-6 border border-line bg-bg/70 p-4 rounded-[2px] min-h-[140px]">
                <div className="text-[10px] font-mono text-fg-muted/60 uppercase tracking-wider pb-2 mb-2 border-b border-line">
                  {`EXECUTION_LOG // ${activeStep.nodeKey}`}
                </div>
                <TypeLines lines={activeStep.terminalLines} loop={false} />
              </div>
            </div>
          </Window>
        </div>
      </div>
    </div>
  );
}
