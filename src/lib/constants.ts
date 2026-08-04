export const SITE_NAME = "Global Reklam";
export const SITE_TAGLINE = "Markanızı görünür kılan profesyonel tabela çözümleri.";
export const PHONE = "0 (532) 224 07 85";
export const PHONE_RAW = "905322240785";
export const PHONE_ALT = "0 (557) 828 41 90";
export const WHATSAPP_URL = `https://wa.me/${PHONE_RAW}`;
export const EMAIL = "info@globalreklamtabela.com";
export const ADDRESS = "Çakırlar, Antalya";
export const LOCATION_LABEL = "Antalya / Çakırlar";
export const INSTAGRAM = "https://www.instagram.com/globalreklamm/";
/** Google İşletme Profili */
export const GOOGLE_BUSINESS_URL = "https://share.google/mmdpck843WySI93pq";
/** Harita gömme — işletme adı + adres araması */
export const GOOGLE_MAPS_EMBED_QUERY = "Global Tabela, Çakırlar, Antalya";
/** Eski vitrin (Ticimax) — referans / yönlendirme */
export const LEGACY_SITE_URL = "https://globaltabela.com.tr";
export const WORK_HOURS = {
  weekdays: "Pazartesi - Cumartesi: 09:00 - 19:00",
  sunday: "Pazar: Kapalı",
};

export const LEGAL_LINKS = [
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  { href: "/kvkk", label: "KVKK" },
  { href: "/mesafeli-satis", label: "Mesafeli Satış" },
  { href: "/iade-politikasi", label: "İade Politikası" },
  { href: "/teslimat", label: "Teslimat" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
] as const;

/** Üst barda her zaman görünen ana linkler (sıra önemli). */
export const PRIMARY_NAV_HREFS = [
  "/",
  "/hizmetler",
  "/sektor",
  "/hakkimizda",
  "/iletisim",
  "/neon-tasarla",
] as const;

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "ANA SAYFA" },
  { href: "/hizmetler", label: "KATEGORİLER" },
  { href: "/sektor", label: "SEKTÖRLER" },
  { href: "/hakkimizda", label: "HAKKIMIZDA" },
  { href: "/iletisim", label: "İLETİŞİM" },
  { href: "/neon-tasarla", label: "NEON TASARLA" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "ANA SAYFA" },
  { href: "/hizmetler", label: "KATEGORİLER" },
  { href: "/sektor", label: "SEKTÖRLER" },
  { href: "/hakkimizda", label: "HAKKIMIZDA" },
  { href: "/iletisim", label: "İLETİŞİM" },
  { href: "/neon-tasarla", label: "NEON TASARLA" },
  { href: "/projeler", label: "REFERANSLAR" },
  { href: "/blog", label: "BLOG" },
  { href: "/tekliflerim", label: "TEKLİFLERİM" },
] as const;

export const VALUE_PROPS = [
  { icon: "quality", title: "Ücretsiz Keşif", desc: "Yerinde ölçü ve ihtiyaç analizi" },
  { icon: "design", title: "2 Yıl Garanti", desc: "Malzeme ve işçilik güvencesi" },
  { icon: "clock", title: "Zamanında Teslimat", desc: "Söz verilen tarihte teslim" },
  { icon: "support", title: "%100 Memnuniyet", desc: "Müşteri odaklı üretim" },
] as const;

export const FEATURE_BAR = [
  {
    icon: "search",
    title: "ÜCRETSİZ KEŞİF",
    desc: "Mekânınızı yerinde inceler, doğru çözümü öneririz.",
  },
  {
    icon: "design",
    title: "ÖZEL TASARIM",
    desc: "Markanıza özel, sahaya uygun tasarım hazırlarız.",
  },
  {
    icon: "production",
    title: "PROFESYONEL ÜRETİM",
    desc: "Kaliteli malzeme ve titiz işçilikle üretiriz.",
  },
  {
    icon: "install",
    title: "MONTAJ HİZMETİ",
    desc: "Güvenli saha montajı ekibimizle tamamlanır.",
  },
  {
    icon: "support",
    title: "7/24 DESTEK",
    desc: "Proje sonrası destek hattımız açıktır.",
  },
] as const;

export const STATS = [
  { value: "10+", label: "Yıllık Tecrübe" },
  { value: "2500+", label: "Tamamlanan Proje" },
  { value: "1200+", label: "Mutlu Müşteri" },
  { value: "50+", label: "Ürün Çeşidi" },
] as const;

export const WHY_US = [
  "Kaliteli Malzeme",
  "Uzman Kadro",
  "Zamanında Teslimat",
  "Ücretsiz Keşif",
  "2 Yıl Garanti",
  "Montaj Hizmeti",
] as const;

/** Katalog — globaltabela.com.tr vitrininden uyarlandı */
export const CATEGORIES = [
  { name: "Neon LED Tabela", slug: "neon-led-tabela", icon: "neon" },
  { name: "Pleksi Tabelalar", slug: "pleksi-tabela", icon: "pleksi" },
  { name: "Kapı Tabelaları", slug: "kapi-tabelalari", icon: "tabela" },
  { name: "Fener Tabela", slug: "fener-tabela", icon: "fener" },
  { name: "Kurumsal İşletme Tabelaları", slug: "kurumsal-isletme-tabelalari", icon: "yonlendirme" },
  { name: "Uyarı & Yönlendirme", slug: "uyari-yonlendirme", icon: "yonlendirme" },
  { name: "Sektörel Tabelalar", slug: "sektorel-tabelalar", icon: "mekan" },
  { name: "Kafe & Restoran", slug: "sektorel-kafe", icon: "mekan" },
  { name: "Kuaför & Güzellik", slug: "sektorel-kuafor", icon: "design" },
  { name: "Eczane & Sağlık", slug: "sektorel-saglik", icon: "tabela" },
  { name: "Emlak & Branda", slug: "sektorel-emlak", icon: "branda" },
  { name: "Duvar Dekorasyonu", slug: "duvar-dekor", icon: "design" },
  { name: "Etkinlik & Organizasyon Neon", slug: "etkinlik-neon", icon: "neon" },
  { name: "Bina & Apartman Tabelaları", slug: "bina-apartman", icon: "cephe" },
  { name: "Kutu Harf Sistemleri", slug: "kutu-harf-sistemleri", icon: "kutu-harf" },
  { name: "CNC & Lazer Kesim", slug: "cnc-lazer-kesim", icon: "cnc" },
  { name: "Araç Kaplama", slug: "arac-kaplama", icon: "arac" },
  { name: "Totem Tabela", slug: "isikli-totem-tabela", icon: "totem" },
] as const;

export const SERVICE_GRID = [
  { name: "Neon LED", slug: "neon-led-tabela", icon: "neon" },
  { name: "Pleksi", slug: "pleksi-tabela", icon: "pleksi" },
  { name: "Kapı Tabela", slug: "kapi-tabelalari", icon: "tabela" },
  { name: "Fener Tabela", slug: "fener-tabela", icon: "fener" },
  { name: "Kurumsal", slug: "kurumsal-isletme-tabelalari", icon: "yonlendirme" },
  { name: "Yönlendirme", slug: "uyari-yonlendirme", icon: "yonlendirme" },
  { name: "Sektörel", slug: "sektorel-tabelalar", icon: "mekan" },
  { name: "Duvar Dekor", slug: "duvar-dekor", icon: "design" },
  { name: "Organizasyon", slug: "etkinlik-neon", icon: "neon" },
  { name: "Kutu Harf", slug: "kutu-harf-sistemleri", icon: "kutu-harf" },
  { name: "CNC Kesim", slug: "cnc-lazer-kesim", icon: "cnc" },
  { name: "Araç Kaplama", slug: "arac-kaplama", icon: "arac" },
] as const;
