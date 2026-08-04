"use client";

import { EditableText } from "@/components/editor/EditableText";

const DEFAULT_FAQS = [
  {
    q: "Ücretsiz keşif yapıyor musunuz?",
    a: "Evet. Antalya ve çevresinde yerinde veya fotoğraf/video ile ön keşif yapıyoruz. Ölçü ve ihtiyaç netleşmeden kesin fiyat vermiyoruz.",
  },
  {
    q: "Sipariş / sepet ne anlama geliyor?",
    a: "Sitedeki sepet online ödeme değildir. Teklif listesidir; kaydınız bize düşer, WhatsApp veya telefonla süreci netleştiririz.",
  },
  {
    q: "Teslim süresi ne kadar?",
    a: "Proje tipine göre genelde 7–15 iş günü. Totem, cephe giydirme gibi işlerde süre keşif sonrası netleşir.",
  },
  {
    q: "Hangi bölgelere hizmet veriyorsunuz?",
    a: "Çakırlar merkez olmak üzere Antalya geneli (Konyaaltı, Kepez, Lara, Aksu, Serik, Belek) montaj yapıyoruz.",
  },
];

export function FaqSection({
  sectionTitle,
  sectionEyebrow,
  items,
  styles,
}: {
  sectionTitle?: string;
  sectionEyebrow?: string;
  items?: { q: string; a: string }[];
  styles?: Record<string, string>;
}) {
  const list = DEFAULT_FAQS.map((d, i) => ({
    q: items?.[i]?.q || d.q,
    a: items?.[i]?.a || d.a,
  }));

  return (
    <section className="py-16 lg:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <EditableText
            contentKey="faq_section_eyebrow"
            value={sectionEyebrow || "SSS"}
            as="p"
            block
            className="text-orange text-xs font-semibold tracking-[0.3em] uppercase mb-2"
            help="SSS üst etiketi"
            textStyle={styles?.faq_section_eyebrow}
          />
          <EditableText
            contentKey="faq_section_title"
            value={sectionTitle || "Sık sorulan sorular"}
            as="h2"
            block
            className="font-display text-2xl sm:text-3xl font-bold text-white"
            help="SSS bölüm başlığı"
            textStyle={styles?.faq_section_title}
          />
        </div>
        <div className="max-w-3xl space-y-3">
          {list.map((item, index) => {
            const n = index + 1;
            return (
              <details
                key={`faq-${n}`}
                className="group border border-border bg-card/30 open:border-orange/40"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-white flex items-center justify-between gap-4">
                  <EditableText
                    contentKey={`faq_${n}_q`}
                    value={item.q}
                    as="span"
                    className="text-left"
                    help={`Soru ${n}`}
                    textStyle={styles?.[`faq_${n}_q`]}
                  />
                  <span className="text-orange text-xl leading-none group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-4">
                  <EditableText
                    contentKey={`faq_${n}_a`}
                    value={item.a}
                    as="p"
                    block
                    multiline
                    className="text-sm text-muted leading-relaxed"
                    help={`Cevap ${n}`}
                    textStyle={styles?.[`faq_${n}_a`]}
                  />
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
