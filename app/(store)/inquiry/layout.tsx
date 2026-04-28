import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consulta de cartas TCG en Ecuador",
  description:
    "Envíanos la lista de cartas Pokemon y One Piece que buscas. Te confirmamos disponibilidad, condición y precio final en Ecuador.",
  alternates: {
    canonical: "/inquiry",
  },
};

export default function InquiryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
