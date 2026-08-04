# Global Reklam

Antalya (Çakırlar) tabela ve reklam firması için kurumsal web sitesi + teklif sepeti (ödemesiz) + yönetim paneli + canlı site editörü.

**Stack:** Next.js 16 · React 19 · Tailwind 4 · Prisma 7 · MySQL/MariaDB · Redux Toolkit

## Kurulum

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run db:setup
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin  
- Editör: http://localhost:3000/duzenle (giriş gerekli)

Seed varsayılanı: `admin@globalreklam.com` / `admin123` (veya `ADMIN_PASSWORD`). **Canlıya çıkmadan önce şifreyi değiştirin**, 2FA açın ve güçlü `JWT_SECRET` yazın.

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `MYSQL_*` veya `DATABASE_URL` | Hostinger remote MySQL (`srv….hstgr.io`) |
| `MYSQL_POOL_SIZE` | Varsayılan `3` |
| `JWT_SECRET` | En az 32 karakter; production’da zorunlu |
| `NEXT_PUBLIC_SITE_URL` | Canlı domain (sitemap/OG) |
| `NEXT_PUBLIC_GA_ID` | Opsiyonel GA4 |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Sadece seed |
| `ALLOW_PROD_SEED` | Production seed kilidi |
| `RESEND_API_KEY` / `SMTP_URL` | Teklif e-posta özeti |
| `S3_*` | Object storage (R2/S3); yoksa `public/uploads` |

## Scriptler

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | `prisma generate && next build` |
| `npm run start` | `scripts/start.mjs` → `0.0.0.0` + health warm |
| `npm run db:push` | Şemayı DB’ye uygula |
| `npm run db:seed` | Örnek veri + admin (**tüm tabloları siler**) |
| `npm run db:seed:editor` | Eksik SiteContent anahtarlarını upsert (silmez) |
| `npm run db:setup` | generate + push + seed |

## Özellikler

- Teklif listesi: ölçü/renk, mini-cart, WhatsApp kaydı + e-posta özeti
- SEO: sitemap, robots, LocalBusiness / Product JSON-LD
- Güvenlik: rate-limit, sunucu fiyatı, 2FA (TOTP), audit log, magic-byte upload
- Admin: ürün (bulk + Excel), proje, blog, sipariş, müşteri CRM, medya, ayarlar
- Canlı editör (`/duzenle`): pazarlama metni, görseller, menü, ayarlar — ürün CRUD admin’de
- Hostinger uyumu: `force-dynamic`, memory-cache, `SiteLink` prefetch off, `images.unoptimized`

## Hostinger yayın

Ayrıntı: [`docs/HOSTINGER.md`](docs/HOSTINGER.md)

1. Node.js Web App + Next.js  
2. Env: `MYSQL_*`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL` (şifrede `?` varsa `DATABASE_URL` kullanma)  
3. Build: `npm run build` · Start: `npm run start`  

## Canlıya çıkarken

1. `JWT_SECRET` ≥32 karakter  
2. Admin şifresi + 2FA  
3. `NEXT_PUBLIC_SITE_URL`  
4. Hostinger MySQL split env  
5. Production’da `db:seed` çalıştırmayın (`ALLOW_PROD_SEED` olmadan yasak)  
6. Google İşletme Profili URL’sini Admin → Ayarlar’dan güncelleyin  
