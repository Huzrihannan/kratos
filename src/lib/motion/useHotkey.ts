"use client";

import { useEffect, useRef } from "react";

export interface HotkeyOptions {
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard shortcuts that safely ignores keystrokes
 * whenever the user is actively focused inside an input, textarea, select, or contenteditable element.
 */
export function useHotkey(
  key: string,
  handler: (e: KeyboardEvent) => void,
  options: HotkeyOptions = {}
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const {
      meta = false,
      ctrl = false,
      shift = false,
      alt = false,
      preventDefault = false,
      enabled = true,
    } = options;

    if (!enabled || typeof window === "undefined") return;

    function handleKeyDown(e: KeyboardEvent) {
      // Check if user is typing inside an input element
      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        const isInputField =
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT" ||
          target.isContentEditable;

        // If in input field, ignore unless it's Escape
        if (isInputField && e.key !== "Escape") {
          return;
        }
      }

      // Check key match (case-insensitive for alphabet keys)
      const keyMatches =
        e.key.toLowerCase() === key.toLowerCase() ||
        (key === " " && e.key === "Spacebar");

      if (!keyMatches) return;

      // Modifier checks
      if (meta && !(e.metaKey || e.ctrlKey)) return;
      if (ctrl && !e.ctrlKey) return;
      if (shift && !e.shiftKey) return;
      if (alt && !e.altKey) return;

      if (preventDefault) {
        e.preventDefault();
      }

      handlerRef.current(e);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, options]);
}
