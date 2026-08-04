"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import {
  NEON_FONTS,
  getNeonFont,
  loadNeonGoogleFont,
  type NeonFont,
  type NeonFontCategory,
} from "@/lib/neon-fonts";

const CATEGORY_LABELS: Record<NeonFontCategory | "all", string> = {
  all: "Tümü",
  script: "Script",
  display: "Display",
  sans: "Sans",
  slab: "Slab",
  hand: "El yazısı",
};

interface NeonFontPickerProps {
  value: string;
  onChange: (fontId: string) => void;
  previewText?: string;
}

export function NeonFontPicker({
  value,
  onChange,
  previewText = "Neon",
}: NeonFontPickerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NeonFontCategory | "all">("all");
  const selected = getNeonFont(value);

  useEffect(() => {
    loadNeonGoogleFont(selected);
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEON_FONTS.filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (!q) return true;
      return (
        f.label.toLowerCase().includes(q) ||
        f.google.toLowerCase().includes(q) ||
        f.category.includes(q)
      );
    });
  }, [query, category]);

  function select(font: NeonFont) {
    loadNeonGoogleFont(font);
    onChange(font.id);
  }

  function onHover(font: NeonFont) {
    loadNeonGoogleFont(font);
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          className="admin-input pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`${NEON_FONTS.length} font ara…`}
          aria-label="Font ara"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(CATEGORY_LABELS) as Array<NeonFontCategory | "all">).map(
          (key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-md border ${
                category === key
                  ? "border-orange text-orange"
                  : "border-border text-muted hover:text-white"
              }`}
            >
              {CATEGORY_LABELS[key]}
            </button>
          )
        )}
      </div>

      <div className="max-h-56 overflow-y-auto overscroll-contain rounded-xl border border-border bg-black/40 p-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1">
        {filtered.map((font) => {
          const active = font.id === value;
          return (
            <button
              key={font.id}
              type="button"
              onMouseEnter={() => onHover(font)}
              onFocus={() => onHover(font)}
              onClick={() => select(font)}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                active
                  ? "bg-orange/15 border border-orange/60"
                  : "border border-transparent hover:bg-white/5"
              }`}
            >
              <span className="min-w-0">
                <span
                  className="block text-base text-white truncate leading-tight"
                  style={{ fontFamily: font.family }}
                >
                  {previewText.trim() || "Aa"}
                </span>
                <span className="block text-[10px] text-muted truncate mt-0.5">
                  {font.label}
                </span>
              </span>
              {active && <Check size={14} className="text-orange shrink-0" />}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-xs text-muted px-3 py-4 text-center">
            Font bulunamadı.
          </p>
        )}
      </div>
      <p className="text-[10px] text-muted">
        Seçili: <span className="text-white/80">{selected.label}</span> ·{" "}
        {NEON_FONTS.length} font
      </p>
    </div>
  );
}
