'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CircleCheck, MessageCircle, MapPin, Loader2 } from 'lucide-react'
import { Divider } from '@/components/atoms'
import { sdk } from '@/lib/sdk'
import { getMedusaTokenFromCookie } from '@/lib/medusa-client-sync'
import { formatPrice } from '@/lib/format'
import type { Order } from '@/types'

export function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    const token = getMedusaTokenFromCookie()
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
    sdk.store.order.retrieve(
      id,
      { fields: '+items.*,+items.variant.*,+items.variant.product.*,+billing_address,+shipping_address,+shipping_methods.*' },
      headers
    )
      .then(({ order: o }) => setOrder(o as Order ?? null))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center gap-4 text-center">
        <p className="text-text-secondary">No se encontró el pedido.</p>
        <Link href="/" className="text-sm font-semibold text-accent-primary hover:underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const items = order.items ?? []
  const currency = order.currency_code ?? 'USD'
  const subtotal = order.subtotal ?? 0
  const shippingTotal = order.shipping_total ?? 0
  const total = order.total ?? 0
  const shipping = order.shipping_address
  const shippingMethodName = (order.shipping_methods as unknown as Array<{ name?: string }>)?.[0]?.name ?? ''
  const isPickup = /pick.?up|retiro/i.test(shippingMethodName)
  const addressLine = [shipping?.address_1, shipping?.city, shipping?.province].filter(Boolean).join(', ')

  return (
    <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
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

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3">
        <h2 className="text-sm font-bold text-text-primary">Resumen del Pedido</h2>
        {items.map((item) => {
          const imageUrl = item.variant?.product?.thumbnail ?? item.thumbnail ?? undefined
          const lineTotal = (item.unit_price ?? 0) * (item.quantity ?? 1)
          return (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg-elevated flex-shrink-0 relative overflow-hidden">
                {imageUrl && <Image src={imageUrl} alt={item.title ?? ''} fill className="object-cover" sizes="40px" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary line-clamp-1">{item.title}</p>
                {item.variant_title && <p className="text-[11px] text-text-muted">{item.variant_title}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-text-primary">{formatPrice(lineTotal, currency)}</p>
                <p className="text-[11px] text-text-muted">x{item.quantity}</p>
              </div>
            </div>
          )
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
            : <span className="text-[var(--success)]">Gratis</span>}
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="font-semibold text-text-primary">Total</span>
          <span className="font-heading text-xl font-bold text-accent-primary">{formatPrice(total, currency)}</span>
        </div>
      </div>

      {isPickup ? (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3">
          <h2 className="text-sm font-bold text-text-primary">Retiro en tienda</h2>
          <div className="flex items-start gap-2 text-sm text-text-secondary">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-text-muted" />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-text-primary">Kādo Gallery — Casa Elian</span>
              <span>Abdón Calderón y Ponce Enríquez, Urbanización los Olivos Lote 31</span>
              <span>Quito, Pichincha</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs text-text-muted pl-6">
            <span>Lun – Vie: 10:00 – 19:00</span>
            <span>Sáb: 10:00 – 17:00</span>
            <span className="text-text-secondary mt-1">Te avisaremos cuando tu pedido esté listo para retirar.</span>
          </div>
        </div>
      ) : addressLine ? (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-2">
          <h2 className="text-sm font-bold text-text-primary">Información de Envío</h2>
          <div className="flex items-start gap-2 text-sm text-text-secondary">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-text-muted" />
            <div className="flex flex-col gap-0.5">
              {(shipping?.first_name || shipping?.last_name) && (
                <span className="font-medium text-text-primary">
                  {[shipping?.first_name, shipping?.last_name].filter(Boolean).join(' ')}
                </span>
              )}
              <span>{addressLine}</span>
              {shipping?.phone && <span>{shipping.phone}</span>}
            </div>
          </div>
        </div>
      ) : null}

      <Link href="/account" className="flex items-center justify-center h-10 rounded-lg bg-accent-primary text-sm font-semibold text-white">
        Ver mis pedidos
      </Link>
      <Link href="/" className="flex items-center justify-center h-10 text-sm font-semibold text-text-secondary">
        Seguir comprando
      </Link>
      <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)]">
        <MessageCircle className="w-4 h-4 text-[var(--whatsapp)]" />
        <span className="text-sm text-text-secondary">¿Preguntas sobre tu pedido?</span>
        <span className="text-sm font-semibold text-[var(--whatsapp)]">WhatsApp</span>
      </div>
    </div>
  )
}
