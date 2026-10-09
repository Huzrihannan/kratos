'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { useMotionLevel } from '@/lib/motion/MotionContext';

export function DreamBackToTop() {
  const { theme } = useTheme();
  const { isOff } = useMotionLevel();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (theme !== 'dream') return;

    const handleScroll = () => {
      // Appear after 2 viewports of scroll
      const threshold = window.innerHeight * 2;
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isOff ? 'auto' : 'smooth',
    });
  };

  if (theme !== 'dream' || !isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 sm:left-8 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Float back to top"
        title="Float back to top"
        className="group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dream-link,#3B3AA0)] rounded-full"
      >
        {/* Hot-Air Balloon Artwork */}
        <div className="relative w-12 h-16 sm:w-14 sm:h-18 transition-transform duration-300 group-hover:-translate-y-2 group-active:translate-y-0">
          <svg
            viewBox="0 0 100 130"
            className={`w-full h-full drop-shadow-md ${isOff ? '' : 'animate-float'}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Balloon Envelope */}
            <path
              d="M50 10 C25 10 15 35 25 65 C32 85 42 96 46 100 L54 100 C58 96 68 85 75 65 C85 35 75 10 50 10 Z"
              fill="#FFF1DC"
            />
            {/* Striped Segments with Poppy & Golden accents */}
            <path
              d="M50 10 C40 10 32 35 38 65 C42 85 47 96 48 100 L52 100 C53 96 58 85 62 65 C68 35 60 10 50 10 Z"
              fill="#FD142B"
            />
            <path
              d="M50 10 C46 10 44 35 46 65 C48 85 49 96 50 100 L50 100 C51 96 52 85 54 65 C56 35 54 10 50 10 Z"
              fill="#FFFAF0"
            />

            {/* Ropes / Rigging */}
            <line x1="44" y1="100" x2="42" y2="110" stroke="#8B4A3E" strokeWidth="1.5" />
            <line x1="56" y1="100" x2="58" y2="110" stroke="#8B4A3E" strokeWidth="1.5" />
            <line x1="48" y1="100" x2="46" y2="110" stroke="#8B4A3E" strokeWidth="1.2" />
            <line x1="52" y1="100" x2="54" y2="110" stroke="#8B4A3E" strokeWidth="1.2" />

            {/* Woven Basket */}
            <rect x="42" y="110" width="16" height="12" rx="2" fill="#B87333" />
            <line x1="42" y1="114" x2="58" y2="114" stroke="#8B4A3E" strokeWidth="1" />
            <line x1="42" y1="118" x2="58" y2="118" stroke="#8B4A3E" strokeWidth="1" />
            <line x1="50" y1="110" x2="50" y2="122" stroke="#8B4A3E" strokeWidth="1" />
          </svg>
        </div>

        {/* Floating Tooltip Pill */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 px-2.5 py-0.5 rounded-full bg-[var(--dream-paper,#FFFAF0)] border border-[var(--dream-paper-2,#FFF1DC)] text-[10px] font-serif text-[var(--dream-ink,#2B2A52)] shadow-xs pointer-events-none whitespace-nowrap">
          Float to top
        </span>
      </button>
    </div>
  );
}
