"use client";

interface NeonScene3DProps {
  text: string;
  color: string;
  fontFamily?: string;
}

/** Lightweight CSS 3D wall mock — no WebGL (Hostinger-safe). */
export function NeonScene3D({ text, color, fontFamily }: NeonScene3DProps) {
  const display = text.trim() || "NEON";
  const glow = color || "#f5c518";

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-[#0a0a0c]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(160deg, #1a1a22 0%, #0d0d10 45%, #151018 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 opacity-40"
        style={{
          background:
            "linear-gradient(to top, #000, transparent), repeating-linear-gradient(90deg, #222 0 2px, transparent 2px 24px)",
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "900px" }}
      >
        <div
          className="px-6 py-4 rounded-lg border border-white/10 bg-black/30 backdrop-blur-[1px]"
          style={{
            transform: "rotateY(-18deg) rotateX(6deg) translateZ(40px)",
            transformStyle: "preserve-3d",
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${glow}33`,
          }}
        >
          <p
            className="text-2xl sm:text-4xl font-bold tracking-wide text-center"
            style={{
              fontFamily: fontFamily || "inherit",
              color: glow,
              textShadow: `0 0 10px ${glow}, 0 0 28px ${glow}, 0 0 60px ${glow}88`,
            }}
          >
            {display}
          </p>
        </div>
      </div>
      <p className="absolute bottom-3 left-3 right-3 text-[10px] text-muted text-center">
        CSS 3D duvar · canlı kamera için “Kamera AR” sekmesi
      </p>
    </div>
  );
}
