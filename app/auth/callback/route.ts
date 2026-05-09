import { createSupabaseServerClient } from '@/lib/supabase/server'
import { syncMedusaCustomer, MEDUSA_TOKEN_COOKIE, medusaCookieOptions } from '@/lib/medusa-sync'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
      const meta = user.user_metadata ?? {}
      const fullName: string = meta.full_name ?? meta.name ?? ''
      const [firstName, ...rest] = fullName.split(' ')
      const lastName = rest.join(' ')

      const medusaToken = await syncMedusaCustomer(
        user.id,
        user.email!,
        firstName,
        lastName
      )

      const response = NextResponse.redirect(new URL(next, origin))
      if (medusaToken) {
        response.cookies.set(MEDUSA_TOKEN_COOKIE, medusaToken, medusaCookieOptions)
      }
      return response
    }
  }

  return NextResponse.redirect(new URL('/', origin))
}
