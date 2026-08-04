"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAlert,
  AdminButton,
  AdminField,
  apiJson,
} from "@/components/admin/AdminForm";
import {
  ImageGalleryField,
  ImageUploadField,
} from "@/components/admin/ImageUploadField";
import { slugify } from "@/lib/utils";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: CategoryOption[];
  initial?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    shortDesc: string | null;
    price: number;
    image: string | null;
    images: string;
    specs: string;
    sortOrder: number;
    isActive: boolean;
    inStock: boolean;
    categoryId: string;
  };
}

function parseImagesJson(json?: string): string[] {
  try {
    const arr = JSON.parse(json || "[]") as string[];
    return Array.isArray(arr) ? arr.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function ProductForm({ categories, initial }: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugManual, setSlugManual] = useState(false);
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId || categories[0]?.id || ""
  );
  const [price, setPrice] = useState(String(initial?.price ?? 0));
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [shortDesc, setShortDesc] = useState(initial?.shortDesc || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState(initial?.image || "");
  const [gallery, setGallery] = useState(() => parseImagesJson(initial?.images));
  const [specs, setSpecs] = useState(() => {
    try {
      return JSON.parse(initial?.specs || "{}") as Record<string, string>;
    } catch {
      return {};
    }
  });
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [inStock, setInStock] = useState(initial?.inStock ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function onNameChange(value: string) {
    setName(value);
    if (!slugManual) setSlug(slugify(value));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const trimmedImage = image.trim();
      const payload = {
        name,
        slug,
        categoryId,
        price: Number(price) || 0,
        sortOrder: Number(sortOrder) || 0,
        shortDesc,
        description,
        image: trimmedImage.length > 0 ? trimmedImage : null,
        images: JSON.stringify(gallery.filter(Boolean)),
        specs: JSON.stringify(specs),
        isActive,
        inStock,
      };

      if (isEdit && initial) {
        await apiJson(`/api/products/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setSuccess("Ürün güncellendi.");
        router.refresh();
      } else {
        await apiJson("/api/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        router.push("/admin/urunler");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-card p-4 sm:p-6 max-w-2xl w-full">
      {error && <AdminAlert type="error">{error}</AdminAlert>}
      {success && <AdminAlert type="success">{success}</AdminAlert>}

      <AdminField label="Ürün Adı *" help="Müşterinin göreceği ürün adı.">
        <input
          className="admin-input"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />
      </AdminField>

      <AdminField
        label="Slug (adres eki) *"
        help="Ürünün web adresi. Örn: isikli-totem-cift-yuzlu → /urun/…. Benzersiz olmalı. Küçük harf, tire; boşluk/Türkçe karakter yok. İsim yazınca otomatik dolar."
      >
        <input
          className="admin-input"
          value={slug}
          onChange={(e) => {
            setSlugManual(true);
            setSlug(e.target.value);
          }}
          required
        />
      </AdminField>

      <AdminField label="Kategori *" help="Ürünün ait olduğu tabela türü.">
        <select
          className="admin-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="Fiyat (₺)" help="Liste fiyatı.">
          <input
            className="admin-input"
            type="number"
            min={0}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </AdminField>
        <AdminField
          label="Sıra numarası"
          help="Listede sıralama. Küçük sayı önce gelir (0, 1, 2…). Aynı kategoride ürünleri bu sayıya göre dizer."
        >
          <input
            className="admin-input"
            type="number"
            step={1}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </AdminField>
      </div>

      <AdminField label="Kısa Açıklama">
        <input
          className="admin-input"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />
      </AdminField>

      <AdminField label="Detaylı Açıklama">
        <textarea
          className="admin-input min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </AdminField>

      <ImageUploadField
        label="Ana görsel"
        value={image}
        onChange={setImage}
        help="Liste ve ürün sayfasında görünen kapak fotoğrafı. Boş bırakılabilir."
      />

      <ImageGalleryField
        label="Galeri görselleri"
        value={gallery}
        onChange={setGallery}
        help="Ek fotoğraflar. Birden fazla seçebilir veya tek tek ekleyebilirsiniz."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {(
          [
            ["malzeme", "Malzeme"],
            ["garanti", "Garanti"],
            ["montaj", "Montaj"],
            ["teslimat", "Teslimat"],
          ] as const
        ).map(([key, label]) => (
          <AdminField key={key} label={label}>
            <input
              className="admin-input"
              value={specs[key] || ""}
              onChange={(e) =>
                setSpecs((s) => ({ ...s, [key]: e.target.value }))
              }
            />
          </AdminField>
        ))}
      </div>

      <div className="flex gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm text-[#ccc]">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Sitede aktif
        </label>
        <label className="flex items-center gap-2 text-sm text-[#ccc]">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          Stokta var
        </label>
      </div>

      <div className="flex gap-3">
        <AdminButton type="submit" loading={loading}>
          {isEdit ? "Güncelle" : "Ürün Ekle"}
        </AdminButton>
        <AdminButton
          variant="ghost"
          onClick={() => router.push("/admin/urunler")}
        >
          İptal
        </AdminButton>
      </div>
    </form>
  );
}
