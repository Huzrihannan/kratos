import React from "react";
import { cn } from "@/lib/utils";

export interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "muted";
  className?: string;
  withBrackets?: boolean;
}

export function Tag({
  children,
  variant = "default",
  className = "",
  withBrackets = true,
}: TagProps) {
  const variantStyles = {
    default: "border-line bg-surface/50 text-fg-muted hover:border-line-strong hover:text-fg",
    active: "border-red-text bg-surface text-fg shadow-subtle",
    muted: "border-line/40 bg-transparent text-fg-muted/70",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[2px] border font-mono text-[11px] sm:text-xs tracking-[0.06em] select-none transition-colors duration-150",
        variantStyles[variant],
        className
      )}
    >
      {withBrackets ? (
        <>
          <span className="tag-bracket mr-1" aria-hidden="true">[</span>
          {children}
          <span className="tag-bracket ml-1" aria-hidden="true">]</span>
        </>
      ) : (
        children
      )}
    </span>
  );
}
