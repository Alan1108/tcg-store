'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { ButtonPrimary, ButtonGhost, Divider } from '@/components/atoms';
import { useWishlist } from '@/providers/wishlist';
import { useCart } from '@/providers/cart';
import { getProductsByIds } from '@/services/products.service';
import { formatPrice } from '@/lib/format';
import type { HttpTypes } from '@medusajs/types';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      setProducts([]);
      return;
    }
    const ids = [...new Set(items.map((i) => i.productId))];
    getProductsByIds(ids).then(setProducts);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 px-4">
        <Heart className="w-16 h-16 text-text-muted" />
        <h1 className="font-heading text-2xl font-bold text-text-primary">Tu wishlist está vacía</h1>
        <p className="text-sm text-text-secondary text-center">
          Guarda tus productos favoritos para encontrarlos fácilmente después
        </p>
        <Link href="/sealed"><ButtonPrimary label="Ver catálogo" icon="ShoppingCart" /></Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Mi Wishlist</h1>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-primary text-xs font-bold text-white">
          {items.length}
        </span>
      </div>

      <div className="flex flex-col">
        {items.map((item, idx) => {
          const product = products.find((p) => p.id === item.productId);
          const variant = product?.variants?.find((v) => v.id === item.variantId);
          const imageUrl = product?.thumbnail ?? product?.images?.[0]?.url ?? undefined;
          const price = variant?.calculated_price?.calculated_amount ?? 0;
          const currencyCode = variant?.calculated_price?.currency_code ?? 'USD';

          return (
            <div key={`${item.productId}-${item.variantId}`}>
              {idx > 0 && <Divider className="my-3" />}
              <div className="flex items-center gap-3">
                <Link href={`/sealed/${item.productId}`} className="w-20 h-20 rounded-lg bg-bg-elevated flex-shrink-0 relative overflow-hidden">
                  {imageUrl && (
                    <Image src={imageUrl} alt={product?.title ?? ''} fill className="object-cover" />
                  )}
                </Link>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <Link href={`/sealed/${item.productId}`} className="text-[13px] font-semibold text-text-primary line-clamp-2 hover:text-accent-primary transition-colors">
                    {product?.title ?? '—'}
                  </Link>
                  {variant?.title && (
                    <span className="text-[11px] text-text-muted">{variant.title}</span>
                  )}
                  <span className="font-heading text-base font-bold text-accent-primary">
                    {formatPrice(price, currencyCode)}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-bg-elevated transition-colors"
                    aria-label="Eliminar de wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-[var(--danger)]" />
                  </button>
                  {variant?.id && (
                    <button
                      onClick={async () => {
                        await addToCart(variant.id!, 1);
                        removeItem(item.productId, item.variantId);
                      }}
                      className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs font-semibold text-white">Agregar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Divider className="mt-2" />
      <Link href="/sealed"><ButtonGhost label="Seguir explorando" fullWidth /></Link>
    </div>
  );
}
