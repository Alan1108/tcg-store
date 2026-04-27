'use client';

import { useState } from 'react';
import { BadgeInquiryStatus, InputSearch, InputDropdown, ButtonPrimary } from '@/components/atoms';
import type { InquiryStatus } from '@/types';

const inquiries = [
  { id: 'INQ-001', name: 'Carlos Ruiz', email: 'carlos@email.com', whatsapp: '+593 99 123 4567', cards: 'Charizard ex NM Obsidian Flames, Pikachu VMAX Vivid Voltage', status: 'new' as InquiryStatus, date: '24 Abr, 2026' },
  { id: 'INQ-002', name: 'Ana Torres', email: 'ana@email.com', whatsapp: '+593 98 765 4321', cards: 'Black Lotus Alpha cualquier condición', status: 'contacted' as InquiryStatus, date: '22 Abr, 2026' },
  { id: 'INQ-003', name: 'Diego Morales', email: 'diego@email.com', whatsapp: '+593 97 111 2222', cards: 'Dark Magician Legend of Blue Eyes Holo', status: 'sold' as InquiryStatus, date: '20 Abr, 2026' },
  { id: 'INQ-004', name: 'Laura Sánchez', email: 'laura@email.com', whatsapp: '+593 96 333 4444', cards: 'Elsa Snow Queen Lorcana, Monkey D. Luffy OP Romance Dawn', status: 'closed' as InquiryStatus, date: '18 Abr, 2026' },
];

const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'new', label: 'Nueva' },
  { value: 'contacted', label: 'Contactada' },
  { value: 'sold', label: 'Vendida' },
  { value: 'closed', label: 'Cerrada' },
];

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = inquiries.filter((inq) => {
    if (statusFilter && inq.status !== statusFilter) return false;
    if (search && !inq.name.toLowerCase().includes(search.toLowerCase()) && !inq.cards.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1040px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-[var(--text-primary)]">Consultas</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Gestiona las consultas de singles</p>
        </div>
      </div>

      <div className="flex gap-3">
        <InputSearch placeholder="Buscar consultas..." value={search} onChange={setSearch} className="flex-1" />
        <InputDropdown options={statusOptions} value={statusFilter} onChange={setStatusFilter} className="w-48" />
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)]">
        <div className="grid grid-cols-[1fr_1.5fr_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
          <span>Cliente</span><span>Cartas</span><span>Estado</span><span>Fecha</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((inq) => (
            <div key={inq.id} className="grid grid-cols-[1fr_1.5fr_auto_auto] gap-4 px-5 py-4 items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)]">{inq.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{inq.email}</span>
              </div>
              <span className="text-sm text-[var(--text-secondary)] line-clamp-1">{inq.cards}</span>
              <BadgeInquiryStatus status={inq.status} />
              <span className="text-xs text-[var(--text-muted)]">{inq.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
