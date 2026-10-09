"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ThemeId, THEMES, THEME_IDS, isValidTheme } from "./registry";
import { trackThemeChange } from "@/lib/analytics";

export type ThemeChangeSource = "nav" | "menu" | "footer" | "palette" | "url" | "system";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (next: ThemeId, source?: ThemeChangeSource) => void;
  themes: ThemeId[];
  isDreamTried: boolean;
  markDreamTried: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  themes: THEME_IDS,
  isDreamTried: false,
  markDreamTried: () => {},
});

const STORAGE_KEY = "krat-theme";
const COOKIE_KEY = "krat-theme";
const DREAM_TRIED_KEY = "krat-dream-tried";

/**
 * Blocking inline script to execute in document <head> before first paint.
 * Ensures data-theme, color-scheme, and meta theme-color match immediately with 0ms flash.
 */
export const themeBlockingScript = `(function(){try{var p=new URLSearchParams(window.location.search);var q=p.get('theme');var t=null;if(q==='dark'||q==='light'||q==='dream'){t=q;}else{var m=document.cookie.match(/(?:^|; )krat-theme=([^;]*)/);if(m&&(m[1]==='dark'||m[1]==='light'||m[1]==='dream')){t=m[1];}else{var s=localStorage.getItem('krat-theme');if(s==='dark'||s==='light'||s==='dream'){t=s;}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches){t='light';}else{t='dark';}}}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=(t==='dark'?'dark':'light');var colors={dark:'#212121',light:'#F6EFDD',dream:'#6DB6F0'};var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',colors[t]);}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      id="krat-theme-script"
      dangerouslySetInnerHTML={{ __html: themeBlockingScript }}
    />
  );
}

function applyDomTheme(t: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", t);
  document.documentElement.style.colorScheme = t === "dark" ? "dark" : "light";

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", THEMES[t].themeColor);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("dark");
  const [isDreamTried, setIsDreamTried] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check dream tried status
    try {
      const tried = localStorage.getItem(DREAM_TRIED_KEY) === "true";
      setIsDreamTried(tried);
    } catch {
      // Storage access restricted
    }

    // 2. Read initial theme from DOM attribute or storage
    let initial: ThemeId = "dark";
    const domTheme = document.documentElement.getAttribute("data-theme");
    if (isValidTheme(domTheme)) {
      initial = domTheme;
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (isValidTheme(stored)) initial = stored;
      } catch {
        // Fallback
      }
    }

    setThemeState(initial);
    applyDomTheme(initial);

    // 3. Sync from URL param if present
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get("theme");
      if (isValidTheme(urlTheme) && urlTheme !== initial) {
        setThemeState(urlTheme);
        applyDomTheme(urlTheme);
        localStorage.setItem(STORAGE_KEY, urlTheme);
        document.cookie = `${COOKIE_KEY}=${urlTheme}; max-age=31536000; path=/; SameSite=Lax`;
        trackThemeChange(initial, urlTheme, "url");
      }
    } catch {
      // Ignore URL parsing errors
    }

    // 4. Cross-tab synchronization
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && isValidTheme(e.newValue)) {
        setThemeState(e.newValue);
        applyDomTheme(e.newValue);
      }
      if (e.key === DREAM_TRIED_KEY) {
        setIsDreamTried(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const markDreamTried = useCallback(() => {
    setIsDreamTried(true);
    try {
      localStorage.setItem(DREAM_TRIED_KEY, "true");
    } catch {
      // Ignore
    }
  }, []);

  const setTheme = useCallback(
    (next: ThemeId, source: ThemeChangeSource = "nav") => {
      if (!isValidTheme(next)) return;
      const prev = theme;
      if (prev === next) return;

      if (next === "dream") {
        markDreamTried();
      }

      // Check if view transitions API is available for dark <-> light
      const isCrossDream = prev === "dream" || next === "dream";
      const supportsViewTransition =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const executeThemeChange = () => {
        setThemeState(next);
        applyDomTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
          document.cookie = `${COOKIE_KEY}=${next}; max-age=31536000; path=/; SameSite=Lax`;
        } catch {
          // Storage blocked
        }
        trackThemeChange(prev, next, source);
      };

      if (!isCrossDream && supportsViewTransition) {
        (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(
          executeThemeChange
        );
      } else {
        executeThemeChange();
      }
    },
    [theme, markDreamTried]
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: THEME_IDS,
      isDreamTried,
      markDreamTried,
    }),
    [theme, setTheme, isDreamTried, markDreamTried]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
