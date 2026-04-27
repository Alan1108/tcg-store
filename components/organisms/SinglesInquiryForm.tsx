'use client';

import { useState } from 'react';
import { Send, CircleCheck, MessageCircle } from 'lucide-react';

interface SinglesInquiryFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  cards: string;
  preferWhatsApp: boolean;
  message: string;
}

export function SinglesInquiryForm({ onSubmit }: SinglesInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', whatsapp: '', cards: '', preferWhatsApp: true, message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!form.name) newErrors.name = 'Este campo es requerido';
    if (!form.email) newErrors.email = 'Este campo es requerido';
    if (!form.cards) newErrors.cards = 'Este campo es requerido';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setErrors({});
    onSubmit?.(form);
    setSubmitted(true);
  };

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#22C55E33]">
          <CircleCheck className="w-6 h-6 text-[var(--success)]" />
        </div>
        <span className="text-lg font-bold text-[var(--text-primary)]">¡Consulta enviada!</span>
        <span className="text-[13px] text-[var(--text-secondary)]">Te contactaremos pronto por WhatsApp</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[var(--bg-base)] p-6 rounded-xl">
      <div className="flex flex-col gap-1">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
          Consulta de Singles
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)]">Completa el formulario y te contactaremos</p>
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Nombre" required error={errors.name}>
          <input value={form.name} onChange={(e) => update('name', e.target.value)}
            className={`h-[42px] rounded-lg bg-[var(--bg-elevated)] border ${errors.name ? 'border-[var(--danger)]' : 'border-[var(--border)]'} px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full`}
            placeholder="Nombre completo" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
            className={`h-[42px] rounded-lg bg-[var(--bg-elevated)] border ${errors.email ? 'border-[var(--danger)]' : 'border-[var(--border)]'} px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full`}
            placeholder="tu@email.com" />
        </Field>
        <Field label="WhatsApp">
          <input value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)}
            className="h-[42px] rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full"
            placeholder="+593 ..." />
        </Field>
        <Field label="Cartas que buscas" required error={errors.cards}>
          <textarea value={form.cards} onChange={(e) => update('cards', e.target.value)}
            className={`h-[100px] rounded-lg bg-[var(--bg-elevated)] border ${errors.cards ? 'border-[var(--danger)]' : 'border-[var(--border)]'} p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full resize-none`}
            placeholder="Describe las cartas que buscas..." />
        </Field>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--text-primary)]">Prefiero contacto por WhatsApp</span>
          <button type="button" onClick={() => update('preferWhatsApp', !form.preferWhatsApp)}
            className={`relative w-11 h-6 rounded-full transition-colors ${form.preferWhatsApp ? 'bg-[var(--accent-primary)]' : 'bg-[var(--text-muted)]'}`}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.preferWhatsApp ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>
        <Field label="Mensaje adicional">
          <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={3}
            className="h-[72px] rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full resize-none"
            placeholder="Información adicional..." />
        </Field>
      </div>

      <button type="submit" className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors">
        <Send className="w-[18px] h-[18px] text-white" />
        <span className="text-[15px] font-bold text-white">Enviar consulta</span>
      </button>

      <div className="h-px bg-[var(--border)]" />

      <a href="#" className="flex items-center justify-center gap-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] py-3 px-3.5">
        <MessageCircle className="w-4 h-4 text-[var(--whatsapp)]" />
        <span className="text-xs text-[var(--whatsapp)]">¿Problemas? Escríbenos directo por WhatsApp</span>
      </a>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-[var(--text-primary)]">
        {label}{required && <span className="text-[var(--danger)]"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
}
