"use client";

import { Search, PenTool, Factory, Wrench, Headphones } from "lucide-react";
import { FEATURE_BAR } from "@/lib/constants";
import { EditableText } from "@/components/editor/EditableText";

const iconMap = {
  search: Search,
  design: PenTool,
  production: Factory,
  install: Wrench,
  support: Headphones,
} as const;

export function FeatureBar() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {FEATURE_BAR.map((item, index) => {
            const n = index + 1;
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Search;
            return (
              <div
                key={item.title}
                className="flex flex-col items-start lg:items-center lg:text-center gap-3 px-2"
              >
                <div className="w-11 h-11 rounded-lg bg-orange/10 text-orange flex items-center justify-center">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <EditableText
                  contentKey={`feature_bar_${n}_title`}
                  value={item.title}
                  as="h3"
                  className="font-display text-sm font-bold text-white uppercase tracking-wider"
                  help={`Özellik çubuğu ${n} başlık`}
                />
                <EditableText
                  contentKey={`feature_bar_${n}_desc`}
                  value={item.desc}
                  as="p"
                  multiline
                  className="text-xs text-muted leading-relaxed"
                  help={`Özellik çubuğu ${n} açıklama`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
