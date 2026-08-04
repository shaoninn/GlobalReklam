import type { CSSProperties } from "react";

export type NeonBackboardId = "none" | "acrylic" | "black" | "wood";

export const NEON_BACKBOARDS: {
  id: NeonBackboardId;
  label: string;
  fee: boolean;
}[] = [
  { id: "none", label: "Yok", fee: false },
  { id: "acrylic", label: "Şeffaf akrilik", fee: true },
  { id: "black", label: "Siyah panel", fee: true },
  { id: "wood", label: "Ahşap görünümlü", fee: true },
];

/** Room / wall behind the sign when no panel (or around the panel). */
export const WALL_BG =
  "linear-gradient(165deg, #2a2420 0%, #1a1614 40%, #12100e 100%), repeating-linear-gradient(90deg, transparent 0 18px, rgba(0,0,0,0.18) 18px 19px), repeating-linear-gradient(0deg, transparent 0 9px, rgba(0,0,0,0.12) 9px 10px)";

export function getBackboardPanelStyle(
  backboard: NeonBackboardId
): CSSProperties | null {
  switch (backboard) {
    case "none":
      return null;
    case "acrylic":
      return {
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(200,220,255,0.08) 40%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.25), 0 12px 40px rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
      };
    case "black":
      return {
        background:
          "linear-gradient(160deg, #1c1c1e 0%, #0a0a0b 55%, #111113 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.8), 0 16px 48px rgba(0,0,0,0.65), 0 0 0 2px #050505",
      };
    case "wood":
      return {
        background:
          "repeating-linear-gradient(92deg, #5c3d2e 0px, #5c3d2e 2px, #6b4a38 2px, #6b4a38 8px, #4a3024 8px, #4a3024 10px, #704f3c 10px, #704f3c 16px), linear-gradient(180deg, #7a5640, #3d281c)",
        border: "1px solid rgba(90,60,40,0.9)",
        boxShadow:
          "inset 0 1px 0 rgba(255,220,180,0.15), 0 14px 40px rgba(0,0,0,0.55)",
      };
    default:
      return null;
  }
}
