"use client";

import React from "react";
import { ArrowLeft, X } from "lucide-react";
import { Squish } from "@/components/fx/Squish";

interface EstimatorProgressProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onClose?: () => void;
  stepTitle?: string;
}

export function EstimatorProgress({
  currentStep,
  totalSteps,
  onBack,
  onClose,
  stepTitle,
}: EstimatorProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-between gap-4 mb-6 sm:mb-8 select-none">
      {/* Back button or placeholder spacer */}
      <div className="w-10 flex items-center justify-start">
        {currentStep > 1 && onBack && (
          <Squish>
            <button
              type="button"
              onClick={onBack}
              aria-label="Previous step"
              className="w-10 h-10 rounded-full bg-peach/70 hover:bg-peach text-ink flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          </Squish>
        )}
      </div>

      {/* Pill Progress Track */}
      <div
        className="flex-1 flex flex-col items-center"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
            <div
              key={stepNum}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                stepNum === currentStep
                  ? "w-8 sm:w-10 bg-orange shadow-sm"
                  : stepNum < currentStep
                  ? "w-4 sm:w-6 bg-orange-deep/70"
                  : "w-2.5 sm:w-3.5 bg-peach"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink-soft">
          Step {currentStep} of {totalSteps} {stepTitle ? `• ${stepTitle}` : ""}
        </span>
      </div>

      {/* Close button (if in modal) or placeholder spacer */}
      <div className="w-10 flex items-center justify-end">
        {onClose && (
          <Squish>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close estimator"
              className="w-10 h-10 rounded-full bg-peach/70 hover:bg-orange hover:text-ink text-ink-soft flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </Squish>
        )}
      </div>
    </div>
  );
}
