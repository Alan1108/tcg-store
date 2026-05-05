'use client';

import Link from 'next/link';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/providers/cart';
import Image from 'next/image';

export function NavbarDesktop() {
  const { cart } = useCart();
  const cartCount = cart?.items?.reduce((n, i) => n + (i.quantity ?? 0), 0) ?? 0;

  return (
    <nav className="hidden md:flex items-center justify-between w-full h-16 bg-bg-surface px-6 border-b border-border">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src={'/logo-principal-celeste.png'} width={24} height={24} alt="TCG Shop" className="w-6 h-6 text-accent-primary" />
        <span className="font-heading text-[22px] font-bold text-text-primary">
          TCG Shop
        </span>
      </Link>

      <div className="flex items-center gap-2.5 rounded-[10px] bg-bg-elevated h-10 px-3.5 flex-1 max-w-xl mx-6">
        <Search className="w-[18px] h-[18px] text-text-muted" />
        <input
          type="text"
          placeholder="Buscar cartas, sets, productos..."
          className="bg-transparent text-sm font-normal text-text-primary placeholder:text-text-muted outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <Link href="/sealed" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Sobres y Cajas
        </Link>
        <Link href="/singles" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Singles
        </Link>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-0.5">
          <span className="text-[13px] font-bold text-text-primary">ES</span>
          <span className="text-[13px] text-text-muted">/</span>
          <span className="text-[13px] font-medium text-text-muted">EN</span>
        </div>
        <div className="w-px h-6 bg-border" />
        <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-elevated transition-colors">
          <Heart className="w-5 h-5 text-text-secondary" />
        </button>
        <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-elevated transition-colors">
          <ShoppingCart className="w-5 h-5 text-text-secondary" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-primary text-white text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border" />
      </div>
    </nav>
  );
}
