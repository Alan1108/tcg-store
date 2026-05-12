import { cache } from "react"
import type { HttpTypes } from "@medusajs/types"
import { sdk } from "@/lib/sdk"

const SEALED_TYPE_ID = process.env.NEXT_PUBLIC_SEALED_TYPE_ID
const SINGLE_TYPE_ID = process.env.NEXT_PUBLIC_SINGLE_TYPE_ID

export interface ProductFilters {
  search?: string
  category?: string
  page?: number
  limit?: number
  regionId?: string
  tagValue?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

// Fields to request for calculated pricing and inventory
const PRODUCT_FIELDS =
  "*variants.calculated_price,+variants.inventory_quantity,+variants.manage_inventory,+variants.allow_backorder,+variants.options,+variants.options.option,+type,+categories,+images,+tags,+metadata,+variants.metadata,+collection,+description"

export const getSealedProducts = cache(async function getSealedProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<HttpTypes.StoreProduct>> {
  const { page = 1, limit = 20, search, regionId, tagValue } = filters

  // When filtering by tag we fetch a capped batch and filter in-memory,
  // because the store API only supports tag_id[] (not tag value strings).
  const fetchLimit = tagValue ? Math.min(limit * 3, 60) : limit
  const offset = tagValue ? 0 : (page - 1) * limit

  const { products, count } = await sdk.store.product.list({
    q: search,
    limit: fetchLimit,
    offset,
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
    ...(SEALED_TYPE_ID ? { type_id: [SEALED_TYPE_ID] } : {}),
  } as Parameters<typeof sdk.store.product.list>[0])

  let sealed = SEALED_TYPE_ID ? products : products.filter((p) => p.type?.value === "sealed")

  if (tagValue) {
    sealed = sealed.filter((p) =>
      p.tags?.some((t) => t.value === tagValue)
    )
  }

  const total = tagValue ? sealed.length : (count ?? sealed.length)
  const paginated = tagValue ? sealed.slice((page - 1) * limit, page * limit) : sealed

  return {
    data: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
})

export const getSealedProductById = cache(async function getSealedProductById(
  id: string,
  regionId?: string
): Promise<HttpTypes.StoreProduct | null> {
  const { product } = await sdk.store.product.retrieve(id, {
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.retrieve>[1])
  return product ?? null
})

export const getSingleCards = cache(async function getSingleCards(
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
    ...(SINGLE_TYPE_ID ? { type_id: [SINGLE_TYPE_ID] } : {}),
  } as Parameters<typeof sdk.store.product.list>[0])

  const singles = SINGLE_TYPE_ID ? products : products.filter((p) => p.type?.value === "single")
  return {
    data: singles,
    total: count ?? singles.length,
    page,
    totalPages: Math.ceil((count ?? singles.length) / limit),
  }
})

export const getSingleCardById = cache(async function getSingleCardById(
  id: string,
  regionId?: string
): Promise<HttpTypes.StoreProduct | null> {
  const { product } = await sdk.store.product.retrieve(id, {
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.retrieve>[1])
  return product ?? null
})

export const getFeaturedProducts = cache(async function getFeaturedProducts(
  limit = 8,
  regionId?: string
): Promise<HttpTypes.StoreProduct[]> {
  const { products } = await sdk.store.product.list({
    limit,
    fields: PRODUCT_FIELDS,
    ...(regionId && { region_id: regionId }),
    ...(SEALED_TYPE_ID ? { type_id: [SEALED_TYPE_ID] } : {}),
  } as Parameters<typeof sdk.store.product.list>[0])
  return SEALED_TYPE_ID ? products : products.filter((p) => p.type?.value === "sealed")
})

export const getProductsByIds = cache(async function getProductsByIds(
  ids: string[],
  regionId?: string
): Promise<HttpTypes.StoreProduct[]> {
  if (ids.length === 0) return []
  const { products } = await sdk.store.product.list({
    id: ids,
    fields: PRODUCT_FIELDS,
    limit: ids.length,
    ...(regionId && { region_id: regionId }),
  } as Parameters<typeof sdk.store.product.list>[0])
  return products
})

export const searchProducts = cache(async function searchProducts(
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
})
