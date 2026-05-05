'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SealedProductCard } from '@/components/organisms';
import { InputSearch, ChipSelection, ButtonSecondary, InputDropdown, ButtonIconOnly } from '@/components/atoms';
import type { HttpTypes } from '@medusajs/types';
import { getSealedProducts } from '@/services/products.service';
import { useCart } from '@/providers/cart';

const categories = ['Booster Box', 'ETB', 'Booster Pack', 'Bundle', 'Collection'];
const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio menor' },
  { value: 'price_desc', label: 'Precio mayor' },
  { value: 'name', label: 'Nombre' },
];

export default function SealedCatalogPage() {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    getSealedProducts({ search: search || undefined, page, limit: 20 }).then(({ data, total: t }) => {
      setProducts(data);
      setTotal(t);
    });
  }, [search, page]);

  return (
    <div className="flex flex-col">
      <div className="bg-[var(--bg-surface)] py-6">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-primary)]">Inicio</Link>
            <span>›</span>
            <span className="text-[var(--text-primary)]">Sobres y Cajas</span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">
            Sobres y Cajas
          </h1>
          <InputSearch placeholder="Buscar productos..." value={search} onChange={setSearch} />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <ChipSelection key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">{total} productos</span>
            <div className="flex items-center gap-2">
              <InputDropdown options={sortOptions} value={sortBy} onChange={setSortBy} className="w-40" />
              <ButtonSecondary label="Filtrar" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link key={p.id} href={`/sealed/${p.id}`}>
              <SealedProductCard
                product={p}
                onAddToCart={(variantId) => addToCart(variantId, 1)}
              />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 mt-8">
          <ButtonIconOnly icon="ChevronLeft" onClick={() => setPage((p) => Math.max(1, p - 1))} />
          <span className="w-10 h-10 rounded-lg text-sm font-medium bg-[var(--accent-primary)] text-white flex items-center justify-center">
            {page}
          </span>
          <ButtonIconOnly icon="ChevronRight" onClick={() => setPage((p) => p + 1)} />
        </div>
      </div>
    </div>
  );
}
