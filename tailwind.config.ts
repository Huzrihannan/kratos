import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        card: "var(--radius-card)",
        bubble: "var(--radius-bubble)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        float: "var(--shadow-float)",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
      letterSpacing: {
        tagline: "0.22em",
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
        "marquee-left": "marquee-left linear infinite",
        "marquee-right": "marquee-right linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
