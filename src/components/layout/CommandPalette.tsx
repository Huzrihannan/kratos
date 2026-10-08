'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { useTheme } from 'next-themes';
import { useMotionLevel } from '@/lib/motion/MotionContext';
import { useLayoutModal } from '@/lib/modal-context';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/content/site';
import { caseStudiesData } from '@/content/work';
import { isPublishable } from '@/lib/content-status';

export function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { level, setLevel } = useMotionLevel();
  const { isCommandPaletteOpen, closeCommandPalette, toggleCommandPalette, openEstimator } = useLayoutModal();
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Global hotkey: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette]);

  // Track palette_open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      trackEvent('palette_open');
      setQuery('');
      setCopied(false);
    }
  }, [isCommandPaletteOpen]);

  const runCommand = useCallback((command: () => void, label: string) => {
    trackEvent('palette_action', { label });
    closeCommandPalette();
    command();
  }, [closeCommandPalette]);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent('palette_action', { label: 'copy_email' });
    } catch {
      // Ignore
    }
  };

  const isEasterEgg = query.trim().toLowerCase() === 'sudo hire krat.os';

  if (!isCommandPaletteOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-bg/80 backdrop-blur-sm"
      onClick={closeCommandPalette}
    >
      <div
        className="w-full max-w-xl border border-line-strong bg-surface text-fg shadow-2xl rounded-[2px] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <Command
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
          className="w-full flex flex-col font-mono"
        >
          {/* Input Chrome Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line bg-surface/90">
            <span className="text-red font-bold text-base">&gt;</span>
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command, route, or search..."
              className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-muted outline-none font-mono"
              autoFocus
            />
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-fg-muted border border-line px-1.5 py-0.5">
              [ESC]
            </span>
          </div>

          {/* Results List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-2 text-xs">
            <Command.Empty className="py-6 text-center text-fg-muted">
              {isEasterEgg ? null : '[ NO MATCHING COMMANDS FOUND ]'}
            </Command.Empty>

            {/* Easter Egg Item */}
            {isEasterEgg && (
              <Command.Item
                onSelect={() => {
                  runCommand(() => openEstimator(), 'easter_egg_sudo_hire');
                }}
                className="flex items-center justify-between p-3 border border-red bg-red/10 text-red cursor-pointer select-none rounded-[1px]"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red animate-ping" />
                  <span className="font-bold">[ ok ] PERMISSION GRANTED: FOUNDER MODE INITIALIZED</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider">[ ENTER ]</span>
              </Command.Item>
            )}

            {/* Group: Actions */}
            <Command.Group
              heading="/01 — ACTIONS"
              className="text-[10px] text-red-text uppercase tracking-widest px-2 py-1 font-semibold"
            >
              <Command.Item
                value="start a project estimate calculator configurator"
                onSelect={() => runCommand(() => openEstimator(), 'start_project')}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[+] Start a Project (Estimator)</span>
                <span className="opacity-60 text-[10px]">[LAUNCH]</span>
              </Command.Item>

              {siteConfig.contact.bookingUrl ? (
                <Command.Item
                  value="book a 15-min call calendar meeting"
                  onSelect={() => runCommand(() => router.push(siteConfig.contact.bookingUrl), 'book_call')}
                  className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
                >
                  <span>[→] Book a 15-min Call</span>
                  <span className="opacity-60 text-[10px]">[CALENDAR]</span>
                </Command.Item>
              ) : null}

              {siteConfig.contact.whatsappUrl ? (
                <Command.Item
                  value="chat on whatsapp instant message support"
                  onSelect={() => runCommand(() => window.open(siteConfig.contact.whatsappUrl, '_blank'), 'whatsapp')}
                  className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
                >
                  <span>[WA] Chat on WhatsApp</span>
                  <span className="opacity-60 text-[10px]">[EXTERNAL]</span>
                </Command.Item>
              ) : null}

              <Command.Item
                value="email us contact message engineering"
                onSelect={() => runCommand(() => { window.location.href = `mailto:${siteConfig.contact.email}`; }, 'email_us')}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[@] Email Engineering Team</span>
                <span className="opacity-60 text-[10px]">[MAILTO]</span>
              </Command.Item>

              <Command.Item
                value="copy email address to clipboard"
                onSelect={handleCopyEmail}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[CP] {copied ? '[ COPIED TO CLIPBOARD! ]' : `Copy Email (${siteConfig.contact.email})`}</span>
                <span className="opacity-60 text-[10px]">[CLIPBOARD]</span>
              </Command.Item>
            </Command.Group>

            {/* Group: Navigation */}
            <Command.Group
              heading="/02 — NAVIGATION"
              className="text-[10px] text-red-text uppercase tracking-widest px-2 py-1 font-semibold"
            >
              {[
                { label: 'Home (~/)', path: '/' },
                { label: 'Services (~/services)', path: '/services' },
                ...(caseStudiesData.some(isPublishable)
                  ? [{ label: 'Work & Case Studies (~/work)', path: '/work' }]
                  : []),
                { label: 'About Krat.OS (~/about)', path: '/about' },
                { label: 'Contact (~/contact)', path: '/contact' },
                { label: 'Design System Lab (~/design-system)', path: '/design-system' },
                { label: 'Privacy Policy (~/privacy)', path: '/privacy' },
                { label: 'Terms of Service (~/terms)', path: '/terms' },
              ].map((item) => (
                <Command.Item
                  key={item.path}
                  value={`navigate ${item.label} ${item.path}`}
                  onSelect={() => runCommand(() => router.push(item.path), `nav_${item.path}`)}
                  className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="opacity-60 text-[10px]">ROUTE</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Group: Settings */}
            <Command.Group
              heading="/03 — SETTINGS"
              className="text-[10px] text-red-text uppercase tracking-widest px-2 py-1 font-semibold"
            >
              <Command.Item
                value="toggle theme switch dark light mode"
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'), 'toggle_theme')}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[TH] Toggle Theme (Current: {theme?.toUpperCase()})</span>
                <span className="opacity-60 text-[10px]">[THEME]</span>
              </Command.Item>

              <Command.Item
                value="motion level full mechanical animations"
                onSelect={() => runCommand(() => setLevel('full'), 'motion_full')}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[FX] Motion: Full {level === 'full' && '✓'}</span>
                <span className="opacity-60 text-[10px]">[FULL]</span>
              </Command.Item>

              <Command.Item
                value="motion level lite css fallbacks low cpu"
                onSelect={() => runCommand(() => setLevel('lite'), 'motion_lite')}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[FX] Motion: Lite {level === 'lite' && '✓'}</span>
                <span className="opacity-60 text-[10px]">[LITE]</span>
              </Command.Item>

              <Command.Item
                value="motion level off reduced motion static"
                onSelect={() => runCommand(() => setLevel('off'), 'motion_off')}
                className="flex items-center justify-between px-3 py-2 text-fg hover:bg-surface/80 aria-selected:bg-fg aria-selected:text-bg cursor-pointer rounded-[1px] transition-colors"
              >
                <span>[FX] Motion: Off (Reduced) {level === 'off' && '✓'}</span>
                <span className="opacity-60 text-[10px]">[OFF]</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-line bg-surface/90 text-[10px] text-fg-muted">
            <span>{'// KRAT.OS_SHELL_CMD'}</span>
            <span className="flex items-center gap-2">
              <span>USE ARROWS TO NAVIGATE</span>
              <span>•</span>
              <span>[ENTER] TO SELECT</span>
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
