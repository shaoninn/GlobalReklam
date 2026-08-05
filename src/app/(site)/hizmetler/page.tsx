import { SiteLink } from "@/components/ui/SiteLink";
import { getActiveCategories } from "@/lib/catalog";
import { getContentMap } from "@/lib/site-content";
import { PageIntro } from "@/components/editor/PageIntro";
import { CatalogAdminHint } from "@/components/editor/CatalogAdminHint";
import {
  Signpost,
  Box,
  Zap,
  Columns,
  Lamp,
  Scissors,
  Car,
  Flag,
  Building,
  Layers,
  Printer,
  Home,
  Map,
  Fence,
} from "lucide-react";

export const revalidate = 60;


const iconMap: Record<string, React.ElementType> = {
  totem: Columns,
  tabela: Signpost,
  "kutu-harf": Box,
  neon: Zap,
  fener: Lamp,
  pleksi: Layers,
  paslanmaz: Box,
  cnc: Scissors,
  uv: Printer,
  cephe: Home,
  arac: Car,
  yonlendirme: Map,
  mekan: Building,
  germe: Flag,
  branda: Flag,
  insaat: Fence,
};

export const metadata = {
  title: "Hizmetlerimiz | Global Reklam",
  description: "Tabela ve reklam çözümlerimizi keşfedin.",
};

export default async function ServicesPage() {
  const [categories, map] = await Promise.all([
    getActiveCategories(),
    getContentMap([
      "services_page_eyebrow",
      "services_page_title",
      "services_page_intro",
    ]),
  ]);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageIntro
          eyebrowKey="services_page_eyebrow"
          titleKey="services_page_title"
          introKey="services_page_intro"
          eyebrow={map.services_page_eyebrow || "Hizmetler"}
          title={map.services_page_title || "Tabela ve Reklam Çözümlerimiz"}
          intro={
            map.services_page_intro ||
            "Geniş ürün yelpazemizle markanıza değer katıyoruz. Keşif, tasarım, üretim ve montaj süreçlerini tek çatı altında yönetiyoruz."
          }
        />

        <CatalogAdminHint
          title="Ürünler"
          adminHref="/admin/urunler"
          adminLabel="Admin → Ürünler"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon || "tabela"] || Signpost;
            return (
              <SiteLink
                key={category.id}
                href={`/hizmetler/${category.slug}`}
                className="group flex items-start gap-4 p-6 bg-card border border-border hover:border-orange/50 hover:bg-orange/5 transition-all"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold text-white group-hover:text-orange transition-colors mb-1">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-xs text-muted line-clamp-2 mb-2">
                      {category.description}
                    </p>
                  )}
                  <span className="text-xs text-orange">
                    {category._count.products} ürün
                  </span>
                </div>
              </SiteLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
