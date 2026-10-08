import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1 text-left">
        {label && (
          <div className="flex items-center justify-between pl-1">
            <label
              htmlFor={inputId}
              className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted font-medium"
            >
              {label}
            </label>
            {hint && (
              <span className="font-mono text-[10px] text-fg-muted/60 tracking-wider">
                {hint}
              </span>
            )}
          </div>
        )}
        <div className="group relative w-full overflow-hidden rounded-[2px]">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "peer w-full px-4 py-2.5 rounded-[2px] bg-surface text-fg placeholder:text-fg-muted/50 font-sans text-sm sm:text-base border border-line-strong transition-colors duration-150 outline-none",
              "hover:border-fg hover:bg-surface/90",
              "focus:border-red-text focus:bg-surface",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              error && "border-red-text focus:border-red",
              className
            )}
            {...props}
          />
          {/* Animated red caret bar on focus along left edge */}
          <span
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-red origin-top scale-y-0 peer-focus:scale-y-100 transition-transform duration-200 z-10 pointer-events-none"
            aria-hidden="true"
          />
        </div>
        {error && (
          <span className="font-mono text-xs text-red-text pl-1 tracking-wider">
            ! {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
