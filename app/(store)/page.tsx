import type { Metadata } from "next";
import { HeroBanner, GameSystemGrid, FeaturedCarousel } from '@/components/organisms';
import { TrustBadge } from '@/components/atoms';
import type { SealedProduct } from '@/types';
import { seoConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Tienda de cartas Pokémon y One Piece en Ecuador",
  description:
    "Compra cartas Pokémon y One Piece en Ecuador con envíos a Quito, Guayaquil y Cuenca. Pagos con DeUna, tarjetas y transferencia bancaria.",
  alternates: {
    canonical: "/",
  },
};

const placeholderProducts: SealedProduct[] = [
  { id: '1', name: 'Booster Box Scarlet & Violet 151', setName: 'Scarlet & Violet', game: 'pokemon', price: 89990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '2', name: 'Draft Booster Box Murders at Karlov Manor', setName: 'Murders at Karlov Manor', game: 'mtg', price: 119990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
  { id: '3', name: 'Booster Box Age of Overlord', setName: 'Age of Overlord', game: 'yugioh', price: 74990, imageUrl: '', stock: 'low_stock', category: 'booster_box' },
  { id: '4', name: 'Booster Box Azurada', setName: 'Azurada', game: 'lorcana', price: 94990, imageUrl: '', stock: 'in_stock', category: 'booster_box' },
];

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: seoConfig.brandName,
        url: seoConfig.siteUrl,
        logo: `${seoConfig.siteUrl}/logo-principal-celeste.png`,
        sameAs: [],
      },
      {
        '@type': 'OnlineStore',
        name: seoConfig.brandName,
        url: seoConfig.siteUrl,
        areaServed: seoConfig.serviceArea,
        availableLanguage: 'es',
        paymentAccepted: ['DeUna', 'Tarjeta de crédito', 'Tarjeta de débito', 'Transferencia bancaria'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Cartas TCG',
          itemListElement: [
            { '@type': 'OfferCatalog', name: 'Cartas Pokémon' },
            { '@type': 'OfferCatalog', name: 'Cartas One Piece' },
          ],
        },
      },
      {
        '@type': 'WebSite',
        name: seoConfig.brandName,
        url: seoConfig.siteUrl,
        inLanguage: 'es-EC',
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8 md:pb-12">
      <script
        type="application/ld+json"
        // JSON-LD improves eligibility for rich results in Google.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
      <section className="px-4 md:px-0 max-w-[1280px] mx-auto w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Tienda de cartas TCG en Ecuador: Pokemon y One Piece
        </h1>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          En Kādo Gallery ayudamos a la comunidad TCG de Ecuador a encontrar cartas originales de Pokemon y One Piece en un solo lugar.
          Si buscas una tienda de cartas en Quito, Guayaquil o Cuenca, te ofrecemos catálogo actualizado, pagos seguros y envíos nacionales con Servientrega.
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          Puedes comprar con DeUna, tarjeta de crédito, tarjeta de débito o transferencia bancaria. Nuestro enfoque es ofrecer productos auténticos,
          buena comunicación y una experiencia de compra clara para coleccionistas y jugadores competitivos.
        </p>
        <h2 className="mt-6 font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)]">
          Donde comprar cartas Pokemon y One Piece en Ecuador
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          Realizamos envíos a todo el país y priorizamos atención para Quito, Guayaquil y Cuenca. Si estabas buscando donde comprar cartas Pokemon
          en Ecuador o donde comprar cartas de One Piece con despacho confiable, en Kādo Gallery encontrarás opciones para empezar o mejorar tu colección.
        </p>
      </section>
    </div>
  );
}
