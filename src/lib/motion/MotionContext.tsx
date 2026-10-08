"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export type MotionLevel = "full" | "lite" | "off";

interface MotionContextValue {
  level: MotionLevel;
  setLevel: (level: MotionLevel) => void;
  isFull: boolean;
  isLite: boolean;
  isOff: boolean;
}

const STORAGE_KEY = "krat_os_motion_level";

const MotionContext = createContext<MotionContextValue>({
  level: "full",
  setLevel: () => {},
  isFull: true,
  isLite: false,
  isOff: false,
});

export function detectDefaultMotionLevel(): MotionLevel {
  if (typeof window === "undefined") return "full";

  // 1. Accessibility preference: strictly 'off'
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }

  // 2. Data-saver mode: 'lite'
  const nav = navigator as unknown as {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) {
    return "lite";
  }

  // 3. Low-end device memory or CPU: 'lite'
  if (nav.deviceMemory && nav.deviceMemory < 4) {
    return "lite";
  }
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return "lite";
  }

  // 4. Viewport constraint: small mobile screens don't run heavy shaders or custom cursors
  if (window.innerWidth < 768) {
    return "lite";
  }

  return "full";
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevelState] = useState<MotionLevel>("full");

  useEffect(() => {
    // Read persisted choice or auto-detect
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as MotionLevel | null;
      if (stored === "full" || stored === "lite" || stored === "off") {
        setLevelState(stored);
        return;
      }
    } catch {
      // Storage access disabled or in private mode
    }

    setLevelState(detectDefaultMotionLevel());

    // Listen for OS reduced-motion changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setLevelState(e.matches ? "off" : detectDefaultMotionLevel());
      }
    };

    mediaQuery.addEventListener("change", handleReducedMotionChange);
    return () => mediaQuery.removeEventListener("change", handleReducedMotionChange);
  }, []);

  const setLevel = useCallback((newLevel: MotionLevel) => {
    setLevelState(newLevel);
    try {
      localStorage.setItem(STORAGE_KEY, newLevel);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const value = useMemo(
    () => ({
      level,
      setLevel,
      isFull: level === "full",
      isLite: level === "lite",
      isOff: level === "off",
    }),
    [level, setLevel]
  );

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionLevel(): MotionContextValue {
  return useContext(MotionContext);
}
