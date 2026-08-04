"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { SiteLink } from "@/components/ui/SiteLink";
import { HeaderClient } from "./HeaderClient";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { PRIMARY_NAV_LINKS } from "@/lib/constants";
import type { NavLinkItem, SiteSettingsMap } from "@/lib/site";
import type { MenuCategoryItem, MenuLinkItem } from "@/components/layout/SiteMenu";
import { EditableSetting } from "@/components/editor/EditableSetting";
import { EditableLayoutBox } from "@/components/editor/EditableLayoutBox";
import { useEditor } from "@/components/editor/EditorProvider";

interface HeaderProps {
  settings: SiteSettingsMap;
  navLinks: NavLinkItem[];
  categories?: MenuCategoryItem[];
  projects?: MenuLinkItem[];
  blogPosts?: MenuLinkItem[];
}

function publicPath(href: string): string {
  return href.replace(/^\/duzenle/, "") || "/";
}

function resolvePrimaryNav(navLinks: NavLinkItem[]): NavLinkItem[] {
  const byPublic = new Map<string, NavLinkItem>();
  for (const link of navLinks) {
    byPublic.set(publicPath(link.href), link);
  }
  return PRIMARY_NAV_LINKS.map((item) => {
    const fromDb = byPublic.get(item.href);
    if (fromDb) {
      return {
        href: fromDb.href,
        label: fromDb.label || item.label,
      };
    }
    return { href: item.href, label: item.label };
  });
}

function useSyncedNumber(initial: number) {
  const [v, setV] = useState(initial);
  useEffect(() => {
    setV(initial);
  }, [initial]);
  return [v, setV] as const;
}

function HeaderOffsetControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const { saveSetting, saving } = useEditor();
  return (
    <input
      type="range"
      min={-24}
      max={40}
      step={2}
      value={value}
      disabled={saving}
      onChange={(e) => onChange(Number(e.target.value))}
      onPointerUp={() => void saveSetting("header_offset_y", String(value))}
      onMouseUp={() => void saveSetting("header_offset_y", String(value))}
      className="w-20 accent-orange"
      aria-label="Header dikey kaydır"
    />
  );
}

function NavOffsetControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const { saveSetting, saving } = useEditor();
  return (
    <label className="absolute -top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-1 rounded bg-black/90 border border-border px-1.5 py-0.5 text-[9px] text-muted whitespace-nowrap">
      Menü kaydır
      <input
        type="range"
        min={-80}
        max={80}
        step={4}
        value={value}
        disabled={saving}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={() => void saveSetting("layout_nav_offset_x", String(value))}
        onMouseUp={() => void saveSetting("layout_nav_offset_x", String(value))}
        className="w-16 accent-orange"
      />
    </label>
  );
}

export function Header({
  settings,
  navLinks,
  categories = [],
  projects = [],
  blogPosts = [],
}: HeaderProps) {
  const { enabled } = useEditor();
  const waHref = `${settings.whatsappUrl}?text=${encodeURIComponent(
    "Merhaba, tabela / reklam için bilgi almak istiyorum."
  )}`;
  const primaryNav = resolvePrimaryNav(navLinks);
  const [headerOffset, setHeaderOffset] = useSyncedNumber(
    Number(settings.headerOffsetY) || 0
  );
  const [navOffsetX, setNavOffsetX] = useSyncedNumber(
    Number(settings.layoutNavOffsetX) || 0
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={
        headerOffset ? { transform: `translateY(${headerOffset}px)` } : undefined
      }
    >
      {enabled && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-[80] hidden sm:flex items-center gap-2 rounded-lg border border-orange/40 bg-black/90 px-2 py-1 text-[10px] text-muted shadow-lg">
          <span className="uppercase tracking-wider">Header kaydır</span>
          <HeaderOffsetControl
            value={headerOffset}
            onChange={setHeaderOffset}
          />
        </div>
      )}

      <div className="bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-8 text-[11px]">
          <p className="flex items-center gap-1.5 text-muted truncate min-w-0">
            <MapPin size={12} className="text-orange shrink-0" />
            <EditableSetting
              settingKey="location_label"
              value={settings.locationLabel}
              className="truncate text-muted"
              help="Üst barda konum metni (Antalya / Çakırlar)."
            />
          </p>
          <div className="relative flex items-center gap-3 shrink-0 min-h-[2rem]">
            <EditableLayoutBox
              settingKey="layout_phone_box"
              value={settings.layoutPhoneBox}
              label="Tel kutusu"
              maxOffset={80}
              className="inline-flex"
            >
              <a
                href={`tel:+${settings.phoneRaw}`}
                className="hidden sm:inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-muted hover:text-orange hover:border-orange/40 transition-colors"
              >
                <Phone size={12} />
                <EditableSetting
                  settingKey="phone"
                  value={settings.phone}
                  className="text-muted"
                  help="Üst bardaki telefon numarası."
                />
              </a>
            </EditableLayoutBox>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:brightness-110 transition-all font-medium max-w-[40vw] sm:max-w-none"
            >
              <WhatsAppIcon size={14} />
              <EditableSetting
                settingKey="whatsapp_label"
                value={settings.whatsappLabel}
                className="text-[#25D366] truncate"
                help="WhatsApp bağlantı yazısı."
              />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black/92 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-14 sm:h-16 lg:h-[4.25rem]">
            <div className="min-w-0 shrink">
              <EditableLayoutBox
                settingKey="layout_logo"
                value={settings.layoutLogo}
                label="Logo"
                maxOffset={60}
              >
                <span className="inline-flex origin-left max-sm:scale-[0.88]">
                  <Logo size="md" />
                </span>
              </EditableLayoutBox>
            </div>

            <nav
              className="relative hidden md:flex items-center gap-0.5 flex-1 justify-center min-w-0 px-1 overflow-x-auto"
              style={
                navOffsetX
                  ? { transform: `translateX(${navOffsetX}px)` }
                  : undefined
              }
            >
              {enabled && (
                <NavOffsetControl
                  value={navOffsetX}
                  onChange={setNavOffsetX}
                />
              )}
              {primaryNav.map((link) => (
                <SiteLink
                  key={link.href}
                  href={link.href}
                  className="shrink-0 px-2 xl:px-2.5 py-2 text-[10px] xl:text-[11px] font-semibold tracking-wider text-muted hover:text-orange transition-colors uppercase whitespace-nowrap"
                >
                  {link.label}
                </SiteLink>
              ))}
            </nav>

            <HeaderClient
              navLinks={navLinks}
              categories={categories}
              projects={projects}
              blogPosts={blogPosts}
              phone={settings.phone}
              phoneRaw={settings.phoneRaw}
              whatsappUrl={settings.whatsappUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
