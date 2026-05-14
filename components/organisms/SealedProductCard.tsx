'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Clock } from 'lucide-react';
import type { HttpTypes } from '@medusajs/types';
import type { GameSystem } from '@/types';
import { formatPrice } from '@/lib/format';
import { useWishlist } from '@/providers/wishlist';

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
  const VALID_GAMES: GameSystem[] = ['pokemon', 'mtg', 'yugioh', 'lorcana', 'onepiece'];
  const collectionHandle = product.collection?.handle ?? '';
  const game = (VALID_GAMES.includes(collectionHandle as GameSystem) ? collectionHandle : '') as GameSystem | '';
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url;
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode = firstVariant?.calculated_price?.currency_code ?? 'USD';
  const stock = getStockConfig(firstVariant?.inventory_quantity, firstVariant?.manage_inventory);
  const isOutOfStock = firstVariant?.manage_inventory !== false &&
    (!firstVariant?.inventory_quantity || firstVariant.inventory_quantity <= 0);
  const isPresale = Boolean(product.metadata?.presale);
  const launchDate = product.metadata?.launch_date as string | undefined;
  const setName = (product.metadata?.set_name as string) ?? product.subtitle ?? '';
  const showSetName = setName && setName.toLowerCase() !== (product.title ?? '').toLowerCase();

  const { addItem, removeItem, isInWishlist } = useWishlist();
  const wishlisted = product.id && firstVariant?.id
    ? isInWishlist(product.id, firstVariant.id)
    : false;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.id || !firstVariant?.id) return;
    wishlisted
      ? removeItem(product.id, firstVariant.id)
      : addItem(product.id, firstVariant.id);
  };

  return (
    <div className="group h-full flex flex-col rounded-2xl bg-bg-surface border border-border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(68,136,255,0.1)] hover:border-border-accent/40">

      {/* Image */}
      <div className="relative h-[175px] bg-bg-elevated">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.title ?? ''}
            fill
            className="object-cover"
          />
        )}
        {game && (
          <span
            className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-[var(--bg-base)]"
            style={{ backgroundColor: gameColors[game] ?? '#666' }}
          >
            {gameLabels[game] ?? game}
          </span>
        )}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/35 backdrop-blur-sm border border-white/10 transition-transform active:scale-90"
        >
          <Heart
            className="w-3.5 h-3.5"
            fill={wishlisted ? '#f87171' : 'none'}
            color={wishlisted ? '#f87171' : 'white'}
          />
        </button>

        {/* Presale strip — absolute inside image, adds zero height to card */}
        {isPresale && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#F97316]">
            <Clock className="w-3 h-3 text-white shrink-0" />
            <span className="text-[10px] font-bold text-white tracking-wide">
              {launchDate ? `Preventa · ${launchDate}` : 'Preventa'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2 p-3.5">
        <p className="text-[13px] font-semibold text-text-primary line-clamp-2 leading-[1.35]">
          {product.title}
        </p>

        {showSetName && (
          <p className="text-[11px] text-text-muted -mt-1 truncate">{setName}</p>
        )}

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="font-heading text-[22px] font-bold text-accent-primary leading-none">
            {formatPrice(price, currencyCode)}
          </span>
          {!isPresale && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold shrink-0"
              style={{ backgroundColor: stock.color + '22', color: stock.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: stock.color }} />
              {stock.label}
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); firstVariant?.id && onAddToCart?.(firstVariant.id); }}
          disabled={isOutOfStock || !firstVariant}
          className="flex items-center justify-center gap-1.5 w-full h-9 rounded-xl bg-accent-primary hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed mt-auto"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="text-[11px] font-semibold text-white whitespace-nowrap">Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
}
