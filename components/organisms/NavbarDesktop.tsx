'use client';

import Link from 'next/link';
import { Hexagon, Search, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function NavbarDesktop() {
  const [cartCount] = useState(3);

  return (
    <nav className="hidden md:flex items-center justify-between w-full h-16 bg-[var(--bg-surface)] px-6 border-b border-[var(--border)]">
      <Link href="/" className="flex items-center gap-2.5">
        <Hexagon className="w-8 h-8 text-[var(--accent-primary)]" />
        <span className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[var(--text-primary)]">
          TCG Shop
        </span>
      </Link>

      <div className="flex items-center gap-2.5 rounded-[10px] bg-[var(--bg-elevated)] h-10 px-3.5 flex-1 max-w-xl mx-6">
        <Search className="w-[18px] h-[18px] text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Buscar cartas, sets, productos..."
          className="bg-transparent text-sm font-normal text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <Link href="/sealed" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          Sobres y Cajas
        </Link>
        <Link href="/singles" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          Singles
        </Link>
        <div className="w-px h-6 bg-[var(--border)]" />
        <div className="flex items-center gap-0.5">
          <span className="text-[13px] font-bold text-[var(--text-primary)]">ES</span>
          <span className="text-[13px] text-[var(--text-muted)]">/</span>
          <span className="text-[13px] font-medium text-[var(--text-muted)]">EN</span>
        </div>
        <div className="w-px h-6 bg-[var(--border)]" />
        <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
          <Heart className="w-5 h-5 text-[var(--text-secondary)]" />
        </button>
        <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
          <ShoppingCart className="w-5 h-5 text-[var(--text-secondary)]" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[var(--accent-primary)] text-white text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)]" />
      </div>
    </nav>
  );
}
