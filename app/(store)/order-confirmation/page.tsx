import Link from 'next/link';
import Image from 'next/image';
import { CircleCheck, MessageCircle, MapPin } from 'lucide-react';
import { Divider } from '@/components/atoms';
import { getOrderById } from '@/services/orders.service';
import { formatPrice } from '@/lib/format';
import { notFound } from 'next/navigation';

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const { id } = await searchParams;
  if (!id) return notFound();

  const order = await getOrderById(id).catch(() => null);
  if (!order) return notFound();

  const items = order.items ?? [];
  const currency = order.currency_code ?? 'USD';
  const subtotal = order.subtotal ?? 0;
  const shippingTotal = order.shipping_total ?? 0;
  const total = order.total ?? 0;
  const billing = order.billing_address;
  const shipping = order.shipping_address ?? billing;

  const addressLine = [
    shipping?.address_1,
    shipping?.city,
    shipping?.province,
  ].filter(Boolean).join(', ');

  return (
    <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">

      {/* Header */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#22C55E33]">
          <CircleCheck className="w-6 h-6 text-[var(--success)]" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-text-primary">¡Pedido Confirmado!</h1>
        <p className="text-sm text-text-secondary">Gracias por tu compra</p>
        <span className="text-sm font-bold text-accent-primary">
          #{String(order.display_id).padStart(3, '0')}
        </span>
      </div>

      {/* Order summary */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3">
        <h2 className="text-sm font-bold text-text-primary">Resumen del Pedido</h2>

        {items.map((item) => {
          const imageUrl = item.variant?.product?.thumbnail ?? item.thumbnail ?? undefined;
          const lineTotal = (item.unit_price ?? 0) * (item.quantity ?? 1);
          return (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg-elevated flex-shrink-0 relative overflow-hidden">
                {imageUrl && (
                  <Image src={imageUrl} alt={item.title ?? ''} fill className="object-cover" sizes="40px" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary line-clamp-1">{item.title}</p>
                {item.variant_title && (
                  <p className="text-[11px] text-text-muted">{item.variant_title}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-text-primary">{formatPrice(lineTotal, currency)}</p>
                <p className="text-[11px] text-text-muted">x{item.quantity}</p>
              </div>
            </div>
          );
        })}

        <Divider />
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Envío</span>
          {shippingTotal > 0
            ? <span className="text-text-primary">{formatPrice(shippingTotal, currency)}</span>
            : <span className="text-[var(--success)]">Gratis</span>
          }
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="font-semibold text-text-primary">Total</span>
          <span className="font-heading text-xl font-bold text-accent-primary">{formatPrice(total, currency)}</span>
        </div>
      </div>

      {/* Shipping / billing address */}
      {addressLine && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-2">
          <h2 className="text-sm font-bold text-text-primary">Información de Envío</h2>
          <div className="flex items-start gap-2 text-sm text-text-secondary">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-text-muted" />
            <div className="flex flex-col gap-0.5">
              {(shipping?.first_name || shipping?.last_name) && (
                <span className="font-medium text-text-primary">
                  {[shipping.first_name, shipping.last_name].filter(Boolean).join(' ')}
                </span>
              )}
              <span>{addressLine}</span>
              {shipping?.phone && <span>{shipping.phone}</span>}
            </div>
          </div>
        </div>
      )}

      <Link
        href="/account"
        className="flex items-center justify-center h-10 rounded-lg bg-accent-primary text-sm font-semibold text-white"
      >
        Ver mis pedidos
      </Link>
      <Link
        href="/"
        className="flex items-center justify-center h-10 text-sm font-semibold text-text-secondary"
      >
        Seguir comprando
      </Link>

      <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)]">
        <MessageCircle className="w-4 h-4 text-[var(--whatsapp)]" />
        <span className="text-sm text-text-secondary">¿Preguntas sobre tu pedido?</span>
        <span className="text-sm font-semibold text-[var(--whatsapp)]">WhatsApp</span>
      </div>

    </div>
  );
}
