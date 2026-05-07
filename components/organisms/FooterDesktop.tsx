import Link from 'next/link';
import {Camera, Share2, Music } from 'lucide-react';
import Image from 'next/image';

const shopLinks = [
  { label: 'Sobres y Cajas', href: '/sealed' },
  { label: 'Singles', href: '/singles' },
  { label: 'Novedades', href: '/sealed' },
  { label: 'Ofertas', href: '/sealed' },
];

const supportLinks = [
  { label: 'Centro de Ayuda', href: '#' },
  { label: 'Estado de Pedido', href: '/account' },
  { label: 'Envíos y Devoluciones', href: '#' },
  { label: 'Contacto WhatsApp', href: '#' },
];

const legalLinks = [
  { label: 'Términos y Condiciones', href: '#' },
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Política de Cookies', href: '#' },
];

export function FooterDesktop() {
  return (
    <footer className="hidden md:block w-full bg-bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-12 py-10 flex flex-col gap-10">
        <div className="flex gap-10">
          <div className="w-[280px] flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Image src={'/logo-principal-celeste.png'} width={24} height={24} alt="TCG Shop" className="w-6 h-6 text-accent-primary" />
              <span className="font-heading text-xl font-bold text-text-primary">
                TCG Shop
              </span>
            </div>
            <p className="text-[13px] leading-normal text-text-secondary">
              Tu tienda de cartas coleccionables en Ecuador. Sobres, cajas y singles de los mejores juegos del mundo.
            </p>
          </div>

          {[
            { title: 'Tienda', links: shopLinks },
            { title: 'Soporte', links: supportLinks },
            { title: 'Legal', links: legalLinks },
          ].map((col) => (
            <div key={col.title} className="flex-1 flex flex-col gap-3">
              <span className="text-sm font-bold text-text-primary">{col.title}</span>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">
            © 2026 TCG Shop. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
