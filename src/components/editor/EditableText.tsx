"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useEditor } from "@/components/editor/EditorProvider";
import { EditorEditPanel } from "@/components/editor/EditorEditPanel";
import {
  EDITOR_FONT_OPTIONS,
  EDITOR_SIZE_OPTIONS,
  parseTextStyle,
  serializeTextStyle,
  styleContentKey,
  textStyleToCss,
  type TextStyleValue,
} from "@/lib/text-style";

type EditableTextProps = {
  contentKey: string;
  value: string;
  as?: ElementType;
  className?: string;
  help?: string;
  multiline?: boolean;
  block?: boolean;
  children?: ReactNode;
  editField?: "content" | "title";
  pairedContent?: string;
  /** JSON style from `${contentKey}__style` content row. */
  textStyle?: string;
  style?: CSSProperties;
};

export function EditableText({
  contentKey,
  value,
  as: Tag = "span",
  className,
  help,
  multiline = false,
  block = false,
  children,
  editField = "content",
  pairedContent = "",
  textStyle: textStyleRaw = "",
  style: styleProp,
}: EditableTextProps) {
  const { enabled, saveContent, bumpDirty, saving } = useEditor();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [local, setLocal] = useState(value);
  const [styleDraft, setStyleDraft] = useState<TextStyleValue>(() =>
    parseTextStyle(textStyleRaw)
  );
  const [localStyle, setLocalStyle] = useState<TextStyleValue>(() =>
    parseTextStyle(textStyleRaw)
  );
  const dirtyRef = useRef(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setLocal(value);
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    const parsed = parseTextStyle(textStyleRaw);
    setLocalStyle(parsed);
    if (!editing) setStyleDraft(parsed);
  }, [textStyleRaw, editing]);

  const close = useCallback(() => {
    setDraft(local);
    setStyleDraft(localStyle);
    if (dirtyRef.current) {
      bumpDirty(-1);
      dirtyRef.current = false;
    }
    setEditing(false);
  }, [local, localStyle, bumpDirty]);

  const mergedStyle: CSSProperties = {
    ...textStyleToCss(localStyle),
    ...styleProp,
  };

  if (!enabled) {
    return (
      <Tag className={className} style={mergedStyle}>
        {children ?? local}
      </Tag>
    );
  }

  async function commit() {
    const textChanged = draft !== local;
    const styleChanged =
      serializeTextStyle(styleDraft) !== serializeTextStyle(localStyle);

    if (!textChanged && !styleChanged) {
      setEditing(false);
      return;
    }

    let ok = true;
    if (textChanged) {
      ok =
        editField === "title"
          ? await saveContent(contentKey, pairedContent, draft)
          : await saveContent(contentKey, draft);
    }
    if (ok && styleChanged) {
      ok = await saveContent(
        styleContentKey(contentKey),
        serializeTextStyle(styleDraft)
      );
    }
    if (ok) {
      if (textChanged) setLocal(draft);
      if (styleChanged) setLocalStyle(styleDraft);
      if (dirtyRef.current) {
        bumpDirty(-1);
        dirtyRef.current = false;
      }
      setEditing(false);
    }
  }

  function markDirty(nextText: string, nextStyle: TextStyleValue) {
    const dirty =
      nextText !== local ||
      serializeTextStyle(nextStyle) !== serializeTextStyle(localStyle);
    if (dirty && !dirtyRef.current) {
      dirtyRef.current = true;
      bumpDirty(1);
    }
    if (!dirty && dirtyRef.current) {
      dirtyRef.current = false;
      bumpDirty(-1);
    }
  }

  function onDraftChange(next: string) {
    setDraft(next);
    markDirty(next, styleDraft);
  }

  function onStyleChange(patch: Partial<TextStyleValue>) {
    setStyleDraft((prev) => {
      const next = { ...prev, ...patch };
      markDirty(draft, next);
      return next;
    });
  }

  return (
    <div
      className={`relative group/edit ${block ? "block w-full" : "inline-block max-w-full"}`}
    >
      <Tag
        ref={anchorRef as never}
        className={`${className || ""} cursor-pointer rounded-sm transition-shadow ${
          editing
            ? "ring-2 ring-orange ring-offset-2 ring-offset-black"
            : "hover:ring-2 hover:ring-orange/60 hover:ring-offset-2 hover:ring-offset-black"
        }`}
        style={
          editing
            ? { ...textStyleToCss(styleDraft), ...styleProp }
            : mergedStyle
        }
        data-editor-field={contentKey}
        onClick={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setDraft(local);
          setStyleDraft(localStyle);
          setEditing(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDraft(local);
            setStyleDraft(localStyle);
            setEditing(true);
          }
        }}
      >
        {children ?? local}
      </Tag>
      <span className="pointer-events-none absolute -top-5 left-0 z-20 opacity-0 group-hover/edit:opacity-100 inline-flex items-center rounded bg-orange px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
        Metin
      </span>

      <EditorEditPanel open={editing} onClose={close} anchorRef={anchorRef}>
        <p className="text-[11px] text-muted mb-2 leading-relaxed">
          {help ||
            "Bu metin sitede hemen görünür. Esc veya dışarı tıklayınca kapanır; kaydetmeden çıkarsanız değişiklikler silinir."}
        </p>
        {multiline ? (
          <textarea
            className="admin-input min-h-[100px] text-sm w-full"
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            autoFocus
          />
        ) : (
          <input
            className="admin-input text-sm w-full"
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            autoFocus
          />
        )}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="block text-[10px] text-muted uppercase tracking-wider">
            Renk
            <input
              type="color"
              className="mt-1 h-8 w-full cursor-pointer rounded border border-border bg-transparent"
              value={
                styleDraft.color && /^#[0-9a-fA-F]{6}$/.test(styleDraft.color)
                  ? styleDraft.color
                  : "#f5c518"
              }
              onChange={(e) => onStyleChange({ color: e.target.value })}
            />
          </label>
          <label className="block text-[10px] text-muted uppercase tracking-wider">
            Hex
            <input
              className="admin-input mt-1 text-xs font-mono w-full"
              placeholder="#rrggbb"
              value={styleDraft.color || ""}
              onChange={(e) => onStyleChange({ color: e.target.value })}
            />
          </label>
          <label className="block text-[10px] text-muted uppercase tracking-wider col-span-2">
            Font
            <select
              className="admin-input mt-1 text-xs w-full"
              value={styleDraft.fontFamily || ""}
              onChange={(e) =>
                onStyleChange({ fontFamily: e.target.value || undefined })
              }
            >
              {EDITOR_FONT_OPTIONS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[10px] text-muted uppercase tracking-wider">
            Boyut
            <select
              className="admin-input mt-1 text-xs w-full"
              value={styleDraft.fontSize || ""}
              onChange={(e) =>
                onStyleChange({ fontSize: e.target.value || undefined })
              }
            >
              {EDITOR_SIZE_OPTIONS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[10px] text-muted uppercase tracking-wider">
            Kalınlık
            <select
              className="admin-input mt-1 text-xs w-full"
              value={styleDraft.fontWeight || ""}
              onChange={(e) =>
                onStyleChange({ fontWeight: e.target.value || undefined })
              }
            >
              <option value="">Varsayılan</option>
              <option value="400">Normal</option>
              <option value="600">Yarı kalın</option>
              <option value="700">Kalın</option>
              <option value="800">Extra kalın</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => void commit()}
            className="px-3 py-1.5 bg-orange text-white text-xs font-semibold uppercase tracking-wider hover:bg-orange-dark disabled:opacity-50"
          >
            Kaydet
          </button>
          <button
            type="button"
            onClick={close}
            className="px-3 py-1.5 border border-border text-xs text-muted hover:text-white"
          >
            İptal / Kapat
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              setStyleDraft({});
              markDirty(draft, {});
            }}
            className="px-3 py-1.5 border border-border text-xs text-muted hover:text-white ml-auto"
          >
            Stili sıfırla
          </button>
        </div>
      </EditorEditPanel>
    </div>
  );
}
