'use client';

import { MessageCircle } from 'lucide-react';

interface ButtonWhatsAppProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function ButtonWhatsApp({ label = 'Contactar por WhatsApp', onClick, className = '', fullWidth }: ButtonWhatsAppProps) {
  return (
    <button onClick={onClick}
      className={`flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[var(--whatsapp)] hover:opacity-90 transition-colors ${fullWidth ? 'w-full' : ''} ${className}`}>
      <MessageCircle className="w-[18px] h-[18px] text-white" />
      <span className="text-sm font-semibold text-white">{label}</span>
    </button>
  );
}
