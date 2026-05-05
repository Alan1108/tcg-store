import type { HttpTypes } from "@medusajs/types"
import { sdk } from "@/lib/sdk"

export interface ProductFilters {
  search?: string
  category?: string
  page?: number
  limit?: number
  regionId?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

// Fields to request for calculated pricing and inventory
const PRODUCT_FIELDS =
  "*variants.calculated_price,+variants.inventory_quantity,+variants.manage_inventory,+variants.allow_backorder,+variants.options,+variants.options.option,+type,+categories,+images,+tags"

export async function getSealedProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<HttpTypes.StoreProduct>> {
  const { page = 1, limit = 20, search, regionId } = filters
  const offset = (page - 1) * limit

  const { products, count } = await sdk.store.product.list({
    q: search,
    limit,
    offset,
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.list>[0])

  const sealed = products.filter((p) => p.type?.value === "sealed")
  return {
    data: sealed,
    total: count ?? sealed.length,
    page,
    totalPages: Math.ceil((count ?? sealed.length) / limit),
  }
}

export async function getSealedProductById(
  id: string,
  regionId?: string
): Promise<HttpTypes.StoreProduct | null> {
  const { product } = await sdk.store.product.retrieve(id, {
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.retrieve>[1])
  return product ?? null
}

export async function getSingleCards(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<HttpTypes.StoreProduct>> {
  const { page = 1, limit = 20, search, regionId } = filters
  const offset = (page - 1) * limit

  const { products, count } = await sdk.store.product.list({
    q: search,
    limit,
    offset,
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.list>[0])

  const singles = products.filter((p) => p.type?.value === "single")
  return {
    data: singles,
    total: count ?? singles.length,
    page,
    totalPages: Math.ceil((count ?? singles.length) / limit),
  }
}

export async function getSingleCardById(
  id: string,
  regionId?: string
): Promise<HttpTypes.StoreProduct | null> {
  const { product } = await sdk.store.product.retrieve(id, {
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.retrieve>[1])
  return product ?? null
}

export async function getFeaturedProducts(
  limit = 8,
  regionId?: string
): Promise<HttpTypes.StoreProduct[]> {
  const { products } = await sdk.store.product.list({
    limit,
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.list>[0])
  return products.filter((p) => p.type?.value === "sealed")
}

export async function searchProducts(
  query: string,
  regionId?: string
): Promise<{ sealed: HttpTypes.StoreProduct[]; singles: HttpTypes.StoreProduct[] }> {
  const { products } = await sdk.store.product.list({
    q: query,
    limit: 40,
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.list>[0])
  return {
    sealed: products.filter((p) => p.type?.value === "sealed"),
    singles: products.filter((p) => p.type?.value === "single"),
  }
}
