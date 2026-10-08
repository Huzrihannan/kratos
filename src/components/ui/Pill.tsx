import React from "react";
import { cn } from "@/lib/utils";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "peach" | "orange" | "cocoa" | "availability";
  size?: "sm" | "md";
  pulse?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  variant = "default",
  size = "md",
  pulse = false,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-body font-semibold rounded-pill tracking-tight transition-all select-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1 gap-1.5",
    md: "text-sm px-4 py-1.5 gap-2",
  };

  const variantStyles = {
    default: "bg-peach/70 text-ink border border-orange/20",
    peach: "bg-peach text-ink border border-orange/30 shadow-subtle",
    orange: "bg-orange text-ink font-bold shadow-subtle",
    cocoa: "bg-cocoa text-cream",
    availability: "bg-peach text-ink-soft border border-orange/30 shadow-subtle",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {(variant === "availability" || pulse) && (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-butter opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-butter" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export const Chip = Pill;
