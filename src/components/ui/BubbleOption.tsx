"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BubbleOptionProps {
  label?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  multiSelect?: boolean;
}

export const BubbleOption: React.FC<BubbleOptionProps> = ({
  label,
  title,
  description,
  icon,
  selected = false,
  disabled = false,
  onClick,
  className = "",
  multiSelect = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const isInteractive = !disabled;

  return (
    <motion.button
      type="button"
      role={multiSelect ? "checkbox" : "radio"}
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      whileHover={isInteractive && !shouldReduceMotion ? { scale: 1.025 } : {}}
      whileTap={isInteractive && !shouldReduceMotion ? { scale: 0.96 } : {}}
      transition={{ type: "spring" as const, stiffness: 450, damping: 20 }}
      className={cn(
        "group relative flex items-center gap-3.5 px-6 py-4 rounded-bubble border-2 text-left transition-colors duration-200 cursor-pointer select-none outline-none focus-visible:ring-3 focus-visible:ring-orange-deep",
        selected
          ? "bg-orange text-ink border-orange-deep shadow-glow"
          : "bg-peach/60 text-ink border-transparent hover:bg-peach hover:border-orange/30 shadow-subtle",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {/* Indicator Circle */}
      <div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2 shrink-0",
          selected
            ? "bg-ink border-ink text-orange"
            : "border-ink/20 bg-cream/50 group-hover:border-ink/40"
        )}
        aria-hidden="true"
      >
        {selected && <Check size={14} strokeWidth={3} />}
      </div>

      {/* Optional leading icon */}
      {icon && <span className="text-xl shrink-0" aria-hidden="true">{icon}</span>}

      {/* Label and optional description */}
      <div className="flex flex-col">
        <span className="font-body font-semibold text-base leading-tight">
          {label || title}
        </span>
        {description && (
          <span
            className={cn(
              "font-body text-xs mt-0.5",
              selected ? "text-ink/80" : "text-ink-soft"
            )}
          >
            {description}
          </span>
        )}
      </div>
    </motion.button>
  );
};
