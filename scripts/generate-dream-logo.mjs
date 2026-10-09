import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';

const ROOT = process.cwd();
const fontsDir = path.join(ROOT, 'scripts', 'fonts');
const dreamDir = path.join(ROOT, 'public', 'brand', 'dream');

if (!fs.existsSync(dreamDir)) {
  fs.mkdirSync(dreamDir, { recursive: true });
}

// 1. Load fonts
const bufFraunces = fs.readFileSync(path.join(fontsDir, 'Fraunces-Variable.ttf'));
const fontFraunces = opentype.parse(
  bufFraunces.buffer.slice(bufFraunces.byteOffset, bufFraunces.byteOffset + bufFraunces.byteLength)
);

const bufFigtree = fs.readFileSync(path.join(fontsDir, 'Figtree-Variable.ttf'));
const fontFigtree = opentype.parse(
  bufFigtree.buffer.slice(bufFigtree.byteOffset, bufFigtree.byteOffset + bufFigtree.byteLength)
);

// 2. Metrics & Layout
// Baseline at y = 68
const BASELINE = 68;
const WORDMARK_SIZE = 64;
const frauncesOpts = { variation: { opsz: 96, wght: 620, SOFT: 100, WONK: 0 } };

// "Krat" starting at x = 44
const kratStartX = 44;
const kratPath = fontFraunces.getPath('Krat', kratStartX, BASELINE, WORDMARK_SIZE, frauncesOpts);
const kratBox = kratPath.getBoundingBox();
const kratRightEdge = kratBox.x2; // ~167.4

// Poppy center: ample breathing room after 't' (~19px)
// Giving 18.6px gap between 't' right edge and poppy center
const poppyCenterX = 186;
const poppyCenterY = 48; // aligned with lowercase x-height center

// "OS" starting at x = 205 (giving balanced 19-20px gap from poppy center to 'O')
const osStartX = 205;
const osPath = fontFraunces.getPath('OS', osStartX, BASELINE, WORDMARK_SIZE, frauncesOpts);
const osBox = osPath.getBoundingBox();
const osRightEdge = osBox.x2; // ~286

// Tagline: "Software solutions" in Figtree (wght: 560)
// Cap height ~19% of K cap height (K cap height is 44.8px, target cap height ~8.5px)
const TAGLINE_SIZE = 12.2;
const TAGLINE_BASELINE = 86;
const figtreeOpts = { variation: { wght: 560 } };
const tracking = 1.4; // px between characters for wide airy tracking

function getTrackedPath(font, text, startX, y, fontSize, opts, letterSpacing) {
  let curX = startX;
  const compositeCommands = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const p = font.getPath(char, curX, y, fontSize, opts);
    compositeCommands.push(...p.commands);
    const adv = font.getAdvanceWidth(char, fontSize, opts);
    curX += adv + letterSpacing;
  }
  const result = new opentype.Path();
  result.commands = compositeCommands;
  return { path: result, endX: curX - letterSpacing };
}

const { path: taglinePath, endX: taglineEndX } = getTrackedPath(
  fontFigtree,
  'Software solutions',
  kratStartX,
  TAGLINE_BASELINE,
  TAGLINE_SIZE,
  figtreeOpts,
  tracking
);

const VIEW_WIDTH = Math.ceil(Math.max(osRightEdge, taglineEndX) + 16); // ~302
const VIEW_HEIGHT = 96;

console.log(`Layout calculated: width=${VIEW_WIDTH}, height=${VIEW_HEIGHT}`);
console.log(`Krat: ${kratStartX}..${kratRightEdge.toFixed(1)}, Poppy center: ${poppyCenterX}, OS: ${osStartX}..${osRightEdge.toFixed(1)}`);
console.log(`Tagline end: ${taglineEndX.toFixed(1)}`);

// 3. Botanical vector paths
// A. Sprout (The Idea: standing on baseline at x = 22, y = 68, curving up to y = 14)
function renderSprout(palette) {
  return `
    <g id="dream-sprout">
      <!-- Main Stem: drawn with stroke for organic GSAP drawSVG unfurl -->
      <path
        id="stem"
        d="M 21.5 68 C 21.5 54, 19.5 40, 21.5 28 C 22.2 23.5, 23.5 19, 23.8 15"
        fill="none"
        stroke="${palette.stem}"
        stroke-width="3.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Left Leaf: emerges at y=46, unfurls outward left -->
      <path
        id="leaf-l"
        d="M 20.5 47 C 14.5 45.5, 10 39.5, 9.2 36 C 8.5 39.8, 12.5 48.5, 20.8 50.2 Z"
        fill="${palette.leaf}"
        style="transform-origin: 20.5px 47px;"
      />
      <!-- Right Leaf: emerges at y=33, unfurls outward right -->
      <path
        id="leaf-r"
        d="M 22.2 34 C 27.5 31.5, 31.8 25.5, 33 22 C 32.5 26.2, 28.5 34.5, 22.8 37 Z"
        fill="${palette.leaf}"
        style="transform-origin: 22.2px 34px;"
      />
      <!-- Bud Base / Calyx: sits at tip of stem -->
      <path
        id="bud"
        d="M 21.2 17.5 C 19.8 15, 20.5 10.5, 23.8 8.5 C 27 10.5, 27.8 15, 26.4 17.5 C 25 19.5, 22.5 19.5, 21.2 17.5 Z"
        fill="${palette.bud}"
        style="transform-origin: 23.8px 14px;"
      />
      <!-- Bud Tip: glowing brand red accent -->
      <path
        id="bud-tip"
        d="M 22.6 11 C 22 9.5, 23.5 6.8, 23.8 6.2 C 24.2 6.8, 25.6 9.5, 25 11 C 24.5 12, 23.1 12, 22.6 11 Z"
        fill="#FD142B"
        style="transform-origin: 23.8px 9px;"
      />
    </g>
  `;
}

// B. Poppy (The Finished Software: centered at x = 219, flower center at y = 48)
function renderPoppy(palette, cx = poppyCenterX, cy = poppyCenterY) {
  // Stamens: ~14 radiating micro-pins around centre
  const stamenCount = 14;
  const stamenRadius = 5.6;
  const stamensSvg = [];
  for (let i = 0; i < stamenCount; i++) {
    const angle = (i * 2 * Math.PI) / stamenCount;
    const sx = (cx + Math.cos(angle) * stamenRadius).toFixed(2);
    const sy = (cy + Math.sin(angle) * stamenRadius).toFixed(2);
    const dotR = 0.75;
    stamensSvg.push(`<circle cx="${sx}" cy="${sy}" r="${dotR}" fill="#FFD47A" />`);
  }

  return `
    <g id="dream-poppy">
      <!-- Poppy Stem: short organic stem from baseline -->
      <path
        id="poppy-stem"
        d="M ${cx} 68 C ${cx - 0.5} 61, ${cx + 0.5} 55, ${cx} 48"
        fill="none"
        stroke="${palette.stem}"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <!-- Baseline Leaves: small ground foliage -->
      <path
        id="poppy-leaf-l"
        d="M ${cx - 1} 67 C ${cx - 6} 66, ${cx - 10} 62.5, ${cx - 11.5} 60.5 C ${cx - 10.5} 64, ${cx - 6} 68, ${cx - 0.5} 68 Z"
        fill="${palette.leaf}"
        style="transform-origin: ${cx - 1}px 67px;"
      />
      <path
        id="poppy-leaf-r"
        d="M ${cx + 1} 66.5 C ${cx + 5.5} 65.5, ${cx + 9.5} 61.5, ${cx + 11} 59.5 C ${cx + 10} 63.5, ${cx + 6} 67.5, ${cx + 0.5} 67.5 Z"
        fill="${palette.leaf}"
        style="transform-origin: ${cx + 1}px 66.5px;"
      />
      <!-- Poppy Flower Head (centered on cx, cy) -->
      <g id="poppy-head" style="transform-origin: ${cx}px ${cy}px;">
        <!-- Back Petals: deep rich crimson depth layer (#A80A1C) -->
        <g id="petals-back">
          <!-- Top back petal -->
          <path d="M ${cx - 8.5} ${cy - 2} C ${cx - 10} ${cy - 10}, ${cx + 10} ${cy - 10}, ${cx + 8.5} ${cy - 2} C ${cx + 3} ${cy + 1}, ${cx - 3} ${cy + 1}, ${cx - 8.5} ${cy - 2} Z" fill="#A80A1C" />
          <!-- Left back petal -->
          <path d="M ${cx - 2} ${cy - 8} C ${cx - 11} ${cy - 8}, ${cx - 11} ${cy + 6}, ${cx - 2} ${cy + 7} C ${cx - 1} ${cy + 2}, ${cx - 1} ${cy - 3}, ${cx - 2} ${cy - 8} Z" fill="#990818" />
          <!-- Right back petal -->
          <path d="M ${cx + 2} ${cy - 8} C ${cx + 11} ${cy - 8}, ${cx + 11} ${cy + 6}, ${cx + 2} ${cy + 7} C ${cx + 1} ${cy + 2}, ${cx + 1} ${cy - 3}, ${cx + 2} ${cy - 8} Z" fill="#990818" />
          <!-- Bottom back petal -->
          <path d="M ${cx - 7.5} ${cy + 2} C ${cx - 9} ${cy + 9.5}, ${cx + 9} ${cy + 9.5}, ${cx + 7.5} ${cy + 2} C ${cx + 3} ${cy - 1}, ${cx - 3} ${cy - 1}, ${cx - 7.5} ${cy + 2} Z" fill="#A80A1C" />
        </g>
        <!-- Front Petals: radiant brand red (#FD142B) with organic ruffled contour -->
        <g id="petals-front">
          <!-- Main top petal -->
          <path
            d="M ${cx - 7} ${cy - 1} C ${cx - 8} ${cy - 8.5}, ${cx - 3} ${cy - 10.5}, ${cx} ${cy - 10.8} C ${cx + 3} ${cy - 10.5}, ${cx + 8} ${cy - 8.5}, ${cx + 7} ${cy - 1} C ${cx + 3.5} ${cy + 1.5}, ${cx - 3.5} ${cy + 1.5}, ${cx - 7} ${cy - 1} Z"
            fill="#FD142B"
          />
          <!-- Highlight curve on top petal -->
          <path
            d="M ${cx - 4.5} ${cy - 7} C ${cx - 2} ${cy - 8.8}, ${cx + 2} ${cy - 8.8}, ${cx + 4.5} ${cy - 7}"
            stroke="#FF4A5C"
            stroke-width="0.9"
            stroke-linecap="round"
            fill="none"
            opacity="0.75"
          />
          <!-- Main bottom petal -->
          <path
            d="M ${cx - 8} ${cy + 1} C ${cx - 9} ${cy + 8}, ${cx - 3} ${cy + 11}, ${cx} ${cy + 11.2} C ${cx + 3} ${cy + 11}, ${cx + 9} ${cy + 8}, ${cx + 8} ${cy + 1} C ${cx + 4} ${cy - 1}, ${cx - 4} ${cy - 1}, ${cx - 8} ${cy + 1} Z"
            fill="#FD142B"
          />
          <!-- Highlight curve on bottom petal -->
          <path
            d="M ${cx - 5} ${cy + 8} C ${cx - 2} ${cy + 9.6}, ${cx + 2} ${cy + 9.6}, ${cx + 5} ${cy + 8}"
            stroke="#FF4A5C"
            stroke-width="0.9"
            stroke-linecap="round"
            fill="none"
            opacity="0.75"
          />
          <!-- Left overlapping petal -->
          <path
            d="M ${cx - 1} ${cy - 7} C ${cx - 8} ${cy - 7.5}, ${cx - 11} ${cy - 2}, ${cx - 11} ${cy + 2} C ${cx - 11} ${cy + 6}, ${cx - 7} ${cy + 7.5}, ${cx - 1} ${cy + 6.5} C ${cx - 2} ${cy + 1}, ${cx - 2} ${cy - 2}, ${cx - 1} ${cy - 7} Z"
            fill="#E01126"
          />
          <!-- Right overlapping petal -->
          <path
            d="M ${cx + 1} ${cy - 7} C ${cx + 8} ${cy - 7.5}, ${cx + 11} ${cy - 2}, ${cx + 11} ${cy + 2} C ${cx + 11} ${cy + 6}, ${cx + 7} ${cy + 7.5}, ${cx + 1} ${cy + 6.5} C ${cx + 2} ${cy + 1}, ${cx + 2} ${cy - 2}, ${cx + 1} ${cy - 7} Z"
            fill="#E01126"
          />
        </g>
        <!-- Center core: dark plum button (#2A1B2E) -->
        <circle id="centre" cx="${cx}" cy="${cy}" r="3.4" fill="#2A1B2E" />
        <!-- Subtle inner seed star/creases -->
        <path
          d="M ${cx - 1.8} ${cy} L ${cx + 1.8} ${cy} M ${cx} ${cy - 1.8} L ${cx} ${cy + 1.8} M ${cx - 1.2} ${cy - 1.2} L ${cx + 1.2} ${cy + 1.2} M ${cx - 1.2} ${cy + 1.2} L ${cx + 1.2} ${cy - 1.2}"
          stroke="#422C47"
          stroke-width="0.5"
          stroke-linecap="round"
        />
        <!-- Stamens: 14 delicate golden pins -->
        <g id="stamens">
          ${stamensSvg.join('\n          ')}
        </g>
      </g>
    </g>
  `;
}

// 4. Color palettes
const dayPalette = {
  text: '#2B2A52',      // ink
  tagline: '#55537A',   // ink-soft
  stem: '#5E9B6A',
  leaf: '#7BB77F',
  bud: '#3F7D55',
};

const nightPalette = {
  text: '#FFF6E5',      // cream
  tagline: '#CFCBEA',   // cream-soft
  stem: '#74B882',
  leaf: '#93CF99',
  bud: '#4C9566',
};

// 5. Generate Full Lockups (Day & Night)
function generateFullLogo(palette, name) {
  const kratD = kratPath.toPathData(2);
  const osD = osPath.toPathData(2);
  const taglineD = taglinePath.toPathData(2);

  return `<!-- Krat.OS Dream Theme Logo (${name}) -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}"
  width="${VIEW_WIDTH}"
  height="${VIEW_HEIGHT}"
  role="img"
  aria-label="Krat.OS — Software solutions"
>
  ${renderSprout(palette)}

  <!-- Wordmark "Krat.OS" in Fraunces Soft 100 -->
  <g id="dream-wordmark" fill="${palette.text}">
    <path id="wordmark-krat" d="${kratD}" />
    <path id="wordmark-os" d="${osD}" />
  </g>

  ${renderPoppy(palette)}

  <!-- Tagline "Software solutions" in Figtree tracked -->
  <g id="dream-tagline" fill="${palette.tagline}">
    <path d="${taglineD}" />
  </g>
</svg>
`;
}

// 6. Generate Mark Only (Sprout + Poppy on Baseline) for 48-120px range
// Sprout at x=22, Poppy at x=78, width = 100, height = 76
function generateMark(palette, name) {
  // Translate poppy to x = 68, sprout at x = 22
  const markWidth = 92;
  const markHeight = 74;
  const baseline = 68;

  return `<!-- Krat.OS Dream Theme Mark (${name}) -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${markWidth} ${markHeight}"
  width="${markWidth}"
  height="${markHeight}"
  role="img"
  aria-label="Krat.OS"
>
  ${renderSprout(palette)}
  ${renderPoppy(palette, 64, 48)}
</svg>
`;
}

// 7. Generate Mark Simple (flat red rounded bar + circle dot - original brand mark)
function generateMarkSimple() {
  return `<!-- Krat.OS Brand Mark Simple (Original Bar + Dot) -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 64 64"
  width="64"
  height="64"
  role="img"
  aria-label="Krat.OS"
>
  <!-- Flat red rounded bar / caret -->
  <rect x="18" y="10" width="7" height="44" rx="2" fill="#FD142B" />
  <!-- Flat red circle dot -->
  <circle cx="42" cy="48" r="5.5" fill="#FD142B" />
</svg>
`;
}

// 8. Generate Favicon and App Icon
function generateFavicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect x="8" y="5" width="4" height="22" rx="1.5" fill="#FD142B" />
  <circle cx="21" cy="24" r="3" fill="#FD142B" />
</svg>
`;
}

function generateAppIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <rect width="192" height="192" rx="42" fill="#FFFAF0" />
  <rect x="54" y="38" width="22" height="116" rx="6" fill="#FD142B" />
  <circle cx="126" cy="138" r="16" fill="#FD142B" />
</svg>
`;
}

// Write files
fs.writeFileSync(path.join(dreamDir, 'logo-dream-day.svg'), generateFullLogo(dayPalette, 'Day'));
fs.writeFileSync(path.join(dreamDir, 'logo-dream-night.svg'), generateFullLogo(nightPalette, 'Night'));
fs.writeFileSync(path.join(dreamDir, 'mark-dream.svg'), generateMark(dayPalette, 'Day'));
fs.writeFileSync(path.join(dreamDir, 'mark-dream-night.svg'), generateMark(nightPalette, 'Night'));
fs.writeFileSync(path.join(dreamDir, 'mark-simple.svg'), generateMarkSimple());
fs.writeFileSync(path.join(dreamDir, 'favicon-dream.svg'), generateFavicon());
fs.writeFileSync(path.join(dreamDir, 'app-icon-dream.svg'), generateAppIcon());

console.log('✅ All Dream logo SVG assets successfully written to public/brand/dream/:');
console.log('  - logo-dream-day.svg');
console.log('  - logo-dream-night.svg');
console.log('  - mark-dream.svg');
console.log('  - mark-dream-night.svg');
console.log('  - mark-simple.svg');
console.log('  - favicon-dream.svg');
console.log('  - app-icon-dream.svg');
