'use client';

import { SlidersHorizontal } from 'lucide-react';
import * as icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonSecondaryProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function ButtonSecondary({ label = 'Filtrar', icon = 'SlidersHorizontal', onClick, className = '', fullWidth }: ButtonSecondaryProps) {
  const IconComp = ((icons as unknown as Record<string, LucideIcon>)[icon] || SlidersHorizontal);
  return (
    <button onClick={onClick}
      className={`flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] transition-colors hover:bg-[var(--bg-modal)] ${fullWidth ? 'w-full' : ''} ${className}`}>
      <IconComp className="w-[18px] h-[18px] text-[var(--text-secondary)]" />
      <span className="text-sm font-semibold text-[var(--text-secondary)]">{label}</span>
    </button>
  );
}
