import { prisma } from "@/lib/db";
import { generateOrderNo } from "@/lib/api";
import { sendOrderConfirmation } from "@/lib/mail";
import { writeAuditLog } from "@/lib/audit";

export interface QuoteItemInput {
  productId: string;
  quantity: number;
  widthCm?: number | null;
  heightCm?: number | null;
  color?: string | null;
  optionsNote?: string | null;
}

export async function createQuoteOrder(input: {
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  note?: string | null;
  source?: string;
  items: QuoteItemInput[];
  ip?: string | null;
}) {
  const productIds = input.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  const items = [];
  for (const item of input.items) {
    const product = byId[item.productId];
    if (!product) {
      throw new Error("Sepette geçersiz veya pasif ürün var. Sepeti güncelleyin.");
    }
    if (!product.inStock) {
      throw new Error(`${product.name} şu an teklife kapalı.`);
    }
    items.push({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
      widthCm: item.widthCm ?? null,
      heightCm: item.heightCm ?? null,
      color: item.color?.trim() || null,
      optionsNote: item.optionsNote?.trim() || null,
    });
  }

  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const phone = input.phone.trim();

  const customer = await prisma.customer.upsert({
    where: { phone },
    create: {
      name: input.name.trim(),
      phone,
      email: input.email || null,
      notes: null,
    },
    update: {
      name: input.name.trim(),
      email: input.email || undefined,
    },
  });

  const order = await prisma.order.create({
    data: {
      orderNo: generateOrderNo(),
      name: input.name.trim(),
      phone,
      email: input.email || null,
      address: input.address || null,
      note: input.note || null,
      source: input.source || "WEB",
      status: "PENDING",
      total,
      customerId: customer.id,
      items: { create: items },
    },
    include: { items: true },
  });

  await writeAuditLog({
    action: "order.create",
    entity: "Order",
    entityId: order.id,
    meta: { orderNo: order.orderNo, source: order.source, total },
    ip: input.ip,
  });

  const mail = await sendOrderConfirmation({
    orderNo: order.orderNo,
    name: order.name,
    phone: order.phone,
    email: order.email,
    address: order.address,
    note: order.note,
    total: order.total,
    items: order.items,
  });

  return { order, mail };
}
