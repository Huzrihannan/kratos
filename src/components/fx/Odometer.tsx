"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface OdometerProps {
  value: string | number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function OdometerDigit({ char, isOff }: { char: string; isOff: boolean }) {
  const isDigit = !isNaN(parseInt(char, 10));
  const digit = isDigit ? parseInt(char, 10) : 0;

  if (!isDigit) {
    return <span className="inline-block select-none">{char}</span>;
  }

  if (isOff) {
    return <span className="inline-block">{char}</span>;
  }

  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top select-none">
      <span
        className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateY(-${digit * 10}%)` }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="h-[1em] flex items-center justify-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Odometer({
  value,
  className = "",
  prefix = "",
  suffix = "",
}: OdometerProps) {
  const { isOff } = useMotionLevel();
  const stringValue = String(value);

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-mono font-bold tracking-tight text-fg",
        className
      )}
      aria-label={`${prefix}${stringValue}${suffix}`}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <span className="inline-flex" aria-hidden="true">
        {stringValue.split("").map((c, idx) => (
          <OdometerDigit key={idx} char={c} isOff={isOff} />
        ))}
      </span>
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}
