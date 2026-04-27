'use client';

import Link from 'next/link';
import { X, Search, House, Package, Layers, User, ShoppingBag, MessageSquare, Globe, Camera, Share2, Music, MessageCircle } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: House, label: 'Inicio', href: '/' },
  { icon: Package, label: 'Sobres y Cajas', href: '/sealed' },
  { icon: Layers, label: 'Singles', href: '/singles' },
  { icon: User, label: 'Mi Cuenta', href: '/account' },
  { icon: ShoppingBag, label: 'Mis Pedidos', href: '/account' },
  { icon: MessageSquare, label: 'Mis Consultas', href: '/account' },
];

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-[390px] bg-[var(--bg-surface)] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-14 px-5">
            <span className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[var(--accent-primary)]">
              TCG Shop
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--bg-elevated)]"
            >
              <X className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>

          <div className="flex items-center h-14 px-5">
            <div className="flex items-center gap-2.5 rounded-full bg-[var(--bg-elevated)] h-10 px-3.5 w-full">
              <Search className="w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full"
              />
            </div>
          </div>

          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3.5 h-12 px-5"
              >
                <item.icon className="w-5 h-5 text-[var(--text-secondary)]" />
                <span className="text-[15px] font-medium text-[var(--text-primary)]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="px-5">
            <div className="h-px bg-[var(--border)]" />
          </div>

          <div className="flex items-center gap-4 h-12 px-5">
            <Globe className="w-[18px] h-[18px] text-[var(--text-secondary)]" />
            <div className="flex items-center justify-center rounded-md bg-[var(--accent-primary)] px-2.5 py-1">
              <span className="text-[13px] font-semibold text-white">ES</span>
            </div>
            <div className="flex items-center justify-center rounded-md bg-[var(--bg-elevated)] px-2.5 py-1">
              <span className="text-[13px] font-medium text-[var(--text-secondary)]">EN</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 h-12 px-5">
            {[Camera, Share2, Music].map((Icon, i) => (
              <div key={i} className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[var(--bg-elevated)]">
                <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
              </div>
            ))}
          </div>

          <div className="mt-auto px-5 pb-5 pt-2">
            <button className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[var(--whatsapp)]">
              <MessageCircle className="w-[18px] h-[18px] text-white" />
              <span className="text-sm font-semibold text-white">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
