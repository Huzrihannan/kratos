import React from "react";
import { Moon, Sun } from "lucide-react";

export type ThemeId = "dark" | "light" | "dream";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  shortDescription: string;
  themeColor: string;
  colorScheme: "dark" | "light";
  iconName: string;
}

export const THEMES: Record<ThemeId, ThemeMeta> = {
  dark: {
    id: "dark",
    label: "Dark",
    shortDescription: "Terminal // Operating System",
    themeColor: "#212121",
    colorScheme: "dark",
    iconName: "moon",
  },
  light: {
    id: "light",
    label: "Light",
    shortDescription: "Blueprint // Daylight",
    themeColor: "#F6EFDD",
    colorScheme: "light",
    iconName: "sun",
  },
  dream: {
    id: "dream",
    label: "Dream",
    shortDescription: "Storybook // Living Landscape",
    themeColor: "#6DB6F0",
    colorScheme: "light",
    iconName: "cloud-flower",
  },
};

export const THEME_IDS: ThemeId[] = ["dark", "light", "dream"];

export function isValidTheme(val: unknown): val is ThemeId {
  return typeof val === "string" && (val === "dark" || val === "light" || val === "dream");
}

/**
 * Cloud with tiny flower icon for Dream theme
 */
export function CloudFlowerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Cloud outline */}
      <path d="M17.5 19H7a5 5 0 0 1-1.3-9.8 6.5 6.5 0 0 1 12.6-1.7A4.5 4.5 0 0 1 17.5 19z" />
      {/* Tiny flower in bottom-right / center of cloud */}
      <circle cx="16" cy="14" r="1.5" fill="#FD142B" stroke="#FD142B" />
      <path d="M16 12.5v-1M16 16.5v-1M14.5 14h-1M17.5 14h-1" stroke="#FD142B" strokeWidth="1.2" />
    </svg>
  );
}

export function ThemeIcon({ theme, className = "w-3.5 h-3.5" }: { theme: ThemeId; className?: string }) {
  if (theme === "dark") {
    return <Moon className={className} strokeWidth={1.5} aria-hidden="true" />;
  }
  if (theme === "light") {
    return <Sun className={className} strokeWidth={1.5} aria-hidden="true" />;
  }
  return <CloudFlowerIcon className={className} />;
}
