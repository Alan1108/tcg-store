'use client';

interface ChipSelectionProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function ChipSelection({ label, active, onClick }: ChipSelectionProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center h-8 px-3.5 rounded-full text-[13px] font-semibold border transition-colors bg-[var(--bg-elevated)] ${
        active ? 'border-[var(--accent-primary)] text-[var(--text-primary)]' : 'border-[var(--border)] text-[var(--text-secondary)]'
      }`}
    >
      {label}
    </button>
  );
}
