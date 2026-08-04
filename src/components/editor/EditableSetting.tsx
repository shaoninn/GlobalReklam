"use client";

import { useEffect, useRef, useState, type ElementType, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useEditor } from "@/components/editor/EditorProvider";

/** Inline edit for SiteSetting values (phone, address, …). */
export function EditableSetting({
  settingKey,
  value,
  as: Tag = "span",
  className,
  help,
  multiline = false,
  block = false,
}: {
  settingKey: string;
  value: string;
  as?: ElementType;
  className?: string;
  help?: string;
  multiline?: boolean;
  block?: boolean;
}) {
  const router = useRouter();
  const { enabled, saveSetting, bumpDirty, saving } = useEditor();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [local, setLocal] = useState(value);
  const dirtyRef = useRef(false);

  useEffect(() => {
    setLocal(value);
    if (!editing) setDraft(value);
  }, [value, editing]);

  if (!enabled) {
    return <Tag className={className}>{local}</Tag>;
  }

  async function commit() {
    if (draft === local) {
      setEditing(false);
      return;
    }
    const ok = await saveSetting(settingKey, draft);
    if (ok) {
      setLocal(draft);
      if (dirtyRef.current) {
        bumpDirty(-1);
        dirtyRef.current = false;
      }
      setEditing(false);
      router.refresh();
    }
  }

  function cancel() {
    setDraft(local);
    if (dirtyRef.current) {
      bumpDirty(-1);
      dirtyRef.current = false;
    }
    setEditing(false);
  }

  function onDraftChange(next: string) {
    setDraft(next);
    if (!dirtyRef.current && next !== local) {
      dirtyRef.current = true;
      bumpDirty(1);
    }
  }

  return (
    <div
      className={`relative group/edit ${block ? "block w-full" : "inline-block max-w-full"}`}
    >
      <Tag
        className={`${className || ""} cursor-pointer rounded-sm transition-shadow ${
          editing
            ? "ring-2 ring-orange ring-offset-2 ring-offset-black"
            : "hover:ring-2 hover:ring-orange/60 hover:ring-offset-2 hover:ring-offset-black"
        }`}
        onClick={() => {
          setDraft(local);
          setEditing(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDraft(local);
            setEditing(true);
          }
        }}
      >
        {local}
      </Tag>
      <span className="pointer-events-none absolute -top-5 left-0 z-20 opacity-0 group-hover/edit:opacity-100 inline-flex items-center rounded bg-orange px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
        Ayar
      </span>
      {editing && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,24rem)] rounded-lg border border-border bg-card p-3 shadow-2xl">
          <p className="text-[11px] text-muted mb-2 leading-relaxed">
            {help || "Bu değer site ayarlarına kaydedilir (telefon, adres vb.)."}
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
          <div className="mt-2 flex gap-2">
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
              onClick={cancel}
              className="px-3 py-1.5 border border-border text-xs text-muted hover:text-white"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
