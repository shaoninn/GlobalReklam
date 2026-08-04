"use client";

interface NeonPreviewProps {
  text: string;
  color: string;
  fontFamily?: string;
}

export function NeonPreview({ text, color, fontFamily }: NeonPreviewProps) {
  const display = text.trim() || "NEON";
  const glow = color || "#f5c518";

  return (
    <div className="rounded-xl bg-black/40 p-8 sm:p-12 flex items-center justify-center min-h-[200px]">
      <p
        className="text-3xl sm:text-5xl font-bold tracking-wide text-center break-words max-w-full px-2"
        style={{
          fontFamily: fontFamily || "inherit",
          color: glow,
          textShadow: `0 0 8px ${glow}, 0 0 24px ${glow}, 0 0 48px ${glow}99, 0 0 96px ${glow}55`,
        }}
      >
        {display}
      </p>
    </div>
  );
}
