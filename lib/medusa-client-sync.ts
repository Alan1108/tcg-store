'use client'

import { sdk } from '@/lib/sdk'
import { MEDUSA_TOKEN_COOKIE } from '@/lib/medusa-sync'

export function getMedusaTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${MEDUSA_TOKEN_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setMedusaCookieClient(token: string) {
  const maxAge = 60 * 60 * 24 * 7
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${MEDUSA_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`
}

async function ensureCustomerProfile(
  token: string,
  email: string,
  firstName: string,
  lastName: string,
) {
  try {
    await sdk.store.customer.retrieve({}, { Authorization: `Bearer ${token}` })
  } catch {
    // Profile missing — create it now from the browser
    await sdk.store.customer.create(
      { email, first_name: firstName ?? '', last_name: lastName ?? '' },
      {},
      { Authorization: `Bearer ${token}` }
    )
  }
}

export async function syncMedusaTokenFromClient(): Promise<boolean> {
  try {
    const res = await fetch('/api/medusa-credentials', { method: 'POST' })
    if (!res.ok) return false
    const { email, password, firstName, lastName } = await res.json()

    try {
      const result = await sdk.auth.login('customer', 'emailpass', { email, password })
      if (typeof result === 'string') {
        // Ensure the customer profile exists (may be missing for Google OAuth users
        // if the profile creation step failed during a previous auth callback)
        await ensureCustomerProfile(result, email, firstName, lastName)
        setMedusaCookieClient(result)
        return true
      }
    } catch {
      // No auth identity yet — register then create profile
      const token = String(
        await sdk.auth.register('customer', 'emailpass', { email, password })
      )
      await sdk.store.customer.create(
        { email, first_name: firstName ?? '', last_name: lastName ?? '' },
        {},
        { Authorization: `Bearer ${token}` }
      )
      setMedusaCookieClient(token)
      return true
    }
  } catch (e) {
    console.error('[medusa-client-sync] failed:', e)
  }
  return false
}
