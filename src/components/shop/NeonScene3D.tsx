"use client";

import {
  WALL_BG,
  getBackboardPanelStyle,
  type NeonBackboardId,
} from "@/lib/neon-backboard";

interface NeonScene3DProps {
  text: string;
  color: string;
  fontFamily?: string;
  backboard?: NeonBackboardId;
}

/** CSS 3D room mock — wall + floor + mounted sign (no WebGL). */
export function NeonScene3D({
  text,
  color,
  fontFamily,
  backboard = "acrylic",
}: NeonScene3DProps) {
  const display = text.trim() || "NEON";
  const glow = color || "#f5c518";
  const panel = getBackboardPanelStyle(backboard);

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-[#08080a] max-w-full">
      <div
        className="absolute inset-0"
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 42%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0)",
          }}
        >
          {/* Back wall */}
          <div
            className="absolute left-[-8%] right-[-8%] top-[-5%] bottom-[28%]"
            style={{
              background: WALL_BG,
              backgroundBlendMode: "multiply, normal, normal",
              transform: "translateZ(-80px) rotateX(2deg)",
              boxShadow: "inset 0 0 120px rgba(0,0,0,0.55)",
            }}
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(ellipse 55% 40% at 50% 48%, ${glow}44 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Floor */}
          <div
            className="absolute left-[-15%] right-[-15%] bottom-0 h-[42%]"
            style={{
              background:
                "linear-gradient(to top, #050506 0%, #121214 55%, #1a1a1e 100%)",
              transformOrigin: "center top",
              transform: "rotateX(68deg) translateZ(0)",
              boxShadow: "inset 0 40px 80px rgba(0,0,0,0.7)",
            }}
          >
            <div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                transform: "scaleY(1.8)",
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-24 opacity-50"
              style={{
                background: `radial-gradient(ellipse 50% 100% at 50% 0%, ${glow}55 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Sign mounted on wall */}
          <div
            className="absolute inset-0 flex items-center justify-center pb-[8%]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="relative px-8 py-6 sm:px-12 sm:py-8 max-w-[85%]"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  "rotateY(-22deg) rotateX(8deg) translateZ(56px)",
                borderRadius: 14,
                ...(panel || { background: "transparent" }),
                boxShadow: [
                  typeof panel?.boxShadow === "string" ? panel.boxShadow : "",
                  panel
                    ? `0 28px 60px rgba(0,0,0,0.55), 0 0 50px ${glow}40`
                    : `0 0 40px ${glow}55, 0 24px 50px rgba(0,0,0,0.4)`,
                ]
                  .filter(Boolean)
                  .join(", "),
              }}
            >
              {/* Glow cast on wall behind plate */}
              <div
                className="absolute -inset-8 -z-10 rounded-2xl blur-2xl opacity-70"
                style={{
                  background: `radial-gradient(circle, ${glow}66 0%, transparent 70%)`,
                  transform: "translateZ(-24px)",
                }}
              />

              {backboard === "acrylic" && (
                <>
                  {[
                    "top-2.5 left-2.5",
                    "top-2.5 right-2.5",
                    "bottom-2.5 left-2.5",
                    "bottom-2.5 right-2.5",
                  ].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-600`}
                      aria-hidden
                    />
                  ))}
                </>
              )}

              <p
                className="relative text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center break-words"
                style={{
                  fontFamily: fontFamily || "inherit",
                  color: glow,
                  textShadow: `0 0 10px ${glow}, 0 0 28px ${glow}, 0 0 60px ${glow}88, 0 0 100px ${glow}44`,
                  transform: "translateZ(12px)",
                }}
              >
                {display}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="absolute bottom-2.5 left-3 right-3 text-[10px] text-muted/90 text-center z-10">
        CSS 3D duvar · canlı kamera için “Kamera AR” sekmesi
      </p>
    </div>
  );
}
