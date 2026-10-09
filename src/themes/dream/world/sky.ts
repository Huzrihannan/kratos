/**
 * Krat.OS Dream Theme — Living Sky State Engine & OKLab Color Science
 *
 * Provides mathematically accurate OKLab color interpolation across 5 keyframes:
 * Dawn, Day, Golden Hour, Dusk, and Night.
 */

// ============================================================================
// 1. OKLab Color Space Mathematics
// ============================================================================

export interface RGB {
  r: number; // 0..1
  g: number; // 0..1
  b: number; // 0..1
}

export interface OKLab {
  L: number; // 0..1 (perceived lightness)
  a: number; // green (-) to red (+)
  b: number; // blue (-) to yellow (+)
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function rgbToOklab({ r, g, b }: RGB): OKLab {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function oklabToRgb({ L, a, b }: OKLab): RGB {
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);

  const lr = +4.076743477 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return {
    r: Math.max(0, Math.min(1, linearToSrgb(lr))),
    g: Math.max(0, Math.min(1, linearToSrgb(lg))),
    b: Math.max(0, Math.min(1, linearToSrgb(lb))),
  };
}

/**
 * Interpolates two hex colors in OKLab color space.
 */
export function interpolateOklab(hexA: string, hexB: string, t: number): string {
  const clampedT = Math.max(0, Math.min(1, t));
  const labA = rgbToOklab(hexToRgb(hexA));
  const labB = rgbToOklab(hexToRgb(hexB));

  const interpLab: OKLab = {
    L: labA.L + (labB.L - labA.L) * clampedT,
    a: labA.a + (labB.a - labA.a) * clampedT,
    b: labA.b + (labB.b - labA.b) * clampedT,
  };

  return rgbToHex(oklabToRgb(interpLab));
}

// ============================================================================
// 2. Sky Keyframe Definitions & Schema
// ============================================================================

export type SkyPreset = 'dawn' | 'day' | 'golden' | 'dusk' | 'night';

export interface SkyState {
  id: SkyPreset | string;
  name: string;
  // Gradient stops
  top: string; // 0% height
  mid: string; // 62% height
  horizon: string; // 100% height
  // Cloud & atmospheric tints
  cloudTint: string;
  grassTint: string;
  ambient: number; // 0..1 light multiplier
  // Celestial coordinates & intensities (normalized 0..1 viewport space)
  sunX: number;
  sunY: number;
  sunIntensity: number; // 0..1
  moonX: number;
  moonY: number;
  moonIntensity: number; // 0..1
  starAlpha: number; // 0..1
  // Typography contrast token
  heroFg: string; // #2B2A52 (ink) or #FFF6E5 (cream)
  hasScrim: boolean; // true at dusk
}

export const SKY_KEYFRAMES: Record<SkyPreset, SkyState> = {
  dawn: {
    id: 'dawn',
    name: 'Dawn',
    top: '#8FA6E0',
    mid: '#F2B8CF',
    horizon: '#FFE0B5',
    cloudTint: '#FFE3E0',
    grassTint: '#8AC28E',
    ambient: 0.72,
    sunX: 0.25,
    sunY: 0.70,
    sunIntensity: 0.75,
    moonX: 0.78,
    moonY: 0.22,
    moonIntensity: 0.15,
    starAlpha: 0.12,
    heroFg: '#2B2A52',
    hasScrim: false,
  },
  day: {
    id: 'day',
    name: 'Day',
    top: '#6DB6F0',
    mid: '#B4DDF7',
    horizon: '#FFF0D4',
    cloudTint: '#FFFFFF',
    grassTint: '#3E8C5A',
    ambient: 1.0,
    sunX: 0.50,
    sunY: 0.22,
    sunIntensity: 1.0,
    moonX: 0.88,
    moonY: 0.35,
    moonIntensity: 0.0,
    starAlpha: 0.0,
    heroFg: '#2B2A52',
    hasScrim: false,
  },
  golden: {
    id: 'golden',
    name: 'Golden Hour',
    top: '#7FA6E6',
    mid: '#F6C79A',
    horizon: '#FFD47A',
    cloudTint: '#FFE8C4',
    grassTint: '#64A65E',
    ambient: 0.85,
    sunX: 0.75,
    sunY: 0.62,
    sunIntensity: 0.95,
    moonX: 0.20,
    moonY: 0.40,
    moonIntensity: 0.05,
    starAlpha: 0.08,
    heroFg: '#2B2A52',
    hasScrim: false,
  },
  dusk: {
    id: 'dusk',
    name: 'Dusk',
    top: '#33346F',
    mid: '#7A4A8C',
    horizon: '#FF9E6B',
    cloudTint: '#E7A9C2',
    grassTint: '#3B6852',
    ambient: 0.48,
    sunX: 0.86,
    sunY: 0.84,
    sunIntensity: 0.40,
    moonX: 0.35,
    moonY: 0.28,
    moonIntensity: 0.55,
    starAlpha: 0.52,
    heroFg: '#FFF6E5',
    hasScrim: true,
  },
  night: {
    id: 'night',
    name: 'Night',
    top: '#0F1438',
    mid: '#252A66',
    horizon: '#54478C',
    cloudTint: '#8F94D0',
    grassTint: '#214637',
    ambient: 0.22,
    sunX: 0.95,
    sunY: 0.98,
    sunIntensity: 0.0,
    moonX: 0.30,
    moonY: 0.25,
    moonIntensity: 0.95,
    starAlpha: 0.95,
    heroFg: '#FFF6E5',
    hasScrim: true,
  },
};

export const SKY_PRESETS_LIST: SkyPreset[] = ['dawn', 'day', 'golden', 'dusk', 'night'];

// ============================================================================
// 3. Sky Interpolation & Journey Progress
// ============================================================================

/**
 * Linearly interpolates two SkyState instances in OKLab and numeric space.
 */
export function interpolateSkyStates(a: SkyState, b: SkyState, t: number): SkyState {
  const clampT = Math.max(0, Math.min(1, t));
  const lerpNum = (v1: number, v2: number) => v1 + (v2 - v1) * clampT;

  return {
    id: `${a.id}->${b.id}@${Math.round(clampT * 100)}`,
    name: `${a.name} to ${b.name}`,
    top: interpolateOklab(a.top, b.top, clampT),
    mid: interpolateOklab(a.mid, b.mid, clampT),
    horizon: interpolateOklab(a.horizon, b.horizon, clampT),
    cloudTint: interpolateOklab(a.cloudTint, b.cloudTint, clampT),
    grassTint: interpolateOklab(a.grassTint, b.grassTint, clampT),
    ambient: lerpNum(a.ambient, b.ambient),
    sunX: lerpNum(a.sunX, b.sunX),
    sunY: lerpNum(a.sunY, b.sunY),
    sunIntensity: lerpNum(a.sunIntensity, b.sunIntensity),
    moonX: lerpNum(a.moonX, b.moonX),
    moonY: lerpNum(a.moonY, b.moonY),
    moonIntensity: lerpNum(a.moonIntensity, b.moonIntensity),
    starAlpha: lerpNum(a.starAlpha, b.starAlpha),
    // Text color flips at midpoint or whichever has higher contrast
    heroFg: clampT < 0.5 ? a.heroFg : b.heroFg,
    hasScrim: clampT < 0.5 ? a.hasScrim : b.hasScrim,
  };
}

/**
 * Journey mode: maps continuous page scroll progress (0.0 to 1.0) to sky progression:
 * 0.00 - 0.25: Day (Hero starts bright)
 * 0.25 - 0.55: Day -> Golden (Garden & Path)
 * 0.55 - 0.80: Golden -> Dusk (Postcards & Stack)
 * 0.80 - 1.00: Dusk -> Night (FAQ & Footer)
 */
export function getJourneySky(scrollProgress: number): SkyState {
  const p = Math.max(0, Math.min(1, scrollProgress));

  if (p <= 0.20) {
    return SKY_KEYFRAMES.day;
  } else if (p <= 0.55) {
    const t = (p - 0.20) / (0.55 - 0.20);
    return interpolateSkyStates(SKY_KEYFRAMES.day, SKY_KEYFRAMES.golden, t);
  } else if (p <= 0.80) {
    const t = (p - 0.55) / (0.80 - 0.55);
    return interpolateSkyStates(SKY_KEYFRAMES.golden, SKY_KEYFRAMES.dusk, t);
  } else {
    const t = (p - 0.80) / (1.00 - 0.80);
    return interpolateSkyStates(SKY_KEYFRAMES.dusk, SKY_KEYFRAMES.night, t);
  }
}

/**
 * Live mode: maps 24-hour local clock time to cyclic 5-state day/night cycle.
 */
export function getLiveSky(date: Date = new Date()): SkyState {
  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

  // 05:00 - 07:30: Night -> Dawn
  // 07:30 - 11:30: Dawn -> Day
  // 11:30 - 16:30: Day
  // 16:30 - 18:45: Day -> Golden
  // 18:45 - 20:30: Golden -> Dusk
  // 20:30 - 22:30: Dusk -> Night
  // 22:30 - 05:00: Night
  if (hours >= 5.0 && hours < 7.5) {
    const t = (hours - 5.0) / (7.5 - 5.0);
    return interpolateSkyStates(SKY_KEYFRAMES.night, SKY_KEYFRAMES.dawn, t);
  } else if (hours >= 7.5 && hours < 11.5) {
    const t = (hours - 7.5) / (11.5 - 7.5);
    return interpolateSkyStates(SKY_KEYFRAMES.dawn, SKY_KEYFRAMES.day, t);
  } else if (hours >= 11.5 && hours < 16.5) {
    return SKY_KEYFRAMES.day;
  } else if (hours >= 16.5 && hours < 18.75) {
    const t = (hours - 16.5) / (18.75 - 16.5);
    return interpolateSkyStates(SKY_KEYFRAMES.day, SKY_KEYFRAMES.golden, t);
  } else if (hours >= 18.75 && hours < 20.5) {
    const t = (hours - 18.75) / (20.5 - 18.75);
    return interpolateSkyStates(SKY_KEYFRAMES.golden, SKY_KEYFRAMES.dusk, t);
  } else if (hours >= 20.5 && hours < 22.5) {
    const t = (hours - 20.5) / (22.5 - 20.5);
    return interpolateSkyStates(SKY_KEYFRAMES.dusk, SKY_KEYFRAMES.night, t);
  } else {
    return SKY_KEYFRAMES.night;
  }
}
