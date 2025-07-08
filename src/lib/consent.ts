export const COOKIE_KEY = "dorsium_consent";

export type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
};

export const defaultPrefs: ConsentPrefs = {
  analytics: false,
  marketing: false,
};
