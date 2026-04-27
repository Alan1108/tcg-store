import type { CardCondition } from '@/types';

const config: Record<CardCondition, { color: string }> = {
  NM: { color: 'var(--condition-nm)' },
  LP: { color: 'var(--condition-lp)' },
  MP: { color: 'var(--condition-mp)' },
  HP: { color: 'var(--condition-hp)' },
  DMG: { color: 'var(--condition-damaged)' },
};

export function BadgeCondition({ condition }: { condition: CardCondition }) {
  const { color } = config[condition];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold" style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, color }}>
      {condition}
    </span>
  );
}
