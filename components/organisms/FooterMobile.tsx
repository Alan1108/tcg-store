'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

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

export function FooterMobile() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <footer className="md:hidden w-full bg-bg-surface border-t border-border px-5 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src={'/logo-principal-celeste.png'} width={24} height={24} alt="Kado Gallery" className="w-6 h-6 text-accent-primary" />
            <span className="font-heading text-xl font-bold text-text-primary">
              Kādo Gallery
            </span>
          </div>
          <p className="text-xs text-center text-text-primary">
            Tu tienda de cartas coleccionables en Ecuador.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <div className="h-px bg-border" />
            <button
              onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
              className="flex items-center justify-between w-full py-3"
            >
              <span className="text-sm font-bold text-text-primary">{section.title}</span>
              {section.links.length > 0 ? (
                <ChevronDown className={`w-[18px] h-[18px] text-text-primary transition-transform ${openSection === section.title ? 'rotate-180' : ''}`} />
              ) : (
                <ChevronRight className="w-[18px] h-[18px] text-text-primary" />
              )}
            </button>
            {openSection === section.title && section.links.length > 0 && (
              <div className="flex flex-col gap-2.5 pl-2 pb-2">
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-[13px] text-text-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="h-px bg-border" />
        <p className="text-[11px] text-center text-text-muted">
          © 2026 Kādo Gallery. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
