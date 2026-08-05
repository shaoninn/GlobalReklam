/**
 * Non-destructive insert of missing visual-editor SiteContent keys.
 * Run: npx tsx prisma/upsert-editor-content.ts
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { resolveMysqlDatabaseUrl } from "../src/lib/db-url";

const keys: { key: string; title: string; content: string }[] = [
  {
    key: "hero_image",
    title: "Hero Görsel",
    content: "/images/hero/hero-global.webp",
  },
  {
    key: "services_section_title",
    title: "Hizmetler Bölüm Başlığı",
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
  { key: "process_1_title", title: "Süreç 1 Başlık", content: "Ücretsiz Keşif" },
  {
    key: "process_1_desc",
    title: "Süreç 1 Açıklama",
    content:
      "Mekânı yerinde veya fotoğraflarla inceleriz; ölçü ve ihtiyaç netleşir.",
  },
  { key: "process_2_title", title: "Süreç 2 Başlık", content: "Tasarım & Teklif" },
  {
    key: "process_2_desc",
    title: "Süreç 2 Açıklama",
    content:
      "Markanıza uygun tasarım önerisi ve şeffaf fiyat teklifi sunarız.",
  },
  { key: "process_3_title", title: "Süreç 3 Başlık", content: "Üretim" },
  {
    key: "process_3_desc",
    title: "Süreç 3 Açıklama",
    content:
      "Atölyede malzeme, aydınlatma ve montaj detaylarıyla üretiriz.",
  },
  { key: "process_4_title", title: "Süreç 4 Başlık", content: "Montaj & Teslim" },
  {
    key: "process_4_desc",
    title: "Süreç 4 Açıklama",
    content:
      "Sahada güvenli montaj; sonrası destek hattımız açık kalır.",
  },
  { key: "faq_section_title", title: "SSS Başlık", content: "Sık sorulan sorular" },
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
  { key: "faq_3_q", title: "SSS 3 Soru", content: "Teslim süresi ne kadar?" },
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
  { key: "testimonial_1_place", title: "Yorum 1 Konum", content: "Muratpaşa" },
  {
    key: "testimonial_2_quote",
    title: "Yorum 2",
    content:
      "Ofis yönlendirme ve isimlik setimiz tek elden geldi. Detay kalitesi fark ediliyor.",
  },
  { key: "testimonial_2_name", title: "Yorum 2 İsim", content: "Hukuk ofisi" },
  { key: "testimonial_2_place", title: "Yorum 2 Konum", content: "Antalya" },
  {
    key: "testimonial_3_quote",
    title: "Yorum 3",
    content:
      "Kafe kutu harf tabelamız gece de okunuyor. Teklif süreci WhatsApp üzerinden hızlıydı.",
  },
  { key: "testimonial_3_name", title: "Yorum 3 İsim", content: "Kafe sahibi" },
  { key: "testimonial_3_place", title: "Yorum 3 Konum", content: "Konyaaltı" },
  { key: "blog_eyebrow", title: "Blog Üst Etiket", content: "Blog" },
  {
    key: "blog_title",
    title: "Blog Başlık",
    content: "Haberler & Yazılar",
  },
  {
    key: "blog_intro",
    title: "Blog Açıklama",
    content:
      "Tabela ve reklam sektörü hakkında bilgilendirici içerikler.",
  },
  {
    key: "blog_empty",
    title: "Blog Boş Mesaj",
    content: "Henüz yayınlanmış yazı yok.",
  },
  { key: "projects_eyebrow", title: "Projeler Üst Etiket", content: "Portföy" },
  {
    key: "projects_title",
    title: "Projeler Başlık",
    content: "Gerçekleştirdiğimiz Projeler",
  },
  {
    key: "projects_intro",
    title: "Projeler Açıklama",
    content:
      "Antalya ve çevresinde tamamladığımız tabela ve reklam projelerinden örnekler. Aynı mekânın farklı tabela uygulamaları tek projede toplanmıştır.",
  },
  {
    key: "projects_empty",
    title: "Projeler Boş Mesaj",
    content: "Henüz yayınlanmış proje yok.",
  },
  {
    key: "services_page_eyebrow",
    title: "Hizmetler Üst Etiket",
    content: "Hizmetler",
  },
  {
    key: "services_page_title",
    title: "Hizmetler Sayfa Başlık",
    content: "Tabela ve Reklam Çözümlerimiz",
  },
  {
    key: "services_page_intro",
    title: "Hizmetler Sayfa Açıklama",
    content:
      "Geniş ürün yelpazemizle markanıza değer katıyoruz. Keşif, tasarım, üretim ve montaj süreçlerini tek çatı altında yönetiyoruz.",
  },
  {
    key: "project_detail_eyebrow",
    title: "Proje Detay Üst Etiket",
    content: "Proje",
  },
  {
    key: "project_gallery_hint",
    title: "Proje Galeri İpucu",
    content:
      "Bu projede {count} görsel · oklarla veya alttaki küçük resimlerle gezinin; birkaç saniyede otomatik kayar.",
  },
  {
    key: "project_quote_cta",
    title: "Proje Teklif Butonu",
    content: "Benzer Proje Teklifi Al",
  },
  {
    key: "project_back_link",
    title: "Proje Geri Link",
    content: "← Tüm projelere dön",
  },
  {
    key: "project_products_suffix",
    title: "Proje Ürün CTA Eki",
    content: "Ürünleri",
  },
  {
    key: "product_price_disclaimer",
    title: "Ürün Fiyat Uyarısı",
    content:
      "Başlangıç / örnek fiyat — kesin teklif keşif sonrası verilir.",
  },
  {
    key: "product_specs_heading",
    title: "Ürün Özellikler Başlık",
    content: "Özellikler",
  },
  {
    key: "product_bullet_1",
    title: "Ürün Madde 1",
    content: "Ücretsiz keşif ve teklif",
  },
  {
    key: "product_bullet_2",
    title: "Ürün Madde 2",
    content: "Profesyonel montaj hizmeti",
  },
  {
    key: "product_bullet_3",
    title: "Ürün Madde 3",
    content: "Antalya ve çevresi",
  },
  {
    key: "product_desc_heading",
    title: "Ürün Açıklama Başlık",
    content: "Ürün Açıklaması",
  },
  {
    key: "contact_card_title",
    title: "İletişim Kart Başlık",
    content: "Global Reklam",
  },
  { key: "contact_call_prefix", title: "Ara Öneki", content: "Ara:" },
  {
    key: "contact_whatsapp_link",
    title: "WhatsApp Link Metni",
    content: "WhatsApp ile yaz",
  },
  {
    key: "contact_whatsapp_cta",
    title: "WhatsApp Buton",
    content: "WhatsApp ile Yazın",
  },
  {
    key: "contact_whatsapp_prefill",
    title: "WhatsApp Prefill",
    content: "Merhaba, ücretsiz keşif / teklif için yazıyorum.",
  },
  {
    key: "contact_submit_label",
    title: "Form Gönder Buton",
    content: "Mesaj Gönder",
  },
  {
    key: "contact_kvkk_suffix",
    title: "KVKK Onay Devamı",
    content:
      "okudum, kişisel verilerimin iletişim amacıyla işlenmesini kabul ediyorum.",
  },
  {
    key: "contact_map_label",
    title: "Harita Başlık",
    content: "Konum — Google Haritalar",
  },
  { key: "contact_map_open", title: "Harita Link", content: "Google'da aç" },
  {
    key: "contact_success",
    title: "Form Başarı Mesajı",
    content: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
  },
  {
    key: "hero_body",
    title: "Hero Açıklama",
    content:
      "CNC kesim, neon LED, kutu harf ve dijital baskı ile markanızı Antalya'da görünür kılıyoruz. Keşiften montaja tek ekip.",
  },
  { key: "works_eyebrow", title: "Çalışmalar Üst Etiket", content: "Portföy" },
  {
    key: "works_title",
    title: "Çalışmalar Başlık",
    content: "Son Projelerimiz",
  },
];

async function main() {
  const adapter = new PrismaMariaDb(resolveMysqlDatabaseUrl());
  const prisma = new PrismaClient({ adapter });

  let created = 0;
  let skipped = 0;
  for (const row of keys) {
    const existing = await prisma.siteContent.findUnique({
      where: { key: row.key },
    });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.siteContent.create({ data: row });
    created += 1;
  }

  console.log(`Editor keys: created=${created}, already existed=${skipped}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
