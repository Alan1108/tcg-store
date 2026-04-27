'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { SealedProduct } from '@/types';
import { SealedProductCard } from './SealedProductCard';

interface FeaturedCarouselProps {
  products: SealedProduct[];
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">
          Productos Destacados
        </h2>
        <Link href="/sealed" className="text-sm font-medium text-[var(--accent-primary)]">
          Ver todos →
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-modal)] transition-colors">
          <ChevronLeft className="w-[18px] h-[18px] text-[var(--text-primary)]" />
        </button>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <SealedProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-modal)] transition-colors">
          <ChevronRight className="w-[18px] h-[18px] text-[var(--text-primary)]" />
        </button>
      </div>
    </div>
  );
}
