"use client";

import { EditableText } from "@/components/editor/EditableText";

const DEFAULT_STEPS = [
  {
    n: "01",
    title: "Ücretsiz Keşif",
    desc: "Mekânı yerinde veya fotoğraflarla inceleriz; ölçü ve ihtiyaç netleşir.",
  },
  {
    n: "02",
    title: "Tasarım & Teklif",
    desc: "Markanıza uygun tasarım önerisi ve şeffaf fiyat teklifi sunarız.",
  },
  {
    n: "03",
    title: "Üretim",
    desc: "Atölyede malzeme, aydınlatma ve montaj detaylarıyla üretiriz.",
  },
  {
    n: "04",
    title: "Montaj & Teslim",
    desc: "Sahada güvenli montaj; sonrası destek hattımız açık kalır.",
  },
];

export type ProcessStepItem = {
  title: string;
  desc: string;
};

export function ProcessSteps({
  sectionTitle,
  sectionDesc,
  steps,
}: {
  sectionTitle?: string;
  sectionDesc?: string;
  steps?: ProcessStepItem[];
}) {
  const list =
    steps && steps.length === 4
      ? steps.map((s, i) => ({ ...s, n: DEFAULT_STEPS[i].n }))
      : DEFAULT_STEPS;

  return (
    <section className="py-10 lg:py-14 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="font-display text-orange text-xs font-semibold tracking-[0.22em] uppercase mb-2">
            Süreç
          </p>
          <EditableText
            contentKey="process_section_title"
            value={sectionTitle || "Keşiften montaja net adımlar"}
            as="h2"
            block
            className="font-display text-2xl sm:text-3xl font-bold text-white mb-3"
            help="Süreç bölümü başlığı"
          />
          <EditableText
            contentKey="process_section_desc"
            value={
              sectionDesc ||
              "Tabela işi sürpriz sevmez. Süreci baştan sona sizinle birlikte yönetiyoruz."
            }
            as="p"
            block
            multiline
            className="text-muted text-sm leading-relaxed"
            help="Süreç bölümü kısa açıklama"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((step, index) => {
            const n = index + 1;
            return (
              <div key={step.n} className="border border-border p-5 bg-card/40">
                <p className="font-display text-3xl font-bold text-orange/40 mb-3">
                  {step.n}
                </p>
                <EditableText
                  contentKey={`process_${n}_title`}
                  value={step.title}
                  as="h3"
                  block
                  className="font-display text-base font-bold text-white mb-2"
                  help={`Adım ${n} başlığı`}
                />
                <EditableText
                  contentKey={`process_${n}_desc`}
                  value={step.desc}
                  as="p"
                  block
                  multiline
                  className="text-sm text-muted leading-relaxed"
                  help={`Adım ${n} açıklaması`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
