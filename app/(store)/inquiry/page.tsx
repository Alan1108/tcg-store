import { SinglesInquiryForm } from '@/components/organisms';
import { Divider, ButtonWhatsApp } from '@/components/atoms';
import { Send, MessageSquare, CheckCircle, Phone, MessageCircle } from 'lucide-react';

const steps = [
  { num: 1, icon: Send, text: 'Envía tu consulta con las cartas que buscas' },
  { num: 2, icon: MessageSquare, text: 'Te contactamos para confirmar disponibilidad' },
  { num: 3, icon: CheckCircle, text: 'Confirmamos precio y condición' },
  { num: 4, icon: Phone, text: 'Realizas tu compra de forma segura' },
];

export default function InquiryPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
      <SinglesInquiryForm />
      <Divider />
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
        <h3 className="text-base font-bold text-[var(--text-primary)]">¿Cómo funciona?</h3>
        <div className="flex flex-col gap-3">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent-primary)] text-white text-sm font-bold flex-shrink-0">
                {s.num}
              </div>
              <p className="text-sm text-[var(--text-secondary)] pt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 flex flex-col items-center gap-3">
        <MessageCircle className="w-8 h-8 text-[var(--whatsapp)]" />
        <h3 className="text-base font-bold text-[var(--text-primary)]">Contacto directo</h3>
        <p className="text-sm text-[var(--text-secondary)] text-center">¿Prefieres contactarnos directamente?</p>
        <ButtonWhatsApp label="Escribir por WhatsApp" />
      </div>
    </div>
  );
}
