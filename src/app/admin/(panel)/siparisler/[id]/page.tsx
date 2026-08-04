import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { OrderStatusActions } from "./OrderStatusActions";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  PENDING: "Beklemede",
  CONFIRMED: "Onaylandı",
  CANCELLED: "İptal",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/siparisler" className="text-sm text-orange hover:underline mb-4 inline-block">
        ← Siparişlere dön
      </Link>
      <h1 className="font-display text-3xl font-bold mb-2">{order.orderNo}</h1>
      <p className="text-sm text-[#888] mb-6">
        Durum:{" "}
        <strong className="text-white">
          {statusLabel[order.status] || order.status}
        </strong>
      </p>
      <div className="admin-warning mb-6">
        Bu kayıt teklif talebidir. Online ödeme yoktur — müşteriyle telefon veya
        WhatsApp üzerinden iletişime geçin.
      </div>

      <div className="admin-card p-5 mb-6 space-y-2 text-sm">
        <p>
          <span className="text-[#888]">Ad:</span> {order.name}
        </p>
        <p>
          <span className="text-[#888]">Telefon:</span> {order.phone}
        </p>
        {order.email && (
          <p>
            <span className="text-[#888]">E-posta:</span> {order.email}
          </p>
        )}
        {order.address && (
          <p>
            <span className="text-[#888]">Adres:</span> {order.address}
          </p>
        )}
        {order.note && (
          <p>
            <span className="text-[#888]">Not:</span> {order.note}
          </p>
        )}
        <p>
          <span className="text-[#888]">Kaynak:</span>{" "}
          {order.source === "WHATSAPP" ? "WhatsApp" : "Web form"}
        </p>
      </div>

      <div className="admin-card p-5 mb-6">
        <h2 className="font-semibold mb-3">Kalemler</h2>
        <ul className="space-y-2 text-sm">
          {order.items.map((item) => {
            const dims = [
              item.widthCm != null ? `En ${item.widthCm} cm` : null,
              item.heightCm != null ? `Boy ${item.heightCm} cm` : null,
              item.color || null,
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <li key={item.id} className="flex justify-between gap-4">
                <span>
                  {item.productName} × {item.quantity}
                  {dims ? (
                    <span className="block text-xs text-[#888]">{dims}</span>
                  ) : null}
                </span>
                <span className="text-orange shrink-0">
                  {formatPrice(item.lineTotal)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-[#333] mt-4 pt-4 flex justify-between font-bold">
          <span>Toplam</span>
          <span className="text-orange">{formatPrice(order.total)}</span>
        </div>
      </div>

      <OrderStatusActions id={order.id} status={order.status} />
    </div>
  );
}
