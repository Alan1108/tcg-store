import { TrendingUp, ShoppingBag, ClipboardList, MessageCircle } from 'lucide-react';
import { BadgeOrderStatus } from '@/components/atoms';
import type { OrderStatus } from '@/types';

const stats = [
  { label: 'Ingresos Totales', value: '$2.450.000', icon: TrendingUp, color: 'var(--success)' },
  { label: 'Pedidos Totales', value: '127', icon: ShoppingBag, color: 'var(--accent-primary)' },
  { label: 'Pedidos Pendientes', value: '5', icon: ClipboardList, color: 'var(--warning)' },
  { label: 'Consultas Nuevas', value: '3', icon: MessageCircle, color: 'var(--info)' },
];

const recentOrders = [
  { id: 'TCG-2026-042', customer: 'María López', total: 189970, status: 'pending' as OrderStatus, date: '24 Abr' },
  { id: 'TCG-2026-041', customer: 'Carlos Ruiz', total: 119990, status: 'processing' as OrderStatus, date: '23 Abr' },
  { id: 'TCG-2026-040', customer: 'Ana Torres', total: 74990, status: 'shipped' as OrderStatus, date: '22 Abr' },
  { id: 'TCG-2026-039', customer: 'Diego Morales', total: 94990, status: 'delivered' as OrderStatus, date: '21 Abr' },
  { id: 'TCG-2026-038', customer: 'Laura Sánchez', total: 54990, status: 'delivered' as OrderStatus, date: '20 Abr' },
];

function formatPrice(p: number) { return '$' + p.toLocaleString('es-CL'); }

export default function AdminDashboardPage() {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-[1040px]">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Resumen general de tu tienda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[var(--text-secondary)]">{s.label}</span>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)]">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Pedidos Recientes</h2>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-[var(--text-primary)]">#{o.id}</span>
                <span className="text-xs text-[var(--text-muted)]">{o.customer}</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">{o.date}</span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{formatPrice(o.total)}</span>
              <BadgeOrderStatus status={o.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
