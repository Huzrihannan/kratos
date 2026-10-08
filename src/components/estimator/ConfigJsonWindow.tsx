"use client";

import React from "react";
import { Window } from "@/components/ui/Window";
import { cn } from "@/lib/utils";

interface EstimatorConfigState {
  projectType: string;
  needs: string[];
  timeline: string;
  budget: string;
  name?: string;
  email?: string;
}

interface ConfigJsonWindowProps {
  currentStep: number;
  totalSteps?: number;
  state: EstimatorConfigState;
  className?: string;
}

export function ConfigJsonWindow({
  currentStep,
  totalSteps = 6,
  state,
  className = "",
}: ConfigJsonWindowProps) {
  const progressPercent = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  return (
    <Window
      title="krat.config.json"
      statusText="[LIVE_SPEC]"
      cornerBrackets={true}
      className={cn(
        "h-full flex flex-col justify-between border-line bg-surface/95 select-none",
        className
      )}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        {/* Top Build Progress Bar */}
        <div className="space-y-1.5 pb-3 border-b border-line/60">
          <div className="flex items-center justify-between font-mono text-[11px] text-fg-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ok shadow-[0_0_6px_var(--ok)] animate-pulse" />
              <span>BUILD_SPEC: STEP 0{currentStep}/0{totalSteps}</span>
            </span>
            <span className="text-red-text font-bold">{progressPercent}%</span>
          </div>

          <div className="w-full h-1.5 bg-bg border border-line rounded-[1px] overflow-hidden">
            <div
              className="h-full bg-red transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Live Syntax-Highlighted JSON Body */}
        <div
          role="region"
          aria-live="polite"
          aria-label="Generated Project Configuration"
          className="flex-1 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto p-2 bg-bg/60 border border-line/60 rounded-[2px]"
        >
          <pre className="text-fg-muted">
            <code>
              <span className="text-line-strong">{"{"}</span>
              {"\n"}  <span className="text-fg-muted">&quot;$schema&quot;</span>: <span className="text-fg">&quot;https://krat-os.dev/spec.json&quot;</span>,
              {"\n"}  <span className="text-fg-muted">&quot;config_version&quot;</span>: <span className="text-ok">2.0</span>,
              {"\n"}  <span className="text-fg-muted">&quot;project&quot;</span>: <span className="text-line-strong">{"{"}</span>
              {"\n"}    <span className={cn(currentStep === 1 ? "text-red-text font-bold" : "text-fg-muted")}>&quot;type&quot;</span>: <span className="text-fg">&quot;{state.projectType}&quot;</span>,
              {"\n"}    <span className={cn(currentStep === 2 ? "text-red-text font-bold" : "text-fg-muted")}>&quot;scope&quot;</span>: <span className="text-line-strong">[</span>
              {state.needs.map((need, idx) => (
                <span key={need}>
                  {"\n"}      <span className="text-fg">&quot;{need}&quot;</span>{idx < state.needs.length - 1 ? "," : ""}
                </span>
              ))}
              {"\n"}    <span className="text-line-strong">]</span>,
              {"\n"}    <span className={cn(currentStep === 3 ? "text-red-text font-bold" : "text-fg-muted")}>&quot;timeline&quot;</span>: <span className="text-fg">&quot;{state.timeline}&quot;</span>,
              {"\n"}    <span className={cn(currentStep === 4 ? "text-red-text font-bold" : "text-fg-muted")}>&quot;target_budget&quot;</span>: <span className="text-fg">&quot;{state.budget}&quot;</span>
              {"\n"}  <span className="text-line-strong">{"}"}</span>,
              {"\n"}  <span className="text-fg-muted">&quot;status&quot;</span>: <span className="text-ok">&quot;{currentStep === 6 ? "READY_TO_BUILD" : "CONFIGURING"}&quot;</span>
              {state.name && (
                <>
                  ,{"\n"}  <span className="text-fg-muted">&quot;owner&quot;</span>: <span className="text-fg">&quot;{state.name}&quot;</span>
                </>
              )}
              {"\n"}<span className="text-line-strong">{"}"}</span>
            </code>
          </pre>
        </div>

        {/* Window Footer Meta */}
        <div className="pt-2 border-t border-line/60 flex items-center justify-between font-mono text-[10px] text-fg-muted">
          <span>ENC: UTF-8</span>
          <span className="text-ok">SYNTAX: JSON_VALID</span>
        </div>
      </div>
    </Window>
  );
}
