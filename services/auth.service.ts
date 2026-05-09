'use server'

import { cookies } from 'next/headers'
import { syncMedusaCustomer, MEDUSA_TOKEN_COOKIE, medusaCookieOptions } from '@/lib/medusa-sync'

export async function syncMedusaTokenAction(
  uid: string,
  email: string,
  firstName?: string,
  lastName?: string
): Promise<void> {
  const token = await syncMedusaCustomer(uid, email, firstName, lastName)
  if (token) {
    ;(await cookies()).set(MEDUSA_TOKEN_COOKIE, token, medusaCookieOptions)
  }
}

export async function clearMedusaTokenAction(): Promise<void> {
  ;(await cookies()).delete(MEDUSA_TOKEN_COOKIE)
}
