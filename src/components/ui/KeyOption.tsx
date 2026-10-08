"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useHotkey } from "@/lib/motion/useHotkey";

export interface KeyOptionProps {
  selected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  label: string;
  description?: string;
  price?: string;
  keyHint?: string | number;
  shortcut?: string | number;
  disabled?: boolean;
  className?: string;
}

export function KeyOption({
  selected = false,
  onSelect,
  onClick,
  label,
  description,
  price,
  keyHint,
  shortcut,
  disabled = false,
  className = "",
}: KeyOptionProps) {
  const effectiveHint = shortcut !== undefined ? shortcut : keyHint;
  const effectiveSelect = () => {
    if (onClick) onClick();
    else if (onSelect) onSelect();
  };

  // Bind number key if provided and not disabled
  useHotkey(
    effectiveHint !== undefined ? String(effectiveHint) : "",
    () => {
      if (!disabled) {
        effectiveSelect();
      }
    },
    { enabled: effectiveHint !== undefined && !disabled }
  );

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-[2px] border text-left transition-colors duration-150 select-none cursor-pointer active:translate-y-[1px]",
        selected
          ? "border-line-strong bg-surface text-fg shadow-subtle"
          : "border-line bg-surface/40 text-fg-muted hover:border-line-strong hover:text-fg hover:bg-surface/80",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {/* Left state marker [ ] vs [x] */}
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "font-mono text-sm sm:text-base font-bold shrink-0 transition-colors",
            selected ? "text-red-text" : "text-fg-muted group-hover:text-fg"
          )}
          aria-hidden="true"
        >
          {selected ? "[x]" : "[ ]"}
        </span>

        <div className="flex flex-col">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.06em] font-medium text-fg">
            {label}
          </span>
          {description && (
            <span className="font-sans text-xs text-fg-muted mt-0.5 line-clamp-2">
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Right side: price + optional key shortcut hint */}
      <div className="flex items-center gap-3 shrink-0 ml-3">
        {price && (
          <span className="font-mono text-xs text-fg-muted tracking-wider">
            {price}
          </span>
        )}

        {keyHint !== undefined && (
          <span
            className={cn(
              "hidden sm:inline-flex px-1.5 py-0.5 rounded-[1px] border font-mono text-[10px] tracking-widest",
              selected
                ? "border-red-text/60 bg-red-text/10 text-red-text"
                : "border-line text-fg-muted/60 group-hover:border-line-strong group-hover:text-fg-muted"
            )}
            title={`Press '${keyHint}' to select`}
          >
            [{keyHint}]
          </span>
        )}
      </div>
    </button>
  );
}
