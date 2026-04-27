import type { CardRarity } from '@/types';

const config: Record<CardRarity, { color: string }> = {
  Common: { color: 'var(--rarity-common)' },
  Uncommon: { color: 'var(--rarity-uncommon)' },
  Rare: { color: 'var(--rarity-rare)' },
  Holo: { color: 'var(--rarity-holo)' },
  'Ultra Rare': { color: 'var(--rarity-ultra)' },
  Secret: { color: 'var(--rarity-secret)' },
};

export function BadgeRarity({ rarity }: { rarity: CardRarity }) {
  const { color } = config[rarity];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold" style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, color }}>
      {rarity}
    </span>
  );
}
