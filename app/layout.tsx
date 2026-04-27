import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TCG Shop — Tu tienda de cartas coleccionables",
  description: "Compra cartas de Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Lorcana y One Piece en Ecuador.",
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
