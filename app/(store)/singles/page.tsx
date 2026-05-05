'use client';

import { useState, useEffect } from 'react';
import { SinglesCard } from '@/components/organisms';
import { InputSearch, ChipFilter, ButtonSecondary, InputDropdown, ButtonIconOnly } from '@/components/atoms';
import type { HttpTypes } from '@medusajs/types';
import { getSingleCards } from '@/services/products.service';

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio menor' },
  { value: 'price_desc', label: 'Precio mayor' },
  { value: 'name', label: 'Nombre' },
];

export default function SinglesCatalogPage() {
  const [cards, setCards] = useState<HttpTypes.StoreProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getSingleCards({ search: search || undefined, page, limit: 20 }).then(({ data, total: t }) => {
      setCards(data);
      setTotal(t);
    });
  }, [search, page]);

  return (
    <div className="flex flex-col">
      <div className="bg-bg-surface py-6">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-4">
          <h1 className="font-heading text-[28px] font-bold text-text-primary">Singles</h1>
          <p className="text-sm text-text-secondary">Cartas individuales de todos los juegos</p>
          <InputSearch placeholder="Buscar cartas..." value={search} onChange={setSearch} />
          {gameFilters.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {gameFilters.map((g) => (
                <ChipFilter key={g} label={g} color="#4B8DF5" onRemove={() => setGameFilters((f) => f.filter((x) => x !== g))} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{total} cartas</span>
            <div className="flex items-center gap-2">
              <InputDropdown options={sortOptions} value={sortBy} onChange={setSortBy} className="w-40" />
              <ButtonSecondary label="Filtrar" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((c) => (
            <SinglesCard key={c.id} card={c} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 mt-8">
          <ButtonIconOnly icon="ChevronLeft" onClick={() => setPage((p) => Math.max(1, p - 1))} />
          <span className="w-10 h-10 rounded-lg text-sm font-medium bg-accent-primary text-white flex items-center justify-center">
            {page}
          </span>
          <ButtonIconOnly icon="ChevronRight" onClick={() => setPage((p) => p + 1)} />
        </div>
      </div>
    </div>
  );
}
