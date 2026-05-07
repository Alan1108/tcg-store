'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { ButtonPrimary, ButtonGhost, TrustBadge, Divider } from '@/components/atoms';
import { useCart } from '@/providers/cart';
import { formatPrice } from '@/lib/format';

export default function CartPage() {
  const { cart, updateItemQuantity, removeItem } = useCart();
  const items = cart?.items ?? [];
  const currencyCode = cart?.currency_code ?? 'USD';
  const subtotal = cart?.subtotal ?? 0;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 px-4">
        <ShoppingCart className="w-16 h-16 text-text-muted" />
        <h1 className="font-heading text-2xl font-bold text-text-primary">Tu carrito está vacío</h1>
        <p className="text-sm text-text-secondary text-center">Explora nuestro catálogo y encuentra productos increíbles</p>
        <Link href="/sealed"><ButtonPrimary label="Ver catálogo" icon="ShoppingCart" /></Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Mi Carrito</h1>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-primary text-xs font-bold text-white">{items.length}</span>
      </div>

      <div className="flex flex-col">
        {items.map((item, idx) => {
          const imageUrl = item.variant?.product?.thumbnail ?? item.thumbnail ?? undefined;
          return (
            <div key={item.id}>
              {idx > 0 && <Divider className="my-3" />}
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-lg bg-bg-elevated flex-shrink-0 relative overflow-hidden">
                  {imageUrl && (
                    <Image src={imageUrl} alt={item.title ?? ''} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <span className="text-[13px] font-semibold text-text-primary line-clamp-1">{item.title}</span>
                  <span className="text-[11px] text-text-muted">{item.variant_title}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-heading text-lg font-bold text-accent-primary">
                    {formatPrice((item.unit_price ?? 0) * (item.quantity ?? 1), currencyCode)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItemQuantity(item.id, Math.max(1, (item.quantity ?? 1) - 1))}
                      className="w-7 h-7 rounded-md bg-bg-elevated flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, (item.quantity ?? 1) + 1)}
                      className="w-7 h-7 rounded-md bg-bg-elevated flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-1">
                      <Trash2 className="w-4 h-4 text-[var(--danger)]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3 mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">{formatPrice(subtotal, currencyCode)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Envío estándar</span>
          <span className="text-[var(--success)] font-medium">Gratis</span>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="font-semibold text-text-primary">Total</span>
          <span className="font-heading text-xl font-bold text-accent-primary">
            {formatPrice(cart?.total ?? 0, currencyCode)}
          </span>
        </div>
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
