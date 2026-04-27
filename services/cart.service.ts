import type { CartItem } from '@/types';

export async function getCart(): Promise<CartItem[]> {
  // TODO: Connect to backend API or local storage
  return [];
}

export async function addToCart(_productId: string, _productType: 'sealed' | 'single', _quantity?: number): Promise<CartItem[]> {
  // TODO: Connect to backend API
  return [];
}

export async function updateCartItemQuantity(_itemId: string, _quantity: number): Promise<CartItem[]> {
  // TODO: Connect to backend API
  return [];
}

export async function removeFromCart(_itemId: string): Promise<CartItem[]> {
  // TODO: Connect to backend API
  return [];
}

export async function clearCart(): Promise<void> {
  // TODO: Connect to backend API
}

export async function getCartTotal(): Promise<{ subtotal: number; shipping: number; total: number }> {
  // TODO: Connect to backend API
  return { subtotal: 0, shipping: 0, total: 0 };
}
