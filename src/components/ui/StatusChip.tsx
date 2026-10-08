import React from "react";
import { cn } from "@/lib/utils";

export interface StatusChipProps {
  status?: "ok" | "red" | "idle" | "operational" | "error";
  pulse?: boolean;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export function StatusChip({
  status = "ok",
  pulse = true,
  label,
  children,
  className = "",
}: StatusChipProps) {
  const isOk = status === "ok" || status === "operational";
  const isRed = status === "red" || status === "error";

  const dotColor = isOk
    ? "bg-ok"
    : isRed
    ? "bg-red"
    : "bg-fg-muted";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] border border-line bg-surface/60 font-mono text-xs uppercase tracking-[0.08em] text-fg select-none transition-colors duration-150",
        className
      )}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        {pulse && status !== "idle" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping",
              dotColor
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            dotColor
          )}
        />
      </span>
      {(children || label) && <span>{children || label}</span>}
    </span>
  );
}
