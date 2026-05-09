import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function isComingSoonEnabled(): boolean {
  const raw = process.env.COMING_SOON ?? process.env.NEXT_PUBLIC_COMING_SOON ?? ''
  const v = raw.toLowerCase().trim()
  if (v === '' || v === 'false' || v === '0' || v === 'no' || v === 'off') return false
  return v === 'true' || v === '1' || v === 'yes'
}

const PROTECTED_PATHS = ['/account', '/cart']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Coming soon redirect — takes priority over everything
  if (isComingSoonEnabled()) {
    if (
      !pathname.startsWith('/coming-soon') &&
      !pathname.startsWith('/_next') &&
      pathname !== '/favicon.ico' &&
      pathname !== '/robots.txt' &&
      pathname !== '/sitemap.xml' &&
      !/\.(ico|png|jpg|jpeg|svg|gif|webp|woff2?|txt|xml)$/i.test(pathname)
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/coming-soon'
      url.search = ''
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Skip auth check for static assets and auth callback
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/auth/callback') ||
    /\.(ico|png|jpg|jpeg|svg|gif|webp|woff2?|txt|xml)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session on every request — required by @supabase/ssr
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))

  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('auth', 'login')
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
}
