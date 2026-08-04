export type NeonFontCategory = "script" | "display" | "sans" | "slab" | "hand";

export interface NeonFont {
  id: string;
  label: string;
  /** CSS font-family stack after load */
  family: string;
  /** Google Fonts family name (spaces allowed) */
  google: string;
  category: NeonFontCategory;
}

/** ~60 Google Fonts for neon builder — loaded on demand. */
export const NEON_FONTS: NeonFont[] = [
  // Script / cursive
  { id: "pacifico", label: "Pacifico", google: "Pacifico", family: "'Pacifico', cursive", category: "script" },
  { id: "great-vibes", label: "Great Vibes", google: "Great Vibes", family: "'Great Vibes', cursive", category: "script" },
  { id: "dancing-script", label: "Dancing Script", google: "Dancing Script", family: "'Dancing Script', cursive", category: "script" },
  { id: "satinowe", label: "Satisfy", google: "Satisfy", family: "'Satisfy', cursive", category: "script" },
  { id: "allura", label: "Allura", google: "Allura", family: "'Allura', cursive", category: "script" },
  { id: "sacramento", label: "Sacramento", google: "Sacramento", family: "'Sacramento', cursive", category: "script" },
  { id: "alex-brush", label: "Alex Brush", google: "Alex Brush", family: "'Alex Brush', cursive", category: "script" },
  { id: "yellowtail", label: "Yellowtail", google: "Yellowtail", family: "'Yellowtail', cursive", category: "script" },
  { id: "cookie", label: "Cookie", google: "Cookie", family: "'Cookie', cursive", category: "script" },
  { id: "kaushan", label: "Kaushan Script", google: "Kaushan Script", family: "'Kaushan Script', cursive", category: "script" },
  { id: "lobster", label: "Lobster", google: "Lobster", family: "'Lobster', cursive", category: "script" },
  { id: "lobster-two", label: "Lobster Two", google: "Lobster Two", family: "'Lobster Two', cursive", category: "script" },
  { id: "courgette", label: "Courgette", google: "Courgette", family: "'Courgette', cursive", category: "script" },
  { id: "marck", label: "Marck Script", google: "Marck Script", family: "'Marck Script', cursive", category: "script" },
  { id: "parisienne", label: "Parisienne", google: "Parisienne", family: "'Parisienne', cursive", category: "script" },

  // Display / neon vibe
  { id: "monoton", label: "Monoton", google: "Monoton", family: "'Monoton', cursive", category: "display" },
  { id: "bungee", label: "Bungee", google: "Bungee", family: "'Bungee', cursive", category: "display" },
  { id: "bungee-shade", label: "Bungee Shade", google: "Bungee Shade", family: "'Bungee Shade', cursive", category: "display" },
  { id: "righteous", label: "Righteous", google: "Righteous", family: "'Righteous', cursive", category: "display" },
  { id: "bebas", label: "Bebas Neue", google: "Bebas Neue", family: "'Bebas Neue', sans-serif", category: "display" },
  { id: "anton", label: "Anton", google: "Anton", family: "'Anton', sans-serif", category: "display" },
  { id: "oswald", label: "Oswald", google: "Oswald", family: "'Oswald', sans-serif", category: "display" },
  { id: "archivo-black", label: "Archivo Black", google: "Archivo Black", family: "'Archivo Black', sans-serif", category: "display" },
  { id: "black-ops", label: "Black Ops One", google: "Black Ops One", family: "'Black Ops One', cursive", category: "display" },
  { id: "orbitron", label: "Orbitron", google: "Orbitron", family: "'Orbitron', sans-serif", category: "display" },
  { id: "audiowide", label: "Audiowide", google: "Audiowide", family: "'Audiowide', cursive", category: "display" },
  { id: "russo", label: "Russo One", google: "Russo One", family: "'Russo One', sans-serif", category: "display" },
  { id: "press-start", label: "Press Start 2P", google: "Press Start 2P", family: "'Press Start 2P', cursive", category: "display" },
  { id: "silkscreen", label: "Silkscreen", google: "Silkscreen", family: "'Silkscreen', cursive", category: "display" },
  { id: "permanent-marker", label: "Permanent Marker", google: "Permanent Marker", family: "'Permanent Marker', cursive", category: "display" },

  // Sans
  { id: "inter", label: "Inter", google: "Inter", family: "'Inter', sans-serif", category: "sans" },
  { id: "poppins", label: "Poppins", google: "Poppins", family: "'Poppins', sans-serif", category: "sans" },
  { id: "montserrat", label: "Montserrat", google: "Montserrat", family: "'Montserrat', sans-serif", category: "sans" },
  { id: "raleway", label: "Raleway", google: "Raleway", family: "'Raleway', sans-serif", category: "sans" },
  { id: "nunito", label: "Nunito", google: "Nunito", family: "'Nunito', sans-serif", category: "sans" },
  { id: "rubik", label: "Rubik", google: "Rubik", family: "'Rubik', sans-serif", category: "sans" },
  { id: "dm-sans", label: "DM Sans", google: "DM Sans", family: "'DM Sans', sans-serif", category: "sans" },
  { id: "outfit", label: "Outfit", google: "Outfit", family: "'Outfit', sans-serif", category: "sans" },
  { id: "space-grotesk", label: "Space Grotesk", google: "Space Grotesk", family: "'Space Grotesk', sans-serif", category: "sans" },
  { id: "manrope", label: "Manrope", google: "Manrope", family: "'Manrope', sans-serif", category: "sans" },
  { id: "figtree", label: "Figtree", google: "Figtree", family: "'Figtree', sans-serif", category: "sans" },
  { id: "sora", label: "Sora", google: "Sora", family: "'Sora', sans-serif", category: "sans" },
  { id: "urbanist", label: "Urbanist", google: "Urbanist", family: "'Urbanist', sans-serif", category: "sans" },
  { id: "lexend", label: "Lexend", google: "Lexend", family: "'Lexend', sans-serif", category: "sans" },
  { id: "barlow", label: "Barlow", google: "Barlow", family: "'Barlow', sans-serif", category: "sans" },

  // Slab / serif display
  { id: "roboto-slab", label: "Roboto Slab", google: "Roboto Slab", family: "'Roboto Slab', serif", category: "slab" },
  { id: "playfair", label: "Playfair Display", google: "Playfair Display", family: "'Playfair Display', serif", category: "slab" },
  { id: "abril", label: "Abril Fatface", google: "Abril Fatface", family: "'Abril Fatface', serif", category: "slab" },
  { id: "crete", label: "Crete Round", google: "Crete Round", family: "'Crete Round', serif", category: "slab" },
  { id: "zilla", label: "Zilla Slab", google: "Zilla Slab", family: "'Zilla Slab', serif", category: "slab" },
  { id: "arvo", label: "Arvo", google: "Arvo", family: "'Arvo', serif", category: "slab" },
  { id: "bitter", label: "Bitter", google: "Bitter", family: "'Bitter', serif", category: "slab" },
  { id: "libre-baskerville", label: "Libre Baskerville", google: "Libre Baskerville", family: "'Libre Baskerville', serif", category: "slab" },
  { id: "cormorant", label: "Cormorant Garamond", google: "Cormorant Garamond", family: "'Cormorant Garamond', serif", category: "slab" },
  { id: "cinzel", label: "Cinzel", google: "Cinzel", family: "'Cinzel', serif", category: "slab" },

  // Hand / casual
  { id: "caveat", label: "Caveat", google: "Caveat", family: "'Caveat', cursive", category: "hand" },
  { id: "shadows", label: "Shadows Into Light", google: "Shadows Into Light", family: "'Shadows Into Light', cursive", category: "hand" },
  { id: "indie-flower", label: "Indie Flower", google: "Indie Flower", family: "'Indie Flower', cursive", category: "hand" },
  { id: "amatic", label: "Amatic SC", google: "Amatic SC", family: "'Amatic SC', cursive", category: "hand" },
  { id: "patrick", label: "Patrick Hand", google: "Patrick Hand", family: "'Patrick Hand', cursive", category: "hand" },
  { id: "architects", label: "Architects Daughter", google: "Architects Daughter", family: "'Architects Daughter', cursive", category: "hand" },
  { id: "kalam", label: "Kalam", google: "Kalam", family: "'Kalam', cursive", category: "hand" },
  { id: "handlee", label: "Handlee", google: "Handlee", family: "'Handlee', cursive", category: "hand" },
  { id: "gloria", label: "Gloria Hallelujah", google: "Gloria Hallelujah", family: "'Gloria Hallelujah', cursive", category: "hand" },
  { id: "rock-salt", label: "Rock Salt", google: "Rock Salt", family: "'Rock Salt', cursive", category: "hand" },
];

const loaded = new Set<string>();

export function getNeonFont(id: string): NeonFont {
  return NEON_FONTS.find((f) => f.id === id) || NEON_FONTS[0]!;
}

/** Inject Google Fonts stylesheet once per family. */
export function loadNeonGoogleFont(font: NeonFont): void {
  if (typeof document === "undefined") return;
  if (loaded.has(font.google)) return;
  loaded.add(font.google);
  const id = `neon-gf-${font.id}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.google).replace(/%20/g, "+")}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}
