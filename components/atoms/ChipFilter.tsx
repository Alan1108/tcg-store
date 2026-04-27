'use client';

import { X } from 'lucide-react';

interface ChipFilterProps {
  label: string;
  color: string;
  onRemove: () => void;
}

export function ChipFilter({ label, color, onRemove }: ChipFilterProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--bg-base)]" style={{ backgroundColor: color }}>
      {label}
      <button onClick={onRemove}><X className="w-3 h-3" /></button>
    </span>
  );
}
