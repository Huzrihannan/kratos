'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/content/faqs';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { ChevronDown } from 'lucide-react';
import { useLayoutModal } from '@/lib/modal-context';
import { Poppy } from '../art/flowers/Poppy';

export interface DandelionFaqProps {
  items: FaqItem[];
  defaultOpenId?: string;
}

export function DandelionFaq({ items, defaultOpenId = 'non-technical' }: DandelionFaqProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const { isOff } = useMotionLevel();
  const { openEstimator } = useLayoutModal();

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div data-testid="dream-dandelion-faq" className="w-full max-w-4xl mx-auto space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-btn-${item.id}`;

        return (
          <div
            key={item.id}
            data-testid={`dream-faq-item-${item.id}`}
            className="rounded-[28px] bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] shadow-[0_4px_16px_rgba(43,42,82,0.04)] overflow-hidden transition-all duration-300"
          >
            {/* Accordion Header Button */}
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)] focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                {/* Dandelion Head Icon */}
                <div className="relative shrink-0 w-10 h-10 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-center text-[#FFB400] group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Stem */}
                    <path d="M16 20V30" stroke="#3E8C5A" strokeLinecap="round" />
                    {/* Center disc */}
                    <circle cx="16" cy="15" r="3" fill="#FFB400" />
                    {/* Parachutes radiating */}
                    <path d="M16 12V6M16 6L13 3M16 6L19 3" strokeLinecap="round" />
                    <path d="M19 13L24 9M24 9L23 5M24 9L27 7" strokeLinecap="round" />
                    <path d="M13 13L8 9M8 9L9 5M8 9L5 7" strokeLinecap="round" />
                    <path d="M20 16L26 17M26 17L27 14M26 17L28 20" strokeLinecap="round" />
                    <path d="M12 16L6 17M6 17L5 14M6 17L4 20" strokeLinecap="round" />
                  </svg>

                  {/* Floating seed drifting away when open */}
                  {isOpen && !isOff && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-2 -right-2 text-[10px] animate-pulse pointer-events-none"
                    >
                      🌾
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <span className="font-serif text-base sm:text-xl font-bold text-[var(--dream-ink,#2B2A52)] group-hover:text-[var(--dream-link,#3B3AA0)] transition-colors leading-snug">
                  {item.question}
                </span>
              </div>

              {/* Status Indicator */}
              <div
                className={`shrink-0 w-8 h-8 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-center text-[var(--dream-ink-soft,#55537A)] transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)]' : ''
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Cloud Scroll Answer Panel */}
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 sm:px-6 pb-6 pt-1"
              >
                <div className="rounded-2xl bg-[var(--dream-paper-2,#FFF1DC)]/60 border border-[var(--dream-paper-2,#FFF1DC)] p-5 sm:p-6">
                  {/* Category Pill */}
                  <div className="mb-2.5">
                    <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper,#FFFAF0)] px-2.5 py-0.5 rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>

                  {/* Plain Language Answer */}
                  <p className="font-sans text-sm sm:text-base text-[var(--dream-ink,#2B2A52)] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Secondary Bridge Card */}
      <div className="mt-8 rounded-[32px] border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_24px_rgba(43,42,82,0.04)]">
        <div className="space-y-1 text-left">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-[var(--dream-ink,#2B2A52)]">
            Have a question not covered here?
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[var(--dream-ink-soft,#55537A)]">
            Explore options in our interactive planner or talk directly with our team.
          </p>
        </div>

        <button
          type="button"
          onClick={openEstimator}
          className="shrink-0 rounded-full px-6 py-2.5 text-xs font-semibold shadow-xs flex items-center gap-2 bg-[var(--dream-ink,#2B2A52)] text-[var(--dream-paper,#FFFAF0)] hover:bg-[#38376B] transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)]"
        >
          <Poppy state="bloom" size={16} />
          <span>Estimate my project</span>
        </button>
      </div>
    </div>
  );
}
