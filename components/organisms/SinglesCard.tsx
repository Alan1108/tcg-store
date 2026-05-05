'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageCircle, TriangleAlert } from 'lucide-react';
import type { HttpTypes } from '@medusajs/types';
import type { GameSystem, CardCondition, CardRarity } from '@/types';
import { formatPrice } from '@/lib/format';

interface SinglesCardProps {
  card: HttpTypes.StoreProduct;
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

export function SinglesCard({ card, onWhatsApp }: SinglesCardProps) {
  const game = (card.metadata?.game as GameSystem) ?? '';
  const isFoil = Boolean(card.metadata?.is_foil);
  const imageUrl = card.thumbnail ?? card.images?.[0]?.url;
  const firstVariant = card.variants?.[0];
  const condition = (firstVariant?.metadata?.condition as CardCondition) ??
    (card.options?.find((o) => o.title?.toLowerCase() === 'condition')?.values?.[0]?.value as CardCondition) ?? 'NM';
  const rarity = (card.metadata?.rarity as CardRarity) ?? 'Common';
  const price = firstVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode = firstVariant?.calculated_price?.currency_code ?? 'USD';

  return (
    <div className="flex flex-col rounded-xl bg-bg-surface border border-border overflow-hidden">
      <Link href={`/singles/${card.id}`} className="block">
        <div className="relative h-[245px] bg-bg-elevated">
          {imageUrl && (
            <Image src={imageUrl} alt={card.title ?? ''} fill className="object-cover" />
          )}
          {game && (
            <span
              className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-bg-base"
              style={{ backgroundColor: gameColors[game] ?? '#666' }}
            >
              {gameLabels[game] ?? game}
            </span>
          )}
          {isFoil && (
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold text-rarity-holo bg-[#A78BFA30]">
              <Sparkles className="w-2.5 h-2.5" />
              Foil
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-1.5 p-3">
        <Link href={`/singles/${card.id}`} className="text-[13px] font-semibold text-text-primary line-clamp-2 leading-[1.3] hover:text-accent-primary transition-colors">
          {card.title}
        </Link>
        <span className="text-[11px] text-text-muted">
          {(card.metadata?.set_name as string) ?? ''} · #{(card.metadata?.set_number as string) ?? ''}
        </span>
        <div className="flex gap-1.5">
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold"
            style={{ backgroundColor: rarityColors[rarity] + '33', color: rarityColors[rarity] }}
          >
            {rarity}
          </span>
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold"
            style={{ backgroundColor: conditionColors[condition] + '33', color: conditionColors[condition] }}
          >
            {condition}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] italic text-text-muted">ref.</span>
          <span className="font-heading text-xl font-bold text-accent-primary">
            {formatPrice(price, currencyCode)}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-md px-2 py-1 bg-[#F59E0B18]">
          <TriangleAlert className="w-3 h-3 text-warning" />
          <span className="text-[8px] font-medium text-warning leading-[1.3]">
            Precio referencial, sujeto a disponibilidad
          </span>
        </div>
        <div className="flex flex-col gap-1.5 mt-1">
          <button
            onClick={() => card.id && onWhatsApp?.(card.id)}
            className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-whatsapp"
          >
            <MessageCircle className="w-[18px] h-[18px] text-white" />
            <span className="text-sm font-semibold text-white">WhatsApp</span>
          </button>
          <Link
            href={`/inquiry?productId=${card.id}`}
            className="flex items-center justify-center w-full h-10 rounded-lg border border-border text-sm font-semibold text-text-secondary"
          >
            Solicitar
          </Link>
        </div>
      </div>
    </div>
  );
}
