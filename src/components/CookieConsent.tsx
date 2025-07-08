"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_KEY,
  ConsentPrefs,
  defaultPrefs,
} from "../lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(defaultPrefs);

  const dispatchUpdate = (value: ConsentPrefs) => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: COOKIE_KEY,
        newValue: JSON.stringify(value),
      })
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleAcceptAll = () => {
    const all = { analytics: true, marketing: true };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(all));
    dispatchUpdate(all);
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(defaultPrefs));
    dispatchUpdate(defaultPrefs);
    setVisible(false);
  };

  const handleChange = (key: keyof ConsentPrefs) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const handleSave = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    dispatchUpdate(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-xl z-50">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        🍪 We value your privacy
      </h2>
      <p className="text-sm text-gray-300 mt-2">
        This website uses cookies to ensure basic functionality and to analyze traffic.
      </p>
      <div className="flex flex-wrap gap-3 mt-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked disabled className="accent-dorsium" />
          Necessary
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={prefs.analytics}
            onChange={() => handleChange("analytics")}
            className="accent-dorsium"
          />
          Analytics
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={prefs.marketing}
            onChange={() => handleChange("marketing")}
            className="accent-dorsium"
          />
          Marketing
        </label>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button className="text-sm underline" onClick={() => setVisible(false)}>
          Close
        </button>
        <div className="flex gap-2">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600"
            onClick={handleDecline}
          >
            Decline
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600"
            onClick={handleSave}
          >
            Save preferences
          </button>
          <button
            className="bg-dorsium text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
            onClick={handleAcceptAll}
          >
            Accept All
          </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">Powered by Dorsium</p>
    </div>
  );
}