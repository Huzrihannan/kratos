'use client';

import React, { useState } from 'react';
import { TechItem } from '@/content/stack';

export interface SeedPacketProps {
  item: TechItem;
  index?: number;
}

export function SeedPacket({ item }: SeedPacketProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Botanical seed artwork per category
  const renderSeedArt = () => {
    switch (item.category) {
      case 'frontend':
        return (
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-[var(--dream-grass-near,#3E8C5A)]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 32V18" strokeLinecap="round" />
            <path d="M20 24C16 22 13 18 14 13C18 13 20 17 20 17C20 17 22 13 26 13C27 18 24 22 20 24Z" fill="currentColor" fillOpacity="0.25" strokeLinejoin="round" />
            <circle cx="20" cy="33" r="2" fill="currentColor" />
          </svg>
        );
      case 'mobile':
        return (
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-[var(--dream-link,#3B3AA0)]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 34C16 26 24 22 24 14" strokeLinecap="round" />
            <path d="M24 14C24 9 20 7 17 8C16 12 19 14 24 14Z" fill="currentColor" fillOpacity="0.25" strokeLinejoin="round" />
            <path d="M19 24C16 24 14 22 14 20C17 19 19 22 19 24Z" fill="currentColor" fillOpacity="0.25" strokeLinejoin="round" />
            <circle cx="16" cy="34" r="2" fill="currentColor" />
          </svg>
        );
      case 'backend':
        return (
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#C88A3A]" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Acorn / sturdy oak seed pod */}
            <path d="M20 7V12" strokeLinecap="round" />
            <path d="M13 15C13 13 27 13 27 15C28 17 26 18 20 18C14 18 12 17 13 15Z" fill="currentColor" fillOpacity="0.4" strokeLinejoin="round" />
            <path d="M14 18C14 26 20 32 20 32C20 32 26 26 26 18" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
          </svg>
        );
      case 'cloud':
        return (
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#5B9BD5]" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Dandelion seed parachute */}
            <path d="M20 14V33" strokeLinecap="round" />
            <path d="M20 14L13 8M20 14L27 8M20 14L20 6M20 14L10 12M20 14L30 12" strokeLinecap="round" />
            <circle cx="20" cy="33" r="1.75" fill="currentColor" />
          </svg>
        );
      case 'data':
      default:
        return (
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-[var(--dream-sunflower,#FFB400)]" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Honeycomb seed cell */}
            <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div
      className="group relative select-none"
      style={{ perspective: '1000px' }}
      data-testid={`dream-seed-packet-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <button
        type="button"
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        aria-label={`${item.name} seed packet. ${isFlipped ? 'Showing client benefit: ' + item.clientBenefit : 'Press Enter to reveal benefit.'}`}
        aria-pressed={isFlipped}
        className={`relative w-44 sm:w-48 h-60 sm:h-64 rounded-2xl transition-transform duration-500 text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--dream-link,#3B3AA0)] focus-visible:ring-offset-2 ${
          isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] p-4 flex flex-col justify-between shadow-[0_4px_16px_rgba(43,42,82,0.06)] hover:shadow-[0_8px_24px_rgba(43,42,82,0.1)] transition-shadow overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top crimped packet edge */}
          <div className="absolute top-0 inset-x-0 h-2 bg-[repeating-linear-gradient(90deg,var(--dream-paper-2,#FFF1DC),var(--dream-paper-2,#FFF1DC)_4px,transparent_4px,transparent_8px)] opacity-60" />

          {/* Peg hole punch at top center */}
          <div className="w-3.5 h-3.5 mx-auto -mt-1 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] border border-[var(--dream-ink,#2B2A52)]/10 shadow-inner" />

          {/* Category Chip */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-serif italic text-[11px] text-[var(--dream-ink-soft,#55537A)] capitalize">
              {item.category} seed
            </span>
            <span className="font-mono text-[9px] font-bold text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper-2,#FFF1DC)] px-1.5 py-0.5 rounded-full">
              {item.tag}
            </span>
          </div>

          {/* Seed illustration emblem */}
          <div className="flex justify-center items-center py-2">
            <div className="w-14 h-14 rounded-full bg-[var(--dream-paper-2,#FFF1DC)]/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              {renderSeedArt()}
            </div>
          </div>

          {/* Tech Name & Hint */}
          <div className="text-center pb-1">
            <h4 className="font-serif text-base font-bold text-[var(--dream-ink,#2B2A52)] leading-tight mb-1">
              {item.name}
            </h4>
            <span className="inline-flex items-center gap-1 font-sans text-[10px] text-[var(--dream-ink-soft,#55537A)] group-hover:text-[var(--dream-link,#3B3AA0)] transition-colors">
              <span>Flip for benefit</span>
              <span aria-hidden="true">↻</span>
            </span>
          </div>
        </div>

        {/* BACK FACE (Flipped) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[var(--dream-paper-2,#FFF1DC)] border border-[var(--dream-ink,#2B2A52)]/15 p-4 flex flex-col justify-between shadow-[0_8px_24px_rgba(43,42,82,0.12)] text-left overflow-hidden [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top header on back */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--dream-ink,#2B2A52)]/10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--dream-poppy,#FD142B)]" />
              <span className="font-serif font-bold text-xs text-[var(--dream-ink,#2B2A52)] truncate max-w-[100px]">
                {item.name}
              </span>
            </div>
            <span className="font-serif italic text-[10px] text-[var(--dream-ink-soft,#55537A)]">
              For Clients
            </span>
          </div>

          {/* Client Benefit */}
          <div className="py-2 flex-1 flex items-center">
            <p className="font-sans text-xs sm:text-[13px] text-[var(--dream-ink,#2B2A52)] leading-relaxed font-normal">
              {item.clientBenefit}
            </p>
          </div>

          {/* Bottom tag */}
          <div className="pt-2 border-t border-[var(--dream-ink,#2B2A52)]/10 flex items-center justify-between text-[10px] text-[var(--dream-ink-soft,#55537A)]">
            <span className="font-serif italic">Tested in production</span>
            <span className="font-mono text-[9px] text-[#1E9E5A] font-bold">100% stable</span>
          </div>
        </div>
      </button>
    </div>
  );
}
