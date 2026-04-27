import type { StockStatus } from '@/types';

const config: Record<StockStatus, { label: string; color: string }> = {
  in_stock: { label: 'En Stock', color: 'var(--stock-in)' },
  low_stock: { label: 'Stock Bajo', color: 'var(--stock-low)' },
  out_of_stock: { label: 'Agotado', color: 'var(--stock-out)' },
};

export function BadgeStock({ status }: { status: StockStatus }) {
  const { label, color } = config[status];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
