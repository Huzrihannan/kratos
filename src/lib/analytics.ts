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
  | "cta_click";

export interface EventPayload {
  location?: string;
  label?: string;
  [key: string]: string | number | boolean | undefined | null;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventPayload }) => void;
    gtag?: (command: string, action: string, params?: EventPayload) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload?: EventPayload): void {
  if (typeof window === "undefined") return;

  // Development logging
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics] ${event}`, payload || {});
  }

  try {
    // 1. Plausible Analytics support
    if (typeof window.plausible === "function") {
      window.plausible(event, { props: payload });
    }

    // 2. Google Analytics (GA4 / gtag) support
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }
  } catch (err) {
    console.warn("[Analytics error]", err);
  }
}

export function trackCtaClick(location: string, label: string = "primary_cta"): void {
  trackEvent("cta_click", { location, label });
}
