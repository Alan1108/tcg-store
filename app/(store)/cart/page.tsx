'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { ButtonPrimary, ButtonGhost, TrustBadge, Divider, BadgeGame } from '@/components/atoms';
import type { SealedProduct } from '@/types';

interface CartItemData { id: string; product: SealedProduct; quantity: number; }

const initialItems: CartItemData[] = [
  { id: 'c1', product: { id: '1', name: 'Booster Box Scarlet & Violet 151', setName: 'Scarlet & Violet', game: 'pokemon', price: 89990, imageUrl: '', stock: 'in_stock', category: 'booster_box' }, quantity: 1 },
  { id: 'c2', product: { id: '2', name: 'ETB Paldea Evolved', setName: 'Paldea Evolved', game: 'pokemon', price: 49990, imageUrl: '', stock: 'in_stock', category: 'etb' }, quantity: 2 },
  { id: 'c3', product: { id: '3', name: 'Draft Booster Box Murders at Karlov Manor', setName: 'Murders at Karlov Manor', game: 'mtg', price: 119990, imageUrl: '', stock: 'in_stock', category: 'booster_box' }, quantity: 1 },
];

function formatPrice(price: number) { return '$' + price.toLocaleString('es-CL'); }

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const updateQty = (id: string, delta: number) =>
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 px-4">
        <ShoppingCart className="w-16 h-16 text-[var(--text-muted)]" />
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">Tu carrito está vacío</h1>
        <p className="text-sm text-[var(--text-secondary)] text-center">Explora nuestro catálogo y encuentra productos increíbles</p>
        <Link href="/sealed"><ButtonPrimary label="Ver catálogo" icon="ShoppingCart" /></Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">Mi Carrito</h1>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent-primary)] text-xs font-bold text-white">{items.length}</span>
      </div>

      <div className="flex flex-col">
        {items.map((item, idx) => (
          <div key={item.id}>
            {idx > 0 && <Divider className="my-3" />}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-lg bg-[var(--bg-elevated)] flex-shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-1">{item.product.name}</span>
                <span className="text-[11px] text-[var(--text-muted)]">{item.product.setName}</span>
                <BadgeGame game={item.product.game} />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--accent-primary)]">{formatPrice(item.product.price * item.quantity)}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                  <button onClick={() => remove(item.id)} className="ml-1"><Trash2 className="w-4 h-4 text-[var(--danger)]" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3 mt-4">
        <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Subtotal</span><span className="text-[var(--text-primary)]">{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Envío estándar</span><span className="text-[var(--success)] font-medium">Gratis</span></div>
        <Divider />
        <div className="flex justify-between"><span className="font-semibold text-[var(--text-primary)]">Total</span><span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--accent-primary)]">{formatPrice(subtotal)}</span></div>
      </div>

      <ButtonPrimary label="Procesar pedido" fullWidth />
      <Link href="/"><ButtonGhost label="Seguir comprando" fullWidth /></Link>

      <div className="flex items-center justify-around">
        <TrustBadge icon="ShieldCheck" label="Pago seguro" />
        <TrustBadge icon="Truck" label="Envío nacional" />
        <TrustBadge icon="RotateCcw" label="Devoluciones" />
        <TrustBadge icon="Headphones" label="Soporte 24/7" />
      </div>
    </div>
  );
}
