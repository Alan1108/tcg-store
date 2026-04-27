'use client';

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

function formatPrice(price: number) {
  return '$' + price.toLocaleString('es-CL');
}

export function CartDrawer({ isOpen, onClose, items }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[390px]">
        <div className="bg-[var(--bg-surface)] rounded-t-2xl flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-[var(--bg-elevated)]" />
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                Mi Carrito
              </span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent-primary)] text-[10px] font-bold text-white">
                {items.length}
              </span>
            </div>
            <button onClick={onClose} className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-elevated)]">
              <X className="w-4 h-4 text-[var(--text-primary)]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 border-b border-[var(--border)]">
                <div className="w-16 h-16 rounded-lg bg-[var(--bg-elevated)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-semibold text-[var(--text-primary)] line-clamp-1">{item.product.name}</span>
                  <span className="text-xs text-[var(--text-muted)] block">{'setName' in item.product ? item.product.setName : ''}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-[family-name:var(--font-heading)] text-base font-bold text-[var(--accent-primary)]">
                    {formatPrice(item.product.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button className="w-6 h-6 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button className="ml-1">
                      <Trash2 className="w-3.5 h-3.5 text-[var(--danger)]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 pt-4 pb-6 flex flex-col gap-3 border-t border-[var(--border)]">
            <div className="flex justify-between">
              <span className="font-semibold text-[var(--text-primary)]">Total</span>
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--accent-primary)]">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center h-10 rounded-lg bg-[var(--accent-primary)] text-sm font-semibold text-white"
            >
              Procesar pedido
            </Link>
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-center h-10 text-sm font-semibold text-[var(--text-secondary)]"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
