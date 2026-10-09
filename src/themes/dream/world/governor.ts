/**
 * Krat.OS Dream Theme — Quality Governor (governor.ts)
 *
 * Governs visual fidelity and performance tiers across 4 levels:
 * T3: Ultra (WebGL World Canvas, high-res procedural sky, god rays, full sprite count, 60fps)
 * T2: Standard (WebGL World Canvas, half-res offscreen target, reduced sprites, 30fps)
 * T1: Fallback (No WebGL, Layer 0 CSS gradient + Layer 1 DOM sprite clouds + SVG hills)
 * T0: Calm / Static (Layer 0 CSS gradient only, zero animation tickers, static SVG hills)
 *
 * Automatically benchmarks, monitors frame rate drops (<40fps for 2s),
 * persists tier preferences, and syncs with MotionContext.
 */

import { useEffect, useCallback, useSyncExternalStore } from 'react';
import { MotionLevel } from '@/lib/motion/MotionContext';

export type QualityTier = 'T3' | 'T2' | 'T1' | 'T0';

const STORAGE_KEY = 'krat_dream_quality_tier';

let currentTier: QualityTier = 'T3';
const listeners = new Set<(tier: QualityTier) => void>();

function notifyTierChange(nextTier: QualityTier) {
  currentTier = nextTier;
  listeners.forEach((fn) => fn(nextTier));
  try {
    localStorage.setItem(STORAGE_KEY, nextTier);
  } catch {
    // Ignore storage issues
  }
}

/**
 * Checks basic WebGL availability without maintaining context.
 */
export function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

/**
 * Initialize tier from storage or hardware capability.
 */
export function initQualityGovernor(motionLevel: MotionLevel = 'full'): QualityTier {
  if (typeof window === 'undefined') return 'T3';

  // 1. Motion level overrides
  if (motionLevel === 'off') {
    notifyTierChange('T0');
    return 'T0';
  }
  if (motionLevel === 'lite') {
    notifyTierChange('T1');
    return 'T1';
  }

  // 2. Local storage preference
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as QualityTier | null;
    if (saved && ['T3', 'T2', 'T1', 'T0'].includes(saved)) {
      currentTier = saved;
      return saved;
    }
  } catch {
    // ignore
  }

  // 3. WebGL probe
  if (!checkWebGLSupport()) {
    notifyTierChange('T1');
    return 'T1';
  }

  // 4. Low-end device heuristics
  if (typeof navigator !== 'undefined') {
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    // @ts-expect-error deviceMemory is Chrome-specific
    const mem = navigator.deviceMemory || 8;
    if (hwConcurrency < 4 || mem < 4) {
      notifyTierChange('T2');
      return 'T2';
    }
  }

  notifyTierChange('T3');
  return 'T3';
}

/**
 * Live frame-rate watchdog for auto-downgrade.
 * Steps down one tier if FPS < 40 for 2 consecutive seconds during user interaction.
 */
class FrameWatchdog {
  private active = false;
  private lastTime = 0;
  private lowFpsDuration = 0;
  private rafId = 0;

  start() {
    if (this.active || typeof window === 'undefined') return;
    this.active = true;
    this.lastTime = performance.now();
    this.lowFpsDuration = 0;
    this.loop = this.loop.bind(this);
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop() {
    this.active = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private loop(now: number) {
    if (!this.active) return;
    const delta = now - this.lastTime;
    this.lastTime = now;

    if (delta > 0) {
      const fps = 1000 / delta;
      // If FPS drops below 40
      if (fps < 40 && delta < 250) {
        this.lowFpsDuration += delta;
        if (this.lowFpsDuration >= 2000) {
          // Sustained low FPS: step down one tier
          this.downgrade();
          this.lowFpsDuration = 0;
        }
      } else {
        this.lowFpsDuration = Math.max(0, this.lowFpsDuration - delta * 0.5);
      }
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  private downgrade() {
    if (currentTier === 'T3') {
      notifyTierChange('T2');
    } else if (currentTier === 'T2') {
      notifyTierChange('T1');
      this.stop(); // No WebGL anymore, stop watchdog
    }
  }
}

export const frameWatchdog = new FrameWatchdog();

/**
 * Hook to consume and control current QualityTier.
 */
export function useQuality(motionLevel: MotionLevel = 'full'): {
  tier: QualityTier;
  setTier: (tier: QualityTier) => void;
  isWebGLActive: boolean;
  isAnimated: boolean;
} {
  const tier = useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    () => currentTier,
    () => 'T3' as QualityTier
  );

  // Sync when motionLevel changes
  useEffect(() => {
    if (motionLevel === 'off' && currentTier !== 'T0') {
      notifyTierChange('T0');
    } else if (motionLevel === 'lite' && currentTier !== 'T1') {
      notifyTierChange('T1');
    }
  }, [motionLevel]);

  const setTier = useCallback((nextTier: QualityTier) => {
    notifyTierChange(nextTier);
  }, []);

  const isWebGLActive = tier === 'T3' || tier === 'T2';
  const isAnimated = tier !== 'T0';

  return { tier, setTier, isWebGLActive, isAnimated };
}
