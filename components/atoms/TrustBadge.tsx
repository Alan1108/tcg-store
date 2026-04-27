import { ShieldCheck } from 'lucide-react';
import * as icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  icon?: string;
  label: string;
}

export function TrustBadge({ icon = 'ShieldCheck', label }: TrustBadgeProps) {
  const IconComp = ((icons as unknown as Record<string, LucideIcon>)[icon] || ShieldCheck);
  return (
    <div className="flex flex-col items-center gap-1.5 py-3 px-4">
      <IconComp className="w-6 h-6 text-[var(--success)]" />
      <span className="text-[10px] font-medium text-[var(--text-secondary)] text-center">{label}</span>
    </div>
  );
}
