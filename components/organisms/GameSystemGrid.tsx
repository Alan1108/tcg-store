import Image from 'next/image';
import Link from 'next/link';

const games = [
  {
    key: 'pokemon',
    name: 'Pokémon',
    color: '#F5D623',
    textColor: '#a08000',
    logo: '/pokemon-logo.png',
    logoAlt: 'Pokémon logo',
  },
  {
    key: 'onepiece',
    name: 'One Piece',
    color: '#E94560',
    textColor: '#E94560',
    logo: '/op-logo.png',
    logoAlt: 'One Piece logo',
  },
];

export function GameSystemGrid() {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {games.map(({ key, name, color, textColor, logo, logoAlt }) => (
        <Link
          key={key}
          href={`/sealed?game=${key}`}
          className="flex-1 min-w-[200px] h-[180px] relative flex flex-col justify-end gap-2 p-5 rounded-xl border bg-bg-surface overflow-hidden cursor-pointer group"
          style={{ borderColor: `${color}60` }}
        >
          {/* Logo — multiply blend removes white background against white card */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 w-[130px] h-[130px] transition-transform duration-300 ease-out group-hover:scale-125"
            style={{ mixBlendMode: 'multiply' }}
          >
            <Image
              src={logo}
              alt={logoAlt}
              fill
              className="object-contain"
              sizes="130px"
            />
          </div>

          <span className="font-heading text-xl font-bold text-text-primary relative z-10">
            {name}
          </span>
          <span className="text-[13px] font-semibold relative z-10" style={{ color: textColor }}>
            Ver catálogo →
          </span>
        </Link>
      ))}
    </div>
  );
}
