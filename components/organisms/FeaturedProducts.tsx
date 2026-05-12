'use client';

import { useState, useEffect } from 'react';
import { FeaturedCarousel } from './FeaturedCarousel';
import { getFeaturedProducts } from '@/services/products.service';
import type { HttpTypes } from '@medusajs/types';

export function FeaturedProducts() {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);

  useEffect(() => {
    getFeaturedProducts(8).then(setProducts).catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return <FeaturedCarousel products={products} />;
}
