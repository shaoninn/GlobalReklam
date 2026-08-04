"use client";

import { SiteLink } from "@/components/ui/SiteLink";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product & { category?: { name: string; slug: string } };
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        categoryName: product.category?.name || "",
        widthCm: null,
        heightCm: null,
        color: null,
      })
    );
  };

  return (
    <SiteLink
      href={`/urun/${product.slug}`}
      prefetch={false}
      className="group block bg-card border border-border hover:border-orange/50 transition-all rounded-xl overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-lg font-bold text-orange/20 uppercase text-center px-4">
              {product.name}
            </span>
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center bg-orange text-black hover:bg-orange-dark transition-colors"
          aria-label="Teklif listesine ekle"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
      <div className="p-4">
        {product.category && (
          <p className="text-xs text-orange uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
        )}
        <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-orange transition-colors">
          {product.name}
        </h3>
        <div className="flex items-end justify-between gap-2">
          <p className="font-display text-lg font-bold text-orange">
            {formatPrice(product.price)}
          </p>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            Teklif
          </span>
        </div>
      </div>
    </SiteLink>
  );
}
