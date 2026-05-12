'use client'

import { sdk } from '@/lib/sdk'

async function setMedusaCookie(token: string) {
  await fetch('/api/medusa-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
}

// Authenticates the current Supabase user with Medusa entirely from the
// browser, then persists the token as an httpOnly cookie via an API route.
export async function syncMedusaTokenFromClient(): Promise<void> {
  try {
    const res = await fetch('/api/medusa-credentials', { method: 'POST' })
    if (!res.ok) return
    const { email, password, firstName, lastName } = await res.json()

    try {
      const result = await sdk.auth.login('customer', 'emailpass', { email, password })
      if (typeof result === 'string') {
        await setMedusaCookie(result)
      }
    } catch {
      // No auth identity yet — register and create the customer profile
      const token = String(
        await sdk.auth.register('customer', 'emailpass', { email, password })
      )
      await sdk.store.customer.create(
        { email, first_name: firstName ?? '', last_name: lastName ?? '' },
        {},
        { Authorization: `Bearer ${token}` }
      )
      await setMedusaCookie(token)
    }
  } catch (e) {
    console.error('[medusa-client-sync] failed:', e)
  }
}
