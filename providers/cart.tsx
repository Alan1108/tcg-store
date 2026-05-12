"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { Cart } from "@/types"
import { sdk } from "@/lib/sdk"
import { useRegion } from "./region"

type CartContextType = {
  cart: Cart | undefined
  addToCart: (variantId: string, quantity?: number) => Promise<Cart>
  updateItemQuantity: (lineItemId: string, quantity: number) => Promise<Cart>
  removeItem: (lineItemId: string) => Promise<Cart>
  refreshCart: () => Promise<Cart | undefined>
  unsetCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | undefined>()
  const { region } = useRegion()

  useEffect(() => {
    if (!region?.id) return
    if (cart?.id) {
      localStorage.setItem("cart_id", cart.id)
      return
    }
    const cartId = localStorage.getItem("cart_id")
    if (!cartId) return
    sdk.store.cart
      .retrieve(cartId, {
        fields: "+items.variant.*,+items.variant.options.*",
      })
      .then(({ cart: dataCart }) => setCart(dataCart))
      .catch(() => localStorage.removeItem("cart_id"))
  }, [cart?.id, region?.id])

  useEffect(() => {
    if (!cart?.id || !region?.id || cart.region_id === region.id) return
    sdk.store.cart
      .update(cart.id, { region_id: region.id })
      .then(({ cart: dataCart }) => setCart(dataCart))
      .catch(() => {})
  }, [region?.id, cart?.id])

  const refreshCart = async () => {
    if (!region) return
    const { cart: dataCart } = await sdk.store.cart.create({ region_id: region.id })
    localStorage.setItem("cart_id", dataCart.id)
    setCart(dataCart)
    return dataCart
  }

  const addToCart = async (variantId: string, quantity = 1): Promise<Cart> => {
    let currentCart = cart
    if (!currentCart) {
      currentCart = await refreshCart()
    }
    if (!currentCart) throw new Error("Could not create cart")
    const { cart: dataCart } = await sdk.store.cart.createLineItem(currentCart.id, {
      variant_id: variantId,
      quantity,
    })
    setCart(dataCart)
    return dataCart
  }

  const updateItemQuantity = async (lineItemId: string, quantity: number): Promise<Cart> => {
    if (!cart) throw new Error("No active cart")
    const { cart: dataCart } = await sdk.store.cart.updateLineItem(cart.id, lineItemId, { quantity })
    setCart(dataCart)
    return dataCart
  }

  const removeItem = async (lineItemId: string): Promise<Cart> => {
    if (!cart) throw new Error("No active cart")
    const { parent } = await sdk.store.cart.deleteLineItem(cart.id, lineItemId)
    if (parent) {
      setCart(parent as Cart)
      return parent as Cart
    }
    const { cart: dataCart } = await sdk.store.cart.retrieve(cart.id, {
      fields: "+items.variant.*,+items.variant.options.*",
    })
    setCart(dataCart)
    return dataCart
  }

  const unsetCart = () => {
    localStorage.removeItem("cart_id")
    setCart(undefined)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateItemQuantity, removeItem, refreshCart, unsetCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
