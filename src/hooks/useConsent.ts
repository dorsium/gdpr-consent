import { useEffect, useState } from "react";
import {
  COOKIE_KEY,
  ConsentPrefs,
  defaultPrefs,
} from "../lib/consent";

export function useConsent() {
  const [consent, setConsent] = useState<ConsentPrefs>(defaultPrefs);

  useEffect(() => {
    const readPrefs = (value: string | null) => {
      if (!value) {
        setConsent(defaultPrefs);
        return;
      }

      try {
        const parsed = JSON.parse(value);
        setConsent({
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      } catch (err) {
        console.warn("Failed to parse cookie consent prefs", err);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === COOKIE_KEY) readPrefs(e.newValue);
    };

    readPrefs(localStorage.getItem(COOKIE_KEY));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  });

  const hasConsent = (key: keyof ConsentPrefs) => !!consent[key];

  return { consent, hasConsent };
}