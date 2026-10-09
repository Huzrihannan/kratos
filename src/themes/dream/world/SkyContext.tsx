'use client';

/**
 * Krat.OS Dream Theme — SkyContext & Provider (SkyContext.tsx)
 *
 * Exposes current Living Sky state, active mode (journey, live, fixed),
 * and controls across the application.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { SkyState, SkyPreset, SKY_KEYFRAMES } from './sky';
import { SkyMode, globalSkyDriver } from './SkyDriver';

interface SkyContextValue {
  state: SkyState;
  mode: SkyMode;
  fixedPreset: SkyPreset;
  previewTime: number | null;
  setMode: (mode: SkyMode, preset?: SkyPreset) => void;
  setFixedPreset: (preset: SkyPreset) => void;
  setPreviewTime: (t: number | null) => void;
}

const SkyContext = createContext<SkyContextValue | null>(null);

export function SkyProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDream = theme === 'dream';

  const [state, setState] = useState<SkyState>(() => globalSkyDriver.getCurrentState());
  const [mode, setModeState] = useState<SkyMode>(() => globalSkyDriver.getMode());
  const [fixedPreset, setFixedPresetState] = useState<SkyPreset>(() =>
    globalSkyDriver.getFixedPreset()
  );
  const [previewTime, setPreviewTimeState] = useState<number | null>(null);

  // Synchronize dream active status
  useEffect(() => {
    globalSkyDriver.setDreamActive(isDream);
  }, [isDream]);

  // Mode updates
  const setMode = useCallback((newMode: SkyMode, preset?: SkyPreset) => {
    globalSkyDriver.setMode(newMode, preset);
    setModeState(newMode);
    if (preset) setFixedPresetState(preset);
    setState(globalSkyDriver.getCurrentState());
  }, []);

  const setFixedPreset = useCallback((preset: SkyPreset) => {
    globalSkyDriver.setFixedPreset(preset);
    setModeState('fixed');
    setFixedPresetState(preset);
    setState(globalSkyDriver.getCurrentState());
  }, []);

  const setPreviewTime = useCallback((t: number | null) => {
    globalSkyDriver.setPreviewTime(t);
    setPreviewTimeState(t);
    setState(globalSkyDriver.getCurrentState());
  }, []);

  // Scroll listener for journey mode & timer for live mode
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (mode === 'journey' && previewTime === null) {
            const next = globalSkyDriver.update();
            setState(next);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (isDream && mode === 'journey' && previewTime === null) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial trigger
      handleScroll();
    }

    // Interval for live clock drift
    let liveTimer: NodeJS.Timeout | null = null;
    if (isDream && mode === 'live' && previewTime === null) {
      liveTimer = setInterval(() => {
        const next = globalSkyDriver.update();
        setState(next);
      }, 10000); // Check every 10 seconds
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (liveTimer) clearInterval(liveTimer);
    };
  }, [isDream, mode, previewTime]);

  const value = useMemo(
    () => ({
      state,
      mode,
      fixedPreset,
      previewTime,
      setMode,
      setFixedPreset,
      setPreviewTime,
    }),
    [state, mode, fixedPreset, previewTime, setMode, setFixedPreset, setPreviewTime]
  );

  return <SkyContext.Provider value={value}>{children}</SkyContext.Provider>;
}

export function useSky(): SkyContextValue {
  const ctx = useContext(SkyContext);
  if (!ctx) {
    return {
      state: SKY_KEYFRAMES.day,
      mode: 'journey',
      fixedPreset: 'day',
      previewTime: null,
      setMode: () => {},
      setFixedPreset: () => {},
      setPreviewTime: () => {},
    };
  }
  return ctx;
}
