import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { hashPassword } from "../src/lib/auth";
import { CATEGORIES } from "../src/lib/constants";
import { projectData } from "./projects-data";
import { resolveMysqlDatabaseUrl } from "../src/lib/db-url";

if (
  process.env.NODE_ENV === "production" &&
  process.env.ALLOW_PROD_SEED !== "true"
) {
  throw new Error(
    "Production'da seed yasak (tüm tabloları siler). Gerçekten gerekliyse ALLOW_PROD_SEED=true verin."
  );
}

const adapter = new PrismaMariaDb(resolveMysqlDatabaseUrl());
const prisma = new PrismaClient({ adapter });

const categoryDescriptions: Record<string, string> = {
  "neon-led-tabela":
    "Hazır ve kişiye özel neon LED yazılar; kafe, bar, stüdyo ve vitrinler için enerji tasarruflu ışıklı dekor.",
  "pleksi-tabela":
    "UV baskılı ve lazer kesim pleksi tabelalar; ofis, kapı ve yönlendirme uygulamaları.",
  "kapi-tabelalari":
    "Açık/kapalı, WC, kasa ve isimlik kapı tabelaları — minimalist pleksi ve metal seçenekler.",
  "fener-tabela":
    "Çift taraflı ışıklı fener tabela; dış mekân görünürlük için klasik ve modern modeller.",
  "kurumsal-isletme-tabelalari":
    "Ofis isimlikleri, kat levhaları, QR menü standları ve kurumsal kimlik uygulamaları.",
  "uyari-yonlendirme":
    "İş güvenliği, otopark, acil çıkış ve yönlendirme levhaları.",
  "sektorel-tabelalar":
    "Eczane, kuaför, kafe, emlak ve stüdyo gibi sektörlere özel tabela çözümleri.",
  "sektorel-kafe":
    "Kafe ve restoran için neon, pleksi ve dekoratif tabela ürünleri.",
  "sektorel-kuafor":
    "Kuaför ve güzellik salonları için açık/kapalı ve figürlü tabelalar.",
  "sektorel-saglik":
    "Eczane, diş kliniği ve sağlık işletmeleri için sektörel tabela.",
  "sektorel-emlak":
    "Kiralık/satılık branda afişleri ve emlak ilan tabelaları.",
  "duvar-dekor":
    "Kanvas tablo, dekor ayna ve duvar panoları ile iç mekân görünürlüğü.",
  "etkinlik-neon":
    "Doğum günü, düğün ve organizasyonlar için neon yazı ve dekor ürünleri.",
  "bina-apartman":
    "Apartman ve bina cepheleri için kişiye özel pleksi levhalar.",
  "kutu-harf-sistemleri":
    "3D kutu harf sistemleri ile markanızı öne çıkarın. Işıklı ve ışıksız seçenekler.",
  "cnc-lazer-kesim":
    "CNC ve lazer kesim ile hassas detaylı reklam ürünleri.",
  "arac-kaplama":
    "Tam ve kısmi araç kaplama, filo giydirme ve reklam uygulamaları.",
  "isikli-totem-tabela":
    "Yüksek görünürlük sağlayan, LED aydınlatmalı totem tabela çözümleri.",
};

type ImportedProduct = {
  slug: string;
  name: string;
  price: number;
  image: string | null;
  category: string;
  source?: string;
};

function loadImportedProducts(): ImportedProduct[] {
  const file = path.join(process.cwd(), "prisma", "imported-products.json");
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as ImportedProduct[];
  return raw.filter((p) => p.slug && p.name);
}


const siteContent = [
  {
    key: "hero_title",
    title: "Hero Başlık",
    content: "Markanızı Görünür Kılan Çözümler",
  },
  {
    key: "hero_subtitle",
    title: "Hero Alt Başlık",
    content: "PROFESYONEL TABELA ÇÖZÜMLERİ",
  },
  {
    key: "hero_body",
    title: "Hero Açıklama",
    content:
      "CNC kesim, neon LED, kutu harf ve dijital baskı ile markanızı Antalya'da görünür kılıyoruz. Keşiften montaja tek ekip.",
  },
  {
    key: "hero_image",
    title: "Hero Görsel",
    content: "/images/hero/hero-global.png",
  },
  {
    key: "about_intro",
    title: "Hakkımızda Giriş",
    content:
      "Global Reklam (Global Tabela), Antalya Çakırlar'da sahada başlayan bir üretim anlayışıyla büyüdü. Bugün aynı titizlikle çalışıyoruz: her projede keşiften montaja kadar süreci sizinle birlikte yönetiyor, markanızın dış dünyaya açılan yüzünü netleştiriyoruz.\n\nAmacımız \"herkese aynı tabelayı yapmak\" değil. Mekâna, trafiğe ve marka dilinize uygun tasarımı korumak; abartmamak; sonucu işletmenizin gerçek ihtiyacına göre üretmek.",
  },
  {
    key: "about_philosophy",
    title: "Çalışma İlkelerimiz",
    content:
      "Dört ilke üzerinde çalışıyoruz. Bunlar duvara asılı sözler değil; her projede uyguladığımız somut kurallar.",
  },
  {
    key: "mission",
    title: "Misyon",
    content:
      "Markaların görünürlüğünü sahada doğru, estetik ve güvenilir tabela ve reklam uygulamalarıyla artırmak.",
  },
  {
    key: "vision",
    title: "Vizyon",
    content:
      "Antalya'da tabela ve kurumsal kimlikte referans üretim ortağı olmak; teknoloji ve tasarımı birleştirerek sektörde standartları belirlemek.",
  },
  {
    key: "values_hygiene",
    title: "Sahaya Uygun Keşif",
    content:
      "Ölçü, yön, aydınlatma ve montaj koşullarını yerinde netleştiririz. Keşif olmadan üretim başlamaz.",
  },
  {
    key: "values_team",
    title: "Profesyonel Ekip",
    content:
      "Tasarım, üretim ve saha montajı aynı standartta ilerler. Deneyimli kadromuz projeyi uçtan uca yönetir.",
  },
  {
    key: "values_products",
    title: "Kaliteli Malzeme",
    content:
      "Dış ortam ve uzun ömür için seçilmiş, belgelenebilir ürünlerle çalışırız. Her teslimat öncesi kalite kontrolü yapılır.",
  },
  {
    key: "values_personal",
    title: "Projeye Özel Çözüm",
    content:
      "Aynı hizmet iki işletmede farklı teknikle uygulanabilir. Protokolü size ve mekânınıza göre kurarız.",
  },
  {
    key: "cta_title",
    title: "CTA Başlık",
    content: "MARKANIZI BİRLİKTE GÖRÜNÜR KILALIM",
  },
  {
    key: "services_section_title",
    title: "Kategoriler Başlık",
    content: "İhtiyacınıza Uygun Tabela Çözümleri",
  },
  {
    key: "featured_products_title",
    title: "Öne Çıkan Ürünler",
    content: "En Çok Tercih Edilen Ürünler",
  },
  {
    key: "shipping_banner_title",
    title: "Kargo Bandı",
    content: "Türkiye'nin Her Yerine Hızlı ve Güvenli Kargo",
  },
  {
    key: "why_us_title",
    title: "Neden Biz Başlık",
    content: "Neden Biz?",
  },
  { key: "why_us_1", title: "Neden Biz 1", content: "Kaliteli Malzeme" },
  { key: "why_us_2", title: "Neden Biz 2", content: "Uzman Kadro" },
  { key: "why_us_3", title: "Neden Biz 3", content: "Zamanında Teslimat" },
  { key: "why_us_4", title: "Neden Biz 4", content: "Ücretsiz Keşif" },
  { key: "why_us_5", title: "Neden Biz 5", content: "2 Yıl Garanti" },
  { key: "why_us_6", title: "Neden Biz 6", content: "Montaj Hizmeti" },
  {
    key: "feature_bar_1_title",
    title: "Özellik Çubuğu 1",
    content: "ÜCRETSİZ KEŞİF",
  },
  {
    key: "feature_bar_1_desc",
    title: "Özellik Çubuğu 1 Açıklama",
    content: "Mekânınızı yerinde inceler, doğru çözümü öneririz.",
  },
  {
    key: "feature_bar_2_title",
    title: "Özellik Çubuğu 2",
    content: "ÖZEL TASARIM",
  },
  {
    key: "feature_bar_2_desc",
    title: "Özellik Çubuğu 2 Açıklama",
    content: "Markanıza özel, sahaya uygun tasarım hazırlarız.",
  },
  {
    key: "feature_bar_3_title",
    title: "Özellik Çubuğu 3",
    content: "PROFESYONEL ÜRETİM",
  },
  {
    key: "feature_bar_3_desc",
    title: "Özellik Çubuğu 3 Açıklama",
    content: "Kaliteli malzeme ve titiz işçilikle üretiriz.",
  },
  {
    key: "feature_bar_4_title",
    title: "Özellik Çubuğu 4",
    content: "MONTAJ HİZMETİ",
  },
  {
    key: "feature_bar_4_desc",
    title: "Özellik Çubuğu 4 Açıklama",
    content: "Güvenli saha montajı ekibimizle tamamlanır.",
  },
  {
    key: "feature_bar_5_title",
    title: "Özellik Çubuğu 5",
    content: "7/24 DESTEK",
  },
  {
    key: "feature_bar_5_desc",
    title: "Özellik Çubuğu 5 Açıklama",
    content: "Proje sonrası destek hattımız açıktır.",
  },
  {
    key: "services_intro",
    title: "Hizmetler Giriş",
    content:
      "Tabela ve reklam sektöründe geniş ürün yelpazemizle markanıza değer katıyoruz. Keşif, tasarım, üretim ve montaj süreçlerini tek çatı altında yönetiyoruz.",
  },
  { key: "value_prop_1_title", title: "Özellik 1 Başlık", content: "Ücretsiz Keşif" },
  { key: "value_prop_1_desc", title: "Özellik 1 Açıklama", content: "Yerinde ölçü ve ihtiyaç analizi" },
  { key: "value_prop_2_title", title: "Özellik 2 Başlık", content: "2 Yıl Garanti" },
  { key: "value_prop_2_desc", title: "Özellik 2 Açıklama", content: "Malzeme ve işçilik güvencesi" },
  { key: "value_prop_3_title", title: "Özellik 3 Başlık", content: "Zamanında Teslimat" },
  { key: "value_prop_3_desc", title: "Özellik 3 Açıklama", content: "Söz verilen tarihte teslim" },
  { key: "value_prop_4_title", title: "Özellik 4 Başlık", content: "%100 Memnuniyet" },
  { key: "value_prop_4_desc", title: "Özellik 4 Açıklama", content: "Müşteri odaklı üretim" },
  { key: "value_prop_5_title", title: "Özellik 5 Başlık", content: "Özel Tasarım" },
  { key: "value_prop_5_desc", title: "Özellik 5 Açıklama", content: "Markanıza özel çözümler" },
  { key: "stat_1_value", title: "İstatistik 1 Değer", content: "10+" },
  { key: "stat_1_label", title: "İstatistik 1 Etiket", content: "Yıllık Tecrübe" },
  { key: "stat_2_value", title: "İstatistik 2 Değer", content: "2500+" },
  { key: "stat_2_label", title: "İstatistik 2 Etiket", content: "Tamamlanan Proje" },
  { key: "stat_3_value", title: "İstatistik 3 Değer", content: "1200+" },
  { key: "stat_3_label", title: "İstatistik 3 Etiket", content: "Mutlu Müşteri" },
  { key: "stat_4_value", title: "İstatistik 4 Değer", content: "50+" },
  { key: "stat_4_label", title: "İstatistik 4 Etiket", content: "Ürün Çeşidi" },
  {
    key: "footer_blurb",
    title: "Footer Tanıtım",
    content:
      "Markanızı görünür kılan profesyonel tabela çözümleri. Antalya Çakırlar'da keşiften montaja tek ekip. Instagram: @globalreklamm",
  },
  {
    key: "about_headline",
    title: "Hakkımızda Başlık",
    content: "REKLAM, MARKANIZI\nDÜNYAYA AÇMAKTIR",
  },
  {
    key: "about_image_1",
    title: "Hakkımızda Görsel 1",
    content: "/images/portfolio/cmk-ecu-completed.png",
  },
  {
    key: "about_image_2",
    title: "Hakkımızda Görsel 2",
    content: "/images/portfolio/acity-avm-tabela.png",
  },
  {
    key: "about_image_3",
    title: "Hakkımızda Görsel 3",
    content: "/images/portfolio/kurye-garaji-germe.png",
  },
  {
    key: "about_image_4",
    title: "Hakkımızda Görsel 4",
    content: "/images/portfolio/gulbag-totem-3.png",
  },
  {
    key: "contact_eyebrow",
    title: "İletişim Üst Etiket",
    content: "İletişim",
  },
  {
    key: "contact_title",
    title: "İletişim Başlık",
    content: "Bize Ulaşın",
  },
  {
    key: "contact_intro",
    title: "İletişim Açıklama",
    content:
      "Teklif, keşif veya uygulama hakkında aklınıza takılan her şeyi sorabilirsiniz. En hızlı yanıt WhatsApp üzerinden gelir.",
  },
  {
    key: "process_section_title",
    title: "Süreç Bölüm Başlığı",
    content: "Keşiften montaja net adımlar",
  },
  {
    key: "process_section_desc",
    title: "Süreç Bölüm Açıklama",
    content:
      "Tabela işi sürpriz sevmez. Süreci baştan sona sizinle birlikte yönetiyoruz.",
  },
  {
    key: "process_1_title",
    title: "Süreç 1 Başlık",
    content: "Ücretsiz Keşif",
  },
  {
    key: "process_1_desc",
    title: "Süreç 1 Açıklama",
    content:
      "Mekânı yerinde veya fotoğraflarla inceleriz; ölçü ve ihtiyaç netleşir.",
  },
  {
    key: "process_2_title",
    title: "Süreç 2 Başlık",
    content: "Tasarım & Teklif",
  },
  {
    key: "process_2_desc",
    title: "Süreç 2 Açıklama",
    content:
      "Markanıza uygun tasarım önerisi ve şeffaf fiyat teklifi sunarız.",
  },
  {
    key: "process_3_title",
    title: "Süreç 3 Başlık",
    content: "Üretim",
  },
  {
    key: "process_3_desc",
    title: "Süreç 3 Açıklama",
    content:
      "Atölyede malzeme, aydınlatma ve montaj detaylarıyla üretiriz.",
  },
  {
    key: "process_4_title",
    title: "Süreç 4 Başlık",
    content: "Montaj & Teslim",
  },
  {
    key: "process_4_desc",
    title: "Süreç 4 Açıklama",
    content:
      "Sahada güvenli montaj; sonrası destek hattımız açık kalır.",
  },
  {
    key: "faq_section_title",
    title: "SSS Başlık",
    content: "Sık sorulan sorular",
  },
  {
    key: "faq_1_q",
    title: "SSS 1 Soru",
    content: "Ücretsiz keşif yapıyor musunuz?",
  },
  {
    key: "faq_1_a",
    title: "SSS 1 Cevap",
    content:
      "Evet. Antalya ve çevresinde yerinde veya fotoğraf/video ile ön keşif yapıyoruz. Ölçü ve ihtiyaç netleşmeden kesin fiyat vermiyoruz.",
  },
  {
    key: "faq_2_q",
    title: "SSS 2 Soru",
    content: "Sipariş / sepet ne anlama geliyor?",
  },
  {
    key: "faq_2_a",
    title: "SSS 2 Cevap",
    content:
      "Sitedeki sepet online ödeme değildir. Teklif listesidir; kaydınız bize düşer, WhatsApp veya telefonla süreci netleştiririz.",
  },
  {
    key: "faq_3_q",
    title: "SSS 3 Soru",
    content: "Teslim süresi ne kadar?",
  },
  {
    key: "faq_3_a",
    title: "SSS 3 Cevap",
    content:
      "Proje tipine göre genelde 7–15 iş günü. Totem, cephe giydirme gibi işlerde süre keşif sonrası netleşir.",
  },
  {
    key: "faq_4_q",
    title: "SSS 4 Soru",
    content: "Hangi bölgelere hizmet veriyorsunuz?",
  },
  {
    key: "faq_4_a",
    title: "SSS 4 Cevap",
    content:
      "Merkez Muratpaşa olmak üzere Lara, Konyaaltı, Kepez, Aksu, Serik, Belek ve Antalya geneli montaj yapıyoruz.",
  },
  {
    key: "testimonial_section_title",
    title: "Referanslar Başlık",
    content: "Müşterilerimizin deneyimi",
  },
  {
    key: "testimonial_section_desc",
    title: "Referanslar Açıklama",
    content:
      "Sahte yıldız şeması kullanmıyoruz. Gerçek Google yorumlarınızı profilde büyütün; proje sonrası kısa bir yorum bize ve sonraki müşterilere yardımcı olur.",
  },
  {
    key: "testimonial_1_quote",
    title: "Yorum 1",
    content:
      "Cephe ve totem aynı dilde çıktı. Keşif sonrası süreç net ilerledi, montaj da temizdi.",
  },
  {
    key: "testimonial_1_name",
    title: "Yorum 1 İsim",
    content: "Restoran işletmecisi",
  },
  {
    key: "testimonial_1_place",
    title: "Yorum 1 Konum",
    content: "Muratpaşa",
  },
  {
    key: "testimonial_2_quote",
    title: "Yorum 2",
    content:
      "Ofis yönlendirme ve isimlik setimiz tek elden geldi. Detay kalitesi fark ediliyor.",
  },
  {
    key: "testimonial_2_name",
    title: "Yorum 2 İsim",
    content: "Hukuk ofisi",
  },
  {
    key: "testimonial_2_place",
    title: "Yorum 2 Konum",
    content: "Antalya",
  },
  {
    key: "testimonial_3_quote",
    title: "Yorum 3",
    content:
      "Kafe kutu harf tabelamız gece de okunuyor. Teklif süreci WhatsApp üzerinden hızlıydı.",
  },
  {
    key: "testimonial_3_name",
    title: "Yorum 3 İsim",
    content: "Kafe sahibi",
  },
  {
    key: "testimonial_3_place",
    title: "Yorum 3 Konum",
    content: "Konyaaltı",
  },
];

const navItems = [
  { label: "ANA SAYFA", href: "/", sortOrder: 0 },
  { label: "KATEGORİLER", href: "/hizmetler", sortOrder: 1 },
  { label: "REFERANSLAR", href: "/projeler", sortOrder: 2 },
  { label: "HAKKIMIZDA", href: "/hakkimizda", sortOrder: 3 },
  { label: "BLOG", href: "/blog", sortOrder: 4 },
  { label: "İLETİŞİM", href: "/iletisim", sortOrder: 5 },
];

function productImagesForCategory(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "products", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort()
    .map((f) => `/images/products/${slug}/${f}`);
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.siteContent.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.navItem.deleteMany();
  await prisma.adminUser.deleteMany();

  const plainPassword = process.env.ADMIN_PASSWORD || "admin123";
  if (plainPassword.length < 6) {
    throw new Error("ADMIN_PASSWORD en az 6 karakter olmalı");
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.warn(
      "⚠ ADMIN_PASSWORD tanımlı değil — geliştirme şifresi admin123 kullanılıyor. Canlıda değiştirin."
    );
  }
  const adminPassword = await hashPassword(plainPassword);
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@globalreklam.com",
      passwordHash: adminPassword,
      name: "Global Admin",
      role: "SUPER",
    },
  });

  const imported = loadImportedProducts();
  const importedByCategory = imported.reduce<Record<string, ImportedProduct[]>>(
    (acc, p) => {
      const key = p.category || "kurumsal-isletme-tabelalari";
      (acc[key] ||= []).push(p);
      return acc;
    },
    {}
  );

  for (const [index, cat] of CATEGORIES.entries()) {
    const importedForCat = importedByCategory[cat.slug] || [];
    const catalogImgs = importedForCat
      .map((p) => p.image)
      .filter((x): x is string => Boolean(x));
    const legacyImgs = productImagesForCategory(cat.slug);
    const cover = catalogImgs[0] || legacyImgs[0] || null;

    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: categoryDescriptions[cat.slug] || "",
        icon: cat.icon,
        image: cover,
        sortOrder: index,
        isActive: true,
      },
    });

    if (importedForCat.length > 0) {
      for (const [pIndex, product] of importedForCat.entries()) {
        await prisma.product.create({
          data: {
            name: product.name,
            slug: product.slug.slice(0, 180),
            shortDesc: `${product.name} — Global Reklam / Global Tabela`,
            description: `${product.name}, Global Reklam kalitesiyle üretilir. Keşif sonrası ölçü ve tasarıma göre fiyatlandırılır. Sepete ekleyerek teklif siparişi oluşturabilir; WhatsApp üzerinden de hızlıca ulaşabilirsiniz.`,
            price: product.price > 0 ? product.price : 999,
            image: product.image,
            images: JSON.stringify(product.image ? [product.image] : []),
            categoryId: category.id,
            sortOrder: pIndex,
            isActive: true,
            inStock: true,
            specs: JSON.stringify({
              malzeme: "Proje bazında",
              garanti: "2 Yıl",
              montaj: "Opsiyonel",
              teslimat: "3-10 İş Günü",
              kaynak: "globaltabela.com.tr",
            }),
          },
        });
      }
      continue;
    }

    // Kategori için import yoksa örnek ürün bırak
    await prisma.product.create({
      data: {
        name: `${cat.name} Standart`,
        slug: `${cat.slug}-standart`,
        shortDesc: `${cat.name} — profesyonel üretim ve montaj.`,
        description: `${cat.name}, Global Reklam kalitesiyle üretilir. Keşif sonrası ölçü ve tasarıma göre fiyatlandırılır.`,
        price: 1500 + index * 250,
        image: cover,
        images: JSON.stringify(cover ? [cover] : []),
        categoryId: category.id,
        sortOrder: 0,
        isActive: true,
        inStock: true,
        specs: JSON.stringify({
          malzeme: "Proje bazında",
          garanti: "2 Yıl",
          montaj: "Dahil",
          teslimat: "7-15 İş Günü",
        }),
      },
    });
  }

  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  for (const [index, project] of projectData.entries()) {
    await prisma.project.create({
      data: {
        title: project.title,
        slug: project.slug,
        location: project.location,
        description: project.description,
        image: project.image,
        images: JSON.stringify([...project.images]),
        categoryId: categoryMap[project.categorySlug] || null,
        sortOrder: index,
        isActive: true,
        isFeatured: index < 10,
      },
    });
  }

  for (const content of siteContent) {
    await prisma.siteContent.create({ data: content });
  }

  await prisma.navItem.createMany({
    data: navItems.map((n) => ({ ...n, isActive: true })),
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "phone", value: "0 (532) 224 07 85" },
      { key: "email", value: "info@globalreklam.com" },
      {
        key: "address",
        value:
          "Çakırlar, Antalya",
      },
      { key: "instagram", value: "https://www.instagram.com/globalreklamm/" },
      { key: "whatsapp", value: "905322240785" },
      {
        key: "google_reviews_url",
        value: "https://share.google/mmdpck843WySI93pq",
      },
      { key: "work_hours_weekdays", value: "Pazartesi - Cumartesi: 09:00 - 19:00" },
      { key: "work_hours_sunday", value: "Pazar: Kapalı" },
    ],
  });

  const blogImages = [
    "/images/portfolio/cmk-ecu-completed.png",
    "/images/portfolio/gulbag-totem-3.png",
    "/images/portfolio/arac-1.png",
  ];

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Tabela Seçerken Dikkat Edilmesi Gerekenler",
        slug: "tabela-secerken-dikkat-edilmesi-gerekenler",
        excerpt:
          "Doğru tabela seçimi markanızın görünürlüğünü doğrudan etkiler.",
        content:
          "Tabela seçimi yaparken konum, hedef kitle, bütçe ve malzeme dayanıklılığı gibi faktörleri değerlendirmek önemlidir. Global Reklam olarak her projede ücretsiz keşif hizmeti sunuyoruz. Işıklı veya ışıksız tercih, kutu harf mi totem mi kararları mekân analiziyle netleşir.",
        image: blogImages[0],
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: "LED Tabela ve Enerji Tasarrufu",
        slug: "led-tabela-enerji-tasarrufu",
        excerpt: "Modern LED teknolojisi ile enerji maliyetlerinizi düşürün.",
        content:
          "LED aydınlatmalı tabelalar geleneksel neon tabelalara göre %70'e varan enerji tasarrufu sağlar. Uzun ömürlü ve düşük bakım maliyetli çözümler sunuyoruz.",
        image: blogImages[1],
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: "Kurumsal Kimlik ve Tabela Uyumu",
        slug: "kurumsal-kimlik-tabela-uyumu",
        excerpt: "Marka kimliğinizi tabelalarınıza yansıtmanın yolları.",
        content:
          "Kurumsal kimlik rehberinize uygun renk, font ve malzeme seçimleri ile tutarlı bir marka görünümü oluşturuyoruz. İç mekân yönlendirme ile dış cephe tabelası aynı dilde konuşmalıdır.",
        image: blogImages[2],
        isPublished: true,
        publishedAt: new Date(),
      },
    ],
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
