'use client';

import { Sparkles, MessageCircle, TriangleAlert } from 'lucide-react';
import type { SingleCard } from '@/types';

interface SinglesCardProps {
  card: SingleCard;
  onWhatsApp?: (id: string) => void;
}

const gameColors: Record<string, string> = {
  pokemon: '#F5D623', mtg: '#C8A84E', yugioh: '#9B59B6', lorcana: '#2DD4BF', onepiece: '#E94560',
};
const gameLabels: Record<string, string> = {
  pokemon: 'Pokémon', mtg: 'Magic', yugioh: 'Yu-Gi-Oh!', lorcana: 'Lorcana', onepiece: 'One Piece',
};
const conditionColors: Record<string, string> = {
  NM: '#22C55E', LP: '#F59E0B', MP: '#F97316', HP: '#EF4444', DMG: '#991B1B',
};
const rarityColors: Record<string, string> = {
  Common: '#9494AC', Uncommon: '#60A5FA', Rare: '#F5A623', Holo: '#A78BFA', 'Ultra Rare': '#F472B6', Secret: '#FBBF24',
};

function formatPrice(price: number) {
  return '$' + price.toLocaleString('es-CL');
}

export function SinglesCard({ card, onWhatsApp }: SinglesCardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] overflow-hidden">
      <div className="relative h-[245px] bg-[var(--bg-elevated)]">
        <span
          className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-[var(--bg-base)]"
          style={{ backgroundColor: gameColors[card.game] }}
        >
          {gameLabels[card.game]}
        </span>
        {card.isFoil && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold text-[var(--rarity-holo)] bg-[#A78BFA30]">
            <Sparkles className="w-2.5 h-2.5" />
            Foil
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <span className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-2 leading-[1.3]">
          {card.name}
        </span>
        <span className="text-[11px] text-[var(--text-muted)]">
          {card.setName} · #{card.setNumber}
        </span>
        <div className="flex gap-1.5">
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold"
            style={{ backgroundColor: rarityColors[card.rarity] + '33', color: rarityColors[card.rarity] }}
          >
            {card.rarity}
          </span>
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold"
            style={{ backgroundColor: conditionColors[card.condition] + '33', color: conditionColors[card.condition] }}
          >
            {card.condition}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] italic text-[var(--text-muted)]">ref.</span>
          <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--accent-primary)]">
            {formatPrice(card.price)}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-md px-2 py-1 bg-[#F59E0B18]">
          <TriangleAlert className="w-3 h-3 text-[var(--warning)]" />
          <span className="text-[8px] font-medium text-[var(--warning)] leading-[1.3]">
            Precio referencial, sujeto a disponibilidad
          </span>
        </div>
        <div className="flex flex-col gap-1.5 mt-1">
          <button
            onClick={() => onWhatsApp?.(card.id)}
            className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[var(--whatsapp)]"
          >
            <MessageCircle className="w-[18px] h-[18px] text-white" />
            <span className="text-sm font-semibold text-white">WhatsApp</span>
          </button>
          <button className="flex items-center justify-center w-full h-10 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)]">
            Solicitar
          </button>
        </div>
      </div>
    </div>
  );
}
