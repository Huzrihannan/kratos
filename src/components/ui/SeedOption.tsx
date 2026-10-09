"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SeedOptionProps {
  id?: string;
  title: string;
  description?: string;
  hint?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
  name?: string;
  type?: "checkbox" | "radio";
}

export function SeedOption({
  id,
  title,
  description,
  hint,
  selected = false,
  disabled = false,
  onSelect,
  className = "",
  type = "checkbox",
}: SeedOptionProps) {
  const optionId = id || `seed-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      role={type}
      id={optionId}
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onSelect?.()}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex items-start gap-4 p-4 sm:p-5 rounded-[22px] border transition-all duration-200 cursor-pointer select-none text-left min-h-[56px] paper-grain",
        selected
          ? "bg-paper border-link shadow-paper ring-2 ring-link/20"
          : "bg-paper/70 hover:bg-paper border-line hover:border-line-strong hover:shadow-subtle",
        disabled && "opacity-50 cursor-not-allowed hover:bg-paper/70",
        className
      )}
    >
      {/* Illustrated Seed / Sprout Slot */}
      <div
        className={cn(
          "w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 border",
          selected
            ? "bg-[#EAF5E9] border-grass-near text-grass-deep"
            : "bg-paper-2 border-line text-ink-soft group-hover:border-line-strong"
        )}
        aria-hidden="true"
      >
        {selected ? (
          /* Sprouted Seedling SVG */
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current animate-in zoom-in-75 duration-200">
            {/* Stem */}
            <path
              d="M12 21 C12 15 13 10 16 7"
              stroke="#2A6B48"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Leaf */}
            <path
              d="M13 13 C9 13 8 9 10 8 C12 7 14 10 13 13 Z"
              fill="#3E8C5A"
            />
            {/* Right Leaf */}
            <path
              d="M15 10 C18 9 19 6 17 5 C15 4 14 7 15 10 Z"
              fill="#6FB07A"
            />
            {/* Bud Tip Accent */}
            <circle cx="16" cy="6" r="1.5" fill="#FD142B" />
          </svg>
        ) : (
          /* Dormant Seed SVG */
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100 transition-opacity">
            <ellipse
              cx="12"
              cy="13"
              rx="5"
              ry="3"
              transform="rotate(-25 12 13)"
              fill="#55537A"
            />
            {/* Seed furrow line */}
            <path
              d="M9.5 13 C11.5 11.5 13.5 12 14.5 13"
              stroke="#FFF1DC"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}
      </div>

      {/* Label and Details */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans font-bold text-sm sm:text-base text-ink tracking-tight">
            {title}
          </span>
          {hint && (
            <span className="font-sans text-xs text-ink-soft shrink-0">
              {hint}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
