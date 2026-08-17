declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Google Ads conversion ID (gtag config). Override with NEXT_PUBLIC_AW_ID. */
export const ADS_AW_ID =
  process.env.NEXT_PUBLIC_AW_ID?.trim() || "AW-18376076520";

/** “Kişi” conversion — contact form success. */
export const ADS_CONTACT_SEND_TO =
  process.env.NEXT_PUBLIC_AW_CONTACT_SEND_TO?.trim() ||
  "AW-18376076520/EOxBCP7Jmt4cEOjZsrpE";

/** “Kişi (1)” conversion — click on phone / WhatsApp. */
export const ADS_CONTACT_CLICK_SEND_TO =
  process.env.NEXT_PUBLIC_AW_CONTACT_CLICK_SEND_TO?.trim() ||
  "AW-18376076520/c5RcCNb78OIcEOjZsrpE";

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Fire the Google Ads “Kişi” conversion (contact form success). */
export function trackAdsContactConversion(): void {
  if (typeof window === "undefined") return;
  gtag("event", "conversion", { send_to: ADS_CONTACT_SEND_TO });
}

/**
 * Google Ads click conversion (`gtag_report_conversion`).
 * Sends the hit, then navigates so the request is not cancelled.
 */
export function gtagReportConversion(
  url?: string,
  target?: string | null
): boolean {
  if (typeof window === "undefined") return false;

  let done = false;
  const callback = () => {
    if (done || !url) return;
    done = true;
    if (target === "_blank") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  gtag("event", "conversion", {
    send_to: ADS_CONTACT_CLICK_SEND_TO,
    event_callback: callback,
    event_timeout: 2000,
  });
  window.setTimeout(callback, 2000);
  return false;
}
