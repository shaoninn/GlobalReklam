import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { HomeCategoriesSection } from "@/components/home/HomeCategoriesSection";
import { HomeQuickLinks } from "@/components/home/HomeQuickLinks";
import { InstagramStrip } from "@/components/shop/InstagramStrip";
import { loadHomePageData } from "@/lib/home-content";

/** Below-the-fold client sections — separate JS chunks (SSR HTML retained). */
const FeaturedProducts = dynamic(() =>
  import("@/components/home/FeaturedProducts").then((m) => m.FeaturedProducts)
);
const RecentlyViewed = dynamic(() =>
  import("@/components/shop/RecentlyViewed").then((m) => m.RecentlyViewed)
);
const WhyUsSection = dynamic(() =>
  import("@/components/home/WhyUsSection").then((m) => m.WhyUsSection)
);
const FeatureBar = dynamic(() =>
  import("@/components/home/FeatureBar").then((m) => m.FeatureBar)
);
const ShippingBanner = dynamic(() =>
  import("@/components/home/ShippingBanner").then((m) => m.ShippingBanner)
);
const ProcessSteps = dynamic(() =>
  import("@/components/home/ProcessSteps").then((m) => m.ProcessSteps)
);
const Testimonials = dynamic(() =>
  import("@/components/home/Testimonials").then((m) => m.Testimonials)
);
const FaqSection = dynamic(() =>
  import("@/components/home/FaqSection").then((m) => m.FaqSection)
);
const CTASection = dynamic(() =>
  import("@/components/home/CTASection").then((m) => m.CTASection)
);

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
        styles={data.styles}
      />
      <HomeCategoriesSection
        categories={data.categories}
        title={data.servicesTitle}
        offset={data.sectionCategoriesOffset}
        titleStyle={data.styles?.["services_section_title"]}
      />
      <HomeQuickLinks
        neonLabel={data.neonLinkLabel}
        sectorLabel={data.sectorLinkLabel}
        styles={data.styles}
      />
      <FeaturedProducts
        products={data.products}
        title={data.featuredProductsTitle}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyViewed allProducts={data.recentPool} />
      </div>
      <WhyUsSection projects={data.projects} stats={data.stats} />
      <FeatureBar
        items={data.featureBarItems}
        sectionOffset={data.sectionFeatureBarOffset}
        styles={data.styles}
      />
      <ShippingBanner title={data.shippingBannerTitle} />
      <InstagramStrip
        instagramUrl={data.instagramUrl}
        posts={data.instagramPosts}
        live={data.instagramLive}
      />
      <ProcessSteps
        sectionTitle={data.processTitle}
        sectionDesc={data.processDesc}
        sectionEyebrow={data.processEyebrow}
        steps={data.processSteps}
        styles={data.styles}
      />
      <Testimonials
        googleReviewsUrl={data.googleReviewsUrl}
        sectionTitle={data.testimonialTitle}
        sectionDesc={data.testimonialDesc}
        sectionEyebrow={data.testimonialEyebrow}
        googleLinkLabel={data.googleReviewsLinkLabel}
        items={data.testimonials}
        styles={data.styles}
      />
      <FaqSection
        sectionTitle={data.faqTitle}
        sectionEyebrow={data.faqEyebrow}
        items={data.faqs}
        styles={data.styles}
      />
      <CTASection
        title={data.ctaTitle}
        buttonLabel={data.ctaButtonLabel}
        bannerImages={data.ctaBanners}
        sectionOffset={data.sectionCtaOffset}
        styles={data.styles}
      />
    </>
  );
}
