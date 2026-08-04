const sharp = require("sharp");
const fs = require("fs");

async function squareIcon(monogram, size, out) {
  const pad = Math.round(size * 0.12);
  const inner = size - pad * 2;
  const resized = await sharp(monogram)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    })
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toFile(out);
}

async function main() {
  const logoPath = "public/images/logo/logo.png";
  const meta = await sharp(logoPath).metadata();
  const cropW = Math.round(meta.width * 0.4);
  const monogram = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: cropW, height: meta.height })
    .trim({ threshold: 15 })
    .toBuffer();

  await squareIcon(monogram, 512, "src/app/icon.png");
  await squareIcon(monogram, 180, "src/app/apple-icon.png");
  await squareIcon(monogram, 32, "public/favicon-32.png");
  await squareIcon(monogram, 192, "public/icon.png");
  await squareIcon(monogram, 180, "public/apple-icon.png");

  const tmp = [];
  for (const s of [16, 32, 48]) {
    const p = "public/_fav_" + s + ".png";
    await squareIcon(monogram, s, p);
    tmp.push(p);
  }

  const pngToIco = require("png-to-ico");
  const buf = await pngToIco(tmp);
  fs.writeFileSync("src/app/favicon.ico", buf);
  fs.writeFileSync("public/favicon.ico", buf);
  console.log("favicon.ico written, bytes:", buf.length);

  for (const p of tmp) {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  await sharp("public/images/products/kutu-harf-sistemleri/1.png")
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile("public/images/hero/hero-bg.jpg");

  console.log("hero-bg.jpg written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
