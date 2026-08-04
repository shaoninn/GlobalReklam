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
import { HomeQuickLinks } from "@/components/home/HomeQuickLinks";
import { HomeCategoriesSection } from "@/components/home/HomeCategoriesSection";

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
