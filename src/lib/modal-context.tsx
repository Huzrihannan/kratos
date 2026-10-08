"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface LayoutContextValue {
  isEstimatorOpen: boolean;
  openEstimator: () => void;
  closeEstimator: () => void;
  isMobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openEstimator = useCallback(() => setIsEstimatorOpen(true), []);
  const closeEstimator = useCallback(() => setIsEstimatorOpen(false), []);
  const openMobileNav = useCallback(() => setIsMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  const value = useMemo(
    () => ({
      isEstimatorOpen,
      openEstimator,
      closeEstimator,
      isMobileNavOpen,
      setMobileNavOpen: setIsMobileNavOpen,
      openMobileNav,
      closeMobileNav,
    }),
    [isEstimatorOpen, isMobileNavOpen, openEstimator, closeEstimator, openMobileNav, closeMobileNav]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayoutModal(): LayoutContextValue {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutModal must be used within a LayoutProvider");
  }
  return context;
}
