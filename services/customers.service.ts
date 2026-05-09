'use server'

import { cookies } from 'next/headers'
import { sdk } from '@/lib/sdk'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { syncMedusaCustomer, MEDUSA_TOKEN_COOKIE, medusaCookieOptions } from '@/lib/medusa-sync'
import type { Customer } from '@/types'

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
