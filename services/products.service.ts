import type { SealedProduct, SingleCard, GameSystem, CardCondition, CardRarity } from '@/types';

export interface ProductFilters {
  game?: GameSystem;
  search?: string;
  category?: string;
  condition?: CardCondition;
  rarity?: CardRarity;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getSealedProducts(_filters?: ProductFilters): Promise<PaginatedResponse<SealedProduct>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function getSealedProductById(_id: string): Promise<SealedProduct | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getRelatedSealedProducts(_productId: string, _limit?: number): Promise<SealedProduct[]> {
  // TODO: Connect to backend API
  return [];
}

export async function getSingleCards(_filters?: ProductFilters): Promise<PaginatedResponse<SingleCard>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function getSingleCardById(_id: string): Promise<SingleCard | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getRelatedSingleCards(_cardId: string, _limit?: number): Promise<SingleCard[]> {
  // TODO: Connect to backend API
  return [];
}

export async function getOtherConditions(_cardId: string): Promise<SingleCard[]> {
  // TODO: Connect to backend API
  return [];
}

export async function getSameSetCards(_cardId: string, _limit?: number): Promise<SingleCard[]> {
  // TODO: Connect to backend API
  return [];
}

export async function getFeaturedProducts(_limit?: number): Promise<SealedProduct[]> {
  // TODO: Connect to backend API
  return [];
}

export async function searchProducts(_query: string): Promise<{ sealed: SealedProduct[]; singles: SingleCard[] }> {
  // TODO: Connect to backend API
  return { sealed: [], singles: [] };
}
