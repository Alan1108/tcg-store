import { NextRequest, NextResponse } from 'next/server'
import { MEDUSA_TOKEN_COOKIE, medusaCookieOptions } from '@/lib/medusa-sync'

// Receives a Medusa customer JWT from the client and persists it as an
// httpOnly cookie so server actions can read it on subsequent requests.
export async function POST(request: NextRequest) {
  const { token } = await request.json()
  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }
  const response = NextResponse.json({ ok: true })
  response.cookies.set(MEDUSA_TOKEN_COOKIE, token, medusaCookieOptions)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(MEDUSA_TOKEN_COOKIE)
  return response
}
