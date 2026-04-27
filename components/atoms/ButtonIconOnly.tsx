'use client';

import { Search } from 'lucide-react';
import * as icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonIconOnlyProps {
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export function ButtonIconOnly({ icon = 'Search', onClick, className = '' }: ButtonIconOnlyProps) {
  const IconComp = ((icons as unknown as Record<string, LucideIcon>)[icon] || Search);
  return (
    <button onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] hover:bg-[var(--bg-modal)] transition-colors ${className}`}>
      <IconComp className="w-[18px] h-[18px] text-[var(--text-secondary)]" />
    </button>
  );
}
