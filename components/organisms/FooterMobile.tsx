'use client';

import Link from 'next/link';
import { Hexagon, ChevronDown, ChevronRight, Camera, Share2, Music, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const sections = [
  {
    title: 'Tienda',
    links: [
      { label: 'Sobres y Cajas', href: '/sealed' },
      { label: 'Singles', href: '/singles' },
      { label: 'Novedades', href: '/sealed' },
      { label: 'Ofertas', href: '/sealed' },
    ],
  },
  { title: 'Soporte', links: [] },
  { title: 'Legal', links: [] },
];

const paymentMethods = ['VISA', 'MC', 'PSE', 'DEPÓ'];

export function FooterMobile() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <footer className="md:hidden w-full bg-[var(--bg-surface)] border-t border-[var(--border)] px-5 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Hexagon className="w-6 h-6 text-[var(--accent-primary)]" />
            <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
              TCG Shop
            </span>
          </div>
          <p className="text-xs text-center text-[var(--text-secondary)]">
            Tu tienda de cartas coleccionables en Ecuador.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <div className="h-px bg-[var(--border)]" />
            <button
              onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
              className="flex items-center justify-between w-full py-3"
            >
              <span className="text-sm font-bold text-[var(--text-primary)]">{section.title}</span>
              {section.links.length > 0 ? (
                <ChevronDown className={`w-[18px] h-[18px] text-[var(--text-secondary)] transition-transform ${openSection === section.title ? 'rotate-180' : ''}`} />
              ) : (
                <ChevronRight className="w-[18px] h-[18px] text-[var(--text-secondary)]" />
              )}
            </button>
            {openSection === section.title && section.links.length > 0 && (
              <div className="flex flex-col gap-2.5 pl-2 pb-2">
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-[13px] text-[var(--text-secondary)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="h-px bg-[var(--border)]" />

        <div className="flex items-center justify-center gap-4">
          {[Camera, Share2, Music].map((Icon, i) => (
            <div key={i} className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[var(--bg-elevated)]">
              <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
            </div>
          ))}
          <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[var(--whatsapp)]">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5">
          {paymentMethods.map((m) => (
            <div key={m} className="flex items-center justify-center w-11 h-7 rounded bg-[var(--bg-elevated)]">
              <span className="text-[9px] font-bold text-[var(--text-secondary)]">{m}</span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-[var(--text-muted)]">
          © 2026 TCG Shop. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
