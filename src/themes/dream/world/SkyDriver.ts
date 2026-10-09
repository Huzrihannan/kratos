/**
 * Krat.OS Dream Theme — SkyDriver (SkyDriver.ts)
 *
 * Drives CSS variables and shader uniforms from the Living Sky state.
 * Throttles document CSS variable writes to at most 30 times per second
 * and only writes when variables have actually changed.
 */

import {
  SkyState,
  SkyPreset,
  SKY_KEYFRAMES,
  getJourneySky,
  getLiveSky,
} from './sky';

export type SkyMode = 'journey' | 'live' | 'fixed';

export interface SkyDriverConfig {
  mode: SkyMode;
  fixedPreset?: SkyPreset;
  timeOffset?: number; // Manual preview override (0..1)
}

const STORAGE_MODE_KEY = 'krat_dream_sky_mode';
const STORAGE_PRESET_KEY = 'krat_dream_sky_preset';

export class SkyDriver {
  private mode: SkyMode = 'journey';
  private fixedPreset: SkyPreset = 'day';
  private currentState: SkyState = SKY_KEYFRAMES.day;
  private lastCssWrite = 0;
  private lastWrittenStateString = '';
  private isDreamActive = false;
  private previewTime: number | null = null;

  constructor() {
    this.loadPersistedConfig();
  }

  loadPersistedConfig() {
    if (typeof window === 'undefined') return;
    try {
      const savedMode = localStorage.getItem(STORAGE_MODE_KEY) as SkyMode | null;
      if (savedMode && ['journey', 'live', 'fixed'].includes(savedMode)) {
        this.mode = savedMode;
      }
      const savedPreset = localStorage.getItem(STORAGE_PRESET_KEY) as SkyPreset | null;
      if (savedPreset && ['dawn', 'day', 'golden', 'dusk', 'night'].includes(savedPreset)) {
        this.fixedPreset = savedPreset;
      }
    } catch {
      // ignore
    }
  }

  setMode(mode: SkyMode, preset?: SkyPreset) {
    this.previewTime = null;
    this.mode = mode;
    if (preset) this.fixedPreset = preset;
    try {
      localStorage.setItem(STORAGE_MODE_KEY, mode);
      if (preset) localStorage.setItem(STORAGE_PRESET_KEY, preset);
    } catch {
      // ignore
    }
    this.update();
  }

  setFixedPreset(preset: SkyPreset) {
    this.previewTime = null;
    this.mode = 'fixed';
    this.fixedPreset = preset;
    try {
      localStorage.setItem(STORAGE_MODE_KEY, 'fixed');
      localStorage.setItem(STORAGE_PRESET_KEY, preset);
    } catch {
      // ignore
    }
    this.update();
  }

  setPreviewTime(t: number | null) {
    this.previewTime = t !== null ? Math.max(0, Math.min(1, t)) : null;
    this.update();
  }

  setDreamActive(active: boolean) {
    this.isDreamActive = active;
    if (active) {
      this.writeCssVariables(true); // force initial write
    }
  }

  getMode(): SkyMode {
    return this.mode;
  }

  getFixedPreset(): SkyPreset {
    return this.fixedPreset;
  }

  getCurrentState(): SkyState {
    return this.currentState;
  }

  /**
   * Evaluate state based on current scroll or clock time.
   */
  update(scrollProgress?: number): SkyState {
    let nextState: SkyState;

    if (this.previewTime !== null) {
      nextState = getJourneySky(this.previewTime);
    } else if (this.mode === 'fixed') {
      nextState = SKY_KEYFRAMES[this.fixedPreset] || SKY_KEYFRAMES.day;
    } else if (this.mode === 'live') {
      nextState = getLiveSky();
    } else {
      // Journey mode: compute from scrollProgress
      const progress =
        scrollProgress !== undefined
          ? scrollProgress
          : this.computeScrollProgress();
      nextState = getJourneySky(progress);
    }

    this.currentState = nextState;

    if (this.isDreamActive) {
      this.writeCssVariables();
    }

    return nextState;
  }

  private computeScrollProgress(): number {
    if (typeof window === 'undefined') return 0;
    const doc = document.documentElement;
    const scrollMax = doc.scrollHeight - window.innerHeight;
    if (scrollMax <= 0) return 0;
    return Math.max(0, Math.min(1, window.scrollY / scrollMax));
  }

  /**
   * Writes CSS variables to documentElement at <= 30Hz, only when values change.
   */
  private writeCssVariables(force = false) {
    if (typeof window === 'undefined') return;

    const now = performance.now();
    // Throttle to 30Hz (~33.3ms)
    if (!force && now - this.lastCssWrite < 33.3) {
      return;
    }

    const s = this.currentState;
    const stateSig = `${s.top}|${s.mid}|${s.horizon}|${s.cloudTint}|${s.sunX}|${s.sunY}|${s.starAlpha}|${s.heroFg}`;
    if (!force && stateSig === this.lastWrittenStateString) {
      return;
    }

    this.lastCssWrite = now;
    this.lastWrittenStateString = stateSig;

    const root = document.documentElement.style;
    root.setProperty('--sky-top', s.top);
    root.setProperty('--sky-mid', s.mid);
    root.setProperty('--sky-horizon', s.horizon);
    root.setProperty('--cloud-tint', s.cloudTint);
    root.setProperty('--sun-x', s.sunX.toFixed(3));
    root.setProperty('--sun-y', s.sunY.toFixed(3));
    root.setProperty('--ambient', s.ambient.toFixed(3));
    root.setProperty('--star-alpha', s.starAlpha.toFixed(3));
    root.setProperty('--grass-tint', s.grassTint);
    root.setProperty('--hero-fg', s.heroFg);
  }
}

export const globalSkyDriver = new SkyDriver();
