export interface Sector {
  slug: string;
  title: string;
  description: string;
  categorySlugs: string[];
  heroHint: string;
}

export const SECTORS: Sector[] = [
  {
    slug: "kafe",
    title: "Kafe & Restoran",
    description:
      "Neon tabela, menü panosu ve cephe çözümleriyle mekânınızı öne çıkarın.",
    categorySlugs: ["sektorel-kafe", "neon-led-tabela", "pleksi-tabela", "fener-tabela"],
    heroHint: "Sıcak ışık, okunaklı menü ve marka kimliği",
  },
  {
    slug: "kuafor",
    title: "Kuaför & Güzellik",
    description:
      "Salon tabelası, ışıklı logo ve vitrin uygulamaları ile profesyonel görünüm.",
    categorySlugs: ["sektorel-kuafor", "neon-led-tabela", "kutu-harf-sistemleri"],
    heroHint: "Zarif neon ve pleksi detaylar",
  },
  {
    slug: "eczane",
    title: "Eczane & Sağlık",
    description:
      "Kurumsal eczane tabelaları, yönlendirme ve uyarı levhaları.",
    categorySlugs: ["sektorel-saglik", "kurumsal-isletme-tabelalari", "uyari-yonlendirme"],
    heroHint: "Okunaklı, standartlara uygun tabela",
  },
  {
    slug: "emlak",
    title: "Emlak & Branda",
    description:
      "Branda, totem ve ilan panoları ile projelerinizi görünür kılın.",
    categorySlugs: ["sektorel-emlak", "isikli-totem-tabela", "kurumsal-isletme-tabelalari"],
    heroHint: "Geniş format branda ve totem çözümleri",
  },
  {
    slug: "oto",
    title: "Oto & Servis",
    description:
      "Servis tabelası, araç kaplama ve dış cephe uygulamaları.",
    categorySlugs: ["arac-kaplama", "kutu-harf-sistemleri", "isikli-totem-tabela"],
    heroHint: "Dayanıklı malzeme, yüksek görünürlük",
  },
  {
    slug: "otel",
    title: "Otel & Konaklama",
    description:
      "Resepsiyon tabelası, yönlendirme ve cephe aydınlatması.",
    categorySlugs: ["kurumsal-isletme-tabelalari", "kutu-harf-sistemleri", "uyari-yonlendirme"],
    heroHint: "Prestijli kurumsal görünüm",
  },
  {
    slug: "ofis",
    title: "Ofis & Kurumsal",
    description:
      "Bina tabelası, resepsiyon logosu ve iç mekân yönlendirme.",
    categorySlugs: [
      "kurumsal-isletme-tabelalari",
      "bina-apartman",
      "kutu-harf-sistemleri",
      "uyari-yonlendirme",
    ],
    heroHint: "Kurumsal kimlik ve yönlendirme",
  },
  {
    slug: "etkinlik",
    title: "Etkinlik & Organizasyon",
    description:
      "Etkinlik neonları, sahne arka planı ve geçici tabela çözümleri.",
    categorySlugs: ["etkinlik-neon", "neon-led-tabela", "duvar-dekor"],
    heroHint: "Özel gün neon ve dekor uygulamaları",
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
