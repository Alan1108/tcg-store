'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, User, LogOut } from 'lucide-react';
import { HeaderSearch } from './HeaderSearch';
import { useCart } from '@/providers/cart';
import { useAuth } from '@/providers/auth';
import { useWishlist } from '@/providers/wishlist';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export function NavbarDesktop() {
  const { cart } = useCart();
  const { user, customer, openAuthModal, signOut } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const cartCount = cart?.items?.reduce((n, i) => n + (i.quantity ?? 0), 0) ?? 0;
  const wishlistCount = wishlistItems.length;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = customer
    ? `${customer.first_name?.[0] ?? ''}${customer.last_name?.[0] ?? ''}`.toUpperCase() || '?'
    : null
  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url

  return (
    <nav className="hidden md:flex items-center justify-between w-full h-16 bg-bg-surface px-6 border-b border-border sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src={'/logo-principal-celeste.png'} width={24} height={24} alt="TCG Shop" className="w-6 h-6 text-accent-primary" />
        <span className="font-heading text-[22px] font-bold text-text-primary">
          Kādo Gallery
        </span>
      </Link>

      <HeaderSearch className="flex-1 max-w-xl mx-6" />

      <div className="flex items-center gap-2">
        <Link href="/sealed" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Sobres y Cajas
        </Link>
        <Link href="/singles" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Singles
        </Link>
        <div className="w-px h-6 bg-border" />
        <Link href="/wishlist" className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-elevated transition-colors">
          <Heart
            className="w-5 h-5 transition-colors"
            fill={wishlistCount > 0 ? '#f87171' : 'none'}
            color={wishlistCount > 0 ? '#f87171' : 'currentColor'}
          />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-primary text-white text-[10px] font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-elevated transition-colors">
          <ShoppingCart className="w-5 h-5 text-text-secondary" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-primary text-white text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent-primary text-white text-xs font-bold hover:opacity-90 transition-opacity overflow-hidden"
            >
              {avatarUrl
                ? <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="32px" />
                : initials}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-44 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-50">
                <Link
                  href="/account"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-text-primary hover:bg-bg-elevated transition-colors"
                >
                  <User className="w-4 h-4 text-text-muted" />
                  Mi Cuenta
                </Link>
                <button
                  onClick={() => { setDropdownOpen(false); signOut(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-[var(--danger)] hover:bg-bg-elevated transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-bg-elevated border border-border hover:bg-[var(--border)] transition-colors"
          >
            <User className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </div>
    </nav>
  );
}
