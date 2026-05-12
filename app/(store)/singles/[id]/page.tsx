import { Suspense } from 'react';
import { SinglesDetailContent } from './singles-detail-content';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SinglesDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense>
      <SinglesDetailContent id={id} />
    </Suspense>
  );
}
