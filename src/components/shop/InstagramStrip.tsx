import { Camera } from "lucide-react";

interface InstagramStripProps {
  instagramUrl: string;
}

const TILES = 6;

/** Lightweight IG strip — no live API (Hostinger-safe). Uses official embed link. */
export function InstagramStrip({ instagramUrl }: InstagramStripProps) {
  return (
    <section className="py-12 lg:py-16 border-y border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            @globalreklamm
          </h2>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-orange hover:underline"
          >
            Instagram’da aç
          </a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
          {Array.from({ length: TILES }).map((_, i) => (
            <a
              key={i}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-orange/20 via-black to-orange/10 border border-border hover:border-orange/50 transition-colors"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-center">
                <Camera
                  size={20}
                  className="text-orange/70 group-hover:text-orange transition-colors"
                />
                <span className="text-[10px] text-muted group-hover:text-white transition-colors leading-tight">
                  Keşfet
                </span>
              </div>
            </a>
          ))}
        </div>
        <blockquote
          className="instagram-media rounded-xl border border-border overflow-hidden bg-black/40"
          data-instgrm-permalink={instagramUrl}
          data-instgrm-version="14"
          style={{ margin: 0, maxWidth: "100%" }}
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 text-sm text-muted hover:text-orange"
          >
            Instagram profilini tarayıcıda aç — canlı feed için resmi embed
            script’i opsiyonel yüklenebilir.
          </a>
        </blockquote>
      </div>
    </section>
  );
}
