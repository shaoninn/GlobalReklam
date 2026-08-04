"use client";

import { useEffect, useCallback, useState } from "react";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { SiteLink } from "@/components/ui/SiteLink";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { NAV_LINKS, PRIMARY_NAV_HREFS } from "@/lib/constants";
import { SECTORS } from "@/lib/sectors";
import type { NavLinkItem } from "@/lib/site";

export interface MenuCategoryItem {
  href: string;
  label: string;
}

type SubPanel = "categories" | "sectors" | null;

interface SiteMenuProps {
  navLinks: NavLinkItem[];
  categories: MenuCategoryItem[];
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
}

const PRIMARY_SET = new Set<string>(PRIMARY_NAV_HREFS);

function publicPath(href: string): string {
  return href.replace(/^\/duzenle/, "") || "/";
}

/** Drawer: primary bar dışındaki sayfalar (+ mobil için tüm ana sayfalar). */
function mergeDrawerLinks(
  navLinks: NavLinkItem[],
  includePrimary: boolean
): NavLinkItem[] {
  const byHref = new Map<string, NavLinkItem>();
  for (const link of NAV_LINKS) {
    byHref.set(link.href, { href: link.href, label: link.label });
  }
  for (const link of navLinks) {
    const pub = publicPath(link.href);
    byHref.set(pub, { href: link.href, label: link.label });
  }
  const order = NAV_LINKS.map((l) => l.href);
  const ordered: NavLinkItem[] = [];
  for (const href of order) {
    const item = byHref.get(href);
    if (!item) continue;
    if (!includePrimary && PRIMARY_SET.has(href)) continue;
    ordered.push(item);
    byHref.delete(href);
  }
  for (const [href, item] of byHref) {
    if (!includePrimary && PRIMARY_SET.has(href)) continue;
    ordered.push(item);
  }
  return ordered;
}

function hasSubmenu(href: string): SubPanel {
  const path = href.replace(/^\/duzenle/, "") || "/";
  if (path === "/hizmetler") return "categories";
  if (path === "/sektor") return "sectors";
  return null;
}

export function SiteMenu({
  navLinks,
  categories,
  phone,
  phoneRaw,
  whatsappUrl,
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<SubPanel>(null);
  /** lg+ üstte primary var; menüde sadece kalanlar. Mobilde hepsi. */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const links = mergeDrawerLinks(navLinks, !isDesktop);

  const close = useCallback(() => {
    setOpen(false);
    setSub(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const waHref = `${whatsappUrl}?text=${encodeURIComponent(
    "Merhaba, tabela / reklam için bilgi almak istiyorum."
  )}`;

  const subItems =
    sub === "categories"
      ? [
          { href: "/hizmetler", label: "Tüm kategoriler" },
          ...categories,
        ]
      : sub === "sectors"
        ? [
            { href: "/sektor", label: "Tüm sektörler" },
            ...SECTORS.map((s) => ({
              href: `/sektor/${s.slug}`,
              label: s.title,
            })),
          ]
        : [];

  const subTitle =
    sub === "categories" ? "Kategoriler" : sub === "sectors" ? "Sektörler" : "";

  return (
    <>
      <button
        type="button"
        className="inline-flex w-10 h-10 items-center justify-center text-muted hover:text-orange transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        aria-controls="site-menu-panel"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="fixed inset-0 top-[5.5rem] sm:top-[6rem] z-40">
          <div
            className="absolute inset-0 bg-black/75"
            onClick={close}
            aria-hidden
          />

          <div
            id="site-menu-panel"
            className="absolute top-0 right-0 h-full w-full max-w-lg sm:max-w-xl md:max-w-2xl flex shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Site menüsü"
          >
            {/* Primary pages — hidden on mobile when a submenu is open */}
            <nav
              className={`h-full overflow-y-auto bg-card border-l border-border flex-col safe-pb ${
                sub ? "hidden sm:flex sm:w-[42%]" : "flex w-full max-w-sm ml-auto"
              }`}
            >
              <div className="px-4 py-4 border-b border-border">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-orange">
                  {isDesktop ? "Diğer" : "Menü"}
                </p>
              </div>

              <div className="flex-1 p-2 flex flex-col gap-0.5">
                {links.map((link) => {
                  const panel = hasSubmenu(link.href);
                  const active = panel !== null && sub === panel;
                  if (panel) {
                    return (
                      <button
                        key={link.href}
                        type="button"
                        onClick={() =>
                          setSub((cur) => (cur === panel ? null : panel))
                        }
                        className={`flex items-center justify-between gap-2 px-3 py-3 text-left text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors ${
                          active
                            ? "bg-orange/10 text-orange"
                            : "text-muted hover:text-orange hover:bg-orange/5"
                        }`}
                        aria-expanded={active}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={16} className="shrink-0" />
                      </button>
                    );
                  }
                  return (
                    <SiteLink
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="px-3 py-3 text-sm font-semibold tracking-wider text-muted hover:text-orange hover:bg-orange/5 transition-colors uppercase rounded-lg"
                    >
                      {link.label}
                    </SiteLink>
                  );
                })}
              </div>

              <div className="p-3 border-t border-border grid grid-cols-1 gap-2">
                <a
                  href={`tel:+${phoneRaw}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-border text-sm font-semibold text-white hover:border-orange hover:text-orange rounded-lg"
                >
                  <Phone size={16} /> Ara
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:brightness-110"
                >
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
                <p className="text-center text-xs text-muted">{phone}</p>
              </div>
            </nav>

            {/* Sub pages side panel */}
            {sub && (
              <div className="h-full w-full sm:w-[58%] overflow-y-auto bg-black border-l border-border flex flex-col safe-pb ml-auto sm:ml-0">
                <div className="px-4 py-4 border-b border-border flex items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-orange">
                    {subTitle}
                  </p>
                  <button
                    type="button"
                    className="text-muted hover:text-orange text-xs uppercase tracking-wider"
                    onClick={() => setSub(null)}
                  >
                    Geri
                  </button>
                </div>
                <div className="flex-1 p-2 flex flex-col gap-0.5">
                  {subItems.map((item) => (
                    <SiteLink
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="px-3 py-3 text-sm text-white/85 hover:text-orange hover:bg-orange/5 transition-colors rounded-lg"
                    >
                      {item.label}
                    </SiteLink>
                  ))}
                  {subItems.length <= 1 && (
                    <p className="px-3 py-4 text-sm text-muted">
                      Alt sayfa bulunamadı.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
