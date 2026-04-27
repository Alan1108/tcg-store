import Link from 'next/link';
import { CircleCheck, MessageCircle } from 'lucide-react';
import { Divider } from '@/components/atoms';

function formatPrice(price: number) { return '$' + price.toLocaleString('es-CL'); }

const items = [
  { name: 'Booster Box Scarlet & Violet 151', qty: 1, price: 89990 },
  { name: 'ETB Paldea Evolved', qty: 2, price: 49990 },
];
const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#22C55E33]">
          <CircleCheck className="w-6 h-6 text-[var(--success)]" />
        </div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">¡Pedido Confirmado!</h1>
        <p className="text-sm text-[var(--text-secondary)]">Gracias por tu compra</p>
        <span className="text-sm font-bold text-[var(--accent-primary)]">#TCG-2026-001</span>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3">
        <h2 className="text-sm font-bold text-[var(--text-primary)]">Resumen del Pedido</h2>
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-[var(--text-secondary)]">{item.name} x{item.qty}</span>
            <span className="text-[var(--text-primary)]">{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
        <Divider />
        <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Envío</span><span className="text-[var(--success)]">Gratis</span></div>
        <Divider />
        <div className="flex justify-between"><span className="font-semibold">Total</span><span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--accent-primary)]">{formatPrice(subtotal)}</span></div>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-2">
        <h2 className="text-sm font-bold text-[var(--text-primary)]">Información de Envío</h2>
        <p className="text-sm text-[var(--text-secondary)]">Calle Principal 123, Quito, Ecuador</p>
        <p className="text-sm text-[var(--text-secondary)]">Entrega estimada: 28-30 Abril, 2026</p>
      </div>

      <Link href="/account" className="flex items-center justify-center h-10 rounded-lg bg-[var(--accent-primary)] text-sm font-semibold text-white">
        Ver mis pedidos
      </Link>
      <Link href="/" className="flex items-center justify-center h-10 text-sm font-semibold text-[var(--text-secondary)]">
        Seguir comprando
      </Link>

      <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)]">
        <MessageCircle className="w-4 h-4 text-[var(--whatsapp)]" />
        <span className="text-sm text-[var(--text-secondary)]">¿Preguntas sobre tu pedido?</span>
        <span className="text-sm font-semibold text-[var(--whatsapp)]">WhatsApp</span>
      </div>
    </div>
  );
}
