'use client';

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/providers/cart';
import { formatPrice } from '@/lib/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateItemQuantity, removeItem } = useCart();
  const items = cart?.items ?? [];
  const currencyCode = cart?.currency_code ?? 'USD';
  const total = cart?.total ?? 0;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[390px]">
        <div className="bg-[var(--bg-surface)] rounded-t-2xl flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-bg-elevated" />
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-text-primary">
                Mi Carrito
              </span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-primary text-[10px] font-bold text-white">
                {items.length}
              </span>
            </div>
            <button onClick={onClose} className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-elevated">
              <X className="w-4 h-4 text-text-primary" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
            {items.map((item) => {
              const imageUrl = item.variant?.product?.thumbnail ?? item.thumbnail ?? undefined;
              return (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-[var(--border)]">
                  <div className="w-16 h-16 rounded-lg bg-bg-elevated flex-shrink-0 relative overflow-hidden">
                    {imageUrl && (
                      <Image src={imageUrl} alt={item.title ?? ''} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-semibold text-text-primary line-clamp-1">{item.title}</span>
                    <span className="text-xs text-text-muted block">{item.variant_title}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-heading text-base font-bold text-accent-primary">
                      {formatPrice(item.unit_price ?? 0, currencyCode)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, Math.max(1, (item.quantity ?? 1) - 1))}
                        className="w-6 h-6 rounded-md bg-bg-elevated flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, (item.quantity ?? 1) + 1)}
                        className="w-6 h-6 rounded-md bg-bg-elevated flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-1">
                        <Trash2 className="w-3.5 h-3.5 text-[var(--danger)]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 pt-4 pb-6 flex flex-col gap-3 border-t border-[var(--border)]">
            <div className="flex justify-between">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="font-heading text-xl font-bold text-accent-primary">
                {formatPrice(total, currencyCode)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center h-10 rounded-lg bg-accent-primary text-sm font-semibold text-white"
            >
              Procesar pedido
            </Link>
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-center h-10 text-sm font-semibold text-text-secondary"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
