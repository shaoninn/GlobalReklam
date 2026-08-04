import { MapPin, Phone } from "lucide-react";
import { SiteLink } from "@/components/ui/SiteLink";
import { HeaderClient } from "./HeaderClient";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { LOCATION_LABEL, PRIMARY_NAV_LINKS } from "@/lib/constants";
import type { NavLinkItem, SiteSettingsMap } from "@/lib/site";
import type { MenuCategoryItem } from "@/components/layout/SiteMenu";

interface HeaderProps {
  settings: SiteSettingsMap;
  navLinks: NavLinkItem[];
  categories?: MenuCategoryItem[];
}

function publicPath(href: string): string {
  return href.replace(/^\/duzenle/, "") || "/";
}

/** Map primary nav through editor-aware navLinks when present. */
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

export function Header({
  settings,
  navLinks,
  categories = [],
}: HeaderProps) {
  const waHref = `${settings.whatsappUrl}?text=${encodeURIComponent(
    "Merhaba, tabela / reklam için bilgi almak istiyorum."
  )}`;
  const primaryNav = resolvePrimaryNav(navLinks);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-8 text-[11px]">
          <p className="flex items-center gap-1.5 text-muted truncate">
            <MapPin size={12} className="text-orange shrink-0" />
            <span className="truncate">{LOCATION_LABEL}</span>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:+${settings.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-muted hover:text-orange transition-colors"
            >
              <Phone size={12} />
              {settings.phone}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:brightness-110 transition-all font-medium"
            >
              <WhatsAppIcon size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black/92 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-14 sm:h-16 lg:h-[4.25rem]">
            <div className="min-w-0 shrink">
              <Logo size="md" priority />
            </div>

            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0 px-2">
              {primaryNav.map((link) => (
                <SiteLink
                  key={link.href}
                  href={link.href}
                  className="px-2.5 xl:px-3 py-2 text-[10px] xl:text-[11px] font-semibold tracking-widest text-muted hover:text-orange transition-colors uppercase whitespace-nowrap"
                >
                  {link.label}
                </SiteLink>
              ))}
            </nav>

            <HeaderClient
              navLinks={navLinks}
              categories={categories}
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
