import { notFound } from "next/navigation";
import { SiteLink } from "@/components/ui/SiteLink";
import { prisma } from "@/lib/db";
import { getSectorBySlug } from "@/lib/sectors";
import { CatalogProductGrid } from "@/components/shop/CatalogProductGrid";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: "Sektör | Global Reklam" };
  return {
    title: `${sector.title} Tabela Çözümleri | Global Reklam`,
    description: sector.description,
  };
}

export default async function SectorDetailPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: { slug: { in: sector.categorySlugs }, isActive: true },
    },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-muted mb-6">
          <SiteLink href="/" prefetch={false} className="hover:text-orange">
            Anasayfa
          </SiteLink>
          <span className="mx-2">/</span>
          <SiteLink href="/sektor" prefetch={false} className="hover:text-orange">
            Sektörler
          </SiteLink>
          <span className="mx-2">/</span>
          <span className="text-white">{sector.title}</span>
        </nav>

        <div className="mb-8">
          <p className="text-xs text-orange uppercase tracking-wider mb-2">
            {sector.heroHint}
          </p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
            {sector.title}
          </h1>
          <p className="text-muted max-w-2xl">{sector.description}</p>
        </div>

        <CatalogProductGrid products={products} />
      </div>
    </section>
  );
}
