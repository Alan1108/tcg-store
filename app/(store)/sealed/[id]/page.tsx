'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { SealedProductCard } from '@/components/organisms';
import { BadgeGame, BadgeStock, ButtonPrimary, ButtonGhost, TrustBadge, Divider } from '@/components/atoms';
import type { SealedProduct } from '@/types';

const product: SealedProduct = {
  id: '1', name: 'Booster Box Scarlet & Violet 151', setName: 'Scarlet & Violet',
  game: 'pokemon', price: 89990, imageUrl: '', stock: 'in_stock', category: 'booster_box',
  description: 'Contiene 36 sobres de la expansión Scarlet & Violet 151. Cada sobre incluye 10 cartas.',
};

const related: SealedProduct[] = [
  { id: '2', name: 'ETB Paldea Evolved', setName: 'Paldea Evolved', game: 'pokemon', price: 49990, imageUrl: '', stock: 'in_stock', category: 'etb' },
  { id: '3', name: 'Booster Pack Temporal Forces', setName: 'Temporal Forces', game: 'pokemon', price: 5990, imageUrl: '', stock: 'in_stock', category: 'booster_pack' },
  { id: '4', name: 'ETB Obsidian Flames', setName: 'Obsidian Flames', game: 'pokemon', price: 54990, imageUrl: '', stock: 'low_stock', category: 'etb' },
];

function formatPrice(price: number) {
  return '$' + price.toLocaleString('es-CL');
}

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

export default function SealedDetailPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/sealed"><ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" /></Link>
        <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-primary)]">Inicio</Link>
          <span>›</span>
          <Link href="/sealed" className="hover:text-[var(--text-primary)]">Sobres y Cajas</Link>
          <span>›</span>
          <span className="text-[var(--text-primary)]">{product.name}</span>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[390px] bg-[var(--bg-elevated)]" />

      <div className="max-w-[1280px] mx-auto w-full px-4 flex flex-col gap-3 py-4">
        <div className="flex items-center gap-2">
          <BadgeGame game={product.game} />
          <BadgeStock status={product.stock} />
        </div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">{product.name}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{product.setName}</p>
        <span className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[var(--accent-primary)]">{formatPrice(product.price)}</span>
        <ButtonPrimary label="Agregar al carrito" fullWidth />
        <ButtonGhost label="Seguir comprando" fullWidth />
      </div>

      <div className="flex items-center justify-around px-4 py-4 max-w-[1280px] mx-auto w-full">
        <TrustBadge icon="ShieldCheck" label="Pago seguro" />
        <TrustBadge icon="Truck" label="Envío nacional" />
        <TrustBadge icon="RotateCcw" label="Devoluciones" />
        <TrustBadge icon="Headphones" label="Soporte 24/7" />
      </div>

      <Divider />
      <Accordion title="Descripción">
        <p>{product.description}</p>
      </Accordion>
      <Divider />
      <Accordion title="Atributos del Producto">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between"><span>Juego</span><span className="font-medium text-[var(--text-primary)]">Pokémon</span></div>
          <div className="flex justify-between"><span>Set</span><span className="font-medium text-[var(--text-primary)]">{product.setName}</span></div>
          <div className="flex justify-between"><span>Tipo</span><span className="font-medium text-[var(--text-primary)]">Booster Box</span></div>
          <div className="flex justify-between"><span>Contenido</span><span className="font-medium text-[var(--text-primary)]">36 sobres</span></div>
        </div>
      </Accordion>
      <Divider />
      <Accordion title="Envío y Devoluciones">
        <p>Envío estándar a todo Ecuador en 3-5 días hábiles. Devoluciones aceptadas dentro de 7 días con el producto sellado.</p>
      </Accordion>
      <Divider />

      <div className="px-4 py-6 flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">También te puede interesar</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {related.map((p) => (
            <div key={p.id} className="min-w-[175px]">
              <Link href={`/sealed/${p.id}`}><SealedProductCard product={p} /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
