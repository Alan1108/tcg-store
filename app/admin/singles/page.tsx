'use client';

import { useState } from 'react';
import { BadgeGame, BadgeCondition, BadgeRarity, InputSearch, ButtonPrimary } from '@/components/atoms';
import type { GameSystem, CardCondition, CardRarity } from '@/types';

const singles = [
  { id: '1', name: 'Charizard ex', set: 'Obsidian Flames', number: '006', game: 'pokemon' as GameSystem, rarity: 'Ultra Rare' as CardRarity, condition: 'NM' as CardCondition, price: 45990, stock: 3 },
  { id: '2', name: 'Pikachu VMAX', set: 'Vivid Voltage', number: '044', game: 'pokemon' as GameSystem, rarity: 'Rare' as CardRarity, condition: 'LP' as CardCondition, price: 12990, stock: 5 },
  { id: '3', name: 'Black Lotus', set: 'Alpha', number: '001', game: 'mtg' as GameSystem, rarity: 'Secret' as CardRarity, condition: 'MP' as CardCondition, price: 299990, stock: 1 },
  { id: '4', name: 'Dark Magician', set: 'Legend of Blue Eyes', number: '003', game: 'yugioh' as GameSystem, rarity: 'Holo' as CardRarity, condition: 'NM' as CardCondition, price: 34990, stock: 2 },
  { id: '5', name: 'Elsa, Snow Queen', set: 'The First Chapter', number: '012', game: 'lorcana' as GameSystem, rarity: 'Uncommon' as CardRarity, condition: 'NM' as CardCondition, price: 8990, stock: 8 },
];

function formatPrice(p: number) { return '$' + p.toLocaleString('es-CL'); }

export default function AdminSinglesPage() {
  const [search, setSearch] = useState('');
  const filtered = singles.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1040px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">Singles</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Gestiona el inventario de cartas individuales</p>
        </div>
        <ButtonPrimary label="Agregar carta" icon="Plus" />
      </div>

      <InputSearch placeholder="Buscar cartas..." value={search} onChange={setSearch} />

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)]">
        <div className="grid grid-cols-[1.5fr_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
          <span>Carta</span><span>Set</span><span>Juego</span><span>Rareza / Cond.</span><span>Precio</span><span>Stock</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((s) => (
            <div key={s.id} className="grid grid-cols-[1.5fr_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 items-center">
              <span className="text-sm font-medium text-[var(--text-primary)]">{s.name}</span>
              <span className="text-sm text-[var(--text-secondary)]">{s.set} · #{s.number}</span>
              <BadgeGame game={s.game} />
              <div className="flex gap-1"><BadgeRarity rarity={s.rarity} /><BadgeCondition condition={s.condition} /></div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{formatPrice(s.price)}</span>
              <span className="text-sm text-[var(--text-primary)]">{s.stock}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
