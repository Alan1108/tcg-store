'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageCircle, TriangleAlert, Clock } from 'lucide-react';
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
  Common: '#9494AC', Uncommon: '#88AAFF', Rare: '#F5A623', Holo: '#A78BFA', 'Ultra Rare': '#F472B6', Secret: '#FBBF24',
};

export function SinglesCard({ card, onWhatsApp }: SinglesCardProps) {
  const game = (card.metadata?.game as GameSystem) ?? '';
  const isFoil = Boolean(card.metadata?.is_foil);
  const isPresale = Boolean(card.metadata?.presale);
  const launchDate = card.metadata?.launch_date as string | undefined;
  const imageUrl = card.thumbnail ?? card.images?.[0]?.url;
  const firstVariant = card.variants?.[0];
  const condition = (firstVariant?.metadata?.condition as CardCondition) ??
    (card.options?.find((o) => o.title?.toLowerCase() === 'condition')?.values?.[0]?.value as CardCondition) ?? 'NM';
  const rarity = (card.metadata?.rarity as CardRarity) ?? 'Common';
  const price = firstVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode = firstVariant?.calculated_price?.currency_code ?? 'USD';
  const setName = (card.metadata?.set_name as string) ?? '';
  const setNumber = (card.metadata?.set_number as string) ?? '';

  return (
    <div className="group h-full flex flex-col rounded-2xl bg-bg-surface border border-border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(68,136,255,0.08)] hover:border-border-accent/40">

      {/* Image */}
      <Link href={`/singles/${card.id}`} className="block">
        <div className="relative h-[245px] bg-bg-elevated">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={card.title ?? ''}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
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
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold text-rarity-holo bg-black/30 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-2.5 h-2.5" />
              Foil
            </span>
          )}

          {/* Presale strip — absolute inside image, adds zero height to card */}
          {isPresale && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#F97316]">
              <Clock className="w-3 h-3 text-white shrink-0" />
              <span className="text-[10px] font-bold text-white tracking-wide">
                {launchDate ? `Preventa · ${launchDate}` : 'Preventa'}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1.5 p-3.5">
        <Link
          href={`/singles/${card.id}`}
          className="text-[13px] font-semibold text-text-primary line-clamp-2 leading-[1.35] hover:text-accent-primary transition-colors"
        >
          {card.title}
        </Link>

        {(setName || setNumber) && (
          <p className="text-[11px] text-text-muted truncate">
            {setName}{setNumber ? ` · #${setNumber}` : ''}
          </p>
        )}

        <div className="flex gap-1.5 flex-wrap">
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

        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-[10px] italic text-text-muted">ref.</span>
          <span className="font-heading text-[22px] font-bold text-accent-primary leading-none">
            {formatPrice(price, currencyCode)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 bg-[#F59E0B0F] border border-[#F59E0B18]">
          <TriangleAlert className="w-3 h-3 text-warning shrink-0" />
          <span className="text-[9px] font-medium text-warning leading-tight">
            Precio referencial, sujeto a disponibilidad
          </span>
        </div>

        <div className="flex flex-col gap-1.5 mt-auto pt-0.5">
          <button
            onClick={() => card.id && onWhatsApp?.(card.id)}
            className="flex items-center justify-center gap-2 w-full h-9 rounded-xl bg-whatsapp hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0" />
            <span className="text-[11px] font-semibold text-white whitespace-nowrap">Consultar por WhatsApp</span>
          </button>
          <Link
            href={`/inquiry?productId=${card.id}`}
            className="flex items-center justify-center w-full h-9 rounded-xl border border-border text-[11px] font-semibold text-text-secondary hover:bg-bg-elevated hover:border-border-accent/50 active:scale-[0.98] transition-all duration-150"
          >
            Solicitar
          </Link>
        </div>
      </div>
    </div>
  );
}
