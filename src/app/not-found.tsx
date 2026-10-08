import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { Glitch } from "@/components/fx/Glitch";
import { Caret } from "@/components/fx/Caret";
import { SpotlightGrid } from "@/components/fx/SpotlightGrid";
import { EstimatorButton } from "@/components/estimator/EstimatorButton";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center font-mono">
      <SpotlightGrid className="max-w-3xl w-full p-4 sm:p-8 rounded-[2px] border border-line bg-surface/90 shadow-2xl relative">
        {/* Chrome Title Bar */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-line text-[11px] text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
            <span className="font-bold text-red-text">CRITICAL_EXCEPTION: KERNEL_PANIC</span>
          </div>
          <span className="text-[10px] text-fg-muted">PID: 0x00000404</span>
        </div>

        {/* Glitching Monospace Header */}
        <div className="text-center my-6 sm:my-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-bg border border-red text-[11px] text-red-text font-bold">
            <span>ERROR CODE: 404</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg tracking-tight">
            <Glitch triggerOnHover={false}>
              404 — PROCESS NOT FOUND
            </Glitch>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-fg-muted max-w-md mx-auto leading-relaxed">
            The target memory address or route does not exist in the Krat.OS virtual directory table.
          </p>
        </div>

        {/* Memory Dump Stack Trace */}
        <div className="p-4 sm:p-5 rounded-[2px] bg-bg border border-line text-[11px] space-y-2 mb-8 overflow-x-auto text-fg-muted">
          <div className="text-red-text font-bold">
            *** KERNEL DUMP AT ADDRESS 0x000000404 ***
          </div>
          <div>FAULT: ROUTE_UNRESOLVED // STATUS: 404_PAGE_NOT_FOUND</div>
          <div className="text-fg/80 pl-2 border-l border-line space-y-1">
            <div>at router.resolve (sys/routing.ts:404:12)</div>
            <div>at dispatch.navigate (sys/kernel.ts:89:4)</div>
            <div>at runtime.exec (sys/boot.ts:1:1)</div>
          </div>
          <div className="pt-2 text-fg flex items-center gap-2">
            <span>&gt; system halted. awaiting restart instruction</span>
            <Caret />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-line">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] bg-fg text-bg hover:bg-fg/90 font-bold uppercase tracking-wider text-xs transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-red" />
            <span>cd ~ (Return Home)</span>
          </Link>
          <EstimatorButton
            size="md"
            variant="ghost"
            className="w-full sm:w-auto text-xs uppercase border border-line hover:border-line-strong"
          >
            Estimate a project
          </EstimatorButton>
        </div>
      </SpotlightGrid>
    </div>
  );
}
