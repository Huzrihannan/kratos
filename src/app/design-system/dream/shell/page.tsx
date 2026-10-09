'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Feather, RefreshCw } from 'lucide-react';
import { useTheme } from '@/themes/ThemeProvider';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useCloudWipe } from '@/themes/CloudWipe';
import { Cottage } from '@/themes/dream/scenes/Cottage';
import { DreamFooter } from '@/themes/dream/scenes/DreamFooter';
import { DreamMobileMenu } from '@/themes/dream/scenes/DreamMobileMenu';
import { DreamBackToTop } from '@/themes/dream/scenes/DreamBackToTop';
import { DreamLogo } from '@/themes/dream/logo/DreamLogo';
import { Button } from '@/components/ui/Button';

export default function DreamShellLabPage() {
  const { theme, setTheme } = useTheme();
  const { level, setLevel } = useMotionLevel();
  const { triggerWipe } = useCloudWipe();

  const [mounted, setMounted] = React.useState(false);
  const [cottageAvailable, setCottageAvailable] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSimulatedNavShrunk, setShowSimulatedNavShrunk] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (theme !== 'dream') {
      setTheme('dream');
    }
  }, [theme, setTheme]);

  const demoLinks = [
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem('krat_os_dream_intro_played');
    } catch {
      // Ignore
    }
    window.location.reload();
  };

  return (
    <div
      data-theme="dream"
      className="min-h-screen bg-[var(--dream-paper,#FFFAF0)] text-[var(--dream-ink,#2B2A52)] font-sans antialiased selection:bg-[var(--dream-poppy,#FD142B)] selection:text-white"
    >
      {/* Top Header / Breadcrumb */}
      <div className="border-b border-[var(--dream-ink,#2B2A52)]/10 bg-white/70 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/design-system/dream"
              className="inline-flex items-center gap-1.5 text-xs font-serif text-[var(--dream-ink-soft,#55537A)] hover:text-[var(--dream-ink,#2B2A52)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dream System</span>
            </Link>
            <span className="text-[var(--dream-ink,#2B2A52)]/20">&bull;</span>
            <span className="text-xs font-serif font-bold text-[var(--dream-ink,#2B2A52)]">
              Shell Studio (D6)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerWipe(() => setTheme(theme === 'dream' ? 'dark' : 'dream'))}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-serif bg-[var(--dream-paper-2,#FFF1DC)] hover:bg-[var(--dream-ink,#2B2A52)]/10 text-[var(--dream-ink,#2B2A52)] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--dream-poppy,#FD142B)]" />
              <span>Test Cloud Wipe</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* Title Section */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] text-xs font-serif text-[var(--dream-poppy-text,#C8102E)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--dream-poppy,#FD142B)]" />
            <span>Prompt D6 &bull; Dream Shell Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Navigation, Mobile Cloud Menu, Cottage &amp; Footer
          </h1>
          <p className="text-base text-[var(--dream-ink-soft,#55537A)] max-w-2xl">
            Storybook interface shell engineered specifically for non-technical visitors: floating paper navbar, full-screen cloud sheet, glowing hill cottage, and dusk/night starlit footer.
          </p>
        </div>

        {/* 1. Floating Pill Navbar Showcase */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold">1. Floating Pill Navbar</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--dream-ink-soft,#55537A)]">Simulate Scroll:</span>
              <button
                type="button"
                onClick={() => setShowSimulatedNavShrunk(!showSimulatedNavShrunk)}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  showSimulatedNavShrunk
                    ? 'bg-[var(--dream-poppy,#FD142B)] text-white'
                    : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)]'
                }`}
              >
                {showSimulatedNavShrunk ? 'Shrunk State' : 'Default State'}
              </button>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#6DB6F0]/25 via-[#B4DDF7]/15 to-transparent border border-[var(--dream-paper-2,#FFF1DC)]">
            <div
              className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border border-[var(--dream-paper-2,#FFF1DC)] bg-[var(--dream-paper,#FFFAF0)]/90 backdrop-blur-md px-5 transition-all duration-300 ${
                showSimulatedNavShrunk
                  ? 'h-13 shadow-[0_12px_36px_rgba(43,42,82,0.12)] scale-[0.98]'
                  : 'h-16 shadow-[0_8px_30px_rgba(43,42,82,0.07)]'
              }`}
            >
              <DreamLogo size={32} showTagline={false} />

              <nav className="hidden md:flex items-center gap-6 font-sans text-sm font-medium text-[var(--dream-ink-soft,#55537A)]">
                <span className="text-[var(--dream-ink,#2B2A52)] font-semibold border-b-2 border-[var(--dream-poppy,#FD142B)] pb-0.5">
                  Services
                </span>
                <span className="hover:text-[var(--dream-ink,#2B2A52)]">Work</span>
                <span className="hover:text-[var(--dream-ink,#2B2A52)]">About</span>
                <span className="hover:text-[var(--dream-ink,#2B2A52)]">Contact</span>
              </nav>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLevel(level === 'off' ? 'full' : 'off')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    level === 'off'
                      ? 'bg-[var(--dream-poppy,#FD142B)] text-white'
                      : 'bg-[var(--dream-paper-2,#FFF1DC)] text-[var(--dream-ink,#2B2A52)]'
                  }`}
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Calm</span>
                </button>
                <Button variant="primary" size="sm" className="rounded-full shadow-sm text-xs px-4">
                  Estimate my project
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Mobile Cloud Sheet Menu */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold">2. Mobile Cloud Menu</h2>
            <button
              type="button"
              data-testid="open-mobile-menu-preview"
              onClick={() => setMobileMenuOpen(true)}
              className="px-4 py-2 rounded-full bg-[var(--dream-ink,#2B2A52)] text-white font-serif text-xs hover:bg-[var(--dream-link,#3B3AA0)] transition-colors shadow-sm"
            >
              Preview Cloud Sheet Drawer &rarr;
            </button>
          </div>
          <p className="text-xs text-[var(--dream-ink-soft,#55537A)]">
            Full-screen cloud sheet sliding down with large Fraunces typography, theme preview cards, Calm toggle, and Escape key dismissal.
          </p>

          <DreamMobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            links={demoLinks}
            onOpenEstimator={() => alert('Estimator opened')}
          />
        </section>

        {/* 3. Availability-Reactive Cottage */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold">3. Hill Cottage with Window Glow</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--dream-ink-soft,#55537A)]">Availability State:</span>
              <button
                type="button"
                data-testid="toggle-cottage-availability"
                data-hydrated={mounted ? 'true' : 'false'}
                onClick={() => setCottageAvailable(!cottageAvailable)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  cottageAvailable
                    ? 'bg-[#FFD47A] text-[#2B2A52] shadow-sm'
                    : 'bg-[#55537A] text-white'
                }`}
              >
                {cottageAvailable ? 'Open (Window Glows)' : 'Resting (Window Dark)'}
              </button>
            </div>
          </div>

          <div data-testid="cottage-sandbox" className="p-8 rounded-3xl bg-[#1B1E4B] flex items-center justify-center">
            <Cottage isAvailable={cottageAvailable} />
          </div>
        </section>

        {/* 4. Dawn Intro Replay Trigger */}
        <section className="space-y-4 p-6 rounded-3xl bg-white/70 border border-[var(--dream-paper-2,#FFF1DC)] shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold">4. Dawn Intro Sequence</h2>
              <p className="text-xs text-[var(--dream-ink-soft,#55537A)] mt-1">
                Plays once per session upon entering Dream theme: dark indigo starfield, sunrise, and blooming logo flight to nav in ~2.2s.
              </p>
            </div>
            <button
              type="button"
              data-testid="replay-dawn-intro"
              onClick={handleReplayIntro}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dream-paper-2,#FFF1DC)] hover:bg-[var(--dream-ink,#2B2A52)]/10 text-[var(--dream-ink,#2B2A52)] text-xs font-serif font-bold transition-all shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replay Dawn Intro (Clears Session &amp; Reloads)</span>
            </button>
          </div>
        </section>

        {/* 5. Dream Footer Dusk & Night Preview */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold">5. Dream Footer (Dusk &amp; Night)</h2>
          <p className="text-xs text-[var(--dream-ink-soft,#55537A)]">
            Stars, moon, glowing cottage on hill, giant blooming Poppy wordmark, night-paper card columns (WCAG AAA contrast), and Colombo live time.
          </p>
          <div className="rounded-3xl overflow-hidden border border-[#54478C]/40 shadow-2xl">
            <DreamFooter />
          </div>
        </section>
      </main>

      <DreamBackToTop />
    </div>
  );
}
