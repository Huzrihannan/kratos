'use client';

/**
 * Krat.OS Dream Theme — Full Sky Atmosphere Bundle (DreamSkyWorld.tsx)
 *
 * Combines Layer 0, Layer 1, Layer 2 (WebGL World Canvas), and celestial extras
 * into a single unified background world.
 * Dynamically code-split so zero Dream world code executes for Dark or Light visitors.
 */

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { Layer0Sky } from './Layer0Sky';
import { Layer1Clouds } from './Layer1Clouds';
import { WorldCanvas } from './WorldCanvas';
import { GodRays } from './extras/GodRays';
import { Birds } from './extras/Birds';
import { ShootingStar } from './extras/ShootingStar';
import { GrassMeadow } from './GrassMeadow';
import { MeadowLife } from '../art/life/MeadowLife';

export function DreamSkyWorld({ className = '' }: { className?: string }) {
  const { theme } = useTheme();

  if (theme !== 'dream') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-world="dream-living-sky"
      className={`fixed inset-0 pointer-events-none -z-50 select-none overflow-hidden ${className}`}
    >
      {/* Layer 0: CSS Gradient + SVG Hills */}
      <Layer0Sky />

      {/* Layer 2: WebGL World Canvas (half-res upscaled with ogl: sky + instanced grass blades) */}
      <WorldCanvas />

      {/* Layer 1: Parallax DOM Sprite Clouds with CSS mask-image */}
      <Layer1Clouds />

      {/* Layer 1: Meadow Grass Fallback (multi-layer SVG strips with organic CSS sway) */}
      <GrassMeadow />

      {/* Atmospheric Life: Petals, Pollen Motes, Butterflies, Bees, Fireflies */}
      <MeadowLife />

      {/* Extras: God Rays, Birds Flock, Shooting Star */}
      <GodRays />
      <Birds />
      <ShootingStar />
    </div>
  );
}
