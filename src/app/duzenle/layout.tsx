import { EditorProvider } from "@/components/editor/EditorProvider";
import { EditorChrome } from "@/components/editor/EditorChrome";
import { EditorHelp } from "@/components/editor/EditorHelp";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/store/StoreProvider";
import { getNavLinks, getSiteSettings } from "@/lib/site";
import { getContentMap } from "@/lib/site-content";
import { mapNavToEditor, toEditorHref } from "@/lib/editor-href";
import { getActiveCategories } from "@/lib/catalog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Siteyi Düzenle | Global Reklam",
  robots: { index: false, follow: false },
};

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navLinks, content, categories] = await Promise.all([
    getSiteSettings(),
    getNavLinks(),
    getContentMap(["footer_blurb"]),
    getActiveCategories(),
  ]);
  const editorNav = mapNavToEditor(navLinks);
  const menuCategories = categories.map((c) => ({
    href: toEditorHref(`/hizmetler/${c.slug}`),
    label: c.name,
  }));

  return (
    <EditorProvider enabled>
      <EditorChrome>
        <StoreProvider>
          <div className="[&_header]:!top-14 [&_header]:z-[60]">
            <Header
              settings={settings}
              navLinks={editorNav}
              categories={menuCategories}
            />
            <main
              id="main-content"
              className="min-h-screen pt-[8.5rem] sm:pt-[9rem] lg:pt-[9.5rem] pb-24 md:pb-8"
            >
              {children}
            </main>
            <Footer
              settings={settings}
              navLinks={editorNav}
              footerBlurb={content.footer_blurb}
            />
          </div>
          <EditorHelp />
        </StoreProvider>
      </EditorChrome>
    </EditorProvider>
  );
}
