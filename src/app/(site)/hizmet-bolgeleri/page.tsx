import type { Metadata } from "next";
import { SiteLink } from "@/components/ui/SiteLink";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hizmet Bölgeleri",
  description:
    "Global Reklam Antalya hizmet bölgeleri: Çakırlar, Konyaaltı, Kepez, Lara, Belek, Serik ve çevresi tabela montajı.",
  alternates: { canonical: "/hizmet-bolgeleri" },
};

const AREAS = [
  {
    title: "Çakırlar & Konyaaltı",
    desc: "Merkezimiz Çakırlar’da. Konyaaltı hattında apart otel, kafe ve ofis tabela uygulamaları.",
  },
  {
    title: "Lara & Muratpaşa",
    desc: "Lara ve Güzeloba hattında cephe, totem ve mağaza tabelaları.",
  },
  {
    title: "Kepez & Aksu",
    desc: "Sanayi ve cadde üzeri ışıklı tabela, araç kaplama ve yönlendirme sistemleri.",
  },
  {
    title: "Serik & Belek",
    desc: "Otel, restoran ve turizm işletmeleri için kutu harf, totem ve iç mekân markalama.",
  },
];

export default function ServiceAreasPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-orange text-xs font-semibold tracking-[0.3em] uppercase mb-2">
          Hizmet alanları
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Antalya genelinde tabela & montaj
        </h1>
        <p className="text-muted max-w-2xl mb-12">
          Global Reklam, Antalya merkez ve çevre ilçelerde keşif, üretim ve montaj
          sunar. Bölgenize özel örnek projeler için portföyümüze bakın veya
          ücretsiz keşif talep edin.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="border border-border p-6 bg-card rounded-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-orange" />
                <h2 className="font-display text-lg font-bold text-white">
                  {area.title}
                </h2>
              </div>
              <p className="text-sm text-muted leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="/iletisim">Ücretsiz Keşif</Button>
          <Button href="/projeler" variant="outline">
            Projeleri İncele
          </Button>
          <SiteLink
            href="/hizmetler"
            className="text-sm text-orange self-center hover:underline"
          >
            Kategorilere git →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
