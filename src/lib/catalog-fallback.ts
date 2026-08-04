import { CATEGORIES } from "@/lib/constants";

const DESCRIPTIONS: Record<string, string> = {
  "neon-led-tabela":
    "Hazır ve kişiye özel neon LED yazılar; kafe, bar, stüdyo ve vitrinler için.",
  "pleksi-tabela":
    "UV baskılı ve lazer kesim pleksi tabelalar; ofis ve yönlendirme.",
  "kapi-tabelalari":
    "Açık/kapalı, WC, kasa ve isimlik kapı tabelaları.",
  "fener-tabela":
    "Çift taraflı ışıklı fener tabela; dış mekân görünürlük.",
  "kurumsal-isletme-tabelalari":
    "Ofis isimlikleri, kat levhaları ve kurumsal kimlik uygulamaları.",
  "uyari-yonlendirme":
    "İş güvenliği, otopark ve yönlendirme levhaları.",
  "sektorel-tabelalar":
    "Eczane, kuaför, kafe, emlak ve stüdyo için sektörel tabela.",
  "sektorel-kafe": "Kafe ve restoran neon / pleksi çözümleri.",
  "sektorel-kuafor": "Kuaför ve güzellik salonu tabelaları.",
  "sektorel-saglik": "Eczane ve sağlık işletmeleri için tabela.",
  "sektorel-emlak": "Emlak branda ve ilan tabelaları.",
  "duvar-dekor": "Kanvas, ayna ve duvar dekor ürünleri.",
  "etkinlik-neon": "Organizasyon ve özel gün neon yazıları.",
  "bina-apartman": "Apartman ve bina cephe levhaları.",
  "kutu-harf-sistemleri":
    "3D kutu harf sistemleri — ışıklı ve ışıksız.",
  "cnc-lazer-kesim": "CNC ve lazer kesim reklam ürünleri.",
  "arac-kaplama": "Araç ve filo giydirme uygulamaları.",
  "isikli-totem-tabela": "LED aydınlatmalı totem tabela çözümleri.",
};

export type FallbackCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: { products: number };
};

/** Used when MySQL is unreachable so /hizmetler is never a blank page. */
export function getFallbackCategories(): FallbackCategory[] {
  const now = new Date(0);
  return CATEGORIES.map((c, i) => ({
    id: `fallback-${c.slug}`,
    name: c.name,
    slug: c.slug,
    description: DESCRIPTIONS[c.slug] ?? null,
    icon: c.icon,
    image: null,
    sortOrder: i,
    isActive: true,
    createdAt: now,
    updatedAt: now,
    _count: { products: 0 },
  }));
}

export function getFallbackCategoryBySlug(slug: string) {
  return getFallbackCategories().find((c) => c.slug === slug) ?? null;
}

export function categoryTitleFromSlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? null;
}
