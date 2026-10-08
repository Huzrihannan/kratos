"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LiveClock({ className }: { className?: string }) {
  const [timeStr, setTimeStr] = useState<string>("00:00:00 UTC");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds} UTC`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-line bg-surface/90 font-mono text-[11px] text-fg select-none",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" aria-hidden="true" />
      <span className="text-fg-muted uppercase tracking-mono">CLOCK:</span>
      <span className="font-bold text-fg tabular-nums">{timeStr}</span>
    </div>
  );
}
