"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface WindowProps {
  title?: string;
  status?: string;
  statusText?: string;
  cornerBrackets?: boolean;
  draggable?: boolean;
  dragConstraints?: React.RefObject<Element | null> | { top?: number; left?: number; right?: number; bottom?: number };
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
  variant?: "default" | "active" | "subtle";
  id?: string;
  zIndex?: number;
  onBringToFront?: () => void;
  style?: React.CSSProperties;
}

export function Window({
  title = "sys.window",
  status,
  statusText,
  cornerBrackets = false,
  draggable = false,
  dragConstraints,
  children,
  className = "",
  headerRight,
  variant = "default",
  id,
  zIndex: controlledZIndex,
  onBringToFront,
  style,
}: WindowProps) {
  const effectiveStatus = statusText || status;
  const { isFull } = useMotionLevel();
  const [internalZIndex, setInternalZIndex] = useState(10);
  const currentZIndex = controlledZIndex ?? internalZIndex;

  const variantStyles = {
    default: "border-line bg-surface/90 hover:border-line-strong",
    active: "border-line-strong bg-surface shadow-card",
    subtle: "border-line/60 bg-surface/40 hover:border-line",
  };

  const handlePointerDown = () => {
    if (draggable) {
      if (onBringToFront) {
        onBringToFront();
      } else {
        setInternalZIndex(40);
      }
    }
  };

  const windowContent = (
    <div
      id={id}
      className={cn(
        "group relative flex flex-col rounded-[2px] border text-fg transition-colors duration-200 backdrop-blur-sm select-auto",
        variantStyles[variant],
        className
      )}
      style={{ zIndex: currentZIndex, ...style }}
      onPointerDown={handlePointerDown}
    >
      {/* Optional Corner Brackets (HUD registration marks) */}
      {cornerBrackets && (
        <>
          <span
            className="absolute -top-[1px] -left-[1px] h-2 w-2 border-t-2 border-l-2 border-red-text pointer-events-none z-20"
            aria-hidden="true"
          />
          <span
            className="absolute -top-[1px] -right-[1px] h-2 w-2 border-t-2 border-r-2 border-red-text pointer-events-none z-20"
            aria-hidden="true"
          />
          <span
            className="absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b-2 border-l-2 border-red-text pointer-events-none z-20"
            aria-hidden="true"
          />
          <span
            className="absolute -bottom-[1px] -right-[1px] h-2 w-2 border-b-2 border-r-2 border-red-text pointer-events-none z-20"
            aria-hidden="true"
          />
        </>
      )}

      {/* Chrome Title Bar */}
      <div
        data-cursor={draggable && isFull ? "drag" : undefined}
        className={cn(
          "flex items-center justify-between px-3 py-2 border-b border-line bg-surface select-none",
          draggable && isFull && "cursor-grab active:cursor-grabbing"
        )}
      >
        {/* Window Controls: 3 Tiny Squares */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80 hover:bg-red transition-colors duration-150" />
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80 hover:bg-line-strong transition-colors duration-150" />
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80 hover:bg-line-strong transition-colors duration-150" />
          </div>

          <span className="font-mono text-[11px] sm:text-xs text-fg-muted uppercase tracking-[0.08em] pl-1 font-medium truncate">
            {title}
          </span>
        </div>

        {/* Right Chrome: Status / Custom Slot */}
        <div className="flex items-center gap-2">
          {effectiveStatus && (
            <span className="font-mono text-[10px] text-fg-muted/80 uppercase tracking-mono">
              {effectiveStatus}
            </span>
          )}
          {headerRight}
        </div>
      </div>

      {/* Window Body */}
      <div className="relative p-4 sm:p-6 flex-1">{children}</div>
    </div>
  );

  if (draggable && isFull) {
    return (
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
        whileDrag={{ scale: 1.01 }}
        style={{ zIndex: currentZIndex, ...style }}
      >
        {windowContent}
      </motion.div>
    );
  }

  return windowContent;
}

// Re-export as Card alias for backward compatibility during migration
export const Card = Window;
