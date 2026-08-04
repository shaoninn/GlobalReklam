import { prisma } from "@/lib/db";
import { memoryCache } from "@/lib/memory-cache";

export async function getContentMap(keys: string[]): Promise<Record<string, string>> {
  try {
    return await memoryCache(
      `content-map:${keys.slice().sort().join(",")}`,
      async () => {
        const rows = await prisma.siteContent.findMany({
          where: { key: { in: keys } },
        });
        return Object.fromEntries(rows.map((r) => [r.key, r.content]));
      },
      { ttlMs: 60_000, skipEmpty: false }
    );
  } catch (error) {
    console.error("[content-map]", error);
    return {};
  }
}

export async function getContentTitles(
  keys: string[]
): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteContent.findMany({
      where: { key: { in: keys } },
      select: { key: true, title: true },
    });
    return Object.fromEntries(
      rows.map((r) => [r.key, r.title || ""])
    );
  } catch {
    return {};
  }
}

/** All keys used by the visual editor / marketing pages. */
export const EDITOR_CONTENT_KEYS = [
  "hero_title",
  "hero_subtitle",
  "hero_body",
  "hero_image",
  "works_eyebrow",
  "works_title",
  "services_intro",
  "services_section_title",
  "cta_title",
  "footer_blurb",
  "contact_eyebrow",
  "contact_title",
  "contact_intro",
  "about_headline",
  "about_intro",
  "about_philosophy",
  "mission",
  "vision",
  "values_hygiene",
  "values_team",
  "values_products",
  "values_personal",
  "about_image_1",
  "about_image_2",
  "about_image_3",
  "about_image_4",
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
  "value_prop_5_title",
  "value_prop_5_desc",
  "stat_1_value",
  "stat_1_label",
  "stat_2_value",
  "stat_2_label",
  "stat_3_value",
  "stat_3_label",
  "stat_4_value",
  "stat_4_label",
  "blog_eyebrow",
  "blog_title",
  "blog_intro",
  "blog_empty",
  "projects_eyebrow",
  "projects_title",
  "projects_intro",
  "projects_empty",
  "services_page_eyebrow",
  "services_page_title",
  "services_page_intro",
  "project_detail_eyebrow",
  "project_gallery_hint",
  "project_quote_cta",
  "project_back_link",
  "project_products_suffix",
  "contact_card_title",
  "contact_call_prefix",
  "contact_whatsapp_link",
  "contact_whatsapp_cta",
  "contact_whatsapp_prefill",
  "contact_submit_label",
  "contact_kvkk_suffix",
  "contact_map_label",
  "contact_map_open",
  "contact_success",
] as const;
