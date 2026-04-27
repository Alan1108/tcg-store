'use client';

import { useState } from 'react';
import { BadgeOrderStatus, BadgeInquiryStatus, ButtonGhost } from '@/components/atoms';
import type { OrderStatus, InquiryStatus } from '@/types';

const orders = [
  { id: 'TCG-2026-001', status: 'delivered' as OrderStatus, date: '23 Abril, 2026', items: 'Booster Box SV 151 x1, ETB Paldea x2', total: 189970 },
  { id: 'TCG-2026-002', status: 'shipped' as OrderStatus, date: '20 Abril, 2026', items: 'Draft Booster Box Karlov Manor x1', total: 119990 },
  { id: 'TCG-2026-003', status: 'pending' as OrderStatus, date: '18 Abril, 2026', items: 'Booster Box Age of Overlord x1', total: 74990 },
];

const inquiries = [
  { id: 'INQ-001', status: 'new' as InquiryStatus, date: '22 Abril, 2026', description: 'Busco Charizard ex NM de Obsidian Flames y Pikachu VMAX de Vivid Voltage' },
  { id: 'INQ-002', status: 'contacted' as InquiryStatus, date: '15 Abril, 2026', description: 'Necesito Black Lotus de Alpha en cualquier condición, presupuesto flexible' },
];

function formatPrice(price: number) { return '$' + price.toLocaleString('es-CL'); }

export default function AccountPage() {
  const [tab, setTab] = useState<'orders' | 'inquiries'>('orders');

  return (
    <div className="flex flex-col">
      <div className="bg-[var(--bg-surface)] px-4 py-6 flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-elevated)]">
          <span className="text-base font-semibold text-[var(--accent-primary)]">AJ</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">Alejandro Jiménez</h1>
          <p className="text-sm text-[var(--text-secondary)]">alejandro@email.com</p>
        </div>
      </div>

      <div className="flex bg-[var(--bg-surface)] border-b border-[var(--border)] px-4">
        {(['orders', 'inquiries'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] border-transparent'}`}>
            {t === 'orders' ? 'Mis Pedidos' : 'Mis Consultas'}
          </button>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-4 py-4 flex flex-col gap-3">
        {tab === 'orders' && orders.map((o) => (
          <div key={o.id} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Pedido #{o.id}</span>
              <BadgeOrderStatus status={o.status} />
            </div>
            <span className="text-xs text-[var(--text-muted)]">{o.date}</span>
            <span className="text-sm text-[var(--text-secondary)]">{o.items}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-[family-name:var(--font-heading)] font-bold text-[var(--accent-primary)]">{formatPrice(o.total)}</span>
              <ButtonGhost label="Ver detalle" />
            </div>
          </div>
        ))}
        {tab === 'inquiries' && inquiries.map((inq) => (
          <div key={inq.id} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">{inq.date}</span>
              <BadgeInquiryStatus status={inq.status} />
            </div>
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{inq.description}</p>
            <ButtonGhost label="Ver detalle" />
          </div>
        ))}
      </div>
    </div>
  );
}
