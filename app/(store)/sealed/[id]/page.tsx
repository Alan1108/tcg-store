import { Suspense } from 'react';
import { SealedDetailContent } from './sealed-detail-content';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SealedDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense>
      <SealedDetailContent id={id} />
    </Suspense>
  );
}
