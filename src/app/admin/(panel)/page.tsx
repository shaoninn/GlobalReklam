import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  Package,
  ShoppingBag,
  MessageSquare,
  Images,
  AlertTriangle,
  Pencil,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [products, orders, unreadMessages, projects, pendingOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.project.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
    ]);
  return { products, orders, unreadMessages, projects, pendingOrders };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Ürünler",
      value: stats.products,
      href: "/admin/urunler",
      icon: Package,
      hint: "Katalogdaki tüm ürünler",
    },
    {
      label: "Bekleyen Sipariş",
      value: stats.pendingOrders,
      href: "/admin/siparisler",
      icon: ShoppingBag,
      hint: "Onay bekleyen teklif talepleri",
    },
    {
      label: "Okunmamış Mesaj",
      value: stats.unreadMessages,
      href: "/admin/mesajlar",
      icon: MessageSquare,
      hint: "İletişim formundan gelenler",
    },
    {
      label: "Projeler",
      value: stats.projects,
      href: "/admin/projeler",
      icon: Images,
      hint: "Portföy / çalışmalar",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Hoş Geldiniz</h1>
      <p className="text-muted mb-8">
        Bu panelden sitenizin tüm içeriklerini yönetebilirsiniz. Sol menüden
        ilgili bölüme geçin. Her sayfada sarı uyarı kutuları size yol gösterir.
      </p>

      <Link
        href="/duzenle"
        className="admin-card mb-8 p-6 flex flex-col sm:flex-row sm:items-center gap-4 border-orange/40 hover:border-orange transition-colors"
      >
        <div className="w-12 h-12 rounded-lg bg-orange/15 text-orange flex items-center justify-center shrink-0">
          <Pencil size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-xl font-bold text-white mb-1">
            Siteyi Düzenle
          </p>
          <p className="text-sm text-[#888] leading-relaxed">
            Canlı sayfada metin ve görsellere tıklayarak düzenleyin — Wix tarzı
            editör. Ürün / proje / kategori ekleme buradan yapılmaz.
          </p>
        </div>
        <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-orange text-black text-sm font-bold uppercase tracking-wider shrink-0">
          Aç
        </span>
      </Link>

      <div className="admin-warning mb-8 flex gap-3 items-start">
        <AlertTriangle size={20} className="shrink-0 mt-0.5" />
        <div>
          <strong>Önemli:</strong> Silme işlemleri geri alınamaz. Ürün veya
          kategori silmeden önce emin olun. Varsayılan şifreyi (
          <code className="text-orange">admin123</code>) mümkün olan en kısa
          sürede değiştirin. Online ödeme henüz aktif değildir — siparişler
          teklif talebi olarak kaydedilir.
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="admin-card p-5 hover:border-orange/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={22} className="text-orange" />
                <span className="font-display text-3xl font-bold">
                  {card.value}
                </span>
              </div>
              <p className="font-semibold text-white">{card.label}</p>
              <p className="text-xs text-[#666] mt-1">{card.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="admin-card p-6">
        <h2 className="font-display text-xl font-bold mb-4">Hızlı Başlangıç</h2>
        <ol className="space-y-3 text-sm text-[#ccc] list-decimal list-inside">
          <li>
            <Link href="/duzenle" className="text-orange hover:underline">
              Siteyi Düzenle
            </Link>
            {" "}— ana sayfa, hakkımızda, iletişim metinleri ve görseller
          </li>
          <li>
            <Link href="/admin/ayarlar" className="text-orange hover:underline">
              Ayarlar
            </Link>
            {" "}— telefon, adres, WhatsApp numarası
          </li>
          <li>
            <Link href="/admin/urunler" className="text-orange hover:underline">
              Ürünler
            </Link>
            {" "}— fiyat, stok, görsel ekleme/güncelleme
          </li>
          <li>
            <Link href="/admin/projeler" className="text-orange hover:underline">
              Projeler
            </Link>
            {" "}— ana sayfa kaydırıcısında görünen çalışmalar
          </li>
          <li>
            <Link href="/admin/siparisler" className="text-orange hover:underline">
              Siparişler
            </Link>
            {" "}— gelen teklif taleplerini onaylayın veya iptal edin
          </li>
        </ol>
      </div>
    </div>
  );
}
