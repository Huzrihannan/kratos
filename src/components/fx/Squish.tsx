"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springs, physics } from "@/lib/motion";

interface SquishProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
  className?: string;
  squishScale?: number;
  hoverScale?: number;
}

export const Squish: React.FC<SquishProps> = ({
  children,
  className = "",
  squishScale = physics.tapSquish,
  hoverScale = physics.hoverScale,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      tabIndex={props.tabIndex ?? -1}
      whileTap={{ scale: squishScale }}
      whileHover={{ scale: hoverScale }}
      transition={springs.bouncy}
      className={`inline-block origin-center ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
