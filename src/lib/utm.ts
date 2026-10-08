"use client";

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  pageUrl?: string;
  referrer?: string;
}

const STORAGE_KEY = "krat_os_attribution";

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return; // preserve first-touch attribution

    const params = new URLSearchParams(window.location.search);
    const data: AttributionData = {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Non-fatal if sessionStorage is blocked
  }
}

export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Non-fatal
  }

  return {
    pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
  };
}
