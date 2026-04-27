import Link from 'next/link';
import { ShoppingCart, MessageCircle } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="w-full max-w-[1280px] h-auto md:h-[500px] rounded-2xl overflow-hidden border border-[var(--border)] bg-gradient-to-r from-[var(--bg-base)] to-[var(--bg-surface)]">
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 flex flex-col justify-center gap-6 p-8 md:p-12">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-[40px] font-bold leading-[1.1] text-[var(--text-primary)]">
            Tu Tienda de Cartas Coleccionables
          </h1>
          <p className="text-base leading-[1.5] text-[var(--text-secondary)]">
            Sobres, cajas y singles de Pokémon, Magic, Yu-Gi-Oh! y más. Envíos a todo Ecuador.
          </p>
          <div className="flex gap-3">
            <Link
              href="/sealed"
              className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-white" />
              <span className="text-sm font-semibold text-white">Ver Catálogo</span>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[var(--whatsapp)]"
            >
              <MessageCircle className="w-[18px] h-[18px] text-white" />
              <span className="text-sm font-semibold text-white">WhatsApp</span>
            </Link>
          </div>
        </div>

        <div className="hidden md:block relative w-[500px] h-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200px] h-[280px] rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] rotate-[8deg] absolute left-[60px] top-[60px]" />
            <div className="w-[200px] h-[280px] rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] -rotate-[5deg] absolute left-[140px] top-[100px]" />
            <div className="w-[200px] h-[280px] rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] rotate-[2deg] absolute left-[100px] top-[30px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)] to-transparent opacity-80" />
        </div>
      </div>
    </div>
  );
}
