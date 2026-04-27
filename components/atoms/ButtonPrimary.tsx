'use client';

import { ShoppingCart } from 'lucide-react';
import * as icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonPrimaryProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
}

export function ButtonPrimary({ label = 'Agregar al carrito', icon = 'ShoppingCart', onClick, className = '', disabled, fullWidth, size = 'md' }: ButtonPrimaryProps) {
  const IconComp = ((icons as unknown as Record<string, LucideIcon>)[icon] || ShoppingCart);
  const h = size === 'sm' ? 'h-[34px] text-xs' : 'h-10 text-sm';
  return (
    <button onClick={onClick} disabled={disabled}
      className={`flex items-center justify-center gap-2 ${h} px-5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 transition-colors ${fullWidth ? 'w-full' : ''} ${className}`}>
      <IconComp className={size === 'sm' ? 'w-3.5 h-3.5 text-white' : 'w-[18px] h-[18px] text-white'} />
      <span className="font-semibold text-white">{label}</span>
    </button>
  );
}
