'use client';

import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import type { HttpTypes } from '@medusajs/types';
import type { GameSystem } from '@/types';
import { formatPrice } from '@/lib/format';

interface SealedProductCardProps {
  product: HttpTypes.StoreProduct;
  onAddToCart?: (variantId: string) => void;
}

const gameColors: Record<string, string> = {
  pokemon: '#F5D623',
  mtg: '#C8A84E',
  yugioh: '#9B59B6',
  lorcana: '#2DD4BF',
  onepiece: '#E94560',
};

const gameLabels: Record<string, string> = {
  pokemon: 'Pokémon',
  mtg: 'Magic',
  yugioh: 'Yu-Gi-Oh!',
  lorcana: 'Lorcana',
  onepiece: 'One Piece',
};

function getStockConfig(inventoryQuantity?: number | null, manageInventory?: boolean | null) {
  if (manageInventory === false) return { label: 'En Stock', color: '#22C55E' };
  if (!inventoryQuantity || inventoryQuantity <= 0) return { label: 'Agotado', color: '#9494AC' };
  if (inventoryQuantity <= 3) return { label: 'Stock Bajo', color: '#F59E0B' };
  return { label: 'En Stock', color: '#22C55E' };
}

export function SealedProductCard({ product, onAddToCart }: SealedProductCardProps) {
  const game = (product.metadata?.game as GameSystem) ?? '';
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url;
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode = firstVariant?.calculated_price?.currency_code ?? 'USD';
  const stock = getStockConfig(firstVariant?.inventory_quantity, firstVariant?.manage_inventory);
  const isOutOfStock = firstVariant?.manage_inventory !== false &&
    (!firstVariant?.inventory_quantity || firstVariant.inventory_quantity <= 0);
  console.log(firstVariant, "isOutOfStock")

  return (
    <div className="flex flex-col rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] overflow-hidden">
      <div className="relative h-[175px] bg-bg-elevated">
        {imageUrl && (
          <Image src={imageUrl} alt={product.title ?? ''} fill className="object-cover" />
        )}
        {game && (
          <span
            className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-[var(--bg-base)]"
            style={{ backgroundColor: gameColors[game] ?? '#666' }}
          >
            {gameLabels[game] ?? game}
          </span>
        )}
        <button className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/40">
          <Heart className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <span className="text-[13px] font-semibold text-text-primary line-clamp-2 leading-[1.3]">
          {product.title}
        </span>
        <span className="text-[11px] text-text-muted">
          {(product.metadata?.set_name as string) ?? product.subtitle ?? ''}
        </span>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-accent-primary">
            {formatPrice(price, currencyCode)}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[10px] text-[10px] font-semibold"
            style={{ backgroundColor: stock.color + '33', color: stock.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stock.color }} />
            {stock.label}
          </span>
        </div>
        <button
          onClick={() => firstVariant?.id && onAddToCart?.(firstVariant.id)}
          disabled={isOutOfStock || !firstVariant}
          className="flex items-center justify-center gap-2 w-full h-[34px] rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-semibold text-white">Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
}
