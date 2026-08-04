"use client";

import { EditableText } from "@/components/editor/EditableText";

const DEFAULT = [
  {
    quote:
      "Cephe ve totem aynı dilde çıktı. Keşif sonrası süreç net ilerledi, montaj da temizdi.",
    name: "Restoran işletmecisi",
    place: "Muratpaşa",
  },
  {
    quote:
      "Ofis yönlendirme ve isimlik setimiz tek elden geldi. Detay kalitesi fark ediliyor.",
    name: "Hukuk ofisi",
    place: "Antalya",
  },
  {
    quote:
      "Kafe kutu harf tabelamız gece de okunuyor. Teklif süreci WhatsApp üzerinden hızlıydı.",
    name: "Kafe sahibi",
    place: "Konyaaltı",
  },
];

export function Testimonials({
  googleReviewsUrl,
  sectionTitle,
  sectionDesc,
  items,
}: {
  googleReviewsUrl?: string;
  sectionTitle?: string;
  sectionDesc?: string;
  items?: { quote: string; name: string; place: string }[];
}) {
  const list = items && items.length > 0 ? items : DEFAULT;

  return (
    <section className="py-16 lg:py-24 bg-card/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-orange text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            Referanslar
          </p>
          <EditableText
            contentKey="testimonial_section_title"
            value={sectionTitle || "Müşterilerimizin deneyimi"}
            as="h2"
            block
            className="font-display text-2xl sm:text-3xl font-bold text-white mb-3"
            help="Referanslar bölüm başlığı"
          />
          <EditableText
            contentKey="testimonial_section_desc"
            value={
              sectionDesc ||
              "Sahte yıldız şeması kullanmıyoruz. Gerçek Google yorumlarınızı profilde büyütün; proje sonrası kısa bir yorum bize ve sonraki müşterilere yardımcı olur."
            }
            as="p"
            block
            multiline
            className="text-sm text-muted"
            help="Referanslar açıklama metni"
          />
          {googleReviewsUrl ? (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-orange hover:underline"
            >
              Google’da yorumları gör / yorum bırak →
            </a>
          ) : null}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {list.map((t, index) => {
            const n = index + 1;
            return (
              <blockquote
                key={`t-${n}`}
                className="border border-border p-6 bg-black/40"
              >
                <EditableText
                  contentKey={`testimonial_${n}_quote`}
                  value={t.quote}
                  as="p"
                  block
                  multiline
                  className="text-sm text-white/90 leading-relaxed mb-6"
                  help={`Yorum ${n} metni`}
                />
                <footer className="text-xs text-muted space-y-1">
                  <EditableText
                    contentKey={`testimonial_${n}_name`}
                    value={t.name}
                    as="span"
                    className="text-orange font-semibold"
                    help={`Yorum ${n} isim / ünvan`}
                  />
                  <span> · </span>
                  <EditableText
                    contentKey={`testimonial_${n}_place`}
                    value={t.place}
                    as="span"
                    help={`Yorum ${n} konum`}
                  />
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
