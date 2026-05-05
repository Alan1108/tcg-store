import type { Order } from "@/types"
import type { HttpTypes } from "@medusajs/types"
import { sdk } from "@/lib/sdk"

export interface PaginatedOrdersResponse {
  data: Order[]
  count: number
}

export async function getCustomerOrders(
  page = 1,
  limit = 20
): Promise<PaginatedOrdersResponse> {
  const offset = (page - 1) * limit
  const { orders, count } = await sdk.store.order.list({ limit, offset })
  return { data: orders as Order[], count: count ?? orders.length }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { order } = await sdk.store.order.retrieve(id)
  return (order as Order) ?? null
}

export async function completeCart(cartId: string): Promise<HttpTypes.StoreOrder | null> {
  const result = await sdk.store.cart.complete(cartId)
  return (result as { order?: HttpTypes.StoreOrder }).order ?? null
}
