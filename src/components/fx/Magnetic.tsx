"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface MagneticProps {
  children: React.ReactNode;
  maxDistance?: number; // 6-8px per brief
  distance?: number;
  strength?: number;
  className?: string;
  disabled?: boolean;
}

export function Magnetic({
  children,
  maxDistance,
  distance,
  strength,
  className = "",
  disabled = false,
}: MagneticProps) {
  const effectiveMax = maxDistance ?? distance ?? strength ?? 7;
  const { isFull } = useMotionLevel();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFull || disabled || e.pointerType !== "mouse" || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center, clamped strictly to maxDistance (6-8px)
      const rawX = (e.clientX - centerX) * 0.25;
      const rawY = (e.clientY - centerY) * 0.25;

      const clampedX = Math.max(-effectiveMax, Math.min(effectiveMax, rawX));
      const clampedY = Math.max(-effectiveMax, Math.min(effectiveMax, rawY));

      setOffset({ x: clampedX, y: clampedY });
    },
    [isFull, disabled, effectiveMax]
  );

  const handlePointerLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  if (!isFull || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("inline-block transition-transform duration-150 ease-out will-change-transform", className)}
      style={{
        transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
