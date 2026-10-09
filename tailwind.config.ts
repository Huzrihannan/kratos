import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // v2 Semantic Tokens
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        red: {
          DEFAULT: "var(--red)",
          text: "var(--red-text)",
        },
        ok: "var(--ok)",

        // Legacy compatibility bridge (mapped to semantic tokens in tokens.css)
        cream: "var(--color-cream)",
        peach: "var(--color-peach)",
        orange: {
          DEFAULT: "var(--color-orange)",
          deep: "var(--color-orange-deep)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        cocoa: "var(--color-cocoa)",
        butter: "var(--color-butter)",

        // Dream Theme Specific Tokens
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        "night-paper": "var(--night-paper)",
        link: "var(--link)",
        poppy: {
          DEFAULT: "var(--poppy)",
          text: "var(--poppy-text)",
        },
        grass: {
          far: "var(--grass-far)",
          mid: "var(--grass-mid)",
          near: "var(--grass-near)",
          deep: "var(--grass-deep)",
        },
        sage: "var(--sage)",
        flower: {
          daisy: "var(--daisy-yolk)",
          sunflower: "var(--sunflower)",
          lavender: "var(--lavender)",
          cherry: "var(--cherry)",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
        card: "4px",
        bubble: "4px",
        pill: "4px",
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        float: "var(--shadow-float)",
        paper: "var(--shadow-paper)",
        floating: "var(--shadow-floating)",
        poppy: "var(--shadow-poppy)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Compatibility aliases for previous display / body references
        display: ["var(--font-mono)", "ui-monospace", "monospace"],
        body: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
        // Dream dedicated font families
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        figtree: ["var(--font-figtree)", "ui-sans-serif", "sans-serif"],
      },
      letterSpacing: {
        mono: "0.08em",
        headline: "-0.04em",
        tagline: "0.08em",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 25s linear infinite",
        "marquee-right": "marquee-right 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
