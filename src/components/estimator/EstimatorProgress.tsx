"use client";

import React from "react";
import { ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EstimatorProgressProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onClose?: () => void;
  stepTitle?: string;
  className?: string;
}

export function EstimatorProgress({
  currentStep,
  totalSteps,
  onBack,
  onClose,
  stepTitle,
  className = "",
}: EstimatorProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-4 py-2 border-b border-line select-none font-mono",
        className
      )}
    >
      {/* Back button or placeholder spacer */}
      <div className="flex items-center">
        {currentStep > 1 && onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Previous step (shortcut: Left Arrow)"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-fg-muted hover:text-fg border border-line rounded-[2px] bg-surface/50 hover:border-line-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BACK</span>
            <span className="text-[10px] text-red-text font-bold">[←]</span>
          </button>
        ) : (
          <span className="text-xs text-red-text font-bold uppercase tracking-wider">
            /01 CONFIG
          </span>
        )}
      </div>

      {/* Center Progress HUD */}
      <div
        className="flex flex-col items-center gap-1 flex-1 max-w-xs px-2"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${currentStep} of ${totalSteps}: ${stepTitle || ""}`}
      >
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-fg-muted uppercase tracking-wider">
          <span>STEP 0{currentStep}/0{totalSteps}</span>
          {stepTitle && (
            <>
              <span>•</span>
              <span className="text-fg truncate max-w-[140px] sm:max-w-none">
                {stepTitle}
              </span>
            </>
          )}
        </div>

        {/* Hairline Progress Track */}
        <div className="w-full h-1 bg-surface border border-line rounded-[1px] overflow-hidden">
          <div
            className="h-full bg-red transition-all duration-200 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Close button (if in modal) or placeholder spacer */}
      <div className="flex items-center justify-end">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close estimator (shortcut: Escape)"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-fg-muted hover:text-fg border border-line rounded-[2px] bg-surface/50 hover:border-line-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text"
          >
            <span className="hidden sm:inline">CLOSE</span>
            <span className="text-[10px] text-red-text font-bold">[ESC]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-[10px] text-fg-muted font-mono uppercase tracking-wider">
            V2.0
          </span>
        )}
      </div>
    </div>
  );
}
