'use server'

import { cookies } from 'next/headers'
import { sdk } from '@/lib/sdk'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { syncMedusaCustomer, MEDUSA_TOKEN_COOKIE, medusaCookieOptions } from '@/lib/medusa-sync'
import type { Customer } from '@/types'
import type { HttpTypes } from '@medusajs/types'

async function getMedusaToken(): Promise<string | null> {
  return (await cookies()).get(MEDUSA_TOKEN_COOKIE)?.value ?? null
}

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getMedusaToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/** Re-establishes the Medusa customer token using the current Supabase session. */
async function ensureMedusaToken(): Promise<string | null> {
  const existing = await getMedusaToken()
  if (existing) return existing

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return null

  const token = await syncMedusaCustomer(
    user.id,
    user.email,
    user.user_metadata?.first_name,
    user.user_metadata?.last_name
  )
  if (token) {
    ;(await cookies()).set(MEDUSA_TOKEN_COOKIE, token, medusaCookieOptions)
  }
  return token
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const headers = await authHeaders()
  if (!headers.Authorization) return null
  try {
    const { customer } = await sdk.store.customer.retrieve({}, headers)
    return customer ?? null
  } catch {
    return null
  }
}

export async function updateCustomerProfile(
  firstName: string,
  lastName: string,
  phone?: string
): Promise<{ error?: string }> {
  // 1. Always update Supabase user metadata — it is the primary identity store
  const supabase = await createSupabaseServerClient()
  const { error: sbError } = await supabase.auth.updateUser({
    data: { first_name: firstName, last_name: lastName, phone },
  })
  if (sbError) return { error: sbError.message }

  // 2. Update Medusa customer — re-sync token on the fly if missing
  const token = await ensureMedusaToken()
  if (token) {
    try {
      await sdk.store.customer.update(
        { first_name: firstName, last_name: lastName, ...(phone ? { phone } : {}) },
        {},
        { Authorization: `Bearer ${token}` }
      )
    } catch {
      // Non-fatal — Supabase is already updated
    }
  }

  return {}
}

export async function getCustomerAddresses(): Promise<HttpTypes.StoreCustomerAddress[]> {
  const headers = await authHeaders()
  if (!headers.Authorization) return []
  try {
    const { addresses } = await sdk.store.customer.listAddress({}, headers)
    return addresses ?? []
  } catch {
    return []
  }
}

export async function createCustomerAddress(
  body: HttpTypes.StoreCreateCustomerAddress
): Promise<{ error?: string }> {
  const headers = await authHeaders()
  if (!headers.Authorization) return { error: 'No autenticado' }
  try {
    await sdk.store.customer.createAddress(body, {}, headers)
    return {}
  } catch {
    return { error: 'Error al guardar la dirección' }
  }
}

export async function deleteCustomerAddress(
  addressId: string
): Promise<{ error?: string }> {
  const headers = await authHeaders()
  if (!headers.Authorization) return { error: 'No autenticado' }
  try {
    await sdk.store.customer.deleteAddress(addressId, headers)
    return {}
  } catch {
    return { error: 'Error al eliminar la dirección' }
  }
}
