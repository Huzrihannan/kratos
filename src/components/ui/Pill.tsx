import React from "react";
import { cn } from "@/lib/utils";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "peach" | "orange" | "cocoa" | "availability";
  size?: "sm" | "md";
  pulse?: boolean;
}

/**
 * Pill component bridged to v2 StatusChip / Tag architecture.
 * Sharp rectangles (0 to 2px radius), monospace typography, LED dot status.
 */
export const Pill: React.FC<PillProps> = ({
  variant = "default",
  size = "md",
  pulse = false,
  className = "",
  children,
  ...props
}) => {
  const isAvailability = variant === "availability";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[2px] border border-line bg-surface/70 font-mono uppercase tracking-[0.08em] text-fg select-none transition-colors duration-150",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
      {...props}
    >
      {(isAvailability || pulse) && (
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ok opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ok" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export const Chip = Pill;
