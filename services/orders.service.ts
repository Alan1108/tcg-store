'use server'

import { cookies } from 'next/headers'
import type { Order } from '@/types'
import type { HttpTypes } from '@medusajs/types'
import { sdk } from '@/lib/sdk'
import { MEDUSA_TOKEN_COOKIE } from '@/lib/medusa-sync'

async function authHeaders(): Promise<Record<string, string>> {
  const token = (await cookies()).get(MEDUSA_TOKEN_COOKIE)?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getCustomerOrders(
  page = 1,
  limit = 20
): Promise<{ data: Order[]; count: number }> {
  const offset = (page - 1) * limit
  const headers = await authHeaders()
  const { orders, count } = await sdk.store.order.list(
    { limit, offset, fields: '+items.*,+items.variant.*,+items.variant.product.*' },
    headers
  )
  return { data: orders as Order[], count: count ?? orders.length }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const headers = await authHeaders()
  const { order } = await sdk.store.order.retrieve(id, {}, headers)
  return (order as Order) ?? null
}

export async function completeCart(cartId: string): Promise<HttpTypes.StoreOrder | null> {
  const result = await sdk.store.cart.complete(cartId)
  return (result as { order?: HttpTypes.StoreOrder }).order ?? null
}
