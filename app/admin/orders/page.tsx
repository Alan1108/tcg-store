'use client';

import { useState } from 'react';
import { BadgeOrderStatus, InputSearch, InputDropdown } from '@/components/atoms';
import type { OrderStatus } from '@/types';

const orders = [
  { id: 'TCG-2026-042', customer: 'María López', email: 'maria@email.com', total: 189970, status: 'pending' as OrderStatus, date: '24 Abr, 2026', items: 3 },
  { id: 'TCG-2026-041', customer: 'Carlos Ruiz', email: 'carlos@email.com', total: 119990, status: 'processing' as OrderStatus, date: '23 Abr, 2026', items: 1 },
  { id: 'TCG-2026-040', customer: 'Ana Torres', email: 'ana@email.com', total: 74990, status: 'shipped' as OrderStatus, date: '22 Abr, 2026', items: 1 },
  { id: 'TCG-2026-039', customer: 'Diego Morales', email: 'diego@email.com', total: 94990, status: 'delivered' as OrderStatus, date: '21 Abr, 2026', items: 2 },
  { id: 'TCG-2026-038', customer: 'Laura Sánchez', email: 'laura@email.com', total: 54990, status: 'delivered' as OrderStatus, date: '20 Abr, 2026', items: 1 },
  { id: 'TCG-2026-037', customer: 'Pedro Gómez', email: 'pedro@email.com', total: 45990, status: 'cancelled' as OrderStatus, date: '19 Abr, 2026', items: 1 },
];

const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'processing', label: 'Procesando' },
  { value: 'shipped', label: 'Enviado' },
  { value: 'delivered', label: 'Entregado' },
  { value: 'cancelled', label: 'Cancelado' },
];

function formatPrice(p: number) { return '$' + p.toLocaleString('es-CL'); }

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = orders.filter((o) => {
    if (statusFilter && o.status !== statusFilter) return false;
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1040px]">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">Pedidos</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Gestiona todos los pedidos de la tienda</p>
      </div>

      <div className="flex gap-3">
        <InputSearch placeholder="Buscar pedidos..." value={search} onChange={setSearch} className="flex-1" />
        <InputDropdown options={statusOptions} value={statusFilter} onChange={setStatusFilter} className="w-48" />
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)]">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
          <span>Pedido</span><span>Cliente</span><span>Items</span><span>Total</span><span>Estado</span><span>Fecha</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((o) => (
            <div key={o.id} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 items-center">
              <span className="text-sm font-medium text-[var(--accent-primary)]">#{o.id}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)]">{o.customer}</span>
                <span className="text-xs text-[var(--text-muted)]">{o.email}</span>
              </div>
              <span className="text-sm text-[var(--text-secondary)]">{o.items}</span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{formatPrice(o.total)}</span>
              <BadgeOrderStatus status={o.status} />
              <span className="text-xs text-[var(--text-muted)]">{o.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
