"use client";

import { EditableText } from "@/components/editor/EditableText";

export function HomeQuickLinks({
  neonLabel,
  sectorLabel,
  styles,
}: {
  neonLabel?: string;
  sectorLabel?: string;
  styles?: Record<string, string>;
}) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-2 flex flex-wrap gap-4">
      <EditableText
        contentKey="home_neon_link_label"
        value={neonLabel || "Neonunu canlı tasarla →"}
        linkHref="/neon-tasarla"
        linkClassName="text-sm text-orange hover:underline"
        as="span"
        className="text-orange"
        help="Neon tasarla kısayol yazısı"
        textStyle={styles?.home_neon_link_label}
      />
      <EditableText
        contentKey="home_sector_link_label"
        value={sectorLabel || "Sektörünüze özel çözümler →"}
        linkHref="/sektor"
        linkClassName="text-sm text-orange hover:underline"
        as="span"
        className="text-orange"
        help="Sektör çözümleri kısayol yazısı"
        textStyle={styles?.home_sector_link_label}
      />
    </div>
  );
}
