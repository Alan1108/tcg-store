import type { Metadata } from "next";
import "./globals.css";
import { seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: "Kādo Gallery | Tienda de cartas TCG en Ecuador",
    template: "%s | Kādo Gallery",
  },
  description:
    "Kādo Gallery es tu tienda online de cartas TCG en Ecuador. Compra Pokémon y One Piece con envíos a Quito, Guayaquil y Cuenca.",
  keywords: [...seoConfig.primaryKeywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: seoConfig.siteUrl,
    siteName: "Kādo Gallery",
    title: "Kādo Gallery | Tienda de cartas TCG en Ecuador",
    description:
      "Compra cartas Pokémon y One Piece en Ecuador con envíos nacionales por Servientrega y pagos seguros.",
    images: [
      {
        url: "/logo-principal-fondo-celeste.png",
        width: 1200,
        height: 630,
        alt: "Kādo Gallery - Tienda de cartas TCG en Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kādo Gallery | Tienda de cartas TCG en Ecuador",
    description:
      "Encuentra cartas Pokémon y One Piece en Ecuador. Envíos a Quito, Guayaquil y Cuenca.",
    images: ["/logo-principal-fondo-celeste.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo-principal-celeste.png", type: "image/png" }],
    apple: [
      { url: "/logo-principal-celeste.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
