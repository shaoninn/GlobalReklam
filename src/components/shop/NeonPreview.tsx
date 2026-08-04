"use client";

import {
  WALL_BG,
  getBackboardPanelStyle,
  type NeonBackboardId,
} from "@/lib/neon-backboard";

interface NeonPreviewProps {
  text: string;
  color: string;
  fontFamily?: string;
  backboard?: NeonBackboardId;
}

export function NeonPreview({
  text,
  color,
  fontFamily,
  backboard = "none",
}: NeonPreviewProps) {
  const display = text.trim() || "NEON";
  const glow = color || "#f5c518";
  const panel = getBackboardPanelStyle(backboard);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-border min-h-[220px] sm:min-h-[260px] flex items-center justify-center p-8 sm:p-12 relative"
      style={{ background: WALL_BG, backgroundBlendMode: "multiply, normal, normal" }}
    >
      {/* Ambient wall wash from neon */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${glow}33 0%, transparent 65%)`,
        }}
      />

      <div
        className="relative z-[1] px-8 py-7 sm:px-12 sm:py-10 max-w-full"
        style={{
          ...(panel || {}),
          borderRadius: panel ? 12 : 0,
        }}
      >
        {backboard === "acrylic" && (
          <>
            {[
              "top-3 left-3",
              "top-3 right-3",
              "bottom-3 left-3",
              "bottom-3 right-3",
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} w-2 h-2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.5)]`}
                aria-hidden
              />
            ))}
          </>
        )}
        <p
          className="text-3xl sm:text-5xl font-bold tracking-wide text-center break-words max-w-full"
          style={{
            fontFamily: fontFamily || "inherit",
            color: glow,
            textShadow: `0 0 8px ${glow}, 0 0 24px ${glow}, 0 0 48px ${glow}99, 0 0 96px ${glow}55`,
          }}
        >
          {display}
        </p>
      </div>
    </div>
  );
}
