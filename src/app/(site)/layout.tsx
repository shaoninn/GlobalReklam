import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { StoreProvider } from "@/store/StoreProvider";
import { getNavLinks, getSiteSettings } from "@/lib/site";
import { getContentMap } from "@/lib/site-content";

/** Build sırasında DB şart değil; istek anında çeker. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Parallel OK with pool≥2; both hit 60s memory cache after first warm.
  const [settings, navLinks, content] = await Promise.all([
    getSiteSettings(),
    getNavLinks(),
    getContentMap(["footer_blurb"]),
  ]);

  return (
    <StoreProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-orange focus:text-black focus:px-3 focus:py-2"
      >
        İçeriğe geç
      </a>
      <Header settings={settings} navLinks={navLinks} />
      <main id="main-content" className="min-h-screen pt-[5.5rem] sm:pt-[6rem] pb-24 md:pb-8">
        {children}
      </main>
      <Footer
        settings={settings}
        navLinks={navLinks}
        footerBlurb={content.footer_blurb}
      />
      <FloatingContact
        phone={settings.phone}
        whatsappUrl={settings.whatsappUrl}
      />
    </StoreProvider>
  );
}
