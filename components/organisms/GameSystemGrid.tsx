import Link from 'next/link';
import { Zap, Swords } from 'lucide-react';

const games = [
  { key: 'pokemon', name: 'Pokémon', color: '#F5D623', Icon: Zap },
  { key: 'onepiece', name: 'One Piece', color: '#E94560', Icon: Swords },
];

export function GameSystemGrid() {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {games.map(({ key, name, color, Icon }) => (
        <Link
          key={key}
          href={`/sealed?game=${key}`}
          className="flex-1 min-w-[200px] h-[180px] flex flex-col justify-end gap-3 p-5 rounded-xl border border-[var(--border)] overflow-hidden"
          style={{
            background: `linear-gradient(to bottom, ${color}80, ${color}10), var(--bg-surface)`,
          }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
          <span className="font-heading text-xl font-bold text-text-primary">
            {name}
          </span>
          <span className="text-[13px] font-medium" style={{ color }}>
            Ver catálogo →
          </span>
        </Link>
      ))}
    </div>
  );
}
