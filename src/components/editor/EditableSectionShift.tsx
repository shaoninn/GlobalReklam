"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useEditor } from "@/components/editor/EditorProvider";
import { ArrowDownUp } from "lucide-react";

type EditableSectionShiftProps = {
  settingKey: string;
  value?: string;
  children: ReactNode;
  className?: string;
  label?: string;
  min?: number;
  max?: number;
};

/** Vertical offset for a whole homepage section (SiteSetting px). */
export function EditableSectionShift({
  settingKey,
  value = "0",
  children,
  className = "",
  label = "Bölüm kaydır",
  min = -80,
  max = 160,
}: EditableSectionShiftProps) {
  const { enabled, saveSetting, saving } = useEditor();
  const [offset, setOffset] = useState(() => Number(value) || 0);

  useEffect(() => {
    setOffset(Number(value) || 0);
  }, [value]);

  async function commit(next: number) {
    const clamped = Math.max(min, Math.min(max, next));
    setOffset(clamped);
    await saveSetting(settingKey, String(clamped));
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ marginTop: offset ? offset : undefined }}
    >
      {enabled && (
        <div className="absolute -top-3 right-2 sm:right-3 z-[40] flex max-w-[calc(100%-1rem)] items-center gap-1.5 sm:gap-2 rounded-lg border border-orange/50 bg-black/90 px-1.5 sm:px-2 py-1 shadow-lg">
          <ArrowDownUp size={12} className="text-orange shrink-0" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted truncate hidden xs:inline sm:inline">
            {label}
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={4}
            value={offset}
            disabled={saving}
            onChange={(e) => setOffset(Number(e.target.value))}
            onPointerUp={() => void commit(offset)}
            onMouseUp={() => void commit(offset)}
            className="w-16 sm:w-24 accent-orange"
            aria-label={label}
          />
          <span className="text-[10px] text-white/70 w-8 tabular-nums shrink-0">
            {offset}px
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
