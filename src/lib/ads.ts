declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Google Ads conversion ID (gtag config). Override with NEXT_PUBLIC_AW_ID. */
export const ADS_AW_ID =
  process.env.NEXT_PUBLIC_AW_ID?.trim() || "AW-18376076520";

/** “Kişi” conversion send_to from Google Ads. */
export const ADS_CONTACT_SEND_TO =
  process.env.NEXT_PUBLIC_AW_CONTACT_SEND_TO?.trim() ||
  "AW-18376076520/EOxBCP7Jmt4cEOjZsrpE";

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Fire the Google Ads “Kişi” conversion (contact form success). */
export function trackAdsContactConversion(): void {
  if (typeof window === "undefined") return;
  gtag("event", "conversion", { send_to: ADS_CONTACT_SEND_TO });
}
