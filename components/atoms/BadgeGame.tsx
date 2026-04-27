import type { GameSystem } from '@/types';

const config: Record<GameSystem, { label: string; color: string }> = {
  pokemon: { label: 'Pokémon', color: '#F5D623' },
  mtg: { label: 'Magic', color: '#C8A84E' },
  yugioh: { label: 'Yu-Gi-Oh!', color: '#9B59B6' },
  lorcana: { label: 'Lorcana', color: '#2DD4BF' },
  onepiece: { label: 'One Piece', color: '#E94560' },
};

export function BadgeGame({ game }: { game: GameSystem }) {
  const { label, color } = config[game];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold text-[var(--bg-base)]" style={{ backgroundColor: color }}>
      {label}
    </span>
  );
}
