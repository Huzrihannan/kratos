"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLayoutModal } from "@/lib/modal-context";
import { EstimatorWizard } from "@/components/estimator/EstimatorWizard";

export function EstimatorModal() {
  const { isEstimatorOpen, closeEstimator } = useLayoutModal();
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle Escape key to close modal
  useEffect(() => {
    if (!isEstimatorOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeEstimator();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEstimatorOpen, closeEstimator]);

  return (
    <AnimatePresence>
      {isEstimatorOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Project Estimator"
          className="fixed inset-0 z-50 overflow-y-auto bg-cream/95 backdrop-blur-xl flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6"
        >
          {/* Backdrop click handler */}
          <div
            className="fixed inset-0 -z-10"
            onClick={closeEstimator}
            aria-hidden="true"
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 24 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 24 }
            }
            transition={{
              type: "spring" as const,
              stiffness: 380,
              damping: 26,
            }}
            className="w-full my-auto"
          >
            <EstimatorWizard onClose={closeEstimator} isModal={true} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
