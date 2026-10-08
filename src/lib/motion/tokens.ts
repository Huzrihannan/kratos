/**
 * Krat.OS v2 Motion Tokens
 * Mechanical precision, not bounce: no springs, no squish, no overshoot.
 */

export const DURATION = {
  micro: 0.15, // 150ms - icons, micro-ticks, toggle switches
  ui: 0.3, // 300ms - modals, dropdowns, window chrome, hover cards
  section: 0.7, // 700ms - section reveals, pipeline strokes, panel slides
  hero: 1.2, // 1200ms - hero sequence, master wipe
  typingCharMin: 28, // ms per character
  typingCharMax: 40, // ms per character
} as const;

export const EASING = {
  // Expo-out: sharp, decisive reveal settling smoothly without overshoot
  expoOut: [0.16, 1, 0.3, 1] as const,
  // Power4 in-out: mechanical wipes, curtain transitions
  power4InOut: [0.76, 0, 0.24, 1] as const,
  // Linear: typing sequences, progress bars, tickers
  linear: [0, 0, 1, 1] as const,
} as const;

export const GSAP_EASE = {
  expoOut: "power4.out",
  power4InOut: "power4.inOut",
  linear: "none",
} as const;

// Backward-compatibility spring objects mapped to mechanical transitions
export const springs = {
  soft: { duration: DURATION.ui, ease: EASING.expoOut },
  bouncy: { duration: DURATION.micro, ease: EASING.expoOut },
  snappy: { duration: DURATION.micro, ease: EASING.expoOut },
};

export const physics = {
  tapSquish: 1, // NO squish in v2 (scale remains 1, use 1px translateY instead)
  hoverScale: 1,
};
