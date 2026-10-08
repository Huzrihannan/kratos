import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
          {/* Animated red caret bar on focus along left edge */}
          <span
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-red origin-top scale-y-0 peer-focus:scale-y-100 transition-transform duration-200 z-10 pointer-events-none"
            aria-hidden="true"
          />
          <textarea
            ref={ref}
            id={inputId}
            rows={4}
            className={cn(
              "peer w-full px-4 py-3 rounded-[2px] bg-surface text-fg placeholder:text-fg-muted/50 font-sans text-sm sm:text-base border border-line-strong transition-colors duration-150 outline-none resize-y min-h-[110px]",
              "hover:border-fg hover:bg-surface/90",
              "focus:border-red-text focus:bg-surface",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              error && "border-red-text focus:border-red",
              className
            )}
            {...props}
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

Textarea.displayName = "Textarea";
