import type { Customer } from "@/types"
import { sdk } from "@/lib/sdk"

export async function getCurrentCustomer(): Promise<Customer | null> {
  const { customer } = await sdk.store.customer.retrieve()
  return customer ?? null
}
