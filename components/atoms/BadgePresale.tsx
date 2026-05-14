import { Clock } from 'lucide-react';

interface BadgePresaleProps {
  launchDate?: string;
}

export function BadgePresale({ launchDate }: BadgePresaleProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-[#F97316] text-white">
      <Clock className="w-3 h-3 shrink-0" />
      {launchDate ? `Preventa · ${launchDate}` : 'Preventa'}
    </span>
  );
}
