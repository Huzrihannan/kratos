"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  variant?: "peach" | "cream" | "cocoa";
  portalImage?: string;
  portalAlt?: string;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "peach",
  portalImage,
  portalAlt = "",
  hoverEffect = true,
  children,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    peach: "bg-peach text-ink border border-orange/15 shadow-card",
    cream: "bg-cream text-ink border border-peach shadow-card",
    cocoa: "bg-cocoa text-cream border border-ink/20 shadow-float",
  };

  const isInteractive = hoverEffect && !shouldReduceMotion;

  return (
    <motion.div
      whileHover={isInteractive ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
      className={cn(
        "group relative rounded-card p-6 md:p-8 overflow-hidden transition-shadow duration-300",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Optional Circular "Portal" Image Reveal */}
      {portalImage && (
        <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-bubble bg-peach/40 flex items-center justify-center">
          <div
            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            style={{
              clipPath: "circle(42% at 50% 50%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portalImage}
              alt={portalAlt}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      )}

      {children}
    </motion.div>
  );
};
