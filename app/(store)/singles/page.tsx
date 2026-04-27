'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SinglesCard } from '@/components/organisms';
import { InputSearch, ChipFilter, ButtonSecondary, InputDropdown, ButtonIconOnly } from '@/components/atoms';
import type { SingleCard } from '@/types';

const cards: SingleCard[] = [
  { id: '1', name: 'Charizard ex', setName: 'Obsidian Flames', setNumber: '006', game: 'pokemon', rarity: 'Ultra Rare', condition: 'NM', price: 45990, imageUrl: '', isFoil: true, language: 'EN' },
  { id: '2', name: 'Pikachu VMAX', setName: 'Vivid Voltage', setNumber: '044', game: 'pokemon', rarity: 'Rare', condition: 'LP', price: 12990, imageUrl: '', isFoil: false, language: 'EN' },
  { id: '3', name: 'Black Lotus', setName: 'Alpha', setNumber: '001', game: 'mtg', rarity: 'Secret', condition: 'MP', price: 299990, imageUrl: '', isFoil: false, language: 'EN' },
  { id: '4', name: 'Dark Magician', setName: 'Legend of Blue Eyes', setNumber: '003', game: 'yugioh', rarity: 'Holo', condition: 'NM', price: 34990, imageUrl: '', isFoil: true, language: 'EN' },
  { id: '5', name: 'Elsa, Snow Queen', setName: 'The First Chapter', setNumber: '012', game: 'lorcana', rarity: 'Uncommon', condition: 'NM', price: 8990, imageUrl: '', isFoil: false, language: 'EN' },
  { id: '6', name: 'Monkey D. Luffy', setName: 'Romance Dawn', setNumber: '001', game: 'onepiece', rarity: 'Common', condition: 'NM', price: 3990, imageUrl: '', isFoil: false, language: 'EN' },
  { id: '7', name: 'Mewtwo ex', setName: 'Scarlet & Violet 151', setNumber: '150', game: 'pokemon', rarity: 'Holo', condition: 'NM', price: 28990, imageUrl: '', isFoil: true, language: 'EN' },
  { id: '8', name: 'Lightning Bolt', setName: 'Alpha', setNumber: '161', game: 'mtg', rarity: 'Common', condition: 'HP', price: 1990, imageUrl: '', isFoil: false, language: 'EN' },
];

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio menor' },
  { value: 'price_desc', label: 'Precio mayor' },
  { value: 'name', label: 'Nombre' },
];

export default function SinglesCatalogPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [gameFilters, setGameFilters] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      <div className="bg-[var(--bg-surface)] py-6">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col gap-4">
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">Singles</h1>
          <p className="text-sm text-[var(--text-secondary)]">Cartas individuales de todos los juegos</p>
          <InputSearch placeholder="Buscar cartas..." value={search} onChange={setSearch} />
          {gameFilters.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {gameFilters.map((g) => (
                <ChipFilter key={g} label={g} color="#4B8DF5" onRemove={() => setGameFilters((f) => f.filter((x) => x !== g))} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">{cards.length} cartas</span>
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
            <Link key={c.id} href={`/singles/${c.id}`}>
              <SinglesCard card={c} />
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
