import { NeonBuilderStudio } from "@/components/shop/NeonBuilderStudio";
import { SiteLink } from "@/components/ui/SiteLink";
import { getSiteSettings } from "@/lib/site";
import { parseRatesFromSettings } from "@/lib/price-formula";
import { prisma } from "@/lib/db";

export const revalidate = 60;


export const metadata = {
  alternates: { canonical: "/neon-tasarla" },
  title: "Neon Tasarla | Global Reklam",
  description:
    "Yazı, font, renk, backboard ve ölçü seçerek canlı neon önizleme ve fiyat tahmini alın.",
};

export default async function NeonDesignPage() {
  const [settings, rateRows] = await Promise.all([
    getSiteSettings(),
    prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            "price_per_cm2",
            "price_per_letter",
            "price_per_neon_m",
            "price_base_mount",
            "price_backboard",
          ],
        },
      },
    }),
  ]);

  const rateMap = Object.fromEntries(rateRows.map((r) => [r.key, r.value]));
  const rates = parseRatesFromSettings(rateMap);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-muted mb-6">
          <SiteLink href="/" className="hover:text-orange">
            Anasayfa
          </SiteLink>
          <span className="mx-2">/</span>
          <span className="text-white">Neon Tasarla</span>
        </nav>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
          Neonunu tasarla
        </h1>
        <p className="text-muted max-w-2xl mb-10">
          Yazını yaz, font ve renk seç, boyutu ayarla — anlık önizleme ve tahmini
          fiyat. Kesin teklif keşif sonrası verilir. İletişim:{" "}
          <a href={`tel:${settings.phoneRaw}`} className="text-orange">
            {settings.phone}
          </a>
        </p>
        <NeonBuilderStudio rates={rates} />
      </div>
    </section>
  );
}
