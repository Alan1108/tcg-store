'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import type { SealedProduct } from '@/types';

interface SealedProductCardProps {
  product: SealedProduct;
  onAddToCart?: (id: string) => void;
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

const stockConfig: Record<string, { label: string; color: string }> = {
  in_stock: { label: 'En Stock', color: '#22C55E' },
  low_stock: { label: 'Stock Bajo', color: '#F59E0B' },
  out_of_stock: { label: 'Agotado', color: '#9494AC' },
};

function formatPrice(price: number) {
  return '$' + price.toLocaleString('es-CL');
}

export function SealedProductCard({ product, onAddToCart }: SealedProductCardProps) {
  const stock = stockConfig[product.stock];

  return (
    <div className="flex flex-col rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] overflow-hidden">
      <div className="relative h-[175px] bg-[var(--bg-elevated)]">
        <span
          className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-[var(--bg-base)]"
          style={{ backgroundColor: gameColors[product.game] }}
        >
          {gameLabels[product.game]}
        </span>
        <button className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/40">
          <Heart className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <span className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-2 leading-[1.3]">
          {product.name}
        </span>
        <span className="text-[11px] text-[var(--text-muted)]">{product.setName}</span>
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--accent-primary)]">
            {formatPrice(product.price)}
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
          onClick={() => onAddToCart?.(product.id)}
          className="flex items-center justify-center gap-2 w-full h-[34px] rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-semibold text-white">Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
}
