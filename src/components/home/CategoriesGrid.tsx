"use client";

import { useRef } from "react";
import Image from "next/image";
import { SiteLink } from "@/components/ui/SiteLink";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { EditableText } from "@/components/editor/EditableText";
import type { CategoryListItem } from "@/lib/catalog";

interface CategoriesGridProps {
  categories: CategoryListItem[];
  title?: string;
}

export function CategoriesGrid({ categories, title }: CategoriesGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = categories.slice(0, 18);

  function scrollByCard(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-cat-card]");
    const step = (card?.offsetWidth ?? 180) + 16;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  }

  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <EditableText
            contentKey="services_section_title"
            value={title || "İhtiyacınıza Uygun Tabela Çözümleri"}
            as="h2"
            block
            className="font-display text-2xl sm:text-3xl font-bold text-white max-w-xl"
            help="Kategoriler bölüm başlığı"
          />
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-white hover:border-orange hover:text-orange transition-colors"
                aria-label="Önceki kategoriler"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-white hover:border-orange hover:text-orange transition-colors"
                aria-label="Sonraki kategoriler"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <SiteLink
              href="/hizmetler"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange hover:text-orange-dark transition-colors"
            >
              Tüm Kategorileri Gör
              <ArrowRight size={16} />
            </SiteLink>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((cat) => (
            <SiteLink
              key={cat.id}
              href={`/hizmetler/${cat.slug}`}
              data-cat-card
              className="group snap-start shrink-0 w-[42vw] max-w-[200px] sm:w-44 rounded-xl bg-card border border-border hover:border-orange/50 transition-all overflow-hidden"
            >
              <div className="relative aspect-square bg-surface">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <span className="font-display text-sm font-bold text-orange/25 uppercase text-center tracking-wide">
                      {cat.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="px-3 py-3 border-t border-border">
                <h3 className="font-display text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider text-center group-hover:text-orange transition-colors line-clamp-2">
                  {cat.name}
                </h3>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
