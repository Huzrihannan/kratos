"use client";

export type AnalyticsEvent =
  | "estimator_open"
  | "estimator_step_1"
  | "estimator_step_2"
  | "estimator_step_3"
  | "estimator_step_4"
  | "estimator_step_5"
  | "estimator_step_6"
  | "estimator_complete"
  | "lead_submitted"
  | "whatsapp_click"
  | "booking_click"
  | "contact_form_submit"
  | "cta_click"
  | "palette_open"
  | "palette_action"
  | "theme_change";

export interface EventPayload {
  location?: string;
  label?: string;
  theme?: string;
  from?: string;
  to?: string;
  source?: string;
  [key: string]: string | number | boolean | undefined | null;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventPayload }) => void;
    gtag?: (command: string, action: string, params?: EventPayload) => void;
  }
}

function getActiveTheme(): string {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") || "dark";
}

export function trackEvent(event: AnalyticsEvent, payload?: EventPayload): void {
  if (typeof window === "undefined") return;

  const enrichedPayload: EventPayload = {
    theme: getActiveTheme(),
    ...(payload || {}),
  };

  // Development logging
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics] ${event}`, enrichedPayload);
  }

  try {
    // 1. Plausible Analytics support
    if (typeof window.plausible === "function") {
      window.plausible(event, { props: enrichedPayload });
    }

    // 2. Google Analytics (GA4 / gtag) support
    if (typeof window.gtag === "function") {
      window.gtag("event", event, enrichedPayload);
    }
  } catch (err) {
    console.warn("[Analytics error]", err);
  }
}

export function trackCtaClick(location: string, label: string = "primary_cta"): void {
  trackEvent("cta_click", { location, label });
}

export function trackThemeChange(
  from: string,
  to: string,
  source: "nav" | "menu" | "footer" | "palette" | "url" | "system"
): void {
  trackEvent("theme_change", {
    from,
    to,
    source,
    label: `${from}->${to} via ${source}`,
  });
}
