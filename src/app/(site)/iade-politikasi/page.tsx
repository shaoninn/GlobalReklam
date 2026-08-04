import { LegalShell } from "@/components/legal/LegalShell";
import { COMPANY } from "@/lib/legal";

export const metadata = {
  title: "İade Politikası",
  description: "Global Reklam iade, iptal ve değişiklik koşulları.",
};

export default function ReturnPolicyPage() {
  return (
    <LegalShell title="İade Politikası">
      <p>
        {COMPANY.name} ürünleri çoğunlukla ölçüye özel üretilir. Bu nedenle
        iade ve iptal kuralları standart e-ticaretten farklıdır.
      </p>
      <h2>Özel üretim (ölçüye özel)</h2>
      <p>
        Onaylanan tasarım, ölçü ve renk ile üretime alınan işlerde; üretim
        başladıktan sonra iade kabul edilmez. Üretim öncesi iptalde yapılan
        kapora / avans kesintisi teklifte belirtilen oranda uygulanabilir.
      </p>
      <h2>Üretim / montaj hatası</h2>
      <p>
        Firmamızdan kaynaklanan ölçü, üretim veya montaj hatalarında ürün
        ücretsiz düzeltilir veya yenilenir. Müşteri kaynaklı ölçü / onay
        hatalarında ek maliyet teklif edilir.
      </p>
      <h2>Standart / stok ürünler</h2>
      <p>
        Stoktan verilen (varsa) standart ürünlerde, kullanılmamış ve orijinal
        halinde iade talepleri yazılı olarak {COMPANY.email} adresine
        iletilmelidir. İnceleme sonrası süreç netleştirilir.
      </p>
      <h2>Başvuru</h2>
      <p>
        İade / iptal taleplerinizi sipariş veya teklif referansınızla birlikte{" "}
        {COMPANY.email} veya {COMPANY.phone} üzerinden iletin.
      </p>
    </LegalShell>
  );
}
