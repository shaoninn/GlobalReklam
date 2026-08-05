import { AboutPageView } from "@/components/about/AboutPageView";
import { loadAboutPageData } from "@/lib/page-content";

export const revalidate = 60;


export const metadata = {
  title: "Hakkımızda | Global Reklam",
  description: "Global Reklam hakkında bilgi edinin. Misyon, vizyon ve değerlerimiz.",
};

export default async function AboutPage() {
  const data = await loadAboutPageData();
  return <AboutPageView data={data} />;
}
