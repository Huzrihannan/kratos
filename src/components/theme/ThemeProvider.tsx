"use client";

import * as React from "react";
import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeQuerySync() {
  const { setTheme } = useTheme();
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const themeParam = params.get("theme");
      if (themeParam === "light" || themeParam === "dark") {
        setTheme(themeParam);
      }
    } catch {
      // Ignore
    }
  }, [setTheme]);
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeQuerySync />
      {children}
    </NextThemesProvider>
  );
}
