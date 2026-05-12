'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/providers/cart';

interface AddToCartButtonProps {
  variantId?: string;
  quantity?: number;
  disabled?: boolean;
}

export function AddToCartButton({ variantId, quantity = 1, disabled }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => variantId && addToCart(variantId, quantity)}
      disabled={disabled || !variantId}
      className="flex items-center justify-center gap-2 flex-1 h-11 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-4 h-4 text-white" />
      <span className="text-sm font-semibold text-white">
        {disabled ? 'Sin stock' : 'Agregar al carrito'}
      </span>
    </button>
  );
}
