"use client";

import dynamic from "next/dynamic";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EditableText } from "@/components/editor/EditableText";
import { EditableImage } from "@/components/editor/EditableImage";
import { useEditor } from "@/components/editor/EditorProvider";
import { HeroMedia } from "@/components/home/HeroMedia";
import type { ValuePropItem } from "@/components/home/ValueProps";

const ValueProps = dynamic(() =>
  import("@/components/home/ValueProps").then((m) => m.ValueProps)
);

interface HeroProps {
  title: string;
  subtitle: string;
  body?: string;
  image?: string;
  valueProps?: ValuePropItem[];
  styles?: Record<string, string>;
}

export const DEFAULT_HERO_IMAGE = "/images/hero/hero-global.webp";
const DEFAULT_BODY =
  "CNC kesim, neon LED, kutu harf ve dijital baskı ile markanızı Antalya'da görünür kılıyoruz. Keşiften montaja tek ekip.";

export function Hero({ title, subtitle, body, image, valueProps, styles }: HeroProps) {
  const { enabled } = useEditor();
  const words = title.split(" ");
  const highlightIndex = words.findIndex((w) => /çözüm|tabela/i.test(w));
  const bg = image || DEFAULT_HERO_IMAGE;

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center min-h-0 lg:min-h-[calc(100svh-6rem)] py-8 sm:py-10 lg:py-14">
          <div className="relative z-10 order-1 lg:order-1 min-w-0">
            <EditableText
              contentKey="hero_subtitle"
              value={subtitle}
              as="p"
              block
              multiline
              className="animate-hero font-display text-orange text-[11px] sm:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.22em] uppercase mb-3 sm:mb-4 break-anywhere"
              help="Hero üstündeki sarı kısa metin."
              textStyle={styles?.hero_subtitle}
            />
            <EditableText
              contentKey="hero_title"
              value={title}
              as="h1"
              block
              className="animate-hero-delay font-display text-[1.85rem] leading-[1.12] sm:text-5xl lg:text-[3.35rem] xl:text-6xl font-bold sm:leading-[1.08] mb-4 sm:mb-5 text-white break-anywhere"
              help="Ana başlık. “Çözümler” veya “Tabela” kelimesi sarı vurgulanır."
              textStyle={styles?.hero_title}
            >
              {words.map((word, i) => (
                <span key={`${word}-${i}`}>
                  {i === highlightIndex ? (
                    <span className="text-orange text-glow">{word}</span>
                  ) : (
                    <span className="text-white">{word}</span>
                  )}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </EditableText>
            <EditableText
              contentKey="hero_body"
              value={body || DEFAULT_BODY}
              as="p"
              block
              multiline
              className="animate-hero-delay-2 font-sans text-white/80 text-sm sm:text-base max-w-lg mb-8 leading-relaxed"
              help="Başlığın altındaki kısa açıklama paragrafı."
              textStyle={styles?.hero_body}
            />
            <div className="animate-hero-delay-2 flex flex-wrap gap-3">
              <Button href="/iletisim" size="lg" className="w-full sm:w-auto justify-center">
                <MessageSquare size={18} />
                Teklif Al
              </Button>
              <Button
                href="/hizmetler"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                Ürünleri İncele
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          {/* No opacity animation on LCP media — that delayed paint by ~0.7s */}
          <div className="relative order-2 lg:order-2 min-w-0">
            <div className="relative aspect-[16/11] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-square max-h-[42svh] sm:max-h-none mx-auto w-full rounded-2xl overflow-hidden border border-border bg-card">
              {enabled ? (
                <EditableImage
                  contentKey="hero_image"
                  value={bg}
                  fallback={DEFAULT_HERO_IMAGE}
                  alt="Global Reklam hero"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  imgClassName="object-cover object-center"
                  help="Ana sayfa sağ görsel. Editörde “Arka plan görseli” düğmesine tıklayın."
                />
              ) : (
                <HeroMedia src={bg} alt="Global Reklam hero" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
            </div>
            <div
              className="absolute -inset-4 -z-10 rounded-[1.75rem] opacity-40 blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(245,197,24,0.35), transparent 65%)",
              }}
            />
          </div>
        </div>
      </div>

      <ValueProps items={valueProps} styles={styles} />
    </section>
  );
}
