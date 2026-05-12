import { Suspense } from 'react';
import { SealedCatalogContent } from './sealed-catalog-content';

export default function SealedCatalogPage() {
  return (
    <Suspense>
      <SealedCatalogContent />
    </Suspense>
  );
}
