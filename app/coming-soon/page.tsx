import type { Metadata } from "next";
import Image from "next/image";

import { ComingSoonCardRain } from "@/components/molecules/ComingSoonCardRain";

export const metadata: Metadata = {
  title: "Próximamente — Kādo Gallery",
  description: "Estamos preparando algo nuevo. Vuelve pronto.",
};

export default function ComingSoonPage() {
  return (
    <main className="coming-soon-page flex flex-1 flex-col items-center justify-center px-6 py-16">
      <ComingSoonCardRain />
      <div className="coming-soon-inner flex w-full max-w-lg flex-col items-center text-center">
        <div className="coming-soon-logo-shell mb-10 w-full max-w-md px-2">
          <Image
            src="/logo-principal-celeste.png"
            alt="Kāgo Gallery"
            width={720}
            height={400}
            priority
            className="coming-soon-logo-img relative z-1 h-auto w-full select-none"
          />
        </div>

        <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-white/6 px-8 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#fdf5e6] md:text-4xl">
            Próximamente
          </h1>
          <p className="text-base leading-relaxed text-[#c8d4e8]">
            Estamos terminando los últimos detalles.<br/>
            Muy pronto podrás explorar todo lo que tenemos para ti<br/>
            Pokemon, One Piece y mas!
          </p>
        </div>
      </div>
    </main>
  );
}
