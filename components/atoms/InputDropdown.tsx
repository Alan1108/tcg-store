'use client';

import { ChevronDown } from 'lucide-react';

interface InputDropdownProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function InputDropdown({ options, value, onChange, placeholder = 'Seleccionar...', label, className = '' }: InputDropdownProps) {
  const select = (
    <div className={`relative ${className}`}>
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="appearance-none h-11 w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] px-3.5 pr-10 text-sm text-[var(--text-primary)] outline-none"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
    </div>
  );

  if (!label) return select;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[var(--text-primary)]">{label}</label>
      {select}
    </div>
  );
}
