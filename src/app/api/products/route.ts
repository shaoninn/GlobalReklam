import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Ürün adı en az 2 karakter"),
  slug: z.string().min(2, "Slug en az 2 karakter"),
  description: z.string().optional().nullable(),
  shortDesc: z.string().optional().nullable(),
  price: z.number().min(0, "Fiyat 0 veya üzeri olmalı"),
  image: z.string().nullable().optional(),
  images: z.string().optional(),
  specs: z.string().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  inStock: z.boolean().optional(),
  categoryId: z.string().min(1, "Kategori seçin"),
});

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("categoryId");
  const session = await getSession();
  const activeOnly = !session;

  const products = await prisma.product.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(activeOnly ? { isActive: true } : {}),
    },
    orderBy: { sortOrder: "asc" },
    include: { category: true },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = productSchema.parse(body);

    const existing = await prisma.product.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu slug zaten kullanılıyor." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({ data });
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Ürün oluşturulamadı" }, { status: 500 });
  }
}
