"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { useMotionLevel } from "@/lib/motion/MotionContext";

interface CloudWipeContextValue {
  triggerWipe: (onApex: () => void, onComplete?: () => void) => void;
  isWiping: boolean;
}

const CloudWipeContext = createContext<CloudWipeContextValue>({
  triggerWipe: (cb) => cb(),
  isWiping: false,
});

export function CloudWipeProvider({ children }: { children: React.ReactNode }) {
  const { isLite, isOff } = useMotionLevel();
  const [stage, setStage] = useState<"idle" | "covering" | "uncovering">("idle");
  const onApexRef = useRef<(() => void) | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);

  const triggerWipe = useCallback(
    (onApex: () => void, onComplete?: () => void) => {
      // If reduced motion is requested or in lite/off mode, execute immediately with zero wipe
      if (
        isLite ||
        isOff ||
        (typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      ) {
        onApex();
        onComplete?.();
        return;
      }

      onApexRef.current = onApex;
      onCompleteRef.current = onComplete || null;

      // Stage 1: Covering (0ms -> 340ms)
      setStage("covering");

      // Stage 2: Apex at 350ms (invoke swap, start uncovering)
      setTimeout(() => {
        onApexRef.current?.();
        setStage("uncovering");
      }, 340);

      // Stage 3: Complete at 700ms (clear overlay, return to idle)
      setTimeout(() => {
        setStage("idle");
        onCompleteRef.current?.();
      }, 700);
    },
    [isLite, isOff]
  );

  const isWiping = stage !== "idle";

  return (
    <CloudWipeContext.Provider value={{ triggerWipe, isWiping }}>
      {children}

      {/* Layered Vector Cloud Wipe Overlay */}
      {isWiping && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
        >
          <div
            className="absolute inset-y-0 w-[125vw] -left-[12.5vw] flex items-stretch transition-transform duration-[340ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform:
                stage === "covering"
                  ? "translateX(0%)"
                  : stage === "uncovering"
                  ? "translateX(100%)"
                  : "translateX(-100%)",
            }}
          >
            {/* Background Sky Atmosphere */}
            <div className="relative w-full h-full bg-gradient-to-r from-[#6DB6F0] via-[#B4DDF7] to-[#FFF0D4] flex items-center justify-center shadow-2xl">
              {/* Back Layer of Soft Tinted Cloud Puffs */}
              <div className="absolute inset-0 overflow-hidden opacity-60">
                <svg
                  className="absolute -top-12 -left-20 w-[60vw] h-[60vh] fill-[#FFE0B5]"
                  viewBox="0 0 400 300"
                >
                  <path d="M50 200 C30 180 30 140 60 120 C70 80 120 70 150 90 C180 50 240 60 260 100 C300 90 340 120 330 160 C360 180 360 220 330 240 C310 260 100 260 50 200 Z" />
                </svg>
                <svg
                  className="absolute -bottom-16 -right-24 w-[70vw] h-[65vh] fill-[#F2B8CF]"
                  viewBox="0 0 400 300"
                >
                  <path d="M70 210 C40 190 40 140 80 120 C100 70 160 60 200 90 C230 40 300 50 330 100 C370 100 400 140 380 180 C400 210 380 250 340 260 C280 280 120 270 70 210 Z" />
                </svg>
              </div>

              {/* Mid Layer of Billowing Clouds */}
              <div className="absolute inset-0 overflow-hidden opacity-85">
                <svg
                  className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[75vw] h-[70vh] fill-[#FFFFFF]"
                  viewBox="0 0 500 300"
                >
                  <path d="M60 220 C20 200 20 140 70 120 C80 60 160 50 200 90 C240 30 330 40 360 100 C410 90 450 130 440 180 C480 210 460 260 410 270 C330 285 130 280 60 220 Z" />
                </svg>
                <svg
                  className="absolute -top-10 right-10 w-[55vw] h-[55vh] fill-[#FFFAF0]"
                  viewBox="0 0 400 260"
                >
                  <path d="M50 180 C20 160 30 110 70 100 C90 50 150 40 190 70 C220 30 290 35 310 80 C350 80 380 110 370 150 C390 180 370 210 330 220 C260 235 110 230 50 180 Z" />
                </svg>
              </div>

              {/* Fore Layer with Leading Edge Cloud Scallops */}
              <div className="absolute -right-16 inset-y-0 w-32 flex flex-col justify-around pointer-events-none opacity-90 fill-[#FFFFFF]">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                </svg>
                <svg className="w-40 h-40 -mr-6" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" />
                </svg>
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" />
                </svg>
              </div>

              {/* Central Storybook Floating Crest */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-white/70 shadow-md flex items-center justify-center mb-2 animate-bounce">
                  <span className="w-4 h-4 rounded-full bg-[#FD142B]" />
                </div>
                <span className="font-serif italic text-sm text-[#2B2A52]/75 tracking-wider">
                  Plant an idea. Watch it bloom.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CloudWipeContext.Provider>
  );
}

export function useCloudWipe() {
  return useContext(CloudWipeContext);
}
