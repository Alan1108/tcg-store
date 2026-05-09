'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth'

export function AuthTrigger() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { openAuthModal } = useAuth()

  useEffect(() => {
    const auth = searchParams.get('auth')
    if (auth === 'login' || auth === 'register') {
      openAuthModal(auth)
      // Clean the query param without pushing to history
      const url = new URL(window.location.href)
      url.searchParams.delete('auth')
      url.searchParams.delete('next')
      router.replace(url.pathname + url.search, { scroll: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
