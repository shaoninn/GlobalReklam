"use client";

import { Search, PenTool, Factory, Wrench, Headphones } from "lucide-react";
import { FEATURE_BAR } from "@/lib/constants";
import { EditableText } from "@/components/editor/EditableText";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableSectionShift } from "@/components/editor/EditableSectionShift";
import { useEditor } from "@/components/editor/EditorProvider";
import { useEffect, useState } from "react";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {list.map((item, index) => {
              const n = index + 1;
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Search;
              return (
                <div
                  key={`fb-${n}`}
                  className="flex flex-col items-start lg:items-center lg:text-center gap-3 px-2"
                >
                  <FeatureIconSlot
                    n={n}
                    iconUrl={item.iconUrl}
                    iconSize={item.iconSize}
                    FallbackIcon={Icon}
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

function FeatureIconSlot({
  n,
  iconUrl,
  iconSize,
  FallbackIcon,
}: {
  n: number;
  iconUrl?: string;
  iconSize: number;
  FallbackIcon: typeof Search;
}) {
  const { enabled, saveContent, saving } = useEditor();
  const [size, setSize] = useState(iconSize);
  const box = size + 22;

  useEffect(() => {
    setSize(iconSize);
  }, [iconSize]);

  return (
    <div className="relative flex flex-col items-center gap-1">
      {iconUrl ? (
        <div style={{ width: box, height: box }}>
          <EditableImage
            contentKey={`feature_bar_${n}_icon`}
            value={iconUrl}
            alt={`Özellik ikon ${n}`}
            aspectClass="aspect-square"
            className="w-full h-full rounded-lg overflow-hidden bg-orange/10"
            imgClassName="object-contain p-1.5"
            help={`Özellik ${n} ikon görseli`}
          />
        </div>
      ) : (
        <div
          className="rounded-lg bg-orange/10 text-orange flex items-center justify-center relative"
          style={{ width: box, height: box }}
        >
          <FallbackIcon size={size} strokeWidth={1.5} />
          {enabled && (
            <div className="absolute -bottom-1 -right-1 scale-75 origin-bottom-right">
              <EditableImage
                contentKey={`feature_bar_${n}_icon`}
                value=""
                alt={`Özellik ikon ${n}`}
                aspectClass="aspect-square"
                className="w-10 h-10 rounded border border-orange/50 bg-black/80"
                help={`Özellik ${n} için özel ikon yükleyin (JPG/PNG)`}
              />
            </div>
          )}
        </div>
      )}
      {enabled && (
        <label className="flex items-center gap-1 text-[9px] text-muted">
          Boyut
          <input
            type="range"
            min={16}
            max={40}
            value={size}
            disabled={saving}
            onChange={(e) => setSize(Number(e.target.value))}
            onPointerUp={() =>
              void saveContent(`feature_bar_${n}_icon_size`, String(size))
            }
            onMouseUp={() =>
              void saveContent(`feature_bar_${n}_icon_size`, String(size))
            }
            className="w-14 accent-orange"
          />
        </label>
      )}
    </div>
  );
}
