'use client';

import { useState } from 'react';
import { InputText, InputTextarea, ButtonPrimary } from '@/components/atoms';
import { submitInquiry } from '@/services/inquiries.service';

interface InlineInquiryFormProps {
  productId?: string;
}

export function InlineInquiryForm({ productId }: InlineInquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !cards) return;
    setSubmitting(true);
    try {
      await submitInquiry({
        customer_name: name,
        email,
        cards_description: cards,
        product_id: productId,
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="px-4 pb-4 text-sm text-[var(--success)]">¡Consulta enviada! Te contactaremos pronto.</div>
    );
  }

  return (
    <div className="px-4 flex flex-col gap-3.5 pb-4">
      <InputText label="Nombre" placeholder="Tu nombre" value={name} onChange={setName} />
      <InputText label="Email" type="email" placeholder="tu@email.com" value={email} onChange={setEmail} />
      <InputTextarea label="Cartas que buscas" placeholder="Describe las cartas..." value={cards} onChange={setCards} />
      <ButtonPrimary
        label={submitting ? 'Enviando...' : 'Enviar consulta'}
        icon="Send"
        fullWidth
        onClick={handleSubmit}
      />
    </div>
  );
}
