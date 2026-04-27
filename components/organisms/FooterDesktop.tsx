import Link from 'next/link';
import { Hexagon, Camera, Share2, Music } from 'lucide-react';

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

const paymentMethods = ['VISA', 'MC', 'PSE', 'DEPÓ'];

export function FooterDesktop() {
  return (
    <footer className="hidden md:block w-full bg-[var(--bg-surface)] border-t border-[var(--border)]">
      <div className="max-w-[1280px] mx-auto px-12 py-10 flex flex-col gap-10">
        <div className="flex gap-10">
          <div className="w-[280px] flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Hexagon className="w-6 h-6 text-[var(--accent-primary)]" />
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                TCG Shop
              </span>
            </div>
            <p className="text-[13px] leading-[1.5] text-[var(--text-secondary)]">
              Tu tienda de cartas coleccionables en Ecuador. Sobres, cajas y singles de los mejores juegos del mundo.
            </p>
            <div className="flex gap-3">
              {[Camera, Share2, Music].map((Icon, i) => (
                <div key={i} className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--bg-elevated)]">
                  <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
              ))}
            </div>
          </div>

          {[
            { title: 'Tienda', links: shopLinks },
            { title: 'Soporte', links: supportLinks },
            { title: 'Legal', links: legalLinks },
          ].map((col) => (
            <div key={col.title} className="flex-1 flex flex-col gap-3">
              <span className="text-sm font-bold text-[var(--text-primary)]">{col.title}</span>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="h-px bg-[var(--border)]" />

        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            © 2026 TCG Shop. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[var(--text-muted)]">Pagos seguros:</span>
            {paymentMethods.map((m) => (
              <div key={m} className="flex items-center justify-center w-10 h-[26px] rounded bg-[var(--bg-elevated)]">
                <span className="text-[9px] font-bold text-[var(--text-secondary)]">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
