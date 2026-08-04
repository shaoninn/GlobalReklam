/**
 * Replace DMD brand assets with Global Reklam (yellow/black).
 * Also force about_* image keys to portfolio photos.
 * Run: node scripts/rebuild-global-brand.cjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ORANGE = "#f5c518";
const BLACK = "#0a0a0a";
const WHITE = "#ffffff";

function logoSvg(width = 800, height = 220) {
  const mark = 160;
  const x = 40;
  const y = (height - mark) / 2;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${BLACK}"/>
  <rect x="${x}" y="${y}" width="${mark}" height="${mark}" rx="14" fill="none" stroke="${ORANGE}" stroke-width="8"/>
  <text x="${x + mark / 2}" y="${y + mark / 2 + 8}" text-anchor="middle" dominant-baseline="middle"
    font-family="Arial Black, Arial, sans-serif" font-size="96" font-weight="700" fill="${ORANGE}">G</text>
  <text x="${x + mark + 36}" y="${height / 2 - 18}"
    font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" letter-spacing="6" fill="${WHITE}">GLOBAL</text>
  <text x="${x + mark + 36}" y="${height / 2 + 42}"
    font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" letter-spacing="6" fill="${ORANGE}">REKLAM</text>
</svg>`);
}

function markSvg(size = 512) {
  const stroke = Math.round(size * 0.06);
  const font = Math.round(size * 0.55);
  const radius = Math.round(size * 0.12);
  const inset = Math.round(size * 0.12);
  const box = size - inset * 2;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="${BLACK}"/>
  <rect x="${inset}" y="${inset}" width="${box}" height="${box}" rx="${radius}" fill="none" stroke="${ORANGE}" stroke-width="${stroke}"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
    font-family="Arial Black, Arial, sans-serif" font-size="${font}" font-weight="700" fill="${ORANGE}">G</text>
</svg>`);
}

async function writePngFromSvg(svg, out, width, height) {
  await sharp(svg).resize(width, height).png().toFile(out);
  console.log("wrote", out);
}

async function writeWebpFromSvg(svg, out, width, height) {
  await sharp(svg).resize(width, height).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out);
}

async function main() {
  const logoDir = "public/images/logo";
  fs.mkdirSync(logoDir, { recursive: true });

  const fullLogo = logoSvg(800, 220);
  await writePngFromSvg(fullLogo, path.join(logoDir, "logo.png"), 800, 220);
  await writeWebpFromSvg(fullLogo, path.join(logoDir, "logo.webp"), 800, 220);

  const mark512 = markSvg(512);
  await writePngFromSvg(mark512, "src/app/icon.png", 512, 512);
  await writePngFromSvg(markSvg(180), "src/app/apple-icon.png", 180, 180);
  await writePngFromSvg(markSvg(192), "public/icon.png", 192, 192);
  await writePngFromSvg(markSvg(180), "public/apple-icon.png", 180, 180);
  await writePngFromSvg(markSvg(32), "public/favicon-32.png", 32, 32);

  const tmp = [];
  for (const s of [16, 32, 48]) {
    const p = `public/_fav_${s}.png`;
    await writePngFromSvg(markSvg(s), p, s, s);
    tmp.push(p);
  }
  try {
    const pngToIco = require("png-to-ico");
    const buf = await pngToIco(tmp);
    fs.writeFileSync("src/app/favicon.ico", buf);
    fs.writeFileSync("public/favicon.ico", buf);
    console.log("favicon.ico written");
  } catch (e) {
    console.warn("png-to-ico skipped:", e.message);
  }
  for (const p of tmp) {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  // Drop leftover DMD-era files
  for (const dead of [
    path.join(logoDir, "logo-old.jpg"),
    "public/images/hero/hero-bg.jpg",
    "public/images/hero/hero-bg.png",
  ]) {
    if (fs.existsSync(dead)) {
      fs.unlinkSync(dead);
      console.log("removed", dead);
    }
  }

  // Ensure about gallery uses Global portfolio copies
  const aboutMap = [
    ["public/images/portfolio/cmk-ecu-completed.png", "public/images/about/about-1.png"],
    ["public/images/portfolio/acity-avm-tabela.png", "public/images/about/about-2.png"],
    ["public/images/portfolio/kurye-garaji-germe.png", "public/images/about/about-3.png"],
    ["public/images/portfolio/gulbag-totem-3.png", "public/images/about/about-4.png"],
  ];
  for (const [src, dest] of aboutMap) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log("about synced", dest);
    }
  }

  console.log("Global brand assets ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
