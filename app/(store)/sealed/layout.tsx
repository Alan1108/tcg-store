import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobres y cajas TCG en Ecuador",
  description:
    "Compra sobres, booster boxes y productos sellados de Pokemon y One Piece en Ecuador. Envíos a Quito, Guayaquil y Cuenca.",
  alternates: {
    canonical: "/sealed",
  },
};

export default function SealedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
