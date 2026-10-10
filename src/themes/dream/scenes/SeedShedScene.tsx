'use client';

import React, { useRef } from 'react';
import { stackRowOne, stackRowTwo } from '@/content/stack';
import { SeedPacket } from './SeedPacket';

export function SeedShedScene() {
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);

  return (
    <div
      data-testid="dream-seed-shed-scene"
      className="relative w-full rounded-[36px] bg-[#E8DCB8]/40 border-2 border-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-10 shadow-[inset_0_2px_8px_rgba(43,42,82,0.04)] overflow-hidden"
    >
      {/* Pegboard dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #55537A 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '12px 12px',
        }}
        aria-hidden="true"
      />

      {/* Decorative shed header sign */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--dream-paper-2,#FFF1DC)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--dream-poppy,#FD142B)]" />
            <span className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)]">
              The Potting Shed Pegboard
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--dream-ink,#2B2A52)]">
            Every seed chosen for speed, safety, and longevity
          </h3>
        </div>

        <div className="font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] bg-[var(--dream-paper,#FFFAF0)] px-3.5 py-1.5 rounded-full border border-[var(--dream-paper-2,#FFF1DC)] shadow-2xs">
          Tap or hover any seed packet to view client benefit
        </div>
      </div>

      {/* SHELF 1: Front-of-House (UI & Mobile Seeds) */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink-soft,#55537A)]">
            Shelf A — Interface & Experience Seeds
          </span>
          <div className="h-[1px] flex-1 bg-[var(--dream-paper-2,#FFF1DC)]" />
        </div>

        {/* Wooden rail under packets */}
        <div className="relative">
          <div
            ref={rowOneRef}
            tabIndex={0}
            role="region"
            aria-label="Interface and mobile seed packets"
            className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 px-1 focus:outline-none focus:ring-2 focus:ring-[var(--dream-link,#3B3AA0)] rounded-xl scrollbar-thin"
          >
            {stackRowOne.map((item, idx) => (
              <SeedPacket key={item.name} item={item} index={idx} />
            ))}
          </div>
          {/* Wooden shelf board visual */}
          <div className="h-2.5 w-full bg-[#D4C39B] rounded-full shadow-inner mt-1 border border-[#BFA97C]/40" />
        </div>
      </div>

      {/* SHELF 2: Back-of-House (Systems, Cloud & Data Seeds) */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-serif italic text-xs font-semibold text-[var(--dream-ink-soft,#55537A)]">
            Shelf B — Cloud, Engine & Storage Seeds
          </span>
          <div className="h-[1px] flex-1 bg-[var(--dream-paper-2,#FFF1DC)]" />
        </div>

        {/* Wooden rail under packets */}
        <div className="relative">
          <div
            ref={rowTwoRef}
            tabIndex={0}
            role="region"
            aria-label="Cloud and engine seed packets"
            className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 px-1 focus:outline-none focus:ring-2 focus:ring-[var(--dream-link,#3B3AA0)] rounded-xl scrollbar-thin"
          >
            {stackRowTwo.map((item, idx) => (
              <SeedPacket key={item.name} item={item} index={idx + 10} />
            ))}
          </div>
          {/* Wooden shelf board visual */}
          <div className="h-2.5 w-full bg-[#D4C39B] rounded-full shadow-inner mt-1 border border-[#BFA97C]/40" />
        </div>
      </div>
    </div>
  );
}
