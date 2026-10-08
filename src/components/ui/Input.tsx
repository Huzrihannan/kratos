import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="font-body text-xs font-semibold tracking-wider uppercase text-ink-soft pl-3">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-5 py-3.5 rounded-pill bg-peach/50 text-ink placeholder:text-ink-soft/60 font-body text-base border-2 border-transparent transition-all duration-200 outline-none",
            "hover:bg-peach/70 hover:border-orange/30",
            "focus:bg-cream focus:border-orange-deep focus:ring-4 focus:ring-orange/30 shadow-none focus:shadow-[0_0_24px_rgba(251,154,94,0.35)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500/80 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-600 font-medium pl-3">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
