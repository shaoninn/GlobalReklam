"use client";

import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { SiteLink } from "@/components/ui/SiteLink";
import { Button } from "@/components/ui/Button";
import { EditableText } from "@/components/editor/EditableText";
import { WHY_US } from "@/lib/constants";
import type { ProjectListItem } from "@/lib/catalog";
import type { StatItem } from "@/components/home/StatsBar";

interface WhyUsSectionProps {
  projects: ProjectListItem[];
  stats?: StatItem[];
}

export function WhyUsSection({ projects, stats }: WhyUsSectionProps) {
  const recent = projects.slice(0, 4);
  const statItems = stats?.length
    ? stats
    : [
        { value: "10+", label: "Yıllık Tecrübe" },
        { value: "2500+", label: "Tamamlanan Proje" },
        { value: "1200+", label: "Mutlu Müşteri" },
        { value: "50+", label: "Ürün Çeşidi" },
      ];

  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-12">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {statItems.slice(0, 4).map((stat, index) => {
            const n = index + 1;
            return (
              <div
                key={`stat-${n}`}
                className="rounded-xl border border-border bg-card px-4 py-5 sm:px-5 sm:py-6 flex flex-col justify-center min-h-[100px] sm:min-h-[112px]"
              >
                <EditableText
                  contentKey={`stat_${n}_value`}
                  value={stat.value}
                  as="p"
                  className="font-display text-2xl sm:text-3xl font-bold text-orange mb-1"
                  help={`İstatistik ${n} değer`}
                />
                <EditableText
                  contentKey={`stat_${n}_label`}
                  value={stat.label}
                  as="p"
                  className="text-xs text-muted uppercase tracking-wider"
                  help={`İstatistik ${n} etiket`}
                />
              </div>
            );
          })}
        </div>

        {/* Why us + projects */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          <div className="flex flex-col">
            <EditableText
              contentKey="why_us_title"
              value="Neden Biz?"
              as="h2"
              block
              className="font-display text-2xl font-bold text-white mb-5"
              help="Neden biz başlığı"
            />
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 flex-1 content-start">
              {WHY_US.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange/15 text-orange flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <EditableText
                    contentKey={`why_us_${i + 1}`}
                    value={item}
                    as="span"
                    className="text-sm text-white/90"
                    help={`Neden biz madde ${i + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <EditableText
              contentKey="works_title"
              value="Son Projelerimiz"
              as="h2"
              block
              className="font-display text-2xl font-bold text-white mb-5"
              help="Son projeler başlığı"
            />
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4 flex-1">
              {recent.map((project) => (
                <SiteLink
                  key={project.id}
                  href={`/projeler/${project.slug}`}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border group bg-card"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 45vw, 280px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <span className="text-[10px] text-orange/30 font-bold uppercase text-center">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-0 left-0 right-0 p-2 text-[10px] sm:text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {project.title}
                  </span>
                </SiteLink>
              ))}
            </div>
            <Button
              href="/projeler"
              variant="outline"
              size="sm"
              className="w-full justify-center mt-auto"
            >
              Tüm Projeleri Gör
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
