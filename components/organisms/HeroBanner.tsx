import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, MessageCircle } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="w-full max-w-[1280px] h-auto md:h-[500px] rounded-2xl overflow-hidden border border-border-accent bg-bg-surface relative mt-5">
      <div className="flex flex-col md:flex-row h-full">

        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center gap-5 p-8 md:p-12">

          {/* Badge */}
          <span className="w-fit px-3 py-1 rounded-full text-xs font-semibold bg-(--accent-primary)/10 text-accent-primary border border-border-accent">
            Tienda oficial en Ecuador
          </span>

          {/* Headline */}
          <p className="font-heading text-3xl md:text-[44px] font-bold leading-[1.1] text-text-primary">
            Tu Tienda de{' '}
            <span className="text-accent-primary">Cartas TCG</span>
            <br />en Ecuador
          </p>

          <p className="text-sm md:text-base leading-[1.6] text-text-secondary max-w-[380px]">
            Pokémon, One Piece, Magic y más. Sobres, cajas y singles — envíos a todo el país con Servientrega.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sealed"
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-accent-primary hover:bg-accent-primary-hover transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-white" />
              <span className="text-sm font-bold text-white">Ver Catálogo</span>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-whatsapp hover:opacity-90 transition-opacity cursor-pointer"
            >
              <MessageCircle className="w-[18px] h-[18px] text-white" />
              <span className="text-sm font-bold text-white">WhatsApp</span>
            </Link>
          </div>

          {/* Trust micro-signals */}
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {['Productos originales', 'Pago seguro', 'Devoluciones'].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Game card showcase */}
        <div className="hidden md:block relative w-[420px] h-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">

            {/* Pokémon reverse card */}
            <div
              className="w-[180px] h-[252px] rounded-xl overflow-hidden border border-border absolute"
              style={{
                transform: 'rotate(-8deg) translate(-50px, -10px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
              }}
            >
              <Image
                src="/pokemon-reverse-card.jpg"
                alt="Pokémon reverse card"
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>

            {/* One Piece reverse card */}
            <div
              className="w-[180px] h-[252px] rounded-xl overflow-hidden border border-border absolute"
              style={{
                transform: 'rotate(6deg) translate(50px, 10px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
              }}
            >
              <Image
                src="/op-reverse-card.jpg"
                alt="One Piece reverse card"
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>

          </div>

          {/* Left-edge fade so cards blend into the content panel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg-surface) 0%, transparent 40%)' }}
          />
        </div>

      </div>
    </div>
  );
}
