'use client';

import * as icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonGhostProps {
  label?: string;
  icon?: string;
  showIcon?: boolean;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function ButtonGhost({ label = 'Seguir comprando', icon = 'ArrowRight', showIcon = false, onClick, className = '', fullWidth }: ButtonGhostProps) {
  const IconComp = (icons as unknown as Record<string, LucideIcon>)[icon];
  return (
    <button onClick={onClick}
      className={`flex items-center justify-center gap-2 h-10 px-5 rounded-lg transition-colors hover:bg-[var(--bg-elevated)] ${fullWidth ? 'w-full' : ''} ${className}`}>
      {showIcon && IconComp && <IconComp className="w-[18px] h-[18px] text-[var(--text-secondary)]" />}
      <span className="text-sm font-semibold text-[var(--text-secondary)]">{label}</span>
    </button>
  );
}
