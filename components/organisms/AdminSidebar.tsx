'use client';

import Link from 'next/link';
import { Hexagon, LayoutDashboard, ClipboardList, Box, Star, MessageCircle, Users, BarChart3, Settings } from 'lucide-react';

interface AdminSidebarProps {
  activeItem: string;
  orderCount?: number;
  inquiryCount?: number;
}

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { key: 'orders', label: 'Pedidos', icon: ClipboardList, href: '/admin/orders', hasBadge: true, badgeKey: 'orderCount' as const },
  { key: 'sealed', label: 'Sobres y Cajas', icon: Box, href: '/admin/sealed' },
  { key: 'singles', label: 'Singles', icon: Star, href: '/admin/singles' },
  { key: 'inquiries', label: 'Consultas', icon: MessageCircle, href: '/admin/inquiries', hasBadge: true, badgeKey: 'inquiryCount' as const },
  { key: 'customers', label: 'Clientes', icon: Users, href: '/admin/customers' },
  { key: 'analytics', label: 'Analíticas', icon: BarChart3, href: '/admin/analytics' },
  { key: 'settings', label: 'Configuración', icon: Settings, href: '/admin/settings' },
];

export function AdminSidebar({ activeItem, orderCount = 0, inquiryCount = 0 }: AdminSidebarProps) {
  const badges = { orderCount, inquiryCount };

  return (
    <aside className="w-60 min-h-screen bg-[var(--bg-surface)] flex flex-col gap-1 p-4 pt-8">
      <div className="flex items-center gap-2.5 px-2 pb-6">
        <Hexagon className="w-7 h-7 text-[var(--accent-primary)]" />
        <span className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[var(--text-primary)]">
          TCG Shop
        </span>
        <span className="text-[11px] font-medium text-[var(--text-muted)]">Admin</span>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = activeItem === item.key;
          const badgeCount = item.hasBadge ? badges[item.badgeKey!] : 0;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-2.5 h-10 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {badgeCount > 0 && (
                <span className={`flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[var(--accent-primary)] text-white'
                }`}>
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-2.5 px-2 pt-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--bg-elevated)]">
          <span className="text-[13px] font-semibold text-[var(--accent-primary)]">AJ</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[var(--text-primary)]">Alejandro J.</span>
          <button className="text-[11px] text-[var(--text-muted)] text-left">Cerrar sesión</button>
        </div>
      </div>
      <div className="h-px bg-[var(--border)]" />
    </aside>
  );
}
