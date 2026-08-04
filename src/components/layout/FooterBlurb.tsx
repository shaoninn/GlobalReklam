"use client";

import { EditableText } from "@/components/editor/EditableText";

export function FooterBlurb({ value }: { value?: string }) {
  return (
    <EditableText
      contentKey="footer_blurb"
      value={
        value ||
        "Markanızı görünür kılan profesyonel tabela çözümleri. Antalya Çakırlar'da keşiften montaja tek ekip."
      }
      as="p"
      block
      multiline
      className="text-muted text-sm mb-6 leading-relaxed"
      help="Footer’daki kısa tanıtım metni"
    />
  );
}
