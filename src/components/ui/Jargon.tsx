"use client";

import React, { useState, useRef, useEffect } from "react";
import { getGlossaryDefinition } from "@/content/glossary";
import { cn } from "@/lib/utils";

export interface JargonProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
}

export function Jargon({ term, children, className = "" }: JargonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const entry = getGlossaryDefinition(term);
  const id = `jargon-${term.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  const displayText = children || entry?.term || term;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  if (!entry) {
    return <span className={className}>{displayText}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-describedby={isOpen ? id : undefined}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={cn(
          "inline cursor-help text-inherit underline decoration-dotted decoration-grass-mid/70 underline-offset-4 hover:decoration-poppy hover:text-poppy-text transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link rounded-[2px]",
          className
        )}
      >
        {displayText}
      </button>

      {isOpen && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-paper text-ink border border-line-strong rounded-[16px] shadow-paper z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none select-none text-left block"
        >
          {/* Header */}
          <span className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-line text-xs font-mono font-bold uppercase tracking-wider text-poppy-text">
            <span>{entry.term}</span>
            <span className="text-[10px] font-normal text-ink-soft uppercase tracking-wide">
              {entry.category}
            </span>
          </span>

          {/* Definition */}
          <span className="block text-xs sm:text-sm font-sans text-ink leading-relaxed font-normal">
            {entry.shortDefinition}
          </span>

          {/* Additional context if present */}
          {entry.details && (
            <span className="block mt-2 text-[11px] font-sans text-ink-soft italic leading-snug">
              {entry.details}
            </span>
          )}

          {/* Subtle bottom arrow */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-paper border-r border-b border-line-strong rotate-45"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}
