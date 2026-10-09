"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface SpotlightGridProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number; // spacing between grid points in px
  dotSpacing?: number;
  spotlightRadius?: number;
}

export function SpotlightGrid({
  children,
  className = "",
  gridSize,
  dotSpacing,
  spotlightRadius = 240,
}: SpotlightGridProps) {
  const effectiveGridSize = dotSpacing ?? gridSize ?? 40;
  const { isFull } = useMotionLevel();
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFull || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [isFull]
  );

  const handlePointerLeave = useCallback(() => {
    setCoords(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-fx="spotlight-grid"
      className={cn("relative w-full h-full overflow-hidden select-none", className)}
    >
      {/* Blueprint Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--line) 1px, transparent 1px)`,
          backgroundSize: `${effectiveGridSize}px ${effectiveGridSize}px`,
          opacity: 0.85,
        }}
        aria-hidden="true"
      />

      {/* Red Radial Spotlight (Follows Cursor on Desktop Full Mode) */}
      {isFull && coords && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: coords.x,
            top: coords.y,
            width: spotlightRadius * 2,
            height: spotlightRadius * 2,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(253,20,43,0.12) 0%, rgba(253,20,43,0.03) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Grain / Noise Filter Overlay (4% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
