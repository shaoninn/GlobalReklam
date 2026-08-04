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
import { loadHomePageData } from "@/lib/home-content";

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
      <FeaturedProducts
        products={data.products}
        title={data.featuredProductsTitle}
      />
      <WhyUsSection projects={data.projects} stats={data.stats} />
      <FeatureBar />
      <ShippingBanner title={data.shippingBannerTitle} />
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
