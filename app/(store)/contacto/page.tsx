import type { Metadata } from 'next';
import { WhatsAppContact } from '@/components/molecules/WhatsAppContact';

export const metadata: Metadata = {
  title: 'Contacto WhatsApp – Kādo Gallery',
  description: 'Contáctanos por WhatsApp para consultas sobre pedidos, productos y envíos en Kādo Gallery.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  return <WhatsAppContact />;
}
