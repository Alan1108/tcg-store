import { NextRequest, NextResponse } from 'next/server'
import { BYPASS_COOKIE } from '@/proxy'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token = searchParams.get('token')
  const clear = searchParams.get('clear')
  const bypassToken = process.env.COMING_SOON_BYPASS_TOKEN

  const response = NextResponse.redirect(origin)

  if (clear) {
    response.cookies.delete(BYPASS_COOKIE)
    return response
  }

  if (!bypassToken || token !== bypassToken) {
    return new NextResponse(null, { status: 401 })
  }

  response.cookies.set(BYPASS_COOKIE, bypassToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return response
}
