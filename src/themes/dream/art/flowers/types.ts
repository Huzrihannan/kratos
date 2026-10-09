/**
 * Krat.OS Dream Theme — Flower Kit Types (flowers/types.ts)
 */

export type FlowerState = 'seed' | 'sprout' | 'bloom';

export interface FlowerProps {
  state?: FlowerState;
  size?: number;
  className?: string;
  interactive?: boolean;
  windStrength?: number;
  onBloomComplete?: () => void;
  onClick?: () => void;
}

export interface DandelionProps extends FlowerProps {
  /** If true, renders the wispy seed-puff globe instead of yellow petal head */
  isPuff?: boolean;
  /** Trigger seed puff dispersion animation */
  dispersed?: boolean;
}

export interface CloverProps extends FlowerProps {
  /** Easter egg: renders 4-leaf clover instead of 3-leaf */
  isLucky?: boolean;
}
