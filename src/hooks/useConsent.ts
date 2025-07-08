import { useEffect, useState } from "react";
import {
  COOKIE_KEY,
  ConsentPrefs,
  defaultPrefs,
} from "../lib/consent";

export function useConsent() {
  const [consent, setConsent] = useState<ConsentPrefs>(defaultPrefs);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COOKIE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setConsent({
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      }
    } catch (err) {
      console.warn("Failed to parse cookie consent prefs", err);
    }
  }, []);

  const hasConsent = (key: keyof ConsentPrefs) => !!consent[key];

  return { consent, hasConsent };
}