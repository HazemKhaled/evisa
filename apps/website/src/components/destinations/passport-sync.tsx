"use client";

import { useEffect } from "react";

/**
 * Client-side passport sync component.
 *
 * Ensures that a passport persisted to localStorage is reflected back into
 * the `gtv_passport` cookie so subsequent server-side reads (e.g. navigating to
 * a new destination page) stay personalized.
 */
export function PassportSync({ passportCode }: { passportCode?: string }) {
  useEffect(() => {
    const run = () => {
      try {
        if (passportCode && /^[A-Z]{2}$/i.test(passportCode)) {
          const normalized = passportCode.toUpperCase();
          window.localStorage.setItem("gtv_passport", normalized);
          document.cookie = `gtv_passport=${normalized}; path=/; max-age=31536000; SameSite=Lax`;
          return;
        }
        const savedPassport = window.localStorage.getItem("gtv_passport");
        if (savedPassport && /^[A-Z]{2}$/i.test(savedPassport)) {
          document.cookie = `gtv_passport=${savedPassport}; path=/; max-age=31536000; SameSite=Lax`;
        }
      } catch {
        // Non-fatal if localStorage/document.cookie unavailable
      }
    };

    run();

    // Re-check on mount for SSR/hydration edge cases
    window.addEventListener("load", run);
    return () => {
      window.removeEventListener("load", run);
    };
  }, [passportCode]);

  return null;
}
