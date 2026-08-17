"use client";

import type { ComponentProps, MouseEvent } from "react";
import { gtagReportConversion } from "@/lib/ads";
import { useEditor } from "@/components/editor/EditorProvider";

type AdsConversionLinkProps = ComponentProps<"a"> & {
  href: string;
};

/**
 * Google Ads “Kişi (1)” click conversion — same as gtag_report_conversion(url).
 */
export function AdsConversionLink({
  href,
  target,
  onClick,
  children,
  ...props
}: AdsConversionLinkProps) {
  const { enabled } = useEditor();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || enabled) return;
    e.preventDefault();
    gtagReportConversion(href, target);
  }

  return (
    <a href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
