"use client";

import { STATS } from "@/lib/constants";
import { EditableText } from "@/components/editor/EditableText";

export interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  items?: StatItem[];
}

export function StatsBar({ items }: StatsBarProps) {
  const list = items && items.length > 0 ? items : [...STATS];

  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((stat, index) => {
            const n = index + 1;
            return (
              <div key={`stat-${n}`} className="text-center">
                <EditableText
                  contentKey={`stat_${n}_value`}
                  value={stat.value}
                  as="p"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-orange text-glow mb-2"
                  help={`İstatistik ${n} değeri (örn. 10+)`}
                />
                <EditableText
                  contentKey={`stat_${n}_label`}
                  value={stat.label}
                  as="p"
                  className="text-xs sm:text-sm text-muted uppercase tracking-wider"
                  help={`İstatistik ${n} etiketi`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
