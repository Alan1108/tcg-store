import { HeroBanner, GameSystemGrid, FeaturedCarousel } from '@/components/organisms';
import { TrustBadge } from '@/components/atoms';
import type { SealedProduct } from '@/types';

const placeholderProducts: SealedProduct[] = [
  { id: '1', name: 'Booster Box Scarlet & Violet 151', setName: 'Scarlet & Violet', game: 'pokemon', price: 89990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '2', name: 'Draft Booster Box Murders at Karlov Manor', setName: 'Murders at Karlov Manor', game: 'mtg', price: 119990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '3', name: 'Booster Box Age of Overlord', setName: 'Age of Overlord', game: 'yugioh', price: 74990, imageUrl: '', stock: 'low_stock', category: 'booster_box' },
  { id: '4', name: 'Booster Box Azurada', setName: 'Azurada', game: 'lorcana', price: 94990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8 md:pb-12">
      <div className="px-4 md:px-0 max-w-[1280px] mx-auto w-full">
        <HeroBanner />
      </div>
      <div className="px-4 md:px-0 max-w-[1280px] mx-auto w-full">
        <GameSystemGrid />
      </div>
      <div className="px-4 md:px-0 max-w-[1280px] mx-auto w-full">
        <FeaturedCarousel products={placeholderProducts} />
      </div>
      <div className="flex items-center justify-around px-4 max-w-[1280px] mx-auto w-full">
        <TrustBadge icon="ShieldCheck" label="Pago seguro" />
        <TrustBadge icon="Truck" label="Envío nacional" />
        <TrustBadge icon="RotateCcw" label="Devoluciones" />
        <TrustBadge icon="Headphones" label="Soporte 24/7" />
      </div>
    </div>
  );
}
