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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
          <div>
            <EditableText
              contentKey="why_us_title"
              value="Neden Biz?"
              as="h2"
              block
              className="font-display text-2xl font-bold text-white mb-5"
              help="Neden biz başlığı"
            />
            <ul className="space-y-3">
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

          <div className="grid grid-cols-2 gap-3">
            {statItems.slice(0, 4).map((stat, index) => {
              const n = index + 1;
              return (
                <div
                  key={`stat-${n}`}
                  className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col justify-center min-h-[110px]"
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

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <EditableText
                contentKey="works_title"
                value="Son Projelerimiz"
                as="h2"
                block
                className="font-display text-2xl font-bold text-white"
                help="Son projeler başlığı"
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
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
                      sizes="200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <span className="text-[10px] text-orange/30 font-bold uppercase text-center">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </SiteLink>
              ))}
            </div>
            <Button href="/projeler" variant="outline" size="sm" className="w-full justify-center">
              Tüm Projeleri Gör
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
