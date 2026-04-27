'use client';

import Link from 'next/link';
import { Hexagon, Search, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarMobileProps {
  onMenuOpen?: () => void;
}

export function NavbarMobile({ onMenuOpen }: NavbarMobileProps) {
  const [cartCount] = useState(3);

  return (
    <nav className="flex md:hidden items-center justify-between w-full h-14 bg-[var(--bg-surface)] px-4 border-b border-[var(--border)]">
      <Link href="/" className="flex items-center gap-2">
        <Hexagon className="w-6 h-6 text-[var(--accent-primary)]" />
        <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--text-primary)]">
          TCG Shop
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center w-9 h-9 rounded-lg">
          <Search className="w-5 h-5 text-[var(--text-secondary)]" />
        </button>
        <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg">
          <ShoppingCart className="w-5 h-5 text-[var(--text-secondary)]" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[var(--accent-primary)] text-white text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <button onClick={onMenuOpen} className="flex items-center justify-center w-9 h-9 rounded-lg">
          <Menu className="w-5 h-5 text-[var(--text-secondary)]" />
        </button>
      </div>
    </nav>
  );
}
