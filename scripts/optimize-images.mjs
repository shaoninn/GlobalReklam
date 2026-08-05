#!/usr/bin/env node
/**
 * Pre-generate WebP (and mobile-sized) assets for LCP / image delivery.
 * Hostinger skips Next.js sharp optimizer at runtime — bake formats at build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const TARGETS = [
  {
    src: "images/hero/hero-global.png",
    outputs: [
      { file: "images/hero/hero-global.webp", width: 1600, quality: 78 },
      { file: "images/hero/hero-global-sm.webp", width: 960, quality: 72 },
    ],
  },
  {
    src: "images/hero/hero-global.jpg",
    outputs: [
      { file: "images/hero/hero-global.webp", width: 1600, quality: 78 },
      { file: "images/hero/hero-global-sm.webp", width: 960, quality: 72 },
    ],
  },
];

const PORTFOLIO_GLOBS = [
  "images/portfolio/cmk-ecu-completed.png",
  "images/portfolio/acity-avm-tabela.png",
  "images/portfolio/kurye-garaji-germe.png",
  "images/portfolio/gulbag-totem-3.png",
];

async function writeWebp(inputPath, outputPath, width, quality) {
  if (!fs.existsSync(inputPath)) return false;
  const outAbs = path.join(publicDir, outputPath);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  await sharp(inputPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outAbs);
  const before = fs.statSync(inputPath).size;
  const after = fs.statSync(outAbs).size;
  console.log(
    `✓ ${outputPath} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`
  );
  return true;
}

async function main() {
  let done = false;
  for (const target of TARGETS) {
    const input = path.join(publicDir, target.src);
    if (!fs.existsSync(input)) continue;
    for (const out of target.outputs) {
      await writeWebp(input, out.file, out.width, out.quality);
      done = true;
    }
    if (done) break; // png or jpg once
  }

  for (const rel of PORTFOLIO_GLOBS) {
    const input = path.join(publicDir, rel);
    if (!fs.existsSync(input)) continue;
    const webpRel = rel.replace(/\.(png|jpe?g)$/i, ".webp");
    await writeWebp(input, webpRel, 1200, 75);
  }
}

main().catch((err) => {
  console.error("[optimize-images]", err);
  process.exit(1);
});
