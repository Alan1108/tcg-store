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
      className={`inline-flex items-center h-8 px-3.5 rounded-full text-[13px] font-semibold border transition-colors ${
        active
          ? 'bg-accent-primary border-accent-primary text-white'
          : 'bg-bg-elevated border-[var(--border)] text-text-secondary hover:border-accent-primary hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  );
}
