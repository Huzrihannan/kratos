"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface TiltProps {
  children: React.ReactNode;
  maxTilt?: number; // degrees, max 6 per brief
  maxAngle?: number;
  glare?: boolean;
  className?: string;
}

export function Tilt({ children, maxTilt, maxAngle, glare = true, className = "" }: TiltProps) {
  const effectiveTilt = maxTilt ?? maxAngle ?? 5;
  const { isFull } = useMotionLevel();
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFull || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      // Tilt angles: effectiveTilt
      const rotateX = (0.5 - y) * effectiveTilt * 2;
      const rotateY = (x - 0.5) * effectiveTilt * 2;

      setTransform({
        rotateX,
        rotateY,
        glareX: x * 100,
        glareY: y * 100,
        active: true,
      });
    },
    [isFull, effectiveTilt]
  );

  const handlePointerLeave = useCallback(() => {
    setTransform((prev) => ({ ...prev, rotateX: 0, rotateY: 0, active: false }));
  }, []);

  if (!isFull) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("relative will-change-transform", className)}
      style={{
        perspective: 1000,
      }}
    >
      <div
        className="w-full h-full transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {/* Faint Glare Layer */}
        {glare && transform.active && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
