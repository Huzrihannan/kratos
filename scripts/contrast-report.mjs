/**
 * Automated WCAG 2.1 Contrast Ratio Verification Report
 * Evaluates all text and UI color pairs across Dark, Light, and Dream themes.
 * Fails the process (exit 1) if any text pair drops below WCAG AA thresholds.
 */

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  if (clean.length === 6) {
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  } else if (clean.length === 3) {
    const r = ((num >> 8) & 15) * 17;
    const g = ((num >> 4) & 15) * 17;
    const b = (num & 15) * 17;
    return [r, g, b];
  }
  throw new Error(`Invalid hex color: ${hex}`);
}

function relativeLuminance([r, g, b]) {
  const sRGB = [r / 255, g / 255, b / 255].map((val) => {
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

export function contrastRatio(hex1, hex2) {
  const lum1 = relativeLuminance(hexToRgb(hex1));
  const lum2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}



const COLOR_PAIRS = [
  // --- DARK THEME ---
  {
    theme: "dark",
    fgName: "fg",
    fgHex: "#EFE3CF",
    bgName: "bg",
    bgHex: "#212121",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "dark",
    fgName: "fg",
    fgHex: "#EFE3CF",
    bgName: "surface",
    bgHex: "#2B2B2B",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "dark",
    fgName: "fg-muted",
    fgHex: "#A8A294",
    bgName: "bg",
    bgHex: "#212121",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "dark",
    fgName: "red-text",
    fgHex: "#FF4A5C",
    bgName: "bg",
    bgHex: "#212121",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "dark",
    fgName: "charcoal (btn text)",
    fgHex: "#212121",
    bgName: "cream (btn fill)",
    bgHex: "#EFE3CF",
    minRatio: 4.5,
    type: "body",
  },

  // --- LIGHT THEME ---
  {
    theme: "light",
    fgName: "fg",
    fgHex: "#292926",
    bgName: "bg",
    bgHex: "#F6EFDD",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "light",
    fgName: "fg",
    fgHex: "#292926",
    bgName: "surface",
    bgHex: "#EBE3CD",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "light",
    fgName: "fg-muted",
    fgHex: "#6B665A",
    bgName: "bg",
    bgHex: "#F6EFDD",
    minRatio: 4.5,
    type: "body",
  },
  {
    theme: "light",
    fgName: "red-text",
    fgHex: "#C8102E",
    bgName: "bg",
    bgHex: "#F6EFDD",
    minRatio: 4.5,
    type: "body",
  },

  // --- DREAM THEME ---
  {
    theme: "dream",
    fgName: "ink",
    fgHex: "#2B2A52",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 4.5,
    type: "body",
    notes: "Body text & headings",
  },
  {
    theme: "dream",
    fgName: "ink-soft",
    fgHex: "#55537A",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 4.5,
    type: "body",
    notes: "Secondary text on day paper",
  },
  {
    theme: "dream",
    fgName: "link",
    fgHex: "#3B3AA0",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 4.5,
    type: "body",
    notes: "Interactive links",
  },
  {
    theme: "dream",
    fgName: "cream",
    fgHex: "#FFF6E5",
    bgName: "night-paper",
    bgHex: "#1B1E4B",
    minRatio: 4.5,
    type: "body",
    notes: "Text on night paper",
  },
  {
    theme: "dream",
    fgName: "cream-soft",
    fgHex: "#CFCBEA",
    bgName: "night-paper",
    bgHex: "#1B1E4B",
    minRatio: 4.5,
    type: "body",
    notes: "Secondary text on night paper",
  },
  {
    theme: "dream",
    fgName: "poppy-text",
    fgHex: "#C8102E",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 4.5,
    type: "body",
    notes: "Small red text on paper",
  },
  {
    theme: "dream",
    fgName: "grass-deep",
    fgHex: "#2A6B48",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 4.5,
    type: "body",
    notes: "Meadow deep accents",
  },
  {
    theme: "dream",
    fgName: "poppy",
    fgHex: "#FD142B",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 3.0,
    type: "large",
    notes: "Brand poppy: 24px+ display and shapes only",
  },
  {
    theme: "dream",
    fgName: "sage (decoration)",
    fgHex: "#5E9B6A",
    bgName: "paper",
    bgHex: "#FFFAF0",
    minRatio: 3.0,
    type: "decorative",
    notes: "Stems and decorative lines only (exempt from text AA)",
  },

  // --- SKY CONTRAST (Living Sky Headline Keyframes) ---
  {
    theme: "dream",
    fgName: "ink (headline)",
    fgHex: "#2B2A52",
    bgName: "dawn sky top",
    bgHex: "#8FA6E0",
    minRatio: 3.0,
    type: "large",
    notes: "Display headlines on Dawn sky",
  },
  {
    theme: "dream",
    fgName: "ink (headline)",
    fgHex: "#2B2A52",
    bgName: "day sky top",
    bgHex: "#6DB6F0",
    minRatio: 3.0,
    type: "large",
    notes: "Display headlines on Day sky",
  },
  {
    theme: "dream",
    fgName: "ink (headline)",
    fgHex: "#2B2A52",
    bgName: "golden sky top",
    bgHex: "#7FA6E6",
    minRatio: 3.0,
    type: "large",
    notes: "Display headlines on Golden sky",
  },
  {
    theme: "dream",
    fgName: "cream (headline)",
    fgHex: "#FFF6E5",
    bgName: "dusk sky top",
    bgHex: "#2C3868",
    minRatio: 3.0,
    type: "large",
    notes: "Display headlines on Dusk sky",
  },
  {
    theme: "dream",
    fgName: "cream (headline)",
    fgHex: "#FFF6E5",
    bgName: "night sky top",
    bgHex: "#12132D",
    minRatio: 3.0,
    type: "large",
    notes: "Display headlines on Night sky",
  },
];

async function main() {
  console.log("=== WCAG 2.1 CONTRAST RATIO AUDIT (Dark, Light, Dream) ===\n");

  let failures = 0;
  const resultsByTheme = { dark: [], light: [], dream: [] };

  for (const pair of COLOR_PAIRS) {
    const ratio = contrastRatio(pair.fgHex, pair.bgHex);
    const passed = pair.type === "decorative" ? true : ratio >= pair.minRatio;

    if (!passed) failures++;

    resultsByTheme[pair.theme].push({
      ...pair,
      measured: ratio.toFixed(2),
      passed,
    });
  }

  for (const [theme, pairs] of Object.entries(resultsByTheme)) {
    console.log(`\n--- Theme: ${theme.toUpperCase()} ---`);
    console.table(
      pairs.map((p) => ({
        "FG Color": `${p.fgName} (${p.fgHex})`,
        "BG Surface": `${p.bgName} (${p.bgHex})`,
        Measured: `${p.measured}:1`,
        Required: `>= ${p.minRatio}:1`,
        Type: p.type,
        Status: p.passed ? "✅ PASS" : "❌ FAIL",
      }))
    );
  }

  if (failures > 0) {
    console.error(`\n❌ [CONTRAST AUDIT FAILED] ${failures} color pair(s) failed WCAG AA requirements.`);
    process.exit(1);
  } else {
    console.log("\n🎉 [CONTRAST AUDIT PASSED] All color pairs meet or exceed WCAG AA requirements!");
    process.exit(0);
  }
}

main();
