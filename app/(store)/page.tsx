import type { Metadata } from "next";
import Image from 'next/image';
import { HeroBanner, GameSystemGrid, FeaturedProducts } from '@/components/organisms';
import { seoConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Tienda de cartas Pokémon y One Piece en Ecuador",
  description:
    "Compra cartas Pokémon y One Piece en Ecuador con envíos a Quito, Guayaquil y Cuenca. Pagos con DeUna, tarjetas y transferencia bancaria.",
  alternates: {
    canonical: "/",
  },
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="px-4 md:px-0 max-w-[1280px] mx-auto w-full">
        <HeroBanner />
      </div>
      <div className="px-4 md:px-0 max-w-[1280px] mx-auto w-full">
        <GameSystemGrid />
      </div>
      <div className="px-4 md:px-0 max-w-[1280px] mx-auto w-full">
        <FeaturedProducts />
      </div>
      <section className="px-4 md:px-0 max-w-[1280px] mx-auto w-full overflow-hidden">
        {/* Header row */}
        <div className="bg-linear-to-r from-(--accent-primary)/5 to-bg-surface border-b border-border px-6 md:px-8 py-5 rounded-t-2xl">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
            Tienda de cartas TCG en Ecuador:{' '}
            <span className="text-accent-primary">Pokémon y One Piece</span>
          </h1>
        </div>

        {/* Two-column body */}
        <div className="bg-bg-surface grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border rounded-b-2xl">

          {/* Left: Brand pitch */}
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <p className="text-sm leading-7 text-text-secondary md:text-base">
              En Kādo Gallery ayudamos a la comunidad TCG de Ecuador a encontrar cartas originales de Pokémon y
              One Piece en un solo lugar. Si buscas una tienda de cartas en Quito, Guayaquil o Cuenca, te ofrecemos
              catálogo actualizado, pagos seguros y envíos nacionales con Servientrega.
            </p>
            <p className="text-sm leading-7 text-text-secondary md:text-base">
              Nuestro enfoque es ofrecer productos auténticos, buena comunicación y una experiencia de compra
              clara para coleccionistas y jugadores competitivos.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Quito', 'Guayaquil', 'Cuenca', 'Todo Ecuador'].map((city) => (
                <span
                  key={city}
                  className="px-3 py-1 rounded-full bg-(--accent-primary)/10 text-accent-primary text-xs font-semibold border border-border-accent"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Shipping & payment */}
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-text-primary">
              Donde comprar cartas Pokémon y One Piece en Ecuador
            </h2>
            <p className="text-sm leading-7 text-text-secondary md:text-base">
              Realizamos envíos a todo el país y priorizamos atención para Quito, Guayaquil y Cuenca. Si estabas
              buscando dónde comprar cartas Pokémon en Ecuador o cartas de One Piece con despacho confiable,
              en Kādo Gallery encontrarás opciones para empezar o mejorar tu colección.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              {[
                { src: '/Deuna!_icono.png', label: 'DeUna', title: 'DeUna' },
                { src: '/tarjeta-de-debito.png', label: 'Tarjetas', title: 'Tarjeta de crédito y débito' },
                { src: '/banco.png', label: 'Transferencia', title: 'Transferencia bancaria' },
              ].map(({ src, label, title }) => (
                <div
                  key={label}
                  title={title}
                  className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl bg-bg-elevated border border-border min-w-[72px]"
                >
                  <div className="relative w-8 h-8">
                    <Image src={src} alt={label} fill className="object-contain" sizes="32px" />
                  </div>
                  <span className="text-[11px] font-medium text-text-secondary leading-none">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
