'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SealedProductCard } from '@/components/organisms';
import { InputSearch, ChipFilter, ChipSelection, ButtonSecondary, InputDropdown, ButtonIconOnly } from '@/components/atoms';
import type { SealedProduct } from '@/types';

const products: SealedProduct[] = [
  { id: '1', name: 'Booster Box Scarlet & Violet 151', setName: 'Scarlet & Violet', game: 'pokemon', price: 89990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '2', name: 'Elite Trainer Box Paldea Evolved', setName: 'Paldea Evolved', game: 'pokemon', price: 49990, imageUrl: '', stock: 'in_stock', category: 'etb' },
  { id: '3', name: 'Draft Booster Box Murders at Karlov Manor', setName: 'Murders at Karlov Manor', game: 'mtg', price: 119990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '4', name: 'Booster Box Age of Overlord', setName: 'Age of Overlord', game: 'yugioh', price: 74990, imageUrl: '', stock: 'low_stock', category: 'booster_box' },
  { id: '5', name: 'Booster Box Azurada', setName: 'Azurada', game: 'lorcana', price: 94990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '6', name: 'Booster Pack Temporal Forces', setName: 'Temporal Forces', game: 'pokemon', price: 5990, imageUrl: '', stock: 'in_stock', category: 'booster_pack' },
  { id: '7', name: 'Bundle One Piece OP-08', setName: 'Two Legends', game: 'onepiece', price: 64990, imageUrl: '', stock: 'out_of_stock', category: 'bundle' },
  { id: '8', name: 'ETB Obsidian Flames', setName: 'Obsidian Flames', game: 'pokemon', price: 54990, imageUrl: '', stock: 'in_stock', category: 'etb' },
];

const categories = ['Booster Box', 'ETB', 'Booster Pack', 'Bundle', 'Collection'];
const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio menor' },
  { value: 'price_desc', label: 'Precio mayor' },
  { value: 'name', label: 'Nombre' },
];

export default function SealedCatalogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [gameFilters, setGameFilters] = useState<string[]>([]);

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
          {gameFilters.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {gameFilters.map((g) => (
                <ChipFilter key={g} label={g} color="#4B8DF5" onRemove={() => setGameFilters((f) => f.filter((x) => x !== g))} />
              ))}
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <ChipSelection key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">{products.length} productos</span>
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
              <SealedProductCard product={p} />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 mt-8">
          <ButtonIconOnly icon="ChevronLeft" />
          {[1, 2, 3].map((n) => (
            <button key={n} className={`w-10 h-10 rounded-lg text-sm font-medium ${n === 1 ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'}`}>
              {n}
            </button>
          ))}
          <ButtonIconOnly icon="ChevronRight" />
        </div>
      </div>
    </div>
  );
}
