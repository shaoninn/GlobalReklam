"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { NEON_COLORS } from "@/lib/neon-colors";

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function normalizeHex(raw: string): string | null {
  const t = raw.trim();
  if (!HEX_RE.test(t)) return null;
  if (t.length === 4) {
    const r = t[1]!;
    const g = t[2]!;
    const b = t[3]!;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return t.toLowerCase();
}

interface NeonColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

export function NeonColorPicker({ value, onChange }: NeonColorPickerProps) {
  const [hexInput, setHexInput] = useState(value);

  useEffect(() => {
    setHexInput(value);
  }, [value]);

  function applyHex() {
    const n = normalizeHex(hexInput);
    if (n) onChange(n);
    else setHexInput(value);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {NEON_COLORS.map((c) => {
          const active = value.toLowerCase() === c.value.toLowerCase();
          return (
            <button
              key={c.id}
              type="button"
              title={c.label}
              aria-label={c.label}
              onClick={() => onChange(c.value)}
              className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-transform ${
                active
                  ? "ring-[3px] ring-white ring-offset-2 ring-offset-[#0a0a0c] scale-105"
                  : "ring-1 ring-white/20 hover:scale-105"
              }`}
              style={{ background: c.value }}
            >
              {active && (
                <Check
                  size={16}
                  className="absolute inset-0 m-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  style={{
                    color:
                      c.value === "#f8fafc" || c.value === "#fff7ed"
                        ? "#111"
                        : "#fff",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span
          className="w-8 h-8 rounded-full border border-white/25 shrink-0"
          style={{ background: value }}
          aria-hidden
        />
        <input
          className="admin-input font-mono text-sm max-w-[9rem]"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          onBlur={applyHex}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              applyHex();
            }
          }}
          placeholder="#rrggbb"
          aria-label="Özel hex renk"
          maxLength={7}
        />
        <span className="text-[10px] text-muted">Özel hex</span>
      </div>
    </div>
  );
}
