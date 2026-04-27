'use client';

import { Trash2 } from 'lucide-react';
import * as icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonDangerProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function ButtonDanger({ label = 'Eliminar', icon = 'Trash2', onClick, className = '', fullWidth }: ButtonDangerProps) {
  const IconComp = ((icons as unknown as Record<string, LucideIcon>)[icon] || Trash2);
  return (
    <button onClick={onClick}
      className={`flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[var(--danger)] hover:opacity-90 transition-colors ${fullWidth ? 'w-full' : ''} ${className}`}>
      <IconComp className="w-[18px] h-[18px] text-white" />
      <span className="text-sm font-semibold text-white">{label}</span>
    </button>
  );
}
