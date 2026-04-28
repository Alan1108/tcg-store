import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singles TCG en Ecuador",
  description:
    "Encuentra cartas individuales de Pokemon y One Piece en Ecuador. Consulta disponibilidad y compra con envíos nacionales.",
  alternates: {
    canonical: "/singles",
  },
};

export default function SinglesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
