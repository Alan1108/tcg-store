'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useAuth } from './auth'

const LOCAL_KEY = 'wishlist_items'

export interface WishlistItem {
  productId: string
  variantId: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (productId: string, variantId: string) => Promise<void>
  removeItem: (productId: string, variantId: string) => Promise<void>
  isInWishlist: (productId: string, variantId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

function loadLocal(): WishlistItem[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveLocal(items: WishlistItem[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items))
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [items, setItems] = useState<WishlistItem[]>([])
  // Stable client reference — avoids stale closure in the effect
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  useEffect(() => {
    if (!userId) {
      setItems(loadLocal())
      return
    }

    const sync = async () => {
      // Merge any local guest items into Supabase first
      const localItems = loadLocal()
      if (localItems.length > 0) {
        const { error: upsertError } = await supabase.from('wishlists').upsert(
          localItems.map((i) => ({
            user_id: userId,
            product_id: i.productId,
            variant_id: i.variantId,
          })),
          { onConflict: 'user_id,product_id,variant_id', ignoreDuplicates: true }
        )
        if (!upsertError) localStorage.removeItem(LOCAL_KEY)
      }

      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id, variant_id')
        .eq('user_id', userId)

      if (!error && data) {
        setItems(data.map((r) => ({ productId: r.product_id, variantId: r.variant_id })))
      }
    }

    sync()
  }, [userId, supabase])

  const addItem = async (productId: string, variantId: string) => {
    if (userId) {
      await supabase.from('wishlists').insert({
        user_id: userId,
        product_id: productId,
        variant_id: variantId,
      })
    } else {
      const updated = [...items, { productId, variantId }]
      saveLocal(updated)
    }
    setItems((prev) => [...prev, { productId, variantId }])
  }

  const removeItem = async (productId: string, variantId: string) => {
    if (userId) {
      await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId)
        .eq('variant_id', variantId)
    } else {
      const updated = items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      )
      saveLocal(updated)
    }
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    )
  }

  const isInWishlist = (productId: string, variantId: string) =>
    items.some((i) => i.productId === productId && i.variantId === variantId)

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
