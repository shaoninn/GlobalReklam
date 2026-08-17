"use client";

import Script from "next/script";
import { ADS_AW_ID } from "@/lib/ads";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

/**
 * Sitewide Google tag: Ads AW-* always (conversion tracking) + optional GA4.
 * afterInteractive so conversion events are not dropped before gtag loads.
 */
export function Analytics() {
  const configs = [
    `gtag('config', '${ADS_AW_ID}');`,
    GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : "",
  ]
    .filter(Boolean)
    .join("\n          ");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_AW_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configs}
        `}
      </Script>
    </>
  );
}
