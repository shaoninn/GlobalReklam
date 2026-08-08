import { LegalShell } from "@/components/legal/LegalShell";
import { COMPANY } from "@/lib/legal";

export const metadata = {
  alternates: { canonical: "/mesafeli-satis" },
  title: "Mesafeli Satış Sözleşmesi",
  description: "Global Reklam mesafeli satış ve teklif süreci bilgilendirmesi.",
};

export default function DistanceSalesPage() {
  return (
    <LegalShell title="Mesafeli Satış Sözleşmesi">
      <p>
        6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
        Sözleşmeler Yönetmeliği kapsamında bilgilendirme metnidir.{" "}
        {COMPANY.name} öncelikle özel ölçü / üretim teklifi ile çalışır; site
        üzerinden anlık ödeme alınmaz.
      </p>
      <h2>Satıcı / hizmet sağlayıcı</h2>
      <p>
        {COMPANY.name}
        <br />
        {COMPANY.address}
        <br />
        {COMPANY.email} · {COMPANY.phone}
      </p>
      <h2>Sözleşmenin konusu</h2>
      <p>
        Tabela, kutu harf, neon, totem, araç kaplama, baskı ve montaj gibi
        reklam ürün / hizmetleridir. Ürün özellikleri teklif formunda ve
        onaylanan proforma / teklifte belirtilir.
      </p>
      <h2>Sipariş ve ödeme</h2>
      <p>
        Müşteri teklif listesi veya iletişim formu ile talep iletir.{" "}
        {COMPANY.name} keşif / ölçü sonrası yazılı teklif sunar. Ödeme
        yöntemleri (havale, kapora vb.) teklifte yer alır; web sitesi kart
        ödemesi almaz.
      </p>
      <h2>Teslimat ve montaj</h2>
      <p>
        Süreç, malzeme tedariki ve saha şartlarına göre teklifte yazılan süre
        içinde tamamlanır. Detaylar Teslimat sayfasındadır.
      </p>
      <h2>Cayma hakkı</h2>
      <p>
        Tüketicinin özel istekleri veya kişisel ihtiyaçları doğrultusunda
        üretilen (ölçüye özel) mal ve hizmetlerde cayma hakkı sınırlı olabilir.
        Standart ürünlerde yasal süreler teklif ve fatura koşullarına göre
        uygulanır. Ayrıntı için İade Politikası sayfasına bakın.
      </p>
      <h2>Uyuşmazlık</h2>
      <p>
        Tüketici uyuşmazlıklarında Tüketici Hakem Heyetleri ve Tüketici
        Mahkemeleri yetkilidir.
      </p>
    </LegalShell>
  );
}
