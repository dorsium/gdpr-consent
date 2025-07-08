# @dorsium/gdpr

[![npm version](https://img.shields.io/npm/v/@dorsium/gdpr.svg)](https://www.npmjs.com/package/@dorsium/gdpr)
[![GitHub](https://img.shields.io/github/stars/dorsium/gdpr-consent?style=social)](https://github.com/dorsium/gdpr-consent)

> Lightweight GDPR & Cookie Consent module for Next.js projects. Built by the Dorsium Foundation.

## Features

- GDPR-compliant cookie consent banner
- Categorized: Necessary, Analytics, Marketing
- Remembers preferences via `localStorage`
- Fully reusable NPM module
- `useConsent()` hook for conditional logic
- Styled with Tailwind CSS
- Powered by Dorsium branding included

## Installation

```bash
pnpm install @dorsium/gdpr
```

## Usage

### 1. Add the CookieConsent component (e.g. to `_app.tsx` or layout)
```tsx
import { CookieConsent } from "@dorsium/gdpr";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}
```

### 2. Use the `useConsent()` hook to check preferences
```tsx
import { useConsent } from "@dorsium/gdpr";

export default function AnalyticsLoader() {
  const { hasConsent } = useConsent();

  useEffect(() => {
    if (hasConsent("analytics")) {
      // Load Google Analytics or other trackers here
    }
  }, [hasConsent]);

  return null;
}
```

### 3. Optional: Show the Dorsium badge
```tsx
import { PoweredByDorsiumBadge } from "@dorsium/gdpr";

export default function Footer() {
  return (
    <footer className="text-center mt-8">
      <PoweredByDorsiumBadge />
    </footer>
  );
}
```

## Configuration
No configuration needed. Automatically saves user choices under `localStorage['dorsium_consent']`.

Only two boolean values are stored:
- `analytics`
- `marketing`

These flags are kept indefinitely in `localStorage` until you clear them. No personal data is stored.

## Build

```bash
pnpm build
```

## License
This project is licensed under the [MIT License](LICENSE).

---

© Dorsium — https://dorsium.com

---

[![Powered by Dorsium](https://img.shields.io/badge/Powered%20by-Dorsium-3C6DF0?style=flat-square)](https://dorsium.com)

🔗 [View on NPM](https://www.npmjs.com/package/@dorsium/gdpr)  
🔗 [Source on GitHub](https://github.com/dorsium/gdpr-consent)