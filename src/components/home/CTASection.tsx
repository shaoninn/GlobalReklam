"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { EditableText } from "@/components/editor/EditableText";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableSectionShift } from "@/components/editor/EditableSectionShift";

interface CTASectionProps {
  title?: string;
  buttonLabel?: string;
  bannerImages?: string[];
  sectionOffset?: string;
  styles?: Record<string, string>;
}

const FALLBACK_BANNERS = [
  "/images/portfolio/cmk-ecu-completed.png",
  "/images/portfolio/acity-avm-tabela.png",
  "/images/portfolio/kurye-garaji-germe.png",
  "/images/portfolio/gulbag-totem-3.png",
];

export function CTASection({
  title,
  buttonLabel,
  bannerImages,
  sectionOffset = "0",
  styles,
}: CTASectionProps) {
  const slides = [1, 2, 3, 4].map((n, i) => {
    const fromDb = bannerImages?.[i];
    return fromDb || FALLBACK_BANNERS[i] || FALLBACK_BANNERS[0]!;
  });

  return (
    <EditableSectionShift
      settingKey="section_cta_offset"
      value={sectionOffset}
      label="CTA kaydır"
    >
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-35 pointer-events-none overflow-hidden">
          <div className="flex w-[200%] h-full animate-[cta-marquee_40s_linear_infinite]">
            {[...slides, ...slides].map((src, i) => (
              <div key={`cta-slide-${i}`} className="relative h-full w-1/4 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,24,0.14)_0%,transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            contentKey="cta_title"
            value={title || "MARKANIZI BİRLİKTE GÖRÜNÜR KILALIM"}
            as="h2"
            block
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 tracking-wide"
            help="Alt CTA başlığı"
            textStyle={styles?.cta_title}
          />
          <Button href="/iletisim" size="lg">
            <EditableText
              contentKey="cta_button_label"
              value={buttonLabel || "İletişime Geç"}
              as="span"
              help="CTA buton yazısı"
              textStyle={styles?.cta_button_label}
            />
            <ArrowRight size={18} />
          </Button>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((n) => (
              <EditableImage
                key={`cta_banner_${n}`}
                contentKey={`cta_banner_${n}`}
                value={bannerImages?.[n - 1] || ""}
                fallback={FALLBACK_BANNERS[n - 1] || ""}
                alt={`CTA banner ${n}`}
                aspectClass="aspect-[4/3]"
                className="rounded-lg border border-white/10"
                help={`CTA arka plan kayan görsel ${n}`}
              />
            ))}
          </div>
        </div>
      </section>
    </EditableSectionShift>
  );
}
