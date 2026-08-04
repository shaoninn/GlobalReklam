import { Hero } from "@/components/home/Hero";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { FeatureBar } from "@/components/home/FeatureBar";
import { ShippingBanner } from "@/components/home/ShippingBanner";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { CTASection } from "@/components/home/CTASection";
import { InstagramStrip } from "@/components/shop/InstagramStrip";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { loadHomePageData } from "@/lib/home-content";
import { SiteLink } from "@/components/ui/SiteLink";

export async function HomePageView() {
  const data = await loadHomePageData();

  return (
    <>
      <Hero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        body={data.heroBody}
        image={data.heroImage}
        valueProps={data.valueProps}
      />
      <CategoriesGrid
        categories={data.categories}
        title={data.servicesTitle}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-2 flex flex-wrap gap-4">
        <SiteLink
          href="/neon-tasarla"
          className="text-sm text-orange hover:underline"
        >
          Neonunu canlı tasarla →
        </SiteLink>
        <SiteLink
          href="/sektor"
          className="text-sm text-orange hover:underline"
        >
          Sektörünüze özel çözümler →
        </SiteLink>
      </div>
      <FeaturedProducts
        products={data.products}
        title={data.featuredProductsTitle}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyViewed allProducts={data.recentPool} />
      </div>
      <WhyUsSection projects={data.projects} stats={data.stats} />
      <FeatureBar />
      <ShippingBanner title={data.shippingBannerTitle} />
      <InstagramStrip
        instagramUrl={data.instagramUrl}
        posts={data.instagramPosts}
        live={data.instagramLive}
      />
      <ProcessSteps
        sectionTitle={data.processTitle}
        sectionDesc={data.processDesc}
        steps={data.processSteps}
      />
      <Testimonials
        googleReviewsUrl={data.googleReviewsUrl}
        sectionTitle={data.testimonialTitle}
        sectionDesc={data.testimonialDesc}
        items={data.testimonials}
      />
      <FaqSection sectionTitle={data.faqTitle} items={data.faqs} />
      <CTASection title={data.ctaTitle} />
    </>
  );
}
