import { getContentMap } from "@/lib/site-content";
import {
  getActiveCategories,
  getFeaturedProducts,
  getFeaturedProjects,
} from "@/lib/catalog";
import { getSiteSettings } from "@/lib/site";
import { buildStats, buildValueProps } from "@/lib/page-content";

const HOME_KEYS = [
  "hero_title",
  "hero_subtitle",
  "hero_body",
  "hero_image",
  "works_eyebrow",
  "works_title",
  "services_intro",
  "services_section_title",
  "featured_products_title",
  "shipping_banner_title",
  "why_us_title",
  "why_us_1",
  "why_us_2",
  "why_us_3",
  "why_us_4",
  "why_us_5",
  "why_us_6",
  "feature_bar_1_title",
  "feature_bar_1_desc",
  "feature_bar_2_title",
  "feature_bar_2_desc",
  "feature_bar_3_title",
  "feature_bar_3_desc",
  "feature_bar_4_title",
  "feature_bar_4_desc",
  "feature_bar_5_title",
  "feature_bar_5_desc",
  "cta_title",
  "process_section_title",
  "process_section_desc",
  "process_1_title",
  "process_1_desc",
  "process_2_title",
  "process_2_desc",
  "process_3_title",
  "process_3_desc",
  "process_4_title",
  "process_4_desc",
  "faq_section_title",
  "faq_1_q",
  "faq_1_a",
  "faq_2_q",
  "faq_2_a",
  "faq_3_q",
  "faq_3_a",
  "faq_4_q",
  "faq_4_a",
  "testimonial_section_title",
  "testimonial_section_desc",
  "testimonial_1_quote",
  "testimonial_1_name",
  "testimonial_1_place",
  "testimonial_2_quote",
  "testimonial_2_name",
  "testimonial_2_place",
  "testimonial_3_quote",
  "testimonial_3_name",
  "testimonial_3_place",
  "value_prop_1_title",
  "value_prop_1_desc",
  "value_prop_2_title",
  "value_prop_2_desc",
  "value_prop_3_title",
  "value_prop_3_desc",
  "value_prop_4_title",
  "value_prop_4_desc",
  "stat_1_value",
  "stat_1_label",
  "stat_2_value",
  "stat_2_label",
  "stat_3_value",
  "stat_3_label",
  "stat_4_value",
  "stat_4_label",
] as const;

const DEFAULT_HERO_TITLE = "Markanızı Görünür Kılan Çözümler";
const DEFAULT_HERO_SUBTITLE = "PROFESYONEL TABELA ÇÖZÜMLERİ";

export async function loadHomePageData() {
  try {
    const [map, projects, settings, categories, products] = await Promise.all([
      getContentMap([...HOME_KEYS]),
      getFeaturedProjects(),
      getSiteSettings(),
      getActiveCategories(),
      getFeaturedProducts(),
    ]);

    const processSteps = [1, 2, 3, 4].map((n) => ({
      title: map[`process_${n}_title`] || "",
      desc: map[`process_${n}_desc`] || "",
    }));
    const hasProcess = processSteps.every((s) => s.title && s.desc);

    const faqs = [1, 2, 3, 4].map((n) => ({
      q: map[`faq_${n}_q`] || "",
      a: map[`faq_${n}_a`] || "",
    }));
    const hasFaqs = faqs.every((f) => f.q && f.a);

    const testimonials = [1, 2, 3].map((n) => ({
      quote: map[`testimonial_${n}_quote`] || "",
      name: map[`testimonial_${n}_name`] || "",
      place: map[`testimonial_${n}_place`] || "",
    }));
    const hasTestimonials = testimonials.every((t) => t.quote && t.name);

    return {
      heroTitle: map.hero_title || DEFAULT_HERO_TITLE,
      heroSubtitle: map.hero_subtitle || DEFAULT_HERO_SUBTITLE,
      heroBody: map.hero_body || undefined,
      heroImage: map.hero_image || undefined,
      worksEyebrow: map.works_eyebrow || undefined,
      worksTitle: map.works_title || undefined,
      servicesIntro: map.services_intro || undefined,
      servicesTitle: map.services_section_title || undefined,
      featuredProductsTitle: map.featured_products_title || undefined,
      shippingBannerTitle: map.shipping_banner_title || undefined,
      ctaTitle: map.cta_title || undefined,
      processTitle: map.process_section_title || undefined,
      processDesc: map.process_section_desc || undefined,
      processSteps: hasProcess ? processSteps : undefined,
      faqTitle: map.faq_section_title || undefined,
      faqs: hasFaqs ? faqs : undefined,
      testimonialTitle: map.testimonial_section_title || undefined,
      testimonialDesc: map.testimonial_section_desc || undefined,
      testimonials: hasTestimonials ? testimonials : undefined,
      valueProps: buildValueProps(map),
      stats: buildStats(map),
      projects,
      categories,
      products,
      googleReviewsUrl: settings.googleReviewsUrl,
    };
  } catch (error) {
    console.error("loadHomePageData failed:", error);
    return {
      heroTitle: DEFAULT_HERO_TITLE,
      heroSubtitle: DEFAULT_HERO_SUBTITLE,
      heroBody: undefined,
      heroImage: undefined,
      worksEyebrow: undefined,
      worksTitle: undefined,
      servicesIntro: undefined,
      servicesTitle: undefined,
      featuredProductsTitle: undefined,
      shippingBannerTitle: undefined,
      ctaTitle: undefined,
      processTitle: undefined,
      processDesc: undefined,
      processSteps: undefined,
      faqTitle: undefined,
      faqs: undefined,
      testimonialTitle: undefined,
      testimonialDesc: undefined,
      testimonials: undefined,
      valueProps: buildValueProps({}),
      stats: buildStats({}),
      projects: [],
      categories: [],
      products: [],
      googleReviewsUrl: "",
    };
  }
}
