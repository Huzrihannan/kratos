"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springs, physics } from "@/lib/motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export function Magnetic({
  children,
  className = "",
  strength = physics.magneticStrength,
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only apply magnetic pull on actual desktop pointer devices (mouse)
    if (e.pointerType !== "mouse" || !ref.current) return;

    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={{ x: position.x, y: position.y }}
      transition={springs.bouncy}
      className={`inline-block origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
