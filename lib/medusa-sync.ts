import { sdk } from '@/lib/sdk'

async function deriveMedusaPassword(uid: string): Promise<string> {
  const secret = process.env.MEDUSA_CUSTOMER_SYNC_SECRET!
  const data = new TextEncoder().encode(`${uid}:${secret}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function syncMedusaCustomer(
  uid: string,
  email: string,
  firstName?: string,
  lastName?: string
): Promise<string | null> {
  try {
    const password = await deriveMedusaPassword(uid)

    try {
      const result = await sdk.auth.login('customer', 'emailpass', { email, password })
      // login returns the JWT token directly as a string, or { location } for OAuth redirects
      if (typeof result === 'string') return result
      return null
    } catch {
      // Customer auth identity doesn't exist yet — register and create profile
      const token = String(await sdk.auth.register('customer', 'emailpass', { email, password }))
      await sdk.store.customer.create(
        { email, first_name: firstName ?? '', last_name: lastName ?? '' },
        {},
        { Authorization: `Bearer ${token}` }
      )
      return token
    }
  } catch (e) {
    console.error('[medusa-sync] Failed to sync customer:', e)
    return null
  }
}

export const MEDUSA_TOKEN_COOKIE = '_medusa_customer_token'

export const medusaCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
}
