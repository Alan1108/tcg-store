'use client';

import { Search } from 'lucide-react';

interface InputSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function InputSearch({ placeholder = 'Buscar productos...', value, onChange, className = '' }: InputSearchProps) {
  return (
    <div className={`flex items-center gap-2.5 rounded-[10px] bg-bg-surface border border-[var(--border)] h-10 px-3.5 w-full focus-within:border-accent-primary transition-colors ${className}`}>
      <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none w-full"
      />
    </div>
  );
}
