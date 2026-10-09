'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Feather, Menu } from 'lucide-react';
import { useTheme } from '@/themes/ThemeProvider';
import { ThemeSwitcherNav, ThemeSwitcherMobile } from '@/themes/ThemeSwitcher';
import { useLayoutModal } from '@/lib/modal-context';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Decode } from '@/components/fx/Decode';
import { Glitch } from '@/components/fx/Glitch';
import { Magnetic } from '@/components/fx/Magnetic';

import { caseStudiesData } from '@/content/work';
import { isPublishable } from '@/lib/content-status';

const DynamicDreamLogo = dynamic(
  () => import('@/themes/dream/logo/DreamLogo').then((mod) => mod.DreamLogo),
  { ssr: false }
);

const DynamicDreamMobileMenu = dynamic(
  () => import('@/themes/dream/scenes/DreamMobileMenu').then((mod) => mod.DreamMobileMenu),
  { ssr: false }
);

const hasPublishedWork = caseStudiesData.some(isPublishable);

const NAV_LINKS = [
  { href: '/services', label: 'Services', index: '01' },
  ...(hasPublishedWork ? [{ href: '/work', label: 'Work', index: '02' }] : []),
  { href: '/about', label: 'About', index: hasPublishedWork ? '03' : '02' },
  { href: '/contact', label: 'Contact', index: hasPublishedWork ? '04' : '03' },
];

export function Nav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { isMobileNavOpen, setMobileNavOpen, openEstimator, toggleCommandPalette } = useLayoutModal();
  const { level, setLevel } = useMotionLevel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const isDream = theme === 'dream';

  useEffect(() => {
    setMounted(true);
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  // Trap focus and Escape on mobile menu (for standard drawer)
  useEffect(() => {
    if (!isMobileNavOpen || isDream) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileNavOpen(false);
        hamburgerButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileNavOpen, isDream, setMobileNavOpen]);

  // --- 1. DREAM THEME NAVBAR ---
  if (isDream) {
    return (
      <>
        <header
          className={`sticky top-0 z-40 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300 ${
            isScrolled ? 'pt-2' : 'pt-3 sm:pt-4'
          }`}
        >
          <div
            className={`mx-auto flex max-w-5xl items-center justify-between pointer-events-auto rounded-full border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-md px-4 sm:px-6 transition-all duration-300 ${
              isScrolled
                ? 'h-13 sm:h-14 shadow-[0_12px_36px_rgba(43,42,82,0.12)] scale-[0.99]'
                : 'h-14 sm:h-16 shadow-[0_8px_30px_rgba(43,42,82,0.07)]'
            }`}
          >
            {/* Left: Dream Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dream-link,#3B3AA0)] rounded-full"
              data-cursor="home"
            >
              {mounted ? (
                <DynamicDreamLogo size={32} showTagline={false} />
              ) : (
                <div className="h-6 w-24 bg-[var(--dream-paper-2,#FFF1DC)] animate-pulse rounded-full" />
              )}
            </Link>

            {/* Center: Plain Figtree Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-medium text-[var(--dream-ink-soft,#55537A)]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-colors ${
                      isActive
                        ? 'text-[var(--dream-ink,#2B2A52)] font-semibold'
                        : 'hover:text-[var(--dream-ink,#2B2A52)]'
                    }`}
                    data-cursor="view"
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--dream-poppy,#FD142B)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Calm Switch, Theme Switcher, CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Calm Toggle Button */}
              <button
                type="button"
                onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
                aria-label={level === 'off' ? 'Disable calm motion' : 'Enable calm motion'}
                aria-pressed={level === 'off'}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  level === 'off'
                    ? 'bg-[var(--dream-poppy,#FD142B)] text-white shadow-xs'
                    : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)] hover:bg-[var(--dream-ink,#2B2A52)]/10'
                }`}
                title="Calm Motion: slows drift and turns off heavy shaders"
                data-cursor="click"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Calm</span>
              </button>

              {/* Theme Switcher */}
              {mounted ? (
                <ThemeSwitcherNav />
              ) : (
                <div className="min-h-[36px] min-w-[120px]" aria-hidden="true" />
              )}

              {/* Primary CTA */}
              <div className="hidden sm:block">
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full shadow-sm text-xs px-4"
                  onClick={openEstimator}
                >
                  Estimate my project
                </Button>
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                ref={hamburgerButtonRef}
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)] hover:bg-white transition-colors"
                aria-label="Open mobile menu"
                aria-expanded={isMobileNavOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dream Mobile Menu Cloud Sheet */}
        {mounted && (
          <DynamicDreamMobileMenu
            isOpen={isMobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
            links={NAV_LINKS}
            onOpenEstimator={openEstimator}
          />
        )}
      </>
    );
  }

  // --- 2. DARK & LIGHT THEMES NAVBAR (ORIGINAL TECHNICAL SHELL) ---
  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-14 sm:h-16 flex items-center border-b border-line bg-bg/90 backdrop-blur-md transition-colors duration-200 select-none ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between w-full px-4 sm:px-6 lg:px-8">
          {/* Left: Wordmark Logo with Hover Glitch */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-text"
            data-cursor="home"
          >
            <Glitch>
              <Logo variant="auto" showTagline={false} className="h-6 sm:h-7" />
            </Glitch>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-wider">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-1.5 py-1 transition-colors ${
                    isActive ? 'text-fg font-bold' : 'text-fg-muted hover:text-fg'
                  }`}
                  data-cursor="view"
                >
                  <span className={`text-[10px] ${isActive ? 'text-red' : 'text-fg-muted/60 group-hover:text-red-text'}`}>
                    /{link.index}
                  </span>
                  <span>{link.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-red transition-transform duration-150 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={toggleCommandPalette}
              className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 border border-line bg-surface hover:border-line-strong text-fg-muted hover:text-fg font-mono text-[11px] transition-colors rounded-[2px]"
              title={`Command Palette (${isMac ? '⌘K' : 'Ctrl+K'})`}
              data-cursor="search"
            >
              <span>CMD</span>
              <span className="text-red font-semibold">{isMac ? '⌘K' : '^K'}</span>
            </button>

            {/* Multi-Theme Segmented Switcher */}
            {mounted ? (
              <ThemeSwitcherNav />
            ) : (
              <div className="min-h-[36px] min-w-[120px]" aria-hidden="true" />
            )}

            {/* Primary CTA Button */}
            <div className="hidden sm:block">
              <Magnetic strength={6}>
                <Button variant="primary" size="sm" onClick={openEstimator}>
                  Estimate my project
                </Button>
              </Magnetic>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden flex items-center justify-center min-h-[44px] px-3.5 border border-line bg-surface text-fg font-mono text-xs uppercase tracking-wider rounded-[2px]"
              aria-label="Open mobile menu"
              aria-expanded={isMobileNavOpen}
            >
              <span>[MENU]</span>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar along bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-line overflow-hidden pointer-events-none">
          <div
            className="h-full bg-red transition-[width] duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer (Full-screen Technical OS Overlay) */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg text-fg p-6 sm:p-10 select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Header Chrome */}
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <Logo variant="auto" showTagline={false} className="h-6" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="px-3 py-1 border border-line-strong bg-surface font-mono text-xs uppercase tracking-wider text-fg rounded-[2px]"
              aria-label="Close menu"
            >
              [ CLOSE ]
            </button>
          </div>

          {/* Large Monospace Navigation Links with Decode */}
          <nav className="flex flex-col gap-6 my-auto font-mono">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`group flex items-baseline gap-3 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight transition-colors ${
                    isActive ? 'text-red' : 'text-fg hover:text-red-text'
                  }`}
                >
                  <span className="text-xs sm:text-sm text-fg-muted font-normal">
                    /{link.index}
                  </span>
                  <Decode text={link.label.toUpperCase()} delay={idx * 60} />
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions & Status */}
          <div className="flex flex-col gap-4 pt-6 border-t border-line">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => {
                setMobileNavOpen(false);
                openEstimator();
              }}
            >
              Estimate my project
            </Button>

            {/* Mobile Theme Switcher Cards */}
            {mounted && (
              <ThemeSwitcherMobile onSelect={() => setMobileNavOpen(false)} />
            )}

            <div className="flex items-center justify-between font-mono text-[11px] text-fg-muted pt-2">
              <span>{'// KRAT.OS_SYS_V2'}</span>
              <span>{theme?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
