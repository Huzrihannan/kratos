"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface CaretProps {
  className?: string;
  width?: number; // width in pixels
  height?: string | number; // e.g. "1.1em" or 20
}

export function Caret({
  className = "",
  width = 7,
  height = "1.1em",
}: CaretProps) {
  const { isOff } = useMotionLevel();
  const [visible, setVisible] = useState(true);

  // Mechanical discrete square-wave blink (no sine fade)
  useEffect(() => {
    if (isOff) {
      setVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, 530);

    return () => clearInterval(interval);
  }, [isOff]);

  return (
    <span
      className={cn(
        "inline-block bg-red align-middle rounded-[1px] select-none transition-none",
        !visible && "opacity-0",
        className
      )}
      style={{
        width: `${width}px`,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}
