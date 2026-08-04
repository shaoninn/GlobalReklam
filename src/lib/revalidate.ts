import { revalidateTag } from "next/cache";
import { CACHE_TAGS, invalidateSiteMemoryCache } from "@/lib/site";
import { invalidateCatalogMemoryCache } from "@/lib/catalog";
import { memoryCacheInvalidate } from "@/lib/memory-cache";

/** Immediate expire so admin edits show on next public request. */
const IMMEDIATE = { expire: 0 } as const;

export function revalidateSiteSettings() {
  invalidateSiteMemoryCache();
  revalidateTag(CACHE_TAGS.settings, IMMEDIATE);
}

export function revalidateNav() {
  invalidateSiteMemoryCache();
  revalidateTag(CACHE_TAGS.nav, IMMEDIATE);
}

export function revalidateProjects() {
  invalidateCatalogMemoryCache();
  revalidateTag(CACHE_TAGS.projects, IMMEDIATE);
}

export function revalidateCategories() {
  invalidateCatalogMemoryCache();
  revalidateTag(CACHE_TAGS.categories, IMMEDIATE);
}

export function revalidateBlog() {
  invalidateCatalogMemoryCache();
  revalidateTag(CACHE_TAGS.blog, IMMEDIATE);
}

export function revalidateContent() {
  memoryCacheInvalidate("home:");
  memoryCacheInvalidate("content-map:");
  revalidateTag(CACHE_TAGS.content, IMMEDIATE);
}

export function purgeAllMemoryCaches() {
  memoryCacheInvalidate();
  invalidateSiteMemoryCache();
  invalidateCatalogMemoryCache();
}
