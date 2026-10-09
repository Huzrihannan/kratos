"use client";

import { useMemo } from "react";
import { useTheme } from "./ThemeProvider";
import { useMotionLevel, MotionLevel } from "@/lib/motion/MotionContext";
import { ThemeId } from "./registry";

export interface ThemeMotionTokens {
  theme: ThemeId;
  level: MotionLevel;
  personality: "mechanical" | "organic";
  durations: {
    micro: number;
    ui: number;
    section: number;
    hero: number;
  };
  easings: {
    reveal: string;
    wipe: string;
    bloom?: string;
  };
  allowSway: boolean;
  allowShaders: boolean;
  allowCustomCursor: boolean;
}

export function useThemeMotion(): ThemeMotionTokens {
  const { theme } = useTheme();
  const { level, isFull, isLite } = useMotionLevel();

  return useMemo(() => {
    const isDream = theme === "dream";

    if (isDream) {
      return {
        theme,
        level,
        personality: "organic",
        durations: {
          micro: 200,
          ui: 450,
          section: 900,
          hero: 1400,
        },
        easings: {
          reveal: "sine.out",
          wipe: "power2.inOut",
          bloom: "back.out(1.15)",
        },
        allowSway: isFull || isLite,
        allowShaders: isFull,
        allowCustomCursor: isFull,
      };
    }

    // Dark & Light: Mechanical precision
    return {
      theme,
      level,
      personality: "mechanical",
      durations: {
        micro: 150,
        ui: 300,
        section: 700,
        hero: 1200,
      },
      easings: {
        reveal: "expo.out",
        wipe: "power4.inOut",
      },
      allowSway: false,
      allowShaders: isFull,
      allowCustomCursor: isFull,
    };
  }, [theme, level, isFull, isLite]);
}
