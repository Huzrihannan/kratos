"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutModal } from "@/lib/modal-context";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { EstimatorWizard } from "@/components/estimator/EstimatorWizard";

export function EstimatorModal() {
  const { isEstimatorOpen, closeEstimator } = useLayoutModal();
  const { isOff } = useMotionLevel();
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
          aria-label="Interactive Project Estimator Configurator"
          className="fixed inset-0 z-50 overflow-y-auto bg-bg/95 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-2 sm:p-4 md:p-6"
        >
          {/* Backdrop click handler */}
          <div
            className="fixed inset-0 -z-10"
            onClick={closeEstimator}
            aria-hidden="true"
          />

          <motion.div
            initial={isOff ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={isOff ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full my-auto max-w-6xl bg-bg border border-line rounded-[2px] shadow-2xl overflow-hidden"
          >
            <EstimatorWizard onClose={closeEstimator} isModal={true} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
