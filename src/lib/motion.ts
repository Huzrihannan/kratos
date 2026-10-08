import { Variants } from "framer-motion";

/**
 * Standard spring presets for Kratos Software Solutions.
 * Designed for tactile, playful, and cohesive physical feel.
 */
export const springs = {
  /** Soft, organic settle for atmospheric elements, background blobs, and page entrances */
  soft: {
    type: "spring",
    stiffness: 220,
    damping: 26,
    mass: 1,
  } as const,

  /** Tactile overshoot with slight bounce for buttons, cards, chips, and modal reveals */
  bouncy: {
    type: "spring",
    stiffness: 420,
    damping: 20,
    mass: 0.8,
  } as const,

  /** Crisp, fast UI response for accordions, tabs, focus blooms, and sliders */
  snappy: {
    type: "spring",
    stiffness: 500,
    damping: 32,
    mass: 0.6,
  } as const,
};

export const durations = {
  fast: 0.18,
  normal: 0.35,
  slow: 0.65,
};

export const physics = {
  tapSquish: 0.96,
  hoverScale: 1.025,
  magneticStrength: 0.22,
};

/**
 * Shared motion variants respecting accessibility fallbacks
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.soft,
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.normal },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.bouncy,
  },
};

export const logoWobbleVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: [0, -3.5, 3.5, -2, 1, 0],
    scale: 1.05,
    transition: {
      rotate: { duration: 0.5, ease: "easeInOut" },
      scale: springs.bouncy,
    },
  },
};
