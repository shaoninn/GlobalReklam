"use client";

import { useEffect, useMemo, useState } from "react";
import {
  NEON_COLORS,
  WHEEL_RINGS,
  WHEEL_SLICES,
  hexEqual,
  wheelCellColor,
} from "@/lib/neon-colors";

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const SIZE = 220; // base; scaled with CSS on small screens
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER = SIZE / 2 - 4;
const INNER = OUTER * 0.14;

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

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function ringSlicePath(
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number
): string {
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const p1 = polar(CX, CY, rOuter, startDeg);
  const p2 = polar(CX, CY, rOuter, endDeg);
  const p3 = polar(CX, CY, rInner, endDeg);
  const p4 = polar(CX, CY, rInner, startDeg);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
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

  const cells = useMemo(() => {
    const list: {
      key: string;
      color: string;
      path: string;
      slice: number;
      ring: number;
    }[] = [];
    const step = 360 / WHEEL_SLICES;
    for (let ring = 0; ring < WHEEL_RINGS; ring++) {
      const r0 = INNER + ((OUTER - INNER) * ring) / WHEEL_RINGS;
      const r1 = INNER + ((OUTER - INNER) * (ring + 1)) / WHEEL_RINGS;
      for (let slice = 0; slice < WHEEL_SLICES; slice++) {
        const start = slice * step;
        const end = (slice + 1) * step;
        const color = wheelCellColor(slice, ring);
        list.push({
          key: `${ring}-${slice}`,
          color,
          path: ringSlicePath(r0, r1, start, end),
          slice,
          ring,
        });
      }
    }
    return list;
  }, []);

  function applyHex() {
    const n = normalizeHex(hexInput);
    if (n) onChange(n);
    else setHexInput(value);
  }

  function pick(hex: string) {
    onChange(hex);
    setHexInput(hex);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative mx-auto sm:mx-0 shrink-0 w-[min(100%,220px)] aspect-square">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="block drop-shadow-lg select-none max-w-full h-auto"
            role="listbox"
            aria-label="Neon renk paleti"
          >
            {cells.map((cell) => {
              const active = hexEqual(value, cell.color);
              return (
                <path
                  key={cell.key}
                  d={cell.path}
                  fill={cell.color}
                  stroke={active ? "#fff" : "rgba(0,0,0,0.35)"}
                  strokeWidth={active ? 2.5 : 0.6}
                  className="cursor-pointer transition-[filter] hover:brightness-110"
                  role="option"
                  aria-selected={active}
                  tabIndex={0}
                  onClick={() => pick(cell.color)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pick(cell.color);
                    }
                  }}
                />
              );
            })}
            {/* Center: black / off */}
            <circle
              cx={CX}
              cy={CY}
              r={INNER - 1}
              fill="#0a0a0a"
              stroke={hexEqual(value, "#0a0a0a") || hexEqual(value, "#000000") ? "#fff" : "#222"}
              strokeWidth={2}
              className="cursor-pointer"
              onClick={() => pick("#0a0a0a")}
              role="option"
              aria-label="Siyah"
            />
          </svg>
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex items-center gap-3">
            <span
              className="w-12 h-12 rounded-full border-2 border-white/30 shrink-0 shadow-[0_0_24px_currentColor]"
              style={{ background: value, color: value }}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-1">
                Seçili renk
              </p>
              <input
                className="admin-input font-mono text-sm w-full max-w-[10rem]"
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
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted mb-1.5">
              Hızlı neon
            </p>
            <div className="flex flex-wrap gap-1.5">
              {NEON_COLORS.map((c) => {
                const active = hexEqual(value, c.value);
                return (
                  <button
                    key={c.id}
                    type="button"
                    title={c.label}
                    aria-label={c.label}
                    onClick={() => pick(c.value)}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      active
                        ? "ring-2 ring-white ring-offset-1 ring-offset-[#0a0a0c] scale-110"
                        : "ring-1 ring-white/20 hover:scale-105"
                    }`}
                    style={{ background: c.value }}
                  />
                );
              })}
              <button
                type="button"
                title="Buz beyaz"
                aria-label="Buz beyaz"
                onClick={() => pick("#ffffff")}
                className={`w-7 h-7 rounded-full bg-white ${
                  hexEqual(value, "#ffffff") || hexEqual(value, "#f8fafc")
                    ? "ring-2 ring-orange ring-offset-1 ring-offset-[#0a0a0c]"
                    : "ring-1 ring-white/30"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-muted">
        Paletten tıklayın — dış halkalar neon parlaklıkta.
      </p>
    </div>
  );
}
