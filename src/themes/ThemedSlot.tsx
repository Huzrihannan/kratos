"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export interface ThemedSlotProps {
  name: string;
  dark?: React.ReactNode;
  light?: React.ReactNode;
  dream?: React.ReactNode;
  skeleton?: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

/**
 * ThemedSlot: Mounts theme-specific decorative scenes after hydration.
 * Reserves dimensions via an aspect-ratio box and CSS skeleton to guarantee zero CLS.
 */
export function ThemedSlot({
  name,
  dark,
  light,
  dream,
  skeleton,
  aspectRatio,
  className = "",
}: ThemedSlotProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio }
    : {};

  if (!mounted) {
    return (
      <div
        data-slot={name}
        aria-hidden="true"
        className={`relative overflow-hidden ${className}`}
        style={containerStyle}
      >
        {skeleton || (
          <div className="w-full h-full bg-surface/30 animate-pulse rounded-[inherit]" />
        )}
      </div>
    );
  }

  let content: React.ReactNode = null;
  if (theme === "dream") {
    content = dream ?? light ?? dark;
  } else if (theme === "light") {
    content = light ?? dark;
  } else {
    content = dark;
  }

  return (
    <div
      data-slot={name}
      aria-hidden="true"
      className={`relative ${className}`}
      style={containerStyle}
    >
      {content}
    </div>
  );
}
