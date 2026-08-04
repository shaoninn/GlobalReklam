"use client";

import { SiteLink } from "@/components/ui/SiteLink";
import { Menu, X, ShoppingCart, Phone, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/cartSlice";
import { CartToast } from "@/components/shop/CartToast";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import type { NavLinkItem } from "@/lib/site";

interface HeaderClientProps {
  navLinks: NavLinkItem[];
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
}

export function HeaderClient({
  navLinks,
  phone,
  phoneRaw,
  whatsappUrl,
}: HeaderClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const waHref = `${whatsappUrl}?text=${encodeURIComponent(
    "Merhaba, tabela / reklam için bilgi almak istiyorum."
  )}`;

  return (
    <>
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        <SiteLink
          href="/hizmetler"
          className="hidden lg:inline-flex w-10 h-10 items-center justify-center text-muted hover:text-orange transition-colors"
          aria-label="Ürünleri ara"
        >
          <Search size={18} />
        </SiteLink>

        <SiteLink
          href="/admin"
          className="hidden lg:inline-flex w-10 h-10 items-center justify-center text-muted hover:text-orange transition-colors"
          aria-label="Hesap"
        >
          <User size={18} />
        </SiteLink>

        <SiteLink
          href="/sepet"
          className="relative inline-flex items-center gap-2 h-10 px-2 sm:px-3 text-muted hover:text-orange transition-colors"
          aria-label={`Sepetim${cartCount > 0 ? ` (${cartCount})` : ""}`}
        >
          <span className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 bg-orange text-black text-[10px] rounded-full flex items-center justify-center font-bold leading-none">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </span>
          <span className="hidden sm:inline text-[11px] font-semibold tracking-wider uppercase">
            Sepetim
          </span>
        </SiteLink>

        <button
          className="xl:hidden w-10 h-10 flex items-center justify-center text-muted hover:text-orange transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          type="button"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-[5.5rem] sm:top-[6rem] z-40 xl:hidden">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative bg-card border-b border-border max-h-[calc(100dvh-6rem)] overflow-y-auto p-4 flex flex-col gap-1 safe-pb rounded-b-xl">
            {navLinks.map((link) => (
              <SiteLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 text-sm font-semibold tracking-widest text-muted hover:text-orange hover:bg-orange/5 transition-colors uppercase rounded-lg"
              >
                {link.label}
              </SiteLink>
            ))}
            <SiteLink
              href="/sepet"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3.5 text-sm font-semibold tracking-widest text-muted hover:text-orange uppercase rounded-lg"
            >
              Sepetim {cartCount > 0 ? `(${cartCount})` : ""}
            </SiteLink>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`tel:+${phoneRaw}`}
                className="flex items-center justify-center gap-2 px-4 py-3.5 border border-border text-sm font-semibold text-white hover:border-orange hover:text-orange rounded-lg"
              >
                <Phone size={16} /> Ara
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:brightness-110"
              >
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </div>
            <p className="text-center text-xs text-muted pt-2">{phone}</p>
          </nav>
        </div>
      )}

      <CartToast />
    </>
  );
}
