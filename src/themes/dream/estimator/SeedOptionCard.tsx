'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface SeedOptionCardProps {
  id: string;
  label: string;
  description: string;
  hint?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  isMulti?: boolean;
}

export function SeedOptionCard({
  id,
  label,
  description,
  hint,
  icon,
  selected,
  onSelect,
  isMulti = false,
}: SeedOptionCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      type="button"
      data-option-id={id}
      role={isMulti ? 'checkbox' : 'radio'}
      aria-checked={selected}
      aria-label={`${label}. ${description}. ${hint || ''}`}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`group relative w-full text-left p-4 sm:p-5 rounded-[24px] border transition-all duration-200 select-none min-h-[52px] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)] ${
        selected
          ? 'bg-[var(--dream-paper-2,#FFF1DC)] border-[var(--dream-link,#3B3AA0)] shadow-[0_8px_20px_rgba(59,58,160,0.12)] -translate-y-0.5'
          : 'bg-[var(--dream-paper,#FFFAF0)] border-[var(--dream-paper-2,#FFF1DC)] hover:border-[#E5DAC0] hover:bg-[#FFF7E8] shadow-[0_4px_12px_rgba(43,42,82,0.04)]'
      }`}
    >
      <div className="w-full">
        {/* Top Header Row: Icon, Shortcut badge, Selection Status */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  selected
                    ? 'bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)]'
                    : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)] group-hover:bg-[#EAE0CA]'
                }`}
              >
                {icon}
              </div>
            )}
            <span className="font-serif text-base sm:text-lg font-bold text-[var(--dream-ink,#2B2A52)] leading-tight">
              {label}
            </span>
          </div>

          {/* Selection indicator pill */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              selected
                ? 'bg-[var(--dream-link,#3B3AA0)] border-[var(--dream-link,#3B3AA0)] text-white shadow-2xs'
                : 'border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] group-hover:border-[#D6CDB5]'
            }`}
          >
            {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)] leading-relaxed mb-2">
          {description}
        </p>
      </div>

      {/* Plain Language Client Hint */}
      {hint && (
        <div className="mt-2 pt-2 border-t border-[var(--dream-paper-2,#FFF1DC)] flex items-start gap-1.5">
          <span className="text-xs shrink-0 select-none" aria-hidden="true">
            🌱
          </span>
          <span className="font-sans text-[11px] sm:text-xs text-[var(--dream-grass-deep,#2A6B48)] leading-normal font-medium">
            {hint}
          </span>
        </div>
      )}
    </button>
  );
}
