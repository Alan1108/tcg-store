import type { Metadata } from 'next';
import { Cookie } from 'lucide-react';
import { LegalLayout, type LegalSection } from '@/components/molecules/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Cookies – Kādo Gallery',
  description: 'Información sobre el uso de cookies en el sitio web de Kādo Gallery y cómo administrarlas.',
  alternates: { canonical: '/legal/politica-de-cookies' },
};

const sections: LegalSection[] = [
  {
    title: '¿Qué son las Cookies?',
    body: [
      { type: 'p', text: 'Las cookies son pequeños archivos almacenados en el dispositivo del usuario cuando visita un sitio web.' },
      { type: 'p', text: 'Estas permiten mejorar la experiencia de navegación, recordar ciertas preferencias y analizar el comportamiento de uso para optimizar nuestros servicios.' },
    ],
  },
  {
    title: 'Tipos de Cookies que Utilizamos',
    body: [
      { type: 'h3', text: 'Cookies Esenciales' },
      { type: 'p', text: 'Necesarias para el funcionamiento básico del sitio web, incluyendo:' },
      {
        type: 'ul',
        items: [
          'Inicio de sesión y autenticación',
          'Carrito de compras',
          'Procesamiento de pagos',
        ],
      },
      { type: 'h3', text: 'Cookies de Rendimiento' },
      { type: 'p', text: 'Nos ayudan a analizar cómo los usuarios utilizan el sitio para mejorar el funcionamiento y rendimiento general de la plataforma.' },
      { type: 'h3', text: 'Cookies de Funcionalidad' },
      { type: 'p', text: 'Permiten recordar configuraciones y preferencias del usuario entre sesiones, como idioma o región seleccionada.' },
      { type: 'h3', text: 'Cookies de Publicidad' },
      { type: 'p', text: 'Pueden utilizarse para mostrar contenido promocional relevante o campañas de marketing adaptadas a tus intereses.' },
    ],
  },
  {
    title: 'Administración de Cookies',
    body: [
      { type: 'p', text: 'Tienes control total sobre las cookies almacenadas en tu dispositivo. Puedes:' },
      {
        type: 'ul',
        items: [
          'Aceptar o rechazar cookies al visitar el sitio',
          'Eliminar cookies almacenadas en cualquier momento',
          'Configurar restricciones desde la configuración de tu navegador',
        ],
      },
      { type: 'p', text: 'Ten en cuenta que la desactivación de ciertas cookies puede afectar algunas funcionalidades del sitio, como el carrito de compras o el inicio de sesión.' },
    ],
  },
  {
    title: 'Cookies de Terceros',
    body: [
      { type: 'p', text: 'Algunos servicios externos utilizados por Kādo Gallery, como plataformas de pago o herramientas de análisis web, pueden utilizar sus propias cookies.' },
      { type: 'p', text: 'Estas cookies están sujetas a las políticas de privacidad de cada proveedor externo, sobre las cuales Kādo Gallery no tiene control directo.' },
    ],
  },
  {
    title: 'Cambios en esta Política',
    body: [
      { type: 'p', text: 'Kādo Gallery podrá modificar esta Política de Cookies en cualquier momento para adaptarse a cambios legales o técnicos.' },
      { type: 'p', text: 'Te recomendamos revisar esta página periódicamente para mantenerte informado sobre cómo utilizamos las cookies.' },
    ],
  },
  {
    title: 'Contacto',
    body: [
      { type: 'p', text: 'Si tienes dudas sobre nuestra Política de Cookies o sobre las cookies específicas que utilizamos, puedes comunicarte mediante nuestros canales oficiales.' },
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      lastUpdated="Mayo 2026"
      intro="Las cookies son pequeños archivos que almacenamos en tu dispositivo para mejorar tu experiencia de navegación. Aquí te explicamos qué cookies usamos y cómo puedes administrarlas."
      sections={sections}
      icon={<Cookie className="w-14 h-14 text-accent-primary" strokeWidth={1.5} />}
    />
  );
}
