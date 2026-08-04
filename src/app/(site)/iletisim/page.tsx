import { getSiteSettings } from "@/lib/site";
import { ContactPageView } from "@/components/contact/ContactPageView";
import { loadContactPageData } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "İletişim | Global Reklam",
  description: "Global Reklam iletişim bilgileri ve teklif formu.",
};

export default async function ContactPage() {
  const [settings, data] = await Promise.all([
    getSiteSettings(),
    loadContactPageData(),
  ]);

  return <ContactPageView data={data} settings={settings} />;
}
