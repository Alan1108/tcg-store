'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { BadgeGame, BadgeCondition, BadgeRarity, ButtonWhatsApp, TagDisclaimer, Divider } from '@/components/atoms';
import { SinglesCard } from '@/components/organisms';
import { getSingleCardById, getSingleCards } from '@/services/products.service';
import { formatPrice } from '@/lib/format';
import { InlineInquiryForm } from './inline-inquiry-form';
import type { GameSystem, CardCondition, CardRarity } from '@/types';
import type { HttpTypes } from '@medusajs/types';

export function SinglesDetailContent({ id }: { id: string }) {
  const [card, setCard] = useState<HttpTypes.StoreProduct | null>(null);
  const [related, setRelated] = useState<HttpTypes.StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleCardById(id)
      .then((c) => {
        setCard(c);
        if (c) {
          getSingleCards({ limit: 8 })
            .then((r) => setRelated(r.data.filter((x) => x.id !== id).slice(0, 4)))
            .catch(() => {});
        }
      })
      .catch(() => setCard(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col animate-pulse">
        <div className="w-full h-[390px] md:h-[468px] bg-bg-elevated" />
        <div className="px-4 py-4 flex flex-col gap-3">
          <div className="h-4 w-20 rounded bg-bg-elevated" />
          <div className="h-8 w-2/3 rounded bg-bg-elevated" />
          <div className="h-4 w-32 rounded bg-bg-elevated" />
          <div className="h-10 w-28 rounded bg-bg-elevated" />
        </div>
      </div>
    );
  }

  if (!card) return notFound();

  const game = (card.metadata?.game as GameSystem) ?? '';
  const isFoil = Boolean(card.metadata?.is_foil);
  const setName = (card.metadata?.set_name as string) ?? '';
  const setNumber = (card.metadata?.set_number as string) ?? '';
  const language = (card.metadata?.language as string) ?? '';
  const imageUrl = card.thumbnail ?? card.images?.[0]?.url;
  const firstVariant = card.variants?.[0];
  const condition = (firstVariant?.metadata?.condition as CardCondition) ?? 'NM';
  const rarity = (card.metadata?.rarity as CardRarity) ?? 'Common';
  const price = firstVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode = firstVariant?.calculated_price?.currency_code ?? 'USD';

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/singles"><ArrowLeft className="w-5 h-5 text-text-secondary" /></Link>
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <Link href="/">Inicio</Link><span>›</span>
          <Link href="/singles">Singles</Link><span>›</span>
          <span className="text-text-primary">{card.title}</span>
        </div>
      </div>

      <div className="relative w-full h-[390px] md:h-[468px] bg-bg-elevated">
        {imageUrl && (
          <Image src={imageUrl} alt={card.title ?? ''} fill className="object-contain p-4" />
        )}
        {game && <div className="absolute top-3 left-3"><BadgeGame game={game} /></div>}
        {isFoil && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold text-[var(--rarity-holo)] bg-[#A78BFA30]">Foil</span>
        )}
      </div>

      <div className="px-4 flex flex-col gap-3 py-4">
        {game && <BadgeGame game={game} />}
        <h1 className="font-heading text-2xl font-bold text-text-primary">{card.title}</h1>
        <p className="text-sm text-text-secondary">{setName} · #{setNumber}</p>
        <div className="flex gap-2">
          <BadgeRarity rarity={rarity} />
          <BadgeCondition condition={condition} />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] italic text-text-muted">ref.</span>
          <span className="font-heading text-[32px] font-bold text-accent-primary">
            {formatPrice(price, currencyCode)}
          </span>
        </div>
        <TagDisclaimer />
      </div>

      <div className="px-4 flex flex-col gap-2 py-2">
        <ButtonWhatsApp fullWidth />
        <p className="text-xs text-center text-text-secondary">Contáctanos para consultar disponibilidad y precio final</p>
      </div>

      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-sm text-text-muted">o</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      <InlineInquiryForm productId={card.id} />

      <Divider />
      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-text-primary mb-3">Atributos</h2>
        <div className="flex flex-col gap-2 text-sm text-text-secondary">
          {game && <div className="flex justify-between"><span>Juego</span><span className="font-medium text-text-primary">{game}</span></div>}
          {setName && <div className="flex justify-between"><span>Set</span><span className="font-medium text-text-primary">{setName}</span></div>}
          {setNumber && <div className="flex justify-between"><span>Número</span><span className="font-medium text-text-primary">#{setNumber}</span></div>}
          <div className="flex justify-between"><span>Rareza</span><span className="font-medium text-text-primary">{rarity}</span></div>
          <div className="flex justify-between"><span>Condición</span><span className="font-medium text-text-primary">{condition}</span></div>
          {language && <div className="flex justify-between"><span>Idioma</span><span className="font-medium text-text-primary">{language}</span></div>}
          <div className="flex justify-between"><span>Foil</span><span className="font-medium text-text-primary">{isFoil ? 'Sí' : 'No'}</span></div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <Divider />
          <div className="px-4 py-6 flex flex-col gap-3">
            <h2 className="font-heading text-lg font-bold text-text-primary">Más del catálogo</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {related.map((c) => (
                <div key={c.id} className="min-w-[175px]">
                  <Link href={`/singles/${c.id}`}><SinglesCard card={c} /></Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
