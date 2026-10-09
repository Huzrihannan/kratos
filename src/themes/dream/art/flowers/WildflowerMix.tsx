'use client';

/**
 * Krat.OS Dream Theme — Wildflower Mix (WildflowerMix.tsx)
 *
 * Natural cluster assembling Poppy, Daisy, Lavender, and Clover
 * at staggered depths for meadow borders, hero horizons, and card footers.
 */

import React from 'react';
import { Poppy } from './Poppy';
import { Daisy } from './Daisy';
import { Lavender } from './Lavender';
import { Clover } from './Clover';
import { FlowerState } from './types';

export interface WildflowerMixProps {
  state?: FlowerState;
  className?: string;
  interactive?: boolean;
}

export function WildflowerMix({
  state = 'bloom',
  className = '',
  interactive = true,
}: WildflowerMixProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex items-end justify-center pointer-events-none select-none ${className}`}
    >
      {/* Background Layer: Lavender (tall) */}
      <div className="relative -mr-6 z-10 pointer-events-auto">
        <Lavender state={state} size={78} interactive={interactive} windStrength={1.2} />
      </div>

      {/* Mid Layer: Daisy */}
      <div className="relative -mr-4 z-20 pointer-events-auto">
        <Daisy state={state} size={70} interactive={interactive} windStrength={1.0} />
      </div>

      {/* Foreground Hero: Poppy */}
      <div className="relative z-30 pointer-events-auto">
        <Poppy state={state} size={88} interactive={interactive} windStrength={0.9} />
      </div>

      {/* Ground cluster: Clover */}
      <div className="relative -ml-5 z-20 pointer-events-auto">
        <Clover state={state} size={54} interactive={interactive} windStrength={0.7} />
      </div>
    </div>
  );
}
