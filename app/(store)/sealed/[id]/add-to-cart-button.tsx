'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/providers/cart';

interface AddToCartButtonProps {
  variantId?: string;
  disabled?: boolean;
}

export function AddToCartButton({ variantId, disabled }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => variantId && addToCart(variantId, 1)}
      disabled={disabled || !variantId}
      className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-4 h-4 text-white" />
      <span className="text-sm font-semibold text-white">
        {disabled ? 'Sin stock' : 'Agregar al carrito'}
      </span>
    </button>
  );
}
