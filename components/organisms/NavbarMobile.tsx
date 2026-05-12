'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, User, Heart, X } from 'lucide-react';
import { useCart } from '@/providers/cart';
import { useAuth } from '@/providers/auth';
import { useWishlist } from '@/providers/wishlist';
import Image from 'next/image';
import { useState } from 'react';
import { HeaderSearch } from './HeaderSearch';

interface NavbarMobileProps {
  onMenuOpen?: () => void;
}

export function NavbarMobile({ onMenuOpen }: NavbarMobileProps) {
  const { cart } = useCart();
  const { user, customer, openAuthModal } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = cart?.items?.reduce((n, i) => n + (i.quantity ?? 0), 0) ?? 0;
  const wishlistCount = wishlistItems.length;

  const initials = customer
    ? `${customer.first_name?.[0] ?? ''}${customer.last_name?.[0] ?? ''}`.toUpperCase() || '?'
    : null
  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url

  return (
    <div className="flex md:hidden flex-col bg-bg-surface border-b border-border">
    <nav className="flex items-center justify-between w-full h-14 px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src={'/logo-principal-celeste.png'} width={24} height={24} alt="TCG Shop" className="w-6 h-6 text-accent-primary" />
        <span className="font-heading text-lg font-bold text-text-primary">
          Kādo Gallery
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setSearchOpen((o) => !o)}
          className="flex items-center justify-center w-9 h-9 rounded-lg"
        >
          {searchOpen
            ? <X className="w-5 h-5 text-text-secondary" />
            : <Search className="w-5 h-5 text-text-secondary" />}
        </button>
        <Link href="/wishlist" className="relative flex items-center justify-center w-9 h-9 rounded-lg">
          <Heart
            className="w-5 h-5 transition-colors"
            fill={wishlistCount > 0 ? '#f87171' : 'none'}
            color={wishlistCount > 0 ? '#f87171' : 'currentColor'}
          />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-primary text-white text-[10px] font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg">
          <ShoppingCart className="w-5 h-5 text-text-secondary" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-primary text-white text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <Link
            href="/account"
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent-primary text-white text-xs font-bold overflow-hidden"
          >
            {avatarUrl
              ? <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="32px" />
              : initials}
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center justify-center w-9 h-9 rounded-lg"
          >
            <User className="w-5 h-5 text-text-secondary" />
          </button>
        )}

        <button onClick={onMenuOpen} className="flex items-center justify-center w-9 h-9 rounded-lg">
          <Menu className="w-5 h-5 text-text-secondary" />
        </button>
      </div>
    </nav>
    {searchOpen && (
      <div className="px-4 pb-3">
        <HeaderSearch
          placeholder="Buscar productos..."
          onSelect={() => setSearchOpen(false)}
        />
      </div>
    )}
    </div>
  );
}
