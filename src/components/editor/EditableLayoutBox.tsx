"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Move, RotateCcw } from "lucide-react";
import { useEditor } from "@/components/editor/EditorProvider";
import {
  isNarrowViewport,
  layoutBoxStyle,
  parseLayoutBox,
  serializeLayoutBox,
  type LayoutBox,
} from "@/lib/layout-box";

type EditableLayoutBoxProps = {
  settingKey: string;
  value?: string;
  className?: string;
  children: ReactNode;
  /** When true, box is position:relative and transforms apply to children wrapper. */
  label?: string;
  /** Clamp drag range (px). */
  maxOffset?: number;
};

/** Drag + scale wrapper persisted as SiteSetting JSON. Public site only applies transform. */
export function EditableLayoutBox({
  settingKey,
  value = "",
  className = "",
  children,
  label = "Konum",
  maxOffset = 120,
}: EditableLayoutBoxProps) {
  const { enabled, saveSetting, saving } = useEditor();
  const [box, setBox] = useState<LayoutBox>(() => parseLayoutBox(value));
  const [narrow, setNarrow] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const dirtyRef = useRef(false);
  const boxRef = useRef(box);
  boxRef.current = box;

  useEffect(() => {
    const sync = () => setNarrow(isNarrowViewport());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (!dirtyRef.current) setBox(parseLayoutBox(value));
  }, [value]);

  const persist = useCallback(
    async (next: LayoutBox) => {
      dirtyRef.current = true;
      setBox(next);
      boxRef.current = next;
      const ok = await saveSetting(settingKey, serializeLayoutBox(next));
      if (ok) dirtyRef.current = false;
    },
    [saveSetting, settingKey]
  );

  const effectiveMax = narrow ? Math.min(maxOffset, 32) : maxOffset;

  function onPointerDown(e: ReactPointerEvent) {
    if (!enabled) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: box.x,
      origY: box.y,
    };
  }

  function onPointerMove(e: ReactPointerEvent) {
    const d = dragRef.current;
    if (!d) return;
    const nx = Math.max(
      -effectiveMax,
      Math.min(effectiveMax, d.origX + (e.clientX - d.startX))
    );
    const ny = Math.max(
      -effectiveMax,
      Math.min(effectiveMax, d.origY + (e.clientY - d.startY))
    );
    setBox((b) => ({ ...b, x: nx, y: ny }));
  }

  function onPointerUp(e: ReactPointerEvent) {
    if (!dragRef.current) return;
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    void persist(boxRef.current);
  }

  const boxCss = layoutBoxStyle(box, { mobileClamp: narrow && !enabled });
  const style: CSSProperties = {
    ...boxCss,
    ...(enabled ? { position: "relative" as const } : {}),
  };

  if (!enabled) {
    return (
      <div className={className} style={boxCss}>
        {children}
      </div>
    );
  }

  return (
    <div className={`group/layout ${className}`} style={style}>
      {children}
      <div className="absolute -top-7 left-0 z-[70] flex items-center gap-1 opacity-0 group-hover/layout:opacity-100 transition-opacity">
        <button
          type="button"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          disabled={saving}
          className="inline-flex items-center gap-1 rounded bg-orange px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white cursor-grab active:cursor-grabbing touch-none"
          title="Sürükleyerek taşı"
        >
          <Move size={10} />
          {label}
        </button>
        <label className="inline-flex items-center gap-1 rounded bg-black/80 border border-border px-1.5 py-0.5 text-[10px] text-muted">
          Boyut
          <input
            type="range"
            min={0.6}
            max={1.8}
            step={0.05}
            value={box.scale}
            onChange={(e) => {
              const scale = Number(e.target.value);
              const next = { ...box, scale };
              setBox(next);
            }}
            onPointerUp={() => void persist(boxRef.current)}
            onMouseUp={() => void persist(boxRef.current)}
            className="w-16 accent-orange"
          />
        </label>
        <button
          type="button"
          disabled={saving}
          onClick={() =>
            void persist({ x: 0, y: 0, scale: 1 })
          }
          className="inline-flex items-center rounded border border-border bg-black/80 p-1 text-muted hover:text-white"
          title="Sıfırla"
        >
          <RotateCcw size={10} />
        </button>
      </div>
    </div>
  );
}
