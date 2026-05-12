'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { BadgeGame, BadgeStock, ButtonGhost, TrustBadge, Divider } from '@/components/atoms';
import { SealedProductCard } from '@/components/organisms';
import { getSealedProductById, getSealedProducts } from '@/services/products.service';
import { formatPrice } from '@/lib/format';
import { AddToCartButton } from './add-to-cart-button';
import type { GameSystem } from '@/types';
import type { HttpTypes } from '@medusajs/types';

function getStockStatus(qty?: number | null, manageInventory?: boolean | null): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (manageInventory === false) return 'in_stock';
  if (!qty || qty <= 0) return 'out_of_stock';
  if (qty <= 3) return 'low_stock';
  return 'in_stock';
}

export function SealedDetailContent({ id }: { id: string }) {
  const [product, setProduct] = useState<HttpTypes.StoreProduct | null>(null);
  const [related, setRelated] = useState<HttpTypes.StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSealedProductById(id)
      .then((p) => {
        setProduct(p);
        if (p) {
          getSealedProducts({ limit: 4 })
            .then((r) => setRelated(r.data.filter((x) => x.id !== id).slice(0, 3)))
            .catch(() => {});
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col animate-pulse">
        <div className="w-full h-[300px] md:h-[390px] bg-bg-elevated" />
        <div className="max-w-[1280px] mx-auto w-full px-4 py-4 flex flex-col gap-3">
          <div className="h-4 w-24 rounded bg-bg-elevated" />
          <div className="h-8 w-3/4 rounded bg-bg-elevated" />
          <div className="h-10 w-32 rounded bg-bg-elevated" />
          <div className="h-11 rounded bg-bg-elevated" />
        </div>
      </div>
    );
  }

  if (!product) return notFound();

  const game = (product.metadata?.game as GameSystem) ?? '';
  const setName = (product.metadata?.set_name as string) ?? '';
  const category = (product.metadata?.category as string) ?? '';
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode = firstVariant?.calculated_price?.currency_code ?? 'USD';
  const stockStatus = getStockStatus(firstVariant?.inventory_quantity, firstVariant?.manage_inventory);
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/sealed"><ArrowLeft className="w-5 h-5 text-text-secondary" /></Link>
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <Link href="/" className="hover:text-text-primary">Inicio</Link>
          <span>›</span>
          <Link href="/sealed" className="hover:text-text-primary">Sobres y Cajas</Link>
          <span>›</span>
          <span className="text-text-primary">{product.title}</span>
        </div>
      </div>

      <div className="relative w-full h-[300px] md:h-[390px] bg-bg-elevated">
        {imageUrl && (
          <Image src={imageUrl} alt={product.title ?? ''} fill className="object-contain p-4" />
        )}
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-4 flex flex-col gap-3 py-4">
        <div className="flex items-center gap-2">
          {game && <BadgeGame game={game} />}
          <BadgeStock status={stockStatus} />
        </div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">{product.title}</h1>
        <p className="text-sm text-text-secondary">
          {(product.metadata?.set_name as string) ?? product.subtitle ?? ''}
        </p>
        <span className="font-heading text-[32px] font-bold text-accent-primary">
          {formatPrice(price, currencyCode)}
        </span>
        <AddToCartButton variantId={firstVariant?.id} disabled={stockStatus === 'out_of_stock'} />
        <Link href="/sealed"><ButtonGhost label="Seguir comprando" fullWidth /></Link>
      </div>

      {product.description && (
        <>
          <Divider />
          <div className="px-4 py-4 text-sm text-text-secondary leading-relaxed max-w-[1280px] mx-auto w-full">
            <h2 className="text-sm font-semibold text-text-primary mb-2">Descripción</h2>
            <p>{product.description}</p>
          </div>
        </>
      )}

      <Divider />
      <div className="px-4 py-4 max-w-[1280px] mx-auto w-full">
        <h2 className="text-sm font-semibold text-text-primary mb-3">Atributos del Producto</h2>
        <div className="flex flex-col gap-2 text-sm text-text-secondary">
          {game && <div className="flex justify-between"><span>Juego</span><span className="font-medium text-text-primary">{game}</span></div>}
          {setName && <div className="flex justify-between"><span>Set</span><span className="font-medium text-text-primary">{setName}</span></div>}
          {category && <div className="flex justify-between"><span>Tipo</span><span className="font-medium text-text-primary">{category}</span></div>}
        </div>
      </div>

      {related.length > 0 && (
        <div className="px-4 py-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold text-text-primary">También te puede interesar</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/sealed/${p.id}`} className="block">
                <SealedProductCard product={p} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
