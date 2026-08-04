"use client";

import { Package, Clock, Users, Shield, Ruler } from "lucide-react";
import { VALUE_PROPS } from "@/lib/constants";
import { EditableText } from "@/components/editor/EditableText";
import { EditableImage } from "@/components/editor/EditableImage";
import { useEditor } from "@/components/editor/EditorProvider";
import { useEffect, useState } from "react";

const iconKeys = ["quality", "clock", "team", "support", "design"] as const;

const iconMap = {
  quality: Package,
  clock: Clock,
  team: Users,
  support: Shield,
  design: Ruler,
};

export interface ValuePropItem {
  icon: string;
  title: string;
  desc: string;
  iconUrl?: string;
  iconSize?: number;
}

interface ValuePropsProps {
  items?: ValuePropItem[];
  styles?: Record<string, string>;
}

export function ValueProps({ items, styles }: ValuePropsProps) {
  const list: ValuePropItem[] =
    items && items.length > 0
      ? items
      : VALUE_PROPS.map((p) => ({
          icon: p.icon,
          title: p.title,
          desc: p.desc,
        }));

  return (
    <div className="border-y border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {list.slice(0, 4).map((prop, index) => {
            const n = index + 1;
            const iconKey =
              (prop.icon as (typeof iconKeys)[number]) in iconMap
                ? (prop.icon as keyof typeof iconMap)
                : iconKeys[index % iconKeys.length];
            const Icon = iconMap[iconKey];
            return (
              <div
                key={`vp-${n}`}
                className="flex items-center gap-3 group"
              >
                <ValuePropIcon
                  n={n}
                  iconUrl={prop.iconUrl}
                  iconSize={prop.iconSize || 22}
                  FallbackIcon={Icon}
                />
                <div className="min-w-0">
                  <EditableText
                    contentKey={`value_prop_${n}_title`}
                    value={prop.title}
                    as="h3"
                    className="text-[10px] sm:text-sm font-semibold text-white uppercase tracking-wider break-anywhere leading-snug"
                    help={`Özellik ${n} başlığı`}
                    textStyle={styles?.[`value_prop_${n}_title`]}
                  />
                  <EditableText
                    contentKey={`value_prop_${n}_desc`}
                    value={prop.desc}
                    as="p"
                    className="text-[10px] text-muted hidden sm:block mt-0.5 break-anywhere"
                    help={`Özellik ${n} kısa açıklama`}
                    textStyle={styles?.[`value_prop_${n}_desc`]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ValuePropIcon({
  n,
  iconUrl,
  iconSize,
  FallbackIcon,
}: {
  n: number;
  iconUrl?: string;
  iconSize: number;
  FallbackIcon: typeof Clock;
}) {
  const { enabled, saveContent, saving } = useEditor();
  const [size, setSize] = useState(iconSize);

  useEffect(() => {
    setSize(iconSize);
  }, [iconSize]);

  const box = size + 18;

  return (
    <div className="relative shrink-0 flex flex-col items-center gap-1">
      {iconUrl ? (
        <div style={{ width: box, height: box }} className="relative">
          <EditableImage
            contentKey={`value_prop_${n}_icon`}
            value={iconUrl}
            alt={`İkon ${n}`}
            aspectClass="aspect-square"
            className="w-full h-full rounded-lg overflow-hidden bg-orange/10"
            imgClassName="object-contain p-1.5"
            help={`Değer önerisi ${n} ikonu`}
          />
        </div>
      ) : (
        <div
          className="rounded-lg flex items-center justify-center text-orange bg-orange/10 group-hover:scale-105 transition-transform relative overflow-hidden"
          style={{ width: box, height: box }}
        >
          <FallbackIcon size={size} strokeWidth={1.5} />
          {enabled && (
            <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/50 flex items-center justify-center">
              <div className="scale-[0.55] origin-center w-[180%] h-[180%]">
                <EditableImage
                  contentKey={`value_prop_${n}_icon`}
                  value=""
                  alt={`İkon ${n}`}
                  aspectClass="aspect-square"
                  className="w-full h-full"
                  help={`Değer önerisi ${n} için özel ikon yükleyin`}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {enabled && (
        <label className="flex items-center gap-0.5 text-[8px] text-muted">
          <input
            type="range"
            min={14}
            max={36}
            value={size}
            disabled={saving}
            onChange={(e) => setSize(Number(e.target.value))}
            onPointerUp={() =>
              void saveContent(`value_prop_${n}_icon_size`, String(size))
            }
            onMouseUp={() =>
              void saveContent(`value_prop_${n}_icon_size`, String(size))
            }
            className="w-10 accent-orange"
            aria-label={`İkon ${n} boyutu`}
          />
        </label>
      )}
    </div>
  );
}
