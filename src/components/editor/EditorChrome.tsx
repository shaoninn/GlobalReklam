"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  Pencil,
  X,
} from "lucide-react";
import { EDITOR_PAGES } from "@/lib/editor-pages";
import { useEditor } from "@/components/editor/EditorProvider";
import { NavEditorPanel } from "@/components/editor/NavEditorPanel";
import { SettingsEditorPanel } from "@/components/editor/SettingsEditorPanel";

export function EditorChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status, saving, dirtyCount } = useEditor();
  const [pageOpen, setPageOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const current =
    EDITOR_PAGES.find((p) => p.href === pathname) ||
    EDITOR_PAGES.find((p) => pathname.startsWith(p.href) && p.href !== "/duzenle") ||
    EDITOR_PAGES[0];

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirtyCount > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirtyCount]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-[80] border-b border-border bg-[#111]/95 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 h-14 flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white shrink-0"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/15 text-orange px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shrink-0">
            <Pencil size={10} />
            Düzenleme
          </span>

          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => setPageOpen((v) => !v)}
              className="inline-flex items-center gap-2 max-w-[14rem] sm:max-w-xs truncate rounded-lg border border-[#333] bg-black/40 px-3 py-1.5 text-sm text-white hover:border-orange"
            >
              <span className="truncate">Sayfa: {current.label}</span>
              <ChevronDown size={14} className="shrink-0 text-muted" />
            </button>
            {pageOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40"
                  aria-label="Kapat"
                  onClick={() => setPageOpen(false)}
                />
                <div className="absolute left-0 top-full z-50 mt-1 w-80 max-h-[70vh] overflow-y-auto rounded-lg border border-[#333] bg-[#151515] shadow-2xl">
                  <p className="px-3 py-2 text-[10px] uppercase tracking-wider text-[#666] border-b border-[#333]">
                    Düzenlenebilir sayfalar
                  </p>
                  {EDITOR_PAGES.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setPageOpen(false)}
                      className={`block px-3 py-2.5 border-b border-[#222] hover:bg-white/5 ${
                        page.href === current.href ? "bg-orange/10" : ""
                      }`}
                    >
                      <span className="text-sm text-white font-medium">{page.label}</span>
                      <span className="block text-[11px] text-muted mt-0.5 leading-snug">
                        {page.help}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="hidden md:inline-flex text-xs text-muted hover:text-orange px-2 py-1.5"
          >
            Menüyü yönet
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="hidden md:inline-flex text-xs text-muted hover:text-orange px-2 py-1.5"
          >
            İletişim bilgileri
          </button>

          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="w-9 h-9 inline-flex items-center justify-center text-muted hover:text-orange"
            aria-label="Yardım"
          >
            <HelpCircle size={18} />
          </button>

          <span className="text-[11px] text-muted shrink-0 min-w-[5rem] text-right">
            {saving ? "Kaydediliyor…" : status || (dirtyCount > 0 ? `${dirtyCount} değişiklik` : "Hazır")}
          </span>
        </div>
      </div>

      <div className="pt-0">{children}</div>

      {helpOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Kapat"
            onClick={() => setHelpOpen(false)}
          />
          <div className="relative w-full max-w-lg border border-border bg-card p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              className="absolute right-3 top-3 text-muted hover:text-white"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>
            <h2 className="font-display text-xl font-bold text-white mb-3">
              Canlı site editörü — nasıl kullanılır?
            </h2>
            <ol className="space-y-2 text-sm text-muted list-decimal list-inside leading-relaxed">
              <li>Turuncu çerçeveli metin veya görsele tıklayın.</li>
              <li>Metni yazın veya bilgisayardan görsel seçin / sürükleyin.</li>
              <li>
                <strong className="text-white">Kaydet</strong> ile yayınlayın — site anında güncellenir.
              </li>
              <li>
                Üstten <strong className="text-white">Sayfa</strong> menüsüyle diğer sayfalara geçin.
              </li>
              <li>
                Ürün, kategori ve projeler bu ekrandan düzenlenmez; yanlış silmeyi önlemek için
                Admin panelini kullanın.
              </li>
            </ol>
            <p className="mt-4 text-xs text-[#666]">
              İpucu: Üst menü linkleri için “Menüyü yönet”, telefon/adres için “İletişim bilgileri”.
            </p>
          </div>
        </div>
      )}

      {navOpen && <NavEditorPanel onClose={() => setNavOpen(false)} />}
      {settingsOpen && <SettingsEditorPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
