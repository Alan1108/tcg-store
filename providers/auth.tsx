'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { getCurrentCustomer } from '@/services/customers.service'
import { clearMedusaTokenAction } from '@/services/auth.service'
import type { Customer } from '@/types'

export type AuthModalTab = 'login' | 'register'

type AuthContextType = {
  user: User | null
  customer: Customer | null
  loading: boolean
  authModalOpen: boolean
  authModalTab: AuthModalTab
  openAuthModal: (tab?: AuthModalTab) => void
  closeAuthModal: () => void
  refreshCustomer: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('login')

  const supabase = createSupabaseBrowserClient()

  const refreshCustomer = useCallback(async () => {
    const c = await getCurrentCustomer()
    setCustomer(c)
  }, [])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await refreshCustomer()
      } else {
        setCustomer(null)
      }
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [supabase, refreshCustomer])

  const openAuthModal = (tab: AuthModalTab = 'login') => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => setAuthModalOpen(false)

  const signOut = async () => {
    await supabase.auth.signOut()
    await clearMedusaTokenAction()
    setUser(null)
    setCustomer(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        loading,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        refreshCustomer,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
