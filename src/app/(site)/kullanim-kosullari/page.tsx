import { LegalShell } from "@/components/legal/LegalShell";
import { COMPANY } from "@/lib/legal";

export const metadata = {
  alternates: { canonical: "/kullanim-kosullari" },
  title: "Kullanım Koşulları",
  description: "Global Reklam web sitesi kullanım koşulları.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Kullanım Koşulları">
      <p>
        Bu web sitesini ({COMPANY.site}) kullanarak aşağıdaki koşulları kabul
        etmiş sayılırsınız. Koşulları kabul etmiyorsanız lütfen siteyi
        kullanmayın.
      </p>
      <h2>Hizmetin niteliği</h2>
      <p>
        {COMPANY.name}; tabela, reklam üretimi, tasarım, keşif ve montaj
        hizmetleri sunar. Sitede gösterilen fiyatlar örnek / başlangıç
        niteliklidir; kesin teklif keşif ve ölçü sonrası verilir. Online ödeme
        alınmaz; sipariş teklif onayı ile ilerler.
      </p>
      <h2>İçerik ve fikri mülkiyet</h2>
      <p>
        Sitedeki metin, görsel, logo ve tasarımlar {COMPANY.name}&apos;a veya
        lisans verenlere aittir. İzinsiz kopyalama, çoğaltma veya ticari kullanım
        yasaktır.
      </p>
      <h2>Kullanıcı yükümlülükleri</h2>
      <p>
        İletişim ve teklif formlarında doğru bilgi vermeyi taahhüt edersiniz.
        Siteyi hukuka aykırı, zararlı veya sistem güvenliğini bozacak şekilde
        kullanamazsınız.
      </p>
      <h2>Sorumluluk sınırı</h2>
      <p>
        Site içeriği bilgilendirme amaçlıdır. Teknik arıza, gecikme veya üçüncü
        taraf bağlantılardan doğan dolaylı zararlardan {COMPANY.name} sorumlu
        tutulamaz. Üretim ve montaj koşulları yazılı teklifte belirtilir.
      </p>
      <h2>Değişiklikler</h2>
      <p>
        Bu koşulları güncelleyebiliriz. Güncel metin bu sayfada yayınlandığı
        andan itibaren geçerlidir.
      </p>
      <h2>İletişim</h2>
      <p>
        {COMPANY.email} · {COMPANY.phone}
        <br />
        {COMPANY.address}
      </p>
    </LegalShell>
  );
}
