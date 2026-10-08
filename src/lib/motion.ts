/**
 * Krat.OS Motion System
 * Barrel re-export and backward-compatibility bridge
 */

export * from "./motion";

// Legacy variants for components still undergoing redesign
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const springs = {
  bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 300, damping: 20 },
} as const;

export const physics = {
  tapSquish: 0.95,
  hoverScale: 1.02,
};
