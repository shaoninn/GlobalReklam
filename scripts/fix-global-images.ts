/**
 * Force about gallery + hero away from any DMD leftovers.
 * Run: npx tsx scripts/fix-global-images.ts
 */
import "dotenv/config";
import { prisma } from "../src/lib/db";

const rows: { key: string; title: string; content: string }[] = [
  {
    key: "hero_image",
    title: "Hero Görsel",
    content: "/images/hero/hero-global.png",
  },
  {
    key: "about_image_1",
    title: "Hakkımızda Görsel 1",
    content: "/images/portfolio/cmk-ecu-completed.png",
  },
  {
    key: "about_image_2",
    title: "Hakkımızda Görsel 2",
    content: "/images/portfolio/acity-avm-tabela.png",
  },
  {
    key: "about_image_3",
    title: "Hakkımızda Görsel 3",
    content: "/images/portfolio/kurye-garaji-germe.png",
  },
  {
    key: "about_image_4",
    title: "Hakkımızda Görsel 4",
    content: "/images/portfolio/gulbag-totem-3.png",
  },
];

async function main() {
  for (const row of rows) {
    await prisma.siteContent.upsert({
      where: { key: row.key },
      create: row,
      update: { content: row.content, title: row.title },
    });
    console.log("upsert", row.key, "->", row.content);
  }

  const blogs = await prisma.blogPost.findMany({
    select: { id: true, slug: true, image: true },
  });
  for (const b of blogs) {
    if (b.image && /work-|dmd|\/projects\//i.test(b.image)) {
      await prisma.blogPost.update({
        where: { id: b.id },
        data: { image: "/images/portfolio/cmk-ecu-completed.png" },
      });
      console.log("blog fixed", b.slug);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
