import { TriangleAlert } from 'lucide-react';

interface TagDisclaimerProps {
  text?: string;
  size?: 'sm' | 'md';
}

export function TagDisclaimer({ text = 'Precio referencial, sujeto a disponibilidad', size = 'md' }: TagDisclaimerProps) {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3 h-3';
  const textSize = size === 'sm' ? 'text-[8px]' : 'text-[10px]';
  return (
    <div className="inline-flex items-center gap-1 rounded-md px-2 py-1 bg-[#F59E0B18]">
      <TriangleAlert className={`${iconSize} text-[var(--warning)] flex-shrink-0`} />
      <span className={`${textSize} font-medium text-[var(--warning)] leading-[1.3]`}>{text}</span>
    </div>
  );
}
