import type { InquiryStatus } from '@/types';

const config: Record<InquiryStatus, { label: string; color: string }> = {
  new: { label: 'Nueva', color: 'var(--inquiry-new)' },
  contacted: { label: 'Contactada', color: 'var(--inquiry-contacted)' },
  sold: { label: 'Vendida', color: 'var(--inquiry-sold)' },
  closed: { label: 'Cerrada', color: 'var(--inquiry-closed)' },
  unavailable: { label: 'No Disponible', color: 'var(--inquiry-unavailable)' },
};

export function BadgeInquiryStatus({ status }: { status: InquiryStatus }) {
  const { label, color } = config[status];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold" style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, color }}>
      {label}
    </span>
  );
}
