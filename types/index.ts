import type { HttpTypes } from "@medusajs/types"

// Medusa native types — used throughout the storefront
export type Product = HttpTypes.StoreProduct
export type ProductVariant = HttpTypes.StoreProductVariant
export type Cart = HttpTypes.StoreCart
export type LineItem = HttpTypes.StoreCartLineItem
export type Customer = HttpTypes.StoreCustomer
export type Order = HttpTypes.StoreOrder
export type Region = HttpTypes.StoreRegion
export type ProductCategory = HttpTypes.StoreProductCategory

// TCG-specific metadata types (values stored in product.metadata)
export type GameSystem = "pokemon" | "mtg" | "yugioh" | "lorcana" | "onepiece"
export type CardCondition = "NM" | "LP" | "MP" | "HP" | "DMG"
export type CardRarity = "Common" | "Uncommon" | "Rare" | "Holo" | "Ultra Rare" | "Secret"
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock"

// Product type discriminator (stored as product.type.value)
export type ProductType = "sealed" | "single"

// Custom Inquiry model (from the Medusa inquiry module)
export type InquiryStatus = "new" | "contacted" | "sold" | "closed" | "unavailable"
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface Inquiry {
  id: string
  customer_name: string
  email: string
  whatsapp?: string
  cards_description: string
  message?: string
  prefer_whatsapp: boolean
  status: InquiryStatus
  product_id?: string
  created_at: string
  updated_at: string
}
