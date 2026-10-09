import React from "react";

export interface FlairProps {
  dark: string;
  light: string;
  dream: string;
  className?: string;
}

/**
 * Flair: Short decorative string component (eyebrows, small badges, microcopy).
 * Server component rendering all 3 strings in the DOM, with CSS strictly hiding the inactive two.
 * Ensures zero hydration mismatch and zero layout shift.
 *
 * Rules:
 * - At most 12 words per string.
 * - Decoration only, never SEO-critical text.
 */
export function Flair({ dark, light, dream, className = "" }: FlairProps) {
  return (
    <span className={`inline ${className}`}>
      <span data-flair="dark" className="flair-dark">
        {dark}
      </span>
      <span data-flair="light" className="flair-light">
        {light}
      </span>
      <span data-flair="dream" className="flair-dream">
        {dream}
      </span>
    </span>
  );
}
