"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import {
  SIZE_PRESETS,
  estimateCustomPrice,
  estimateNeonMeters,
  type PriceFormulaRates,
  DEFAULT_RATES,
} from "@/lib/price-formula";
import { NeonPreview } from "@/components/shop/NeonPreview";
import { NeonScene3D } from "@/components/shop/NeonScene3D";
import { NeonCameraAR } from "@/components/shop/NeonCameraAR";

const FONTS = [
  { id: "script", label: "Script", family: "'Segoe Script', 'Brush Script MT', cursive" },
  { id: "display", label: "Display", family: "var(--font-display), 'Space Grotesk', sans-serif" },
  { id: "sans", label: "Sans", family: "var(--font-sans), 'Outfit', sans-serif" },
  { id: "slab", label: "Kalın", family: "Impact, Haettenschweiler, sans-serif" },
  { id: "mono", label: "Mono", family: "ui-monospace, Consolas, monospace" },
] as const;

const COLORS = [
  "#f5c518",
  "#ffffff",
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#ec4899",
  "#a855f7",
  "#fb923c",
];

const BACKBOARDS = [
  { id: "none", label: "Yok", fee: false },
  { id: "acrylic", label: "Şeffaf akrilik", fee: true },
  { id: "black", label: "Siyah panel", fee: true },
  { id: "wood", label: "Ahşap görünümlü", fee: true },
] as const;

interface NeonBuilderProps {
  rates?: PriceFormulaRates;
  basePrice?: number;
}

export function NeonBuilderStudio({
  rates = DEFAULT_RATES,
  basePrice = 1500,
}: NeonBuilderProps) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("GLOBAL");
  const [color, setColor] = useState(COLORS[0]!);
  const [fontId, setFontId] = useState<string>(FONTS[0]!.id);
  const [presetId, setPresetId] = useState<string>("m");
  const [backboard, setBackboard] =
    useState<(typeof BACKBOARDS)[number]["id"]>("acrylic");
  const [view, setView] = useState<"flat" | "3d" | "ar">("flat");
  const [added, setAdded] = useState(false);

  const preset = SIZE_PRESETS.find((p) => p.id === presetId) || SIZE_PRESETS[1]!;
  const font = FONTS.find((f) => f.id === fontId) || FONTS[0]!;
  const hasBackboard = backboard !== "none";

  const price = useMemo(
    () =>
      estimateCustomPrice({
        basePrice,
        widthCm: preset.widthCm,
        heightCm: preset.heightCm,
        customText: text,
        hasBackboard,
        rates,
      }),
    [basePrice, preset, text, hasBackboard, rates]
  );

  const meters = estimateNeonMeters(preset.widthCm, preset.heightCm);

  function addToQuote() {
    const optionsNote = JSON.stringify({
      builder: true,
      customText: text.trim(),
      font: font.label,
      color,
      backboard,
      size: preset.label,
      widthCm: preset.widthCm,
      heightCm: preset.heightCm,
      estimatedPrice: price,
      neonMeters: Math.round(meters * 100) / 100,
    });

    dispatch(
      addToCart({
        productId: "neon-builder",
        slug: "neon-tasarla",
        name: `Özel Neon: ${text.trim() || "Yazısız"}`,
        price,
        image: null,
        quantity: 1,
        categoryName: "Neon LED Tabela",
        widthCm: preset.widthCm,
        heightCm: preset.heightCm,
        color,
        optionsNote,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 3500);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView("flat")}
            className={`text-xs px-3 py-1.5 rounded-lg border ${
              view === "flat"
                ? "border-orange text-orange"
                : "border-border text-muted"
            }`}
          >
            Düz önizleme
          </button>
          <button
            type="button"
            onClick={() => setView("3d")}
            className={`text-xs px-3 py-1.5 rounded-lg border ${
              view === "3d"
                ? "border-orange text-orange"
                : "border-border text-muted"
            }`}
          >
            3D duvar
          </button>
          <button
            type="button"
            onClick={() => setView("ar")}
            className={`text-xs px-3 py-1.5 rounded-lg border ${
              view === "ar"
                ? "border-orange text-orange"
                : "border-border text-muted"
            }`}
          >
            Kamera AR
          </button>
        </div>

        {view === "flat" ? (
          <div
            className={`rounded-2xl overflow-hidden border border-border ${
              backboard === "black"
                ? "bg-[#111]"
                : backboard === "wood"
                  ? "bg-[#3d2b1f]"
                  : backboard === "acrylic"
                    ? "bg-gradient-to-br from-white/10 to-black"
                    : "bg-black"
            }`}
          >
            <NeonPreview
              text={text || "YAZI"}
              color={color}
              fontFamily={font.family}
            />
          </div>
        ) : view === "3d" ? (
          <NeonScene3D text={text || "YAZI"} color={color} fontFamily={font.family} />
        ) : (
          <NeonCameraAR
            text={text || "YAZI"}
            color={color}
            fontFamily={font.family}
          />
        )}

        <p className="text-xs text-muted">
          Tahmini tüp: ~{meters.toFixed(1)} m · {preset.widthCm}×{preset.heightCm}{" "}
          cm · Gerçek fiyat keşif sonrası netleşir.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs text-muted mb-1">Neon yazı</label>
          <input
            className="admin-input"
            value={text}
            maxLength={32}
            onChange={(e) => setText(e.target.value)}
            placeholder="İşletme adınız"
          />
        </div>

        <div>
          <p className="text-xs text-muted mb-2">Font</p>
          <div className="flex flex-wrap gap-2">
            {FONTS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFontId(f.id)}
                className={`px-3 py-1.5 text-xs rounded-lg border ${
                  fontId === f.id
                    ? "border-orange text-orange"
                    : "border-border text-muted"
                }`}
                style={{ fontFamily: f.family }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted mb-2">Renk</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ background: c }}
                aria-label={c}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted mb-2">Boyut</p>
          <div className="flex flex-wrap gap-2">
            {SIZE_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPresetId(p.id)}
                className={`px-3 py-2 text-xs rounded-lg border ${
                  presetId === p.id
                    ? "border-orange text-orange"
                    : "border-border text-muted"
                }`}
              >
                {p.label} ({p.widthCm}×{p.heightCm})
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted mb-2">Backboard</p>
          <div className="flex flex-wrap gap-2">
            {BACKBOARDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBackboard(b.id)}
                className={`px-3 py-1.5 text-xs rounded-lg border ${
                  backboard === b.id
                    ? "border-orange text-orange"
                    : "border-border text-muted"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted">Tahmini fiyat</p>
            <p className="font-display text-3xl font-bold text-orange">
              {formatPrice(price)}
            </p>
          </div>
          <button
            type="button"
            onClick={addToQuote}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange text-black font-semibold text-sm hover:bg-orange-dark"
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            {added ? "Eklendi" : "Teklife ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}
