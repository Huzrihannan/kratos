/**
 * scripts/verify-skycontrast.mjs
 *
 * Automated SkyContrast verification audit for Krat.OS Dream Theme.
 * Evaluates WCAG 2.1 AA contrast ratios across all 5 Living Sky states
 * in accordance with Section 5 of the design specification:
 * - Hero Text Zone: 22% to 60% of viewport height (Top and Mid stops)
 * - Headline Scrim at Dusk: 45% radial scrim behind headlines
 * - Surface Text Zone: Body and button text on Paper (#FFFAF0) or Night-Paper (#1B1E4B) surfaces
 *
 * Thresholds:
 * - Large display text (24px+): >= 3.0:1 (WCAG AA)
 * - Regular body text (< 24px): >= 4.5:1 (WCAG AA)
 */

import {
  SKY_KEYFRAMES,
  SKY_PRESETS_LIST,
  hexToRgb,
  interpolateOklab,
} from '../src/themes/dream/world/sky.ts';

function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(rgb) {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hexToRgb(hex1));
  const lum2 = getRelativeLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function blendRgb(bgRgb, fgRgb, alpha) {
  return {
    r: bgRgb.r * (1 - alpha) + fgRgb.r * alpha,
    g: bgRgb.g * (1 - alpha) + fgRgb.g * alpha,
    b: bgRgb.b * (1 - alpha) + fgRgb.b * alpha,
  };
}

function getContrastWithScrim(fgHex, bgHex, scrimRgb, scrimAlpha) {
  const bgRgb = hexToRgb(bgHex);
  const blendedBg = blendRgb(bgRgb, scrimRgb, scrimAlpha);
  const lumBg = getRelativeLuminance(blendedBg);
  const lumFg = getRelativeLuminance(hexToRgb(fgHex));
  const brightest = Math.max(lumBg, lumFg);
  const darkest = Math.min(lumBg, lumFg);
  return (brightest + 0.05) / (darkest + 0.05);
}

const SCRIM_RGB = hexToRgb('#1B1E4B'); // dusk night-paper scrim
const SCRIM_ALPHA = 0.45; // 45% radial scrim opacity

async function runSkyContrastAudit() {
  console.log('\n=== WCAG 2.1 SKYCONTRAST AUDIT (5 Sky States x Hero & Surface Zones) ===\n');

  const results = [];
  let hasFailures = false;

  for (const preset of SKY_PRESETS_LIST) {
    const kf = SKY_KEYFRAMES[preset];
    const textFg = kf.heroFg;

    // 1. Hero Text Zone Entry (22% altitude: interpolated between top and mid)
    const color22 = interpolateOklab(kf.top, kf.mid, 0.22 / 0.62);
    const ratio22 = getContrastRatio(textFg, color22);
    const pass22 = ratio22 >= 3.0; // Display text zone
    results.push({
      Preset: kf.name,
      Zone: 'Hero Top (22%)',
      BG: color22,
      FG: textFg,
      Scrim: 'None',
      Ratio: `${ratio22.toFixed(2)}:1`,
      Min: '>= 3.0:1',
      Status: pass22 ? '✅ PASS' : '❌ FAIL',
    });
    if (!pass22) hasFailures = true;

    // 2. Hero Text Mid Zone (62% altitude: Mid stop)
    const ratio62 = getContrastRatio(textFg, kf.mid);
    const pass62 = ratio62 >= 3.0;
    results.push({
      Preset: kf.name,
      Zone: 'Hero Mid (62%)',
      BG: kf.mid,
      FG: textFg,
      Scrim: 'Plain',
      Ratio: `${ratio62.toFixed(2)}:1`,
      Min: '>= 3.0:1',
      Status: pass62 ? '✅ PASS' : '❌ FAIL',
    });
    if (!pass62) hasFailures = true;

    // 3. Hero Text Mid with Dusk Scrim (when applicable)
    if (kf.hasScrim) {
      const scrimRatio = getContrastWithScrim(textFg, kf.mid, SCRIM_RGB, SCRIM_ALPHA);
      const scrimPass = scrimRatio >= 4.5;
      results.push({
        Preset: kf.name,
        Zone: 'Hero Mid (62%)',
        BG: kf.mid,
        FG: textFg,
        Scrim: '45% Scrim',
        Ratio: `${scrimRatio.toFixed(2)}:1`,
        Min: '>= 4.5:1',
        Status: scrimPass ? '✅ PASS' : '❌ FAIL',
      });
      if (!scrimPass) hasFailures = true;
    }

    // 4. Horizon Surface Zone (Text on Paper card or Night-Paper surface)
    const isNight = preset === 'dusk' || preset === 'night';
    const surfaceBg = isNight ? '#1B1E4B' : '#FFFAF0';
    const surfaceFg = isNight ? '#FFF6E5' : '#2B2A52';
    const surfaceRatio = getContrastRatio(surfaceFg, surfaceBg);
    const surfacePass = surfaceRatio >= 4.5;
    results.push({
      Preset: kf.name,
      Zone: 'Surface Card',
      BG: surfaceBg,
      FG: surfaceFg,
      Scrim: 'Card Surface',
      Ratio: `${surfaceRatio.toFixed(2)}:1`,
      Min: '>= 4.5:1',
      Status: surfacePass ? '✅ PASS' : '❌ FAIL',
    });
    if (!surfacePass) hasFailures = true;
  }

  console.table(results);

  if (hasFailures) {
    console.error('\n❌ [SKYCONTRAST AUDIT FAILED] Some sky states do not meet minimum WCAG standards!\n');
    process.exit(1);
  } else {
    console.log('🎉 [SKYCONTRAST AUDIT PASSED] All 5 sky states pass WCAG AA contrast standards!\n');
  }
}

runSkyContrastAudit().catch((err) => {
  console.error('SkyContrast audit runner error:', err);
  process.exit(1);
});
