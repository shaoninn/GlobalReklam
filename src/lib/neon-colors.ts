/** Discrete circular neon palette (HSL rings × hue slices). */

export interface NeonColorSwatch {
  id: string;
  label: string;
  value: string;
}

/** Quick neon favorites (optional chips under the wheel). */
export const NEON_COLORS: NeonColorSwatch[] = [
  { id: "amber", label: "Amber", value: "#f5c518" },
  { id: "ice", label: "Buz beyaz", value: "#f8fafc" },
  { id: "hot-pink", label: "Pembe", value: "#ec4899" },
  { id: "cyan", label: "Cyan", value: "#22d3ee" },
  { id: "lime", label: "Lime", value: "#a3e635" },
  { id: "violet", label: "Mor", value: "#a855f7" },
];

export const WHEEL_SLICES = 24;
export const WHEEL_RINGS = 6;

export function hslToHex(h: number, s: number, l: number): string {
  const S = Math.max(0, Math.min(100, s)) / 100;
  const L = Math.max(0, Math.min(100, l)) / 100;
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const Hp = (((h % 360) + 360) % 360) / 60;
  const X = C * (1 - Math.abs((Hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (Hp >= 0 && Hp < 1) {
    r = C;
    g = X;
  } else if (Hp < 2) {
    r = X;
    g = C;
  } else if (Hp < 3) {
    g = C;
    b = X;
  } else if (Hp < 4) {
    g = X;
    b = C;
  } else if (Hp < 5) {
    r = X;
    b = C;
  } else {
    r = C;
    b = X;
  }
  const m = L - C / 2;
  const to = (n: number) =>
    Math.round(Math.max(0, Math.min(255, (n + m) * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** Ring 0 = darkest near center; outer = neon-bright. */
export function wheelCellColor(slice: number, ring: number): string {
  // Align so saturated red sits near 3 o'clock (CSS 0°), purple near top — like ref wheel.
  const hue = (slice * (360 / WHEEL_SLICES) + 270) % 360;
  const t = (ring + 0.55) / WHEEL_RINGS;
  const saturation = 55 + t * 45;
  const lightness = 12 + t * 48;
  return hslToHex(hue, saturation, lightness);
}

export function hexEqual(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}
