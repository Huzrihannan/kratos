/**
 * scripts/generate-clouds.mjs
 *
 * Generates 8 distinct soft procedural cloud alpha-mask sprites in WebP format
 * for Layer 1 of the Krat.OS Dream Theme Living Sky.
 *
 * Each sprite is under 25 KB, uses white pixel values with a soft billowing alpha channel,
 * and is styled via CSS mask-image and background-color: var(--cloud-tint).
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/textures/clouds');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WIDTH = 512;
const HEIGHT = 256;

// Pseudo-random noise functions
function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// 8 distinct cloud archetype recipes (puffs: [relX, relY, radius, density])
const CLOUD_RECIPES = [
  // 1: Wide classic cumulus with towering puffs
  {
    name: 'cloud-1.webp',
    seed: 101,
    puffs: [
      [0.25, 0.65, 0.22, 1.0],
      [0.40, 0.50, 0.28, 1.0],
      [0.55, 0.45, 0.32, 1.0],
      [0.72, 0.58, 0.24, 1.0],
      [0.85, 0.70, 0.16, 0.9],
      [0.15, 0.72, 0.14, 0.8],
      [0.48, 0.68, 0.26, 1.0],
    ],
  },
  // 2: Soft elongated stratus cloud
  {
    name: 'cloud-2.webp',
    seed: 202,
    puffs: [
      [0.20, 0.65, 0.18, 0.85],
      [0.35, 0.60, 0.22, 0.95],
      [0.50, 0.58, 0.24, 1.0],
      [0.65, 0.62, 0.22, 0.95],
      [0.80, 0.68, 0.18, 0.85],
      [0.92, 0.72, 0.12, 0.7],
      [0.08, 0.72, 0.12, 0.7],
    ],
  },
  // 3: Wispy high cirrus tuft
  {
    name: 'cloud-3.webp',
    seed: 303,
    puffs: [
      [0.28, 0.55, 0.15, 0.75],
      [0.42, 0.48, 0.18, 0.85],
      [0.58, 0.52, 0.20, 0.90],
      [0.75, 0.60, 0.16, 0.75],
      [0.88, 0.66, 0.11, 0.6],
    ],
  },
  // 4: Compact fluffy cotton-ball cloud
  {
    name: 'cloud-4.webp',
    seed: 404,
    puffs: [
      [0.35, 0.62, 0.24, 1.0],
      [0.50, 0.46, 0.30, 1.0],
      [0.65, 0.60, 0.25, 1.0],
      [0.48, 0.68, 0.26, 1.0],
      [0.22, 0.70, 0.16, 0.8],
      [0.78, 0.68, 0.17, 0.85],
    ],
  },
  // 5: Asymmetric billow drifting left
  {
    name: 'cloud-5.webp',
    seed: 505,
    puffs: [
      [0.30, 0.42, 0.32, 1.0],
      [0.48, 0.52, 0.28, 1.0],
      [0.18, 0.58, 0.22, 0.9],
      [0.65, 0.65, 0.22, 0.85],
      [0.82, 0.72, 0.16, 0.75],
      [0.38, 0.68, 0.25, 1.0],
    ],
  },
  // 6: Dual-peak towering cloud
  {
    name: 'cloud-6.webp',
    seed: 606,
    puffs: [
      [0.32, 0.46, 0.28, 1.0],
      [0.68, 0.44, 0.28, 1.0],
      [0.50, 0.56, 0.24, 0.95],
      [0.18, 0.65, 0.18, 0.85],
      [0.82, 0.65, 0.18, 0.85],
      [0.50, 0.68, 0.25, 1.0],
    ],
  },
  // 7: Low sweeping horizon cloud
  {
    name: 'cloud-7.webp',
    seed: 707,
    puffs: [
      [0.15, 0.68, 0.18, 0.8],
      [0.32, 0.62, 0.22, 0.9],
      [0.50, 0.58, 0.26, 1.0],
      [0.70, 0.60, 0.24, 0.95],
      [0.88, 0.66, 0.18, 0.85],
      [0.42, 0.68, 0.24, 0.95],
      [0.60, 0.68, 0.24, 0.95],
    ],
  },
  // 8: Delicate trailing cloud puff
  {
    name: 'cloud-8.webp',
    seed: 808,
    puffs: [
      [0.42, 0.55, 0.22, 0.95],
      [0.58, 0.50, 0.25, 1.0],
      [0.74, 0.58, 0.19, 0.85],
      [0.28, 0.64, 0.15, 0.75],
      [0.50, 0.66, 0.20, 0.9],
    ],
  },
];

async function generateCloudSprite(recipe) {
  const rand = pseudoRandom(recipe.seed);
  const buffer = Buffer.alloc(WIDTH * HEIGHT * 4); // RGBA

  // Micro-noise grid for soft organic edges
  const noiseGrid = [];
  for (let y = 0; y < HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(rand() * 0.15);
    }
    noiseGrid.push(row);
  }

  for (let y = 0; y < HEIGHT; y++) {
    const ny = y / HEIGHT;
    for (let x = 0; x < WIDTH; x++) {
      const nx = x / WIDTH;
      const idx = (y * WIDTH + x) * 4;

      // Accumulate puff density (metaball potential)
      let density = 0;
      for (const [px, py, radius, weight] of recipe.puffs) {
        const dx = (nx - px) * (WIDTH / HEIGHT); // aspect ratio corrected
        const dy = ny - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          // Smooth cosine falloff
          const t = dist / radius;
          const falloff = 0.5 * (1 + Math.cos(Math.PI * t));
          density += falloff * weight;
        }
      }

      // Add edge noise jitter
      const jitter = noiseGrid[y][x];
      const effectiveDensity = Math.max(0, density + jitter - 0.05);

      // Smooth step to alpha (soft fluffy boundary)
      let alpha = 0;
      if (effectiveDensity > 0.15) {
        const t = Math.min(1, (effectiveDensity - 0.15) / 0.45);
        // Smoothstep curve: 3t^2 - 2t^3
        alpha = t * t * (3 - 2 * t);
      }

      // Flatten bottom slightly for painterly ground horizon feel
      if (ny > 0.82) {
        const bottomFade = Math.max(0, 1 - (ny - 0.82) / 0.15);
        alpha *= bottomFade;
      }

      const alphaByte = Math.round(Math.min(1, Math.max(0, alpha)) * 255);

      // Pixel is solid white, shaped by alpha
      buffer[idx + 0] = 255; // R
      buffer[idx + 1] = 255; // G
      buffer[idx + 2] = 255; // B
      buffer[idx + 3] = alphaByte; // A
    }
  }

  const outPath = path.join(OUTPUT_DIR, recipe.name);

  await sharp(buffer, {
    raw: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
    },
  })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  const kb = (stats.size / 1024).toFixed(2);
  console.log(`[GENERATED] ${recipe.name}: ${kb} KB (Target: < 25 KB)`);
}

async function main() {
  console.log('Generating 8 soft cloud alpha-mask sprites...');
  for (const recipe of CLOUD_RECIPES) {
    await generateCloudSprite(recipe);
  }
  console.log('All 8 cloud sprites generated successfully in public/textures/clouds/!');
}

main().catch((err) => {
  console.error('Error generating clouds:', err);
  process.exit(1);
});
