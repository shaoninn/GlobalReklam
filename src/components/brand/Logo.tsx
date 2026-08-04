import { SiteLink } from "@/components/ui/SiteLink";
import { SITE_NAME } from "@/lib/constants";

interface LogoProps {
  href?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const heights = { sm: 36, md: 44, lg: 52 } as const;
const markSizes = { sm: 28, md: 34, lg: 40 } as const;
const textSizes = {
  sm: "text-[10px] leading-tight",
  md: "text-xs leading-tight",
  lg: "text-sm leading-tight",
} as const;

export function Logo({
  href = "/",
  className = "",
  size = "md",
}: LogoProps) {
  const mark = markSizes[size];

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative shrink-0 flex items-center justify-center rounded-md border-2 border-orange text-orange font-display font-bold"
        style={{ width: mark, height: mark, fontSize: mark * 0.55 }}
        aria-hidden
      >
        G
      </span>
      <span className={`font-display font-bold tracking-[0.14em] uppercase text-white ${textSizes[size]}`}>
        <span className="block">Global</span>
        <span className="block text-orange">Reklam</span>
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <SiteLink
      href={href}
      className="inline-flex items-center shrink-0"
      aria-label={`${SITE_NAME} Ana Sayfa`}
      style={{ minHeight: heights[size] }}
    >
      {content}
    </SiteLink>
  );
}
