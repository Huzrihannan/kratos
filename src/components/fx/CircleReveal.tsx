"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CircleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  origin?: "center" | "top" | "bottom";
}

export const CircleReveal: React.FC<CircleRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  origin = "center",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getOriginCoord = () => {
    switch (origin) {
      case "top":
        return "50% 0%";
      case "bottom":
        return "50% 100%";
      default:
        return "50% 50%";
    }
  };

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const coord = getOriginCoord();

  return (
    <motion.div
      initial={{
        clipPath: `circle(0% at ${coord})`,
        opacity: 0.6,
      }}
      whileInView={{
        clipPath: `circle(140% at ${coord})`,
        opacity: 1,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1], // Custom smooth ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
