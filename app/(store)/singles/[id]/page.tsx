'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Send } from 'lucide-react';
import { SinglesCard } from '@/components/organisms';
import { BadgeGame, BadgeCondition, BadgeRarity, ButtonWhatsApp, ButtonPrimary, TagDisclaimer, Divider, InputText, InputTextarea } from '@/components/atoms';
import type { SingleCard } from '@/types';

const card: SingleCard = {
  id: '1', name: 'Charizard ex', setName: 'Obsidian Flames', setNumber: '006',
  game: 'pokemon', rarity: 'Ultra Rare', condition: 'NM', price: 45990,
  imageUrl: '', isFoil: true, language: 'EN',
};

const otherConditions: SingleCard[] = [
  { ...card, id: '10', condition: 'LP', price: 38990 },
  { ...card, id: '11', condition: 'MP', price: 29990 },
  { ...card, id: '12', condition: 'HP', price: 19990 },
];

const sameSet: SingleCard[] = [
  { id: '20', name: 'Mewtwo ex', setName: 'Obsidian Flames', setNumber: '150', game: 'pokemon', rarity: 'Holo', condition: 'NM', price: 28990, imageUrl: '', isFoil: true, language: 'EN' },
  { id: '21', name: 'Eevee', setName: 'Obsidian Flames', setNumber: '101', game: 'pokemon', rarity: 'Common', condition: 'NM', price: 1990, imageUrl: '', isFoil: false, language: 'EN' },
  { id: '22', name: 'Tyranitar ex', setName: 'Obsidian Flames', setNumber: '066', game: 'pokemon', rarity: 'Rare', condition: 'NM', price: 15990, imageUrl: '', isFoil: false, language: 'EN' },
  { id: '23', name: 'Dragonite V', setName: 'Obsidian Flames', setNumber: '078', game: 'pokemon', rarity: 'Holo', condition: 'LP', price: 12990, imageUrl: '', isFoil: true, language: 'EN' },
];

function formatPrice(price: number) { return '$' + price.toLocaleString('es-CL'); }

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-4 px-4">
        <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">{children}</div>}
    </div>
  );
}

export default function SinglesDetailPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState('');

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/singles"><ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" /></Link>
        <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
          <Link href="/">Inicio</Link><span>›</span>
          <Link href="/singles">Singles</Link><span>›</span>
          <span className="text-[var(--text-primary)]">{card.name}</span>
        </div>
      </div>

      <div className="relative w-full h-[390px] md:h-[468px] bg-[var(--bg-elevated)]">
        <div className="absolute top-3 left-3"><BadgeGame game={card.game} /></div>
        {card.isFoil && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold text-[var(--rarity-holo)] bg-[#A78BFA30]">Foil</span>
        )}
      </div>

      <div className="px-4 flex flex-col gap-3 py-4">
        <BadgeGame game={card.game} />
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">{card.name}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{card.setName} · #{card.setNumber}</p>
        <div className="flex gap-2">
          <BadgeRarity rarity={card.rarity} />
          <BadgeCondition condition={card.condition} />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] italic text-[var(--text-muted)]">ref.</span>
          <span className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[var(--accent-primary)]">{formatPrice(card.price)}</span>
        </div>
        <TagDisclaimer />
      </div>

      <div className="px-4 flex flex-col gap-2 py-2">
        <ButtonWhatsApp fullWidth />
        <p className="text-xs text-center text-[var(--text-secondary)]">Contáctanos para consultar disponibilidad y precio final</p>
      </div>

      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-sm text-[var(--text-muted)]">o</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      <div className="px-4 flex flex-col gap-3.5 pb-4">
        <InputText label="Nombre" placeholder="Tu nombre" value={name} onChange={setName} />
        <InputText label="Email" type="email" placeholder="tu@email.com" value={email} onChange={setEmail} />
        <InputTextarea label="Cartas que buscas" placeholder="Describe las cartas..." value={cards} onChange={setCards} />
        <ButtonPrimary label="Enviar consulta" icon="Send" fullWidth />
      </div>

      <Divider />
      <Accordion title="Atributos">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between"><span>Juego</span><span className="font-medium text-[var(--text-primary)]">Pokémon</span></div>
          <div className="flex justify-between"><span>Set</span><span className="font-medium text-[var(--text-primary)]">{card.setName}</span></div>
          <div className="flex justify-between"><span>Número</span><span className="font-medium text-[var(--text-primary)]">#{card.setNumber}</span></div>
          <div className="flex justify-between"><span>Rareza</span><span className="font-medium text-[var(--text-primary)]">{card.rarity}</span></div>
          <div className="flex justify-between"><span>Condición</span><span className="font-medium text-[var(--text-primary)]">{card.condition}</span></div>
          <div className="flex justify-between"><span>Idioma</span><span className="font-medium text-[var(--text-primary)]">{card.language}</span></div>
          <div className="flex justify-between"><span>Foil</span><span className="font-medium text-[var(--text-primary)]">{card.isFoil ? 'Sí' : 'No'}</span></div>
        </div>
      </Accordion>
      <Divider />
      <Accordion title="Guía de Condiciones">
        <div className="flex flex-col gap-2">
          <p><strong>NM (Near Mint):</strong> Carta en excelente estado, mínimo desgaste.</p>
          <p><strong>LP (Lightly Played):</strong> Leve desgaste visible.</p>
          <p><strong>MP (Moderately Played):</strong> Desgaste moderado, marcas visibles.</p>
          <p><strong>HP (Heavily Played):</strong> Desgaste significativo.</p>
          <p><strong>DMG (Damaged):</strong> Daño estructural visible.</p>
        </div>
      </Accordion>
      <Divider />

      <div className="px-4 py-6 flex flex-col gap-3">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--text-primary)]">Otras condiciones disponibles</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {otherConditions.map((c) => <div key={c.id} className="min-w-[175px]"><SinglesCard card={c} /></div>)}
        </div>
      </div>
      <Divider />
      <div className="px-4 py-6 flex flex-col gap-3">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--text-primary)]">Más del mismo set</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sameSet.map((c) => <div key={c.id} className="min-w-[175px]"><Link href={`/singles/${c.id}`}><SinglesCard card={c} /></Link></div>)}
        </div>
      </div>
    </div>
  );
}
