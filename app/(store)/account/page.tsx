'use client';

import { useState } from 'react';
import { ButtonGhost } from '@/components/atoms';

export default function AccountPage() {
  const [tab, setTab] = useState<'orders' | 'inquiries'>('orders');

  return (
    <div className="flex flex-col">
      <div className="bg-[var(--bg-surface)] px-4 py-6 flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bg-elevated">
          <span className="text-base font-semibold text-accent-primary">–</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-text-primary">Mi Cuenta</h1>
          <p className="text-sm text-text-secondary">Inicia sesión para ver tus pedidos</p>
        </div>
      </div>

      <div className="flex bg-[var(--bg-surface)] border-b border-[var(--border)] px-4">
        {(['orders', 'inquiries'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'text-accent-primary border-accent-primary' : 'text-text-secondary border-transparent'}`}>
            {t === 'orders' ? 'Mis Pedidos' : 'Mis Consultas'}
          </button>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-4 py-8 flex flex-col items-center gap-3">
        <p className="text-sm text-text-secondary">
          {tab === 'orders'
            ? 'Inicia sesión para ver tu historial de pedidos.'
            : 'Inicia sesión para ver tus consultas.'}
        </p>
        <ButtonGhost label="Iniciar sesión" />
      </div>
    </div>
  );
}
