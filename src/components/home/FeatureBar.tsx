"use client";

import { Search, PenTool, Factory, Wrench, Headphones } from "lucide-react";
import { FEATURE_BAR } from "@/lib/constants";
import { EditableText } from "@/components/editor/EditableText";
import { EditableSectionShift } from "@/components/editor/EditableSectionShift";
import { EditableIconBox } from "@/components/editor/EditableIconBox";

const iconMap = {
  search: Search,
  design: PenTool,
  production: Factory,
  install: Wrench,
  support: Headphones,
} as const;

type FeatureBarItem = {
  title: string;
  desc: string;
  iconUrl?: string;
  iconSize?: number;
};

export function FeatureBar({
  items,
  sectionOffset = "0",
  styles,
}: {
  items?: FeatureBarItem[];
  sectionOffset?: string;
  styles?: Record<string, string>;
} = {}) {
  const list = FEATURE_BAR.map((d, i) => ({
    title: items?.[i]?.title || d.title,
    desc: items?.[i]?.desc || d.desc,
    icon: d.icon,
    iconUrl: items?.[i]?.iconUrl,
    iconSize: items?.[i]?.iconSize || 22,
  }));

  return (
    <EditableSectionShift
      settingKey="section_feature_bar_offset"
      value={sectionOffset}
      label="Özellik çubuğu"
    >
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5">
            {list.map((item, index) => {
              const n = index + 1;
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Search;
              return (
                <div
                  key={`fb-${n}`}
                  className="flex flex-col items-start lg:items-center lg:text-center gap-3 px-2 min-w-0"
                >
                  <EditableIconBox
                    contentKey={`feature_bar_${n}_icon`}
                    sizeKey={`feature_bar_${n}_icon_size`}
                    iconUrl={item.iconUrl}
                    iconSize={item.iconSize}
                    FallbackIcon={Icon}
                    alt={`Özellik ikon ${n}`}
                    help={`Özellik ${n} için özel ikon yükleyin`}
                  />
                  <EditableText
                    contentKey={`feature_bar_${n}_title`}
                    value={item.title}
                    as="h3"
                    className="font-display text-sm font-bold text-white uppercase tracking-wider"
                    help={`Özellik çubuğu ${n} başlık`}
                    textStyle={styles?.[`feature_bar_${n}_title`]}
                  />
                  <EditableText
                    contentKey={`feature_bar_${n}_desc`}
                    value={item.desc}
                    as="p"
                    multiline
                    className="text-xs text-muted leading-relaxed"
                    help={`Özellik çubuğu ${n} açıklama`}
                    textStyle={styles?.[`feature_bar_${n}_desc`]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </EditableSectionShift>
  );
}
