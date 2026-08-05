/** Prefer pre-baked WebP when we ship a sibling asset for known local paths. */
const LOCAL_WEBP_MAP: Record<string, string> = {
  "/images/hero/hero-global.png": "/images/hero/hero-global.webp",
  "/images/hero/hero-global.jpg": "/images/hero/hero-global.webp",
  "/images/hero/hero-global.webp": "/images/hero/hero-global.webp",
  "/images/portfolio/cmk-ecu-completed.png":
    "/images/portfolio/cmk-ecu-completed.webp",
  "/images/portfolio/acity-avm-tabela.png":
    "/images/portfolio/acity-avm-tabela.webp",
  "/images/portfolio/kurye-garaji-germe.png":
    "/images/portfolio/kurye-garaji-germe.webp",
  "/images/portfolio/gulbag-totem-3.png":
    "/images/portfolio/gulbag-totem-3.webp",
};

const LOCAL_WEBP_SM: Record<string, string> = {
  "/images/hero/hero-global.png": "/images/hero/hero-global-sm.webp",
  "/images/hero/hero-global.jpg": "/images/hero/hero-global-sm.webp",
  "/images/hero/hero-global.webp": "/images/hero/hero-global-sm.webp",
};

export function toWebpSrc(src: string): string {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return src;
  const pathOnly = src.split("?")[0] || src;
  return LOCAL_WEBP_MAP[pathOnly] || src;
}

export function toWebpSrcMobile(src: string): string | null {
  if (!src) return null;
  const pathOnly = src.split("?")[0] || src;
  return LOCAL_WEBP_SM[pathOnly] || null;
}

export function isLocalPublicPath(src: string): boolean {
  return Boolean(src?.startsWith("/") && !src.startsWith("//"));
}
