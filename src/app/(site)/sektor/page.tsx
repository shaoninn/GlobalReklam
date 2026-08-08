import { SiteLink } from "@/components/ui/SiteLink";
import { SECTORS } from "@/lib/sectors";

export const revalidate = 60;


export const metadata = {
  alternates: { canonical: "/sektor" },
  title: "Sektörel Tabela Çözümleri | Global Reklam",
  description: "Sektörünüze özel tabela, neon ve branda çözümleri.",
};

export default function SectorsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
          Sektörel Çözümler
        </h1>
        <p className="text-muted mb-10 max-w-2xl">
          İşletmenizin türüne göre hazırladığımız tabela ve neon ürün grupları.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map((sector) => (
            <SiteLink
              key={sector.slug}
              href={`/sektor/${sector.slug}`}
              prefetch={false}
              className="group block bg-card border border-border hover:border-orange/50 rounded-xl p-6 transition-colors"
            >
              <h2 className="font-display text-lg font-bold text-white group-hover:text-orange transition-colors mb-2">
                {sector.title}
              </h2>
              <p className="text-sm text-muted mb-3">{sector.description}</p>
              <span className="text-xs text-orange uppercase tracking-wider">
                {sector.heroHint}
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
