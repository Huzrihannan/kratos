"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

interface CloudWipeContextValue {
  triggerWipe: (onApex: () => void, onComplete?: () => void) => void;
  isWiping: boolean;
}

const CloudWipeContext = createContext<CloudWipeContextValue>({
  triggerWipe: (cb) => cb(),
  isWiping: false,
});

export function CloudWipeProvider({ children }: { children: React.ReactNode }) {
  const [isWiping, setIsWiping] = useState(false);
  const wipeRef = useRef<HTMLDivElement>(null);

  const triggerWipe = useCallback((onApex: () => void, onComplete?: () => void) => {
    // If reduced motion is preferred or already wiping, execute immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      onApex();
      onComplete?.();
      return;
    }

    setIsWiping(true);

    // Timeline: 0-450ms clouds cover screen -> 450ms swap theme -> 450-900ms clouds clear
    setTimeout(() => {
      onApex();
    }, 450);

    setTimeout(() => {
      setIsWiping(false);
      onComplete?.();
    }, 900);
  }, []);

  return (
    <CloudWipeContext.Provider value={{ triggerWipe, isWiping }}>
      {children}
      {/* Cloud Wipe Overlay */}
      <div
        ref={wipeRef}
        aria-hidden="true"
        className={`fixed inset-0 z-[9999] pointer-events-none transition-transform duration-[900ms] ease-in-out ${
          isWiping ? "cloud-wipe-active" : "cloud-wipe-inactive"
        }`}
        style={{
          transform: isWiping ? "translateX(0%)" : "translateX(-110%)",
        }}
      >
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-r from-[#6DB6F0] via-[#B4DDF7] to-[#FFF0D4] opacity-95 flex items-center justify-center">
          {/* Decorative Cloud Shapes (SVG) */}
          <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-80">
            <svg
              viewBox="0 0 100 100"
              className="w-48 h-48 fill-white/80 animate-pulse"
              preserveAspectRatio="none"
            >
              <circle cx="50" cy="50" r="30" />
              <circle cx="35" cy="55" r="20" />
              <circle cx="65" cy="55" r="22" />
            </svg>
            <svg
              viewBox="0 0 100 100"
              className="w-64 h-64 fill-white/90 animate-pulse"
              preserveAspectRatio="none"
            >
              <circle cx="50" cy="50" r="35" />
              <circle cx="30" cy="55" r="25" />
              <circle cx="70" cy="55" r="25" />
            </svg>
          </div>
        </div>
      </div>
    </CloudWipeContext.Provider>
  );
}

export function useCloudWipe() {
  return useContext(CloudWipeContext);
}
