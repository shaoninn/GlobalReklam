# Global Reklam — Cursor AI Teknik Referans (Blueprint)

> **Amaç:** Benzer bir kurumsal site + admin + canlı editör projesini başka bir Cursor sohbetinde / repoda kurarken bu belgeyi sistem/prompt olarak kullan.
> **Kaynak repo:** `C:\GitHub\GlobalReklam` (GitHub: `shaoninn/GlobalReklam`, branch `main`)
> **Dil / pazar:** Türkçe B2B (Antalya tabela–reklam); ödeme yok → **teklif siparişi**.
> **Not:** README’de eski SQLite/Postgres ifadeleri kalabilir; **canlı runtime MySQL/MariaDB + Prisma 7 + Hostinger Node**’dur.

---

## 0) Yeni sohbette nasıl kullan

1. Bu dosyanın tamamını yeni chat’e yapıştır **veya** `docs/CURSOR-REFERENCE-BLUEPRINT.md` olarak yeni repoya kopyala.
2. Cursor’da bu repo hâlâ açıksa / workspace’e eklendiyse: `@GlobalReklam` veya `@docs/CURSOR-REFERENCE-BLUEPRINT.md` ile bağlam ver.
3. Multi-root: File → Add Folder to Workspace → `GlobalReklam` + yeni repo.
4. Komut örneği:

```text
Bu blueprint’e göre [YENİ MARKA] için benzer mimari kur.
Farklılar: [sektör], [renk/font], [domain], [MySQL env].
GlobalReklam’daki performans kurallarını (prefetch off, memory cache, force-dynamic,
pool=3, SiteContent TEXT) aynen uygula. Canlı editör + klasik admin ikilisini koru.
Ürün CRUD editörde olmasın. Excel import + sipariş filtre/sil ekle.
```

---

## 1) Ürün tanımı (ne inşa edildi)

| Katman | Ne |
|--------|-----|
| **Public site** | Kurumsal sayfalar, hizmet/kategori/ürün, proje portföyü, blog, iletişim, yasal sayfalar |
| **Teklif sepeti** | Redux + localStorage; ödeme yok; `POST /api/orders` sunucu fiyatı; WhatsApp + opsiyonel e-posta |
| **Admin panel** | `/admin` — katalog, sipariş, mesaj, medya, kullanıcı, ayar, audit |
| **Canlı editör** | `/duzenle` — Wix tarzı tıkla-düzenle (metin/görsel/menü/ayar); ürün CRUD yok |

---

## 2) Stack (pinlenmiş mantık)

```
Next.js 16.2.x (App Router) + React 19 + TypeScript
Tailwind CSS 4
Prisma 7 (provider=mysql, generator output=src/generated/prisma)
@prisma/adapter-mariadb + mariadb driver
jose (JWT) + bcryptjs + otplib/qrcode (2FA)
Redux Toolkit (sadece sepet)
zod 4
xlsx (ürün Excel)
nodemailer / Resend opsiyonel
@aws-sdk/client-s3 opsiyonel (yoksa public/uploads)
lucide-react + özel WhatsAppIcon SVG
Node engines: >=20 <=22
```

**Fontlar:** Inter (body) + Rajdhani (display) — `src/app/layout.tsx`.

**Görsel dil (bu marka):** koyu zemin (`#0a0a0a` / card), turuncu accent, uppercase display başlıklar. Yeni projede CSS değişkenlerini markaya göre değiştir; mor/krem AI klişelerinden kaçın.

---

## 3) Dizin mimarisi (kopyala / aynısını kur)

```
src/
  app/
    layout.tsx, globals.css, sitemap.ts, robots.ts, not-found.tsx
    (site)/          # public layout: Header, Footer, FloatingContact, StoreProvider
      page.tsx       # home
      hakkimizda/, iletisim/, hizmetler/, urun/[slug]/
      projeler/, blog/, sepet/
      yasal sayfalar (kvkk, gizlilik, …)
    admin/
      login/
      (panel)/       # sidebar layout
        page.tsx, urunler/, kategoriler/, projeler/, blog/
        siparisler/, musteriler/, mesajlar/, icerikler/, menuler/
        medya/, kullanicilar/, audit/, ayarlar/
    duzenle/         # EditorProvider + EditorChrome; sayfalar (site) ile paylaşılır
    api/             # REST route handlers
  components/
    home/            # Hero, ValueProps, ProcessSteps, WorksSlider, StatsBar, …
    shop/            # ProductCard, AddToCartButton, CartPage, CartToast
    editor/          # EditableText/Image/Setting/Category, EditorProvider, CatalogGuard
    admin/, layout/, brand/, contact/, about/, legal/, projects/, ui/
  lib/               # db, auth, memory-cache, catalog, site, orders, seo, …
  store/             # cartSlice (localStorage key)
  middleware.ts      # /admin/* + /duzenle/*
prisma/
  schema.prisma
  seed.ts
  upsert-editor-content.ts   # editör anahtarlarını silmeden ekle
  expand-text-columns.sql    # VARCHAR→TEXT (Hostinger)
scripts/start.mjs            # 0.0.0.0 + /api/health warm
docs/HOSTINGER.md
```

**Kritik kural:** Public sayfa bileşenleri `Editable*` kullanır; `useEditor().enabled === false` iken normal render. `/duzenle` aynı bileşenleri `EditorProvider enabled` ile sarar → tek kaynak.

---

## 4) Veri modeli (Prisma / MySQL)

Uzun metin alanları **`@db.Text`** olmalı (MySQL’de çıplak `String` → VARCHAR(191) → blog/ürün kesilir).

| Model | Rol |
|-------|-----|
| `AdminUser` | email, passwordHash, role, totpSecret/Enabled |
| `Category` | name, slug, description Text, icon, image, sortOrder, isActive |
| `Product` | name, slug, description/shortDesc Text, price, image/images/specs Text, inStock, isActive, categoryId |
| `Project` | title, slug, description Text, images Text, location, isFeatured, categoryId? |
| `BlogPost` | title, slug, excerpt Text, content Text, image, isPublished, publishedAt |
| `SiteContent` | **key** unique, title?, content Text — pazarlama metinleri / görsel URL |
| `SiteSetting` | key/value Text — phone, whatsapp, email, address, google_reviews_url, work_hours_* |
| `NavItem` | label, href, sortOrder, isActive |
| `ContactMessage` | form inbox |
| `Customer` | phone unique CRM |
| `Order` + `OrderItem` | teklif; status PENDING\|CONFIRMED\|CANCELLED; source WEB\|WHATSAPP; ölçü/renk opsiyonları |
| `MediaAsset` | upload kaydı |
| `AuditLog` | admin aksiyonları |

**Seed güvenliği:** Production’da `ALLOW_PROD_SEED=true` olmadan seed yasak (tabloları siler). Editör anahtarları için `npm run db:seed:editor` (upsert, silmez).

---

## 5) Auth

| Öğe | Değer / davranış |
|-----|------------------|
| Cookie | `gr_admin_token`, httpOnly, path `/`, 7g JWT (jose HS256) |
| Middleware | `/admin/:path*` (login hariç) + `/duzenle` + `/duzenle/:path*` → login `?from=` |
| Login | rate-limit; 2FA açıksa challenge JWT + TOTP |
| API koruma | `getSession` / `requireAdmin` |
| Secret | `JWT_SECRET` ≥32 prod |

---

## 6) Performans (Hostinger + uzak MySQL — zorunlu kurallar)

Bu proje uzak MySQL RTT yüzünden şu kalıpları kullanır; **yeni sitede de uygula**:

1. **`SiteLink`:** `prefetch={false}` varsayılan — hover’da onlarca `_rsc` isteği havuzu öldürmesin.
2. **Process memory cache** (`src/lib/memory-cache.ts`): settings/nav/catalog/content ~60s TTL; boş sonuç kısa TTL.
3. **Revalidate:** admin mutate sonrası `revalidate*.ts` → memory invalidate + `revalidateTag(..., { expire: 0 })`.
4. **Sayfalar:** `export const dynamic = "force-dynamic"` (+ çoğu yerde `revalidate = 0`) — Hostinger’da boş ISR cache tuzağı.
5. **Pool:** `MYSQL_POOL_SIZE` default **3**; isteğe `MYSQL_SERIALIZE`.
6. **Warm:** `instrumentation.ts` + `scripts/start.mjs` → gecikmeli `GET /api/health`.
7. **Images:** `images.unoptimized: true` (Hostinger uyumu).
8. **React `cache()`:** request-içi dedupe (`site.ts`, `catalog.ts`).
9. **Build:** `prisma generate && next build` — build sırasında DB şart değil.

**Başlatma:** `next start --hostname 0.0.0.0` (`scripts/start.mjs`).

---

## 7) Public site — sayfalar & bileşenler

### Ana sayfa (`loadHomePageData` → `SiteContent` keys)

Sıra: `Hero` → `ValueProps` → `ProcessSteps` → `WorksSlider` → `StatsBar` → `ServicesGrid` → `Testimonials` → `FaqSection` → `CTASection`.

Önemli content keys: `hero_title`, `hero_subtitle`, `hero_body`, `hero_image`, `works_eyebrow`, `works_title`, process_*, faq_*, testimonial_*, value_prop_*, stat_*, `cta_title`, `services_*`, `footer_blurb`.

### Hero

- Arka plan: `EditableImage` `contentKey=hero_image` (editörde **sabit “Arka plan görseli”** düğmesi — overlay tıklamayı engellediği için).
- Başlıkta “TABELA” kelimesi turuncu vurgulanır.

### Katalog

- `/hizmetler` liste; `/hizmetler/[slug]` kategori (ad/açıklama editörde `EditableCategoryField`); ürün kartları admin-only.
- `/urun/[slug]`: fiyat/özellik/açıklama **sadece Admin → Ürünler**; editörde `CatalogAdminHint`.
- `/projeler`, `/blog`: sayfa intro’ları editörde; kart içerikleri admin’de.

### Sepet / teklif

1. `AddToCartButton` → Redux `cartSlice` (`gr-cart` localStorage) + `CartToast` (→ `/sepet`).
2. `/sepet`: ölçü (en/boy cm), renk, adet, KVKK.
3. `POST /api/orders`: fiyat **sunucuda** Product’tan; `createQuoteOrder`.
4. WhatsApp ile de sipariş metni gönderilebilir.

### İletişim / chrome

- `ContactForm`: ayarlar (EditableSetting) + CTA metinleri (EditableText).
- `FloatingContact` / Header / Footer: gerçek `WhatsAppIcon` (yeşil FAB).
- Yasal: `LEGAL_LINKS` + `LegalShell`.

### SEO

- `sitemap.ts`, `robots.ts` (disallow `/admin`, `/api`, `/sepet`).
- JSON-LD LocalBusiness/WebSite; ürün sayfalarında Product schema.
- `/duzenle` → `robots: noindex`.

---

## 8) Canlı editör (`/duzenle`) — mimari

```
Admin "Siteyi Düzenle" → /duzenle
  EditorProvider (enabled)
    EditorChrome (sayfa seçici, Menü, İletişim bilgileri, dirty uyarı)
      Header/Footer (nav href → toEditorHref)
      aynı public page tree + Editable*
```

| Bileşen | Görev |
|---------|--------|
| `EditableText` | SiteContent PUT; `editField: content\|title` |
| `EditableImage` | upload → URL → content key |
| `EditableSetting` | SiteSetting PUT + refresh |
| `EditableCategoryField` | PUT `/api/categories/[id]` (name/description; slug sabit) |
| `CatalogGuard` / `CatalogAdminHint` | ürün/proje/blog kart CRUD engeli |
| `PageIntro` | eyebrow + title + intro |
| `NavEditorPanel` / `SettingsEditorPanel` | menü / iletişim panelleri |

**Editörde EVET:** pazarlama metni, hero/about görselleri, kategori adı-açıklama, menü, telefon/adres.  
**Editörde HAYIR:** ürün fiyat/CRUD, proje/blog yazısı CRUD, sipariş.

`SiteLink` editör açıkken `/hizmetler/...` → `/duzenle/hizmetler/...` (yasal/sepet/admin remap edilmez).

---

## 9) Admin paneli — bölümler

| Rota | İşlev |
|------|--------|
| `/admin` | Dashboard + Siteyi Düzenle CTA |
| `/admin/urunler` | **Inline toplu düzenleme** + **Excel indir/yükle** + detay form |
| `/admin/kategoriler` | Kategori CRUD |
| `/admin/projeler` | Portföy CRUD |
| `/admin/blog` | Yazı CRUD (content TEXT!) |
| `/admin/siparisler` | Durum/tarih/arama filtre; sil; filtrelenenleri sil |
| `/admin/musteriler` | CRM |
| `/admin/mesajlar` | İletişim formu |
| `/admin/icerikler` / `menuler` | Yedek formlar (editör tercih notu) |
| `/admin/medya` | Upload |
| `/admin/kullanicilar` / `audit` / `ayarlar` | Users, audit, site + 2FA + şifre |

### Ürün Excel

- `GET/POST /api/products/import` (`xlsx`)
- Sütunlar: `id`, `name`, `slug`, `categorySlug`, `price`, `shortDesc`, `description`, `image`, `sortOrder`, `isActive`, `inStock`
- Eşleşme: id veya slug → update; yoksa create
- `PUT /api/products/bulk` — tablo inline kayıt

### Siparişler

- Client filtre: status, from/to date, q
- `DELETE /api/orders/[id]` (+ cascade OrderItem)

---

## 10) API haritası (özet)

```
Auth:     /api/auth/login|logout|totp|password|bootstrap
Catalog:  /api/products[/id|/bulk|/import], /api/categories[/id], /api/projects[/id], /api/blog[/id]
Orders:   /api/orders, /api/orders/[id]
CMS:      /api/content, /api/settings, /api/nav[/id]
Ops:      /api/upload, /api/contact, /api/messages, /api/customers
Admin:    /api/admin-users[/id], /api/audit, /api/cache/purge, /api/health
```

Upload: S3 env varsa R2/S3; yoksa `public/uploads` + magic-byte kontrol.

---

## 11) Ortam değişkenleri (prod)

| Değişken | Not |
|----------|-----|
| `MYSQL_*` veya `DATABASE_URL` | Hostinger remote host (`srv….hstgr.io`); şifrede `?` varsa split env kullan |
| `MYSQL_POOL_SIZE` | 3 önerilir |
| `JWT_SECRET` | ≥32 |
| `NEXT_PUBLIC_SITE_URL` | canonical / sitemap |
| `NEXT_PUBLIC_GA_ID` | opsiyonel |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | sadece seed |
| `ALLOW_PROD_SEED` | production seed kilidi |
| `RESEND_API_KEY` / `SMTP_URL` | teklif maili |
| `S3_*` | medya |
| `DB_WARM_DELAY_MS` | start warm gecikmesi |

Hostinger: Build `npm run build`; Start `npm run start`; ayrıntı `docs/HOSTINGER.md`.

---

## 12) Bilinen tuzaklar (yeni projede tekrarlama)

1. **String → VARCHAR(191):** blog/ürün/SiteContent için baştan `@db.Text`.
2. **ISR + boş cache Hostinger:** marketing sayfalarında force-dynamic tercih edildi.
3. **Link prefetch:** katalog yoğun sitede kapat.
4. **Editörde ürün fiyatı:** kullanıcılar karıştırır → CatalogAdminHint + admin-only.
5. **Hero arka plan tıklanamaz:** fill image için floating “Arka plan görseli” kontrolü.
6. **Seed production:** tüm tabloları siler — `db:seed:editor` kullan.
7. **README drift:** stack MySQL; eski Postgres/SQLite cümlelerine güvenme.
8. **Fiyat client’tan gelmez:** order API Product.price kullanır.

---

## 13) Yeni site için önerilen uygulama sırası (Cursor’a ver)

```text
1. Next 16 + Tailwind 4 + Prisma 7 MySQL iskeleti
2. schema (TEXT alanlar) + seed + AdminUser auth + middleware
3. Site layout (Header/Footer/WhatsAppIcon) + memory-cache + SiteLink prefetch=false
4. Catalog pages + Product detail + Redux quote cart + /api/orders
5. Admin CRUD (ürün/kategori/proje/blog/sipariş/mesaj/ayar)
6. SiteContent keys + /duzenle EditorProvider/Editable* + CatalogGuard
7. Orders filter/delete + Products bulk + Excel import
8. SEO (sitemap/robots/JSON-LD) + Hostinger start.mjs + health warm
9. Marka: font, renk, kopya, görseller — mimariyi bozma
```

---

## 14) Bileşen checklist (yeni repoda “var mı?”)

- [ ] `middleware` admin+editor
- [ ] `memory-cache` + `revalidate*`
- [ ] `SiteLink` prefetch off + editor href map
- [ ] `Hero` + `hero_image` floating control
- [ ] `EditableText` / `EditableImage` / `EditableSetting` / `EditableCategoryField`
- [ ] `CatalogAdminHint` ürün detayda
- [ ] `WhatsAppIcon` (brand SVG, yeşil FAB)
- [ ] Cart toast → `/sepet`
- [ ] OrdersClient filtre+sil
- [ ] ProductsAdminClient bulk + Excel
- [ ] `@db.Text` + expand SQL
- [ ] `force-dynamic` public layout
- [ ] `scripts/start.mjs` 0.0.0.0 + health

---

## 15) Referans dosya yolları (GlobalReklam)

```
src/middleware.ts
src/lib/auth.ts, db.ts, memory-cache.ts, revalidate.ts, site.ts, catalog.ts, orders.ts
src/lib/editor-pages.ts, editor-href.ts, site-content.ts, home-content.ts
src/components/editor/*
src/components/home/Hero.tsx, WorksSlider.tsx
src/components/ui/SiteLink.tsx
src/components/brand/WhatsAppIcon.tsx
src/app/(site)/layout.tsx, page.tsx
src/app/duzenle/layout.tsx
src/app/admin/(panel)/urunler/ProductsAdminClient.tsx
src/app/admin/(panel)/siparisler/OrdersClient.tsx
src/app/api/products/import/route.ts, bulk/route.ts
prisma/schema.prisma, expand-text-columns.sql, upsert-editor-content.ts
scripts/start.mjs
docs/HOSTINGER.md
```

---

*Belge tarihi: 2026-08-04 — `main` @ `50d10c6` civarı özellik seti.*
