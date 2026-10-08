"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface KeyOptionProps {
  keyIndex: number; // 1-indexed number for keyboard shortcut (1, 2, 3...)
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  type?: "radio" | "checkbox";
  name?: string;
  value?: string;
  onClick: () => void;
  className?: string;
}

export function KeyOption({
  keyIndex,
  title,
  description,
  icon,
  selected,
  type = "radio",
  name = "option",
  value,
  onClick,
  className = "",
}: KeyOptionProps) {
  return (
    <label
      onClick={onClick}
      className={cn(
        "group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[2px] border cursor-pointer select-none transition-all duration-150",
        selected
          ? "border-line-strong bg-surface text-fg shadow-sm ring-1 ring-line-strong"
          : "border-line bg-surface/50 text-fg hover:border-line-strong hover:bg-surface/80",
        className
      )}
    >
      {/* Hidden real form input for accessibility */}
      <input
        type={type}
        name={name}
        value={value || title}
        checked={selected}
        onChange={() => {}} // controlled via label click
        className="sr-only"
        aria-label={`${keyIndex}: ${title}`}
      />

      {/* Number Shortcut Badge: [1], [2], etc. */}
      <span
        className={cn(
          "font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] border shrink-0 transition-colors",
          selected
            ? "bg-red text-cream border-red shadow-[0_0_6px_var(--red)]"
            : "bg-bg border-line text-fg-muted group-hover:border-line-strong group-hover:text-fg"
        )}
      >
        [{keyIndex}]
      </span>

      {/* Optional Icon Slot */}
      {icon && (
        <span
          className={cn(
            "shrink-0 transition-colors mt-0.5",
            selected ? "text-red-text" : "text-fg-muted group-hover:text-fg"
          )}
        >
          {icon}
        </span>
      )}

      {/* Text Info */}
      <div className="flex-1 min-w-0 pr-6">
        <div className="font-mono text-sm sm:text-base font-bold text-fg leading-tight">
          {title}
        </div>
        {description && (
          <div className="font-sans text-xs sm:text-sm text-fg-muted mt-1 leading-snug">
            {description}
          </div>
        )}
      </div>

      {/* Selected Indicator Checkmark / LED */}
      <div className="absolute right-3.5 top-3.5 flex items-center justify-center">
        {selected ? (
          <span className="w-5 h-5 rounded-[2px] bg-red/10 border border-red text-red-text flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        ) : (
          <span className="w-4 h-4 rounded-[2px] border border-line group-hover:border-line-strong" />
        )}
      </div>
    </label>
  );
}
