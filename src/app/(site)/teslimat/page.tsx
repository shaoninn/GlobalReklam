import { LegalShell } from "@/components/legal/LegalShell";
import { COMPANY } from "@/lib/legal";

export const metadata = {
  alternates: { canonical: "/teslimat" },
  title: "Teslimat",
  description: "Global Reklam teslimat, montaj ve süre bilgilendirmesi.",
};

export default function DeliveryPage() {
  return (
    <LegalShell title="Teslimat ve Montaj">
      <p>
        {COMPANY.name} Antalya ve çevresinde üretim + saha montajı sunar.
        Teslimat koşulları her teklifte ayrıca yazılır.
      </p>
      <h2>Hizmet bölgesi</h2>
      <p>
        Merkez: Muratpaşa / Antalya. Kepez, Konyaaltı, Lara ve çevre ilçelerde
        keşif ve montaj yapılır. Şehir dışı projeler ayrıca planlanır.
      </p>
      <h2>Süreç</h2>
      <ol>
        <li>Keşif / ölçü ve ihtiyaç analizi</li>
        <li>Tasarım onayı ve yazılı teklif</li>
        <li>Üretim (malzemeye göre değişir)</li>
        <li>Montaj randevusu ve saha uygulaması</li>
      </ol>
      <h2>Süreler</h2>
      <p>
        Örnek süreler ürün tipine göre değişir (ör. basit tabela birkaç gün,
        büyük cephe / totem daha uzun). Kesin süre onaylı teklifte yer alır.
      </p>
      <h2>Montaj şartları</h2>
      <p>
        Müşteri, montaj alanına erişim, elektrik / izin ve güvenlik
        gerekliliklerini sağlar. Engellenen randevularda ek ücret doğabilir.
      </p>
      <h2>İletişim</h2>
      <p>
        {COMPANY.phone} · {COMPANY.email}
      </p>
    </LegalShell>
  );
}
