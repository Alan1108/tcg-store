'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/providers/cart';
import Image from 'next/image';

interface NavbarMobileProps {
  onMenuOpen?: () => void;
}

export function NavbarMobile({ onMenuOpen }: NavbarMobileProps) {
  const { cart } = useCart();
  const cartCount = cart?.items?.reduce((n, i) => n + (i.quantity ?? 0), 0) ?? 0;

  return (
    <nav className="flex md:hidden items-center justify-between w-full h-14 bg-bg-surface px-4 border-b border-border">
      <Link href="/" className="flex items-center gap-2">
        <Image src={'/logo-principal-celeste.png'} width={24} height={24} alt="TCG Shop" className="w-6 h-6 text-accent-primary" />
        <span className="font-heading text-lg font-bold text-text-primary">
          TCG Shop
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center w-9 h-9 rounded-lg">
          <Search className="w-5 h-5 text-text-secondary" />
        </button>
        <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg">
          <ShoppingCart className="w-5 h-5 text-text-secondary" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-primary text-white text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <button onClick={onMenuOpen} className="flex items-center justify-center w-9 h-9 rounded-lg">
          <Menu className="w-5 h-5 text-text-secondary" />
        </button>
      </div>
    </nav>
  );
}
