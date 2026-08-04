"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { useEditor } from "@/components/editor/EditorProvider";
import { ImagePlus, Loader2 } from "lucide-react";

type EditableImageProps = {
  contentKey: string;
  value: string;
  fallback?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  help?: string;
  aspectClass?: string;
  /** When true, fills parent (absolute inset-0) like a background */
  fill?: boolean;
};

export function EditableImage({
  contentKey,
  value,
  fallback = "",
  alt,
  className,
  imgClassName = "object-cover",
  help,
  aspectClass = "aspect-[16/9]",
  fill = false,
}: EditableImageProps) {
  const { enabled, saveContent, saving } = useEditor();
  const [local, setLocal] = useState(value || fallback);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocal(value || fallback);
  }, [value, fallback]);

  const src = local || fallback;

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("alt", file.name);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Yükleme başarısız");
      const ok = await saveContent(contentKey, data.url);
      if (ok) {
        setLocal(data.url);
        setOpen(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme hatası");
    } finally {
      setUploading(false);
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void uploadFile(file);
    e.target.value = "";
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  if (!enabled) {
    if (!src) return null;
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${imgClassName}`} />
      );
    }
    return (
      <div className={`relative overflow-hidden ${aspectClass} ${className || ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full ${imgClassName}`}
        />
      </div>
    );
  }

  const panel = open ? (
    <div
      className={`${
        fill
          ? "fixed left-1/2 top-24 z-[90] w-[min(100vw-2rem,22rem)] -translate-x-1/2"
          : "absolute left-2 top-12 z-50 w-[min(100vw-2rem,22rem)]"
      } rounded-lg border border-border bg-card p-3 shadow-2xl`}
    >
      <p className="text-[11px] text-muted mb-3 leading-relaxed">
        {help ||
          "Bilgisayardan bir görsel seçin veya sürükleyip bırakın (JPG/PNG/WEBP, max 8 MB)."}
      </p>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-6 text-center cursor-pointer ${
          dragOver ? "border-orange bg-orange/10" : "border-[#333]"
        }`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          disabled={uploading || saving}
          onChange={onChange}
        />
        {uploading ? (
          <Loader2 className="animate-spin text-orange" size={22} />
        ) : (
          <ImagePlus size={22} className="text-orange" />
        )}
        <span className="text-xs text-white font-semibold">
          {uploading ? "Yükleniyor…" : "Sürükle veya tıkla"}
        </span>
      </label>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-3 py-1.5 border border-border text-xs text-muted hover:text-white"
        >
          Kapat
        </button>
      </div>
    </div>
  ) : null;

  if (fill) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full ${imgClassName}`}
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed top-[max(5.5rem,env(safe-area-inset-top))] sm:top-[4.75rem] right-3 z-[85] inline-flex items-center gap-1.5 rounded-lg border border-orange/60 bg-black/85 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-orange shadow-lg hover:bg-orange hover:text-white"
        >
          <ImagePlus size={14} />
          Arka plan görseli
        </button>
        {panel}
      </>
    );
  }

  return (
    <div className={`relative group/edit ${className || ""}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`relative w-full overflow-hidden border border-transparent hover:border-orange/70 ${aspectClass} bg-card`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 h-full w-full ${imgClassName}`}
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted bg-black/40">
            <ImagePlus size={28} />
            <span className="text-xs">Görsel ekle</span>
          </span>
        )}
        <span className="absolute top-2 left-2 z-10 rounded bg-orange px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white opacity-90">
          Görsel
        </span>
      </button>
      {panel}
    </div>
  );
}
