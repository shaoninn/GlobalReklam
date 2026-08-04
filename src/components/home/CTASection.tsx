"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { EditableText } from "@/components/editor/EditableText";

interface CTASectionProps {
  title?: string;
}

export function CTASection({ title }: CTASectionProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-card to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,24,0.14)_0%,transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <EditableText
          contentKey="cta_title"
          value={title || "MARKANIZI BİRLİKTE GÖRÜNÜR KILALIM"}
          as="h2"
          block
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 tracking-wide"
          help="Alt CTA başlığı"
        />
        <Button href="/iletisim" size="lg">
          İletişime Geç
          <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  );
}
