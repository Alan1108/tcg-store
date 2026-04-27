import type { OrderStatus } from '@/types';

const config: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'var(--order-pending)' },
  processing: { label: 'Procesando', color: 'var(--order-processing)' },
  shipped: { label: 'Enviado', color: 'var(--order-shipped)' },
  delivered: { label: 'Entregado', color: 'var(--order-delivered)' },
  cancelled: { label: 'Cancelado', color: 'var(--order-cancelled)' },
};

export function BadgeOrderStatus({ status }: { status: OrderStatus }) {
  const { label, color } = config[status];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold" style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, color }}>
      {label}
    </span>
  );
}
