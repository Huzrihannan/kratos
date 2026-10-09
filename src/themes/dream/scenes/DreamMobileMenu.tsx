'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Feather, Sparkles } from 'lucide-react';
import { DreamLogo } from '@/themes/dream/logo/DreamLogo';
import { ThemeSwitcherMobile } from '@/themes/ThemeSwitcher';
import { Button } from '@/components/ui/Button';
import { useMotionLevel } from '@/lib/motion/MotionContext';

interface DreamMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
  onOpenEstimator: () => void;
}

export function DreamMobileMenu({
  isOpen,
  onClose,
  links,
  onOpenEstimator,
}: DreamMobileMenuProps) {
  const pathname = usePathname();
  const { level, setLevel } = useMotionLevel();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuContainerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Dream Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#B4DDF7]/30 via-[var(--dream-paper,#FFFAF0)] to-[var(--dream-paper-2,#FFF1DC)] p-6 sm:p-10 select-none animate-in slide-in-from-top duration-300 ease-out"
    >
      {/* Decorative Cloud Silhouettes along top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none opacity-40 overflow-hidden">
        <svg className="w-full h-full fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L1200,0 L1200,40 Q1050,90 900,40 Q750,0 600,50 Q450,100 300,50 Q150,0 0,60 Z" />
        </svg>
      </div>

      {/* Top Bar with Logo and Rounded Paper Close Button */}
      <div className="relative z-10 flex items-center justify-between pb-6 border-b border-[var(--dream-ink,#2B2A52)]/10">
        <Link href="/" onClick={onClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dream-link,#3B3AA0)] rounded-full">
          <DreamLogo size={36} showTagline={false} />
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-12 h-12 rounded-full bg-white/90 border border-[var(--dream-ink,#2B2A52)]/15 shadow-sm flex items-center justify-center text-[var(--dream-ink,#2B2A52)] hover:bg-white hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dream-link,#3B3AA0)]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Large Fraunces Navigation Links */}
      <nav className="relative z-10 flex flex-col gap-5 my-auto py-8">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`group flex items-center justify-between font-serif text-3xl sm:text-4xl font-medium tracking-tight transition-all duration-200 ${
                isActive
                  ? 'text-[var(--dream-poppy-text,#C8102E)] translate-x-2'
                  : 'text-[var(--dream-ink,#2B2A52)] hover:text-[var(--dream-poppy-text,#C8102E)] hover:translate-x-1'
              }`}
            >
              <span>{link.label}</span>
              {isActive ? (
                <span className="w-3 h-3 rounded-full bg-[var(--dream-poppy,#FD142B)] animate-pulse" />
              ) : (
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity text-[var(--dream-link,#3B3AA0)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Controls: CTA, Theme Switcher Cards, Calm Toggle, Brand Line */}
      <div className="relative z-10 flex flex-col gap-5 pt-6 border-t border-[var(--dream-ink,#2B2A52)]/10">
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center rounded-full text-base font-semibold shadow-md"
          onClick={() => {
            onClose();
            onOpenEstimator();
          }}
        >
          Estimate my project
        </Button>

        {/* Calm Mode Card Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/70 border border-[var(--dream-ink,#2B2A52)]/10 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] flex items-center justify-center text-[var(--dream-grass-near,#3E8C5A)]">
              <Feather className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--dream-ink,#2B2A52)]">Calm Motion</div>
              <div className="text-[10px] text-[var(--dream-ink-soft,#55537A)]">Gentle drift, zero WebGL shaders</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              level === 'off'
                ? 'bg-[var(--dream-poppy,#FD142B)] text-white'
                : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-ink,#2B2A52)]/10'
            }`}
          >
            {level === 'off' ? 'Calm On' : 'Calm Off'}
          </button>
        </div>

        {/* Theme Switcher Cards */}
        <div className="pt-1">
          <ThemeSwitcherMobile onSelect={onClose} />
        </div>

        {/* Decorative Brand Tagline */}
        <div className="text-center font-serif italic text-xs text-[var(--dream-ink-soft,#55537A)] pt-1">
          Plant an idea. Watch it bloom.
        </div>
      </div>
    </div>
  );
}
