'use client';

import { useState } from 'react';
import { BadgeGame, BadgeStock, InputSearch, ButtonPrimary } from '@/components/atoms';
import type { GameSystem, StockStatus } from '@/types';

const products = [
  { id: '1', name: 'Booster Box Scarlet & Violet 151', set: 'Scarlet & Violet', game: 'pokemon' as GameSystem, price: 89990, stock: 'in_stock' as StockStatus, qty: 12 },
  { id: '2', name: 'ETB Paldea Evolved', set: 'Paldea Evolved', game: 'pokemon' as GameSystem, price: 49990, stock: 'in_stock' as StockStatus, qty: 8 },
  { id: '3', name: 'Draft Booster Box Karlov Manor', set: 'Murders at Karlov Manor', game: 'mtg' as GameSystem, price: 119990, stock: 'low_stock' as StockStatus, qty: 2 },
  { id: '4', name: 'Booster Box Age of Overlord', set: 'Age of Overlord', game: 'yugioh' as GameSystem, price: 74990, stock: 'out_of_stock' as StockStatus, qty: 0 },
  { id: '5', name: 'Booster Box Azurada', set: 'Azurada', game: 'lorcana' as GameSystem, price: 94990, stock: 'in_stock' as StockStatus, qty: 6 },
];

function formatPrice(p: number) { return '$' + p.toLocaleString('es-CL'); }

export default function AdminSealedPage() {
  const [search, setSearch] = useState('');
  const filtered = products.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1040px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">Sobres y Cajas</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Gestiona el inventario de productos sellados</p>
        </div>
        <ButtonPrimary label="Agregar producto" icon="Plus" />
      </div>

      <InputSearch placeholder="Buscar productos..." value={search} onChange={setSearch} />

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)]">
        <div className="grid grid-cols-[1.5fr_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
          <span>Producto</span><span>Set</span><span>Juego</span><span>Precio</span><span>Estado</span><span>Qty</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((p) => (
            <div key={p.id} className="grid grid-cols-[1.5fr_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 items-center">
              <span className="text-sm font-medium text-[var(--text-primary)]">{p.name}</span>
              <span className="text-sm text-[var(--text-secondary)]">{p.set}</span>
              <BadgeGame game={p.game} />
              <span className="text-sm font-semibold text-[var(--text-primary)]">{formatPrice(p.price)}</span>
              <BadgeStock status={p.stock} />
              <span className="text-sm text-[var(--text-primary)]">{p.qty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
