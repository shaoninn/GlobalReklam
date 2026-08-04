"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EditableText } from "@/components/editor/EditableText";
import { EditableImage } from "@/components/editor/EditableImage";
import { ValueProps, type ValuePropItem } from "@/components/home/ValueProps";

interface HeroProps {
  title: string;
  subtitle: string;
  body?: string;
  image?: string;
  valueProps?: ValuePropItem[];
}

const DEFAULT_HERO = "/images/hero/hero-global.png";
const DEFAULT_BODY =
  "CNC kesim, neon LED, kutu harf ve dijital baskı ile markanızı Antalya'da görünür kılıyoruz. Keşiften montaja tek ekip.";

export function Hero({ title, subtitle, body, image, valueProps }: HeroProps) {
  const words = title.split(" ");
  const highlightIndex = words.findIndex((w) => /çözüm|tabela/i.test(w));
  const bg = image || DEFAULT_HERO;

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center min-h-[calc(100svh-5.5rem)] lg:min-h-[calc(100svh-6rem)] py-10 lg:py-14">
          <div className="relative z-10 order-2 lg:order-1">
            <EditableText
              contentKey="hero_subtitle"
              value={subtitle}
              as="p"
              block
              multiline
              className="animate-hero font-display text-orange text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
              help="Hero üstündeki sarı kısa metin."
            />
            <EditableText
              contentKey="hero_title"
              value={title}
              as="h1"
              block
              className="animate-hero-delay font-display text-4xl sm:text-5xl lg:text-[3.35rem] xl:text-6xl font-bold leading-[1.08] mb-5 text-white"
              help="Ana başlık. “Çözümler” veya “Tabela” kelimesi sarı vurgulanır."
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

          <div className="relative order-1 lg:order-2 animate-hero">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-square rounded-2xl overflow-hidden border border-border bg-card">
              <EditableImage
                contentKey="hero_image"
                value={bg}
                fallback={DEFAULT_HERO}
                alt="Global Reklam hero"
                fill
                imgClassName="object-cover object-center"
                help="Ana sayfa sağ görsel. Editörde “Arka plan görseli” düğmesine tıklayın."
              />
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

      <ValueProps items={valueProps} />
    </section>
  );
}
