import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kādo Gallery",
    short_name: "Kādo",
    description: "Tienda online de cartas Pokemon y One Piece en Ecuador.",
    start_url: "/",
    display: "standalone",
    background_color: "#08051c",
    theme_color: "#08051c",
    lang: "es-EC",
    icons: [
      {
        src: "/logo-principal-celeste.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-principal-celeste.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
