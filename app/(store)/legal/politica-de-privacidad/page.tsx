import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { LegalLayout, type LegalSection } from '@/components/molecules/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Privacidad – Kādo Gallery',
  description: 'Conoce cómo Kādo Gallery recopila, utiliza y protege tu información personal.',
  alternates: { canonical: '/legal/politica-de-privacidad' },
};

const sections: LegalSection[] = [
  {
    title: 'Información que Recopilamos',
    body: [
      { type: 'p', text: 'Podemos recopilar la siguiente información cuando utilizas nuestro sitio web o realizas una compra:' },
      {
        type: 'ul',
        items: [
          'Nombre completo',
          'Dirección de envío',
          'Correo electrónico',
          'Número telefónico',
          'Información de pago',
          'Dirección IP',
          'Información de navegación y uso del sitio',
        ],
      },
    ],
  },
  {
    title: 'Uso de la Información',
    body: [
      { type: 'p', text: 'Utilizamos la información recopilada para los siguientes fines:' },
      {
        type: 'ul',
        items: [
          'Procesar pedidos y pagos',
          'Gestionar envíos',
          'Brindar soporte al cliente',
          'Mejorar nuestros servicios',
          'Prevenir fraudes',
          'Enviar notificaciones relacionadas con pedidos',
        ],
      },
    ],
  },
  {
    title: 'Protección de Datos',
    body: [
      { type: 'p', text: 'Kādo Gallery implementa medidas de seguridad razonables para proteger la información de los usuarios contra accesos no autorizados, pérdida o alteración.' },
      { type: 'p', text: 'Sin embargo, ningún sistema es completamente seguro y no podemos garantizar seguridad absoluta.' },
    ],
  },
  {
    title: 'Compartición de Información',
    body: [
      { type: 'p', text: 'No vendemos ni compartimos información personal con terceros, excepto cuando sea estrictamente necesario para:' },
      {
        type: 'ul',
        items: [
          'Procesar pagos',
          'Realizar envíos',
          'Cumplir obligaciones legales',
          'Prevenir actividades fraudulentas',
        ],
      },
    ],
  },
  {
    title: 'Cookies y Tecnologías Similares',
    body: [
      { type: 'p', text: 'Utilizamos cookies para mejorar tu experiencia de navegación. Para más información, consulta nuestra Política de Cookies.' },
      {
        type: 'ul',
        items: [
          'Mejorar la experiencia del usuario',
          'Recordar preferencias',
          'Analizar tráfico del sitio',
          'Facilitar funciones del carrito de compras',
        ],
      },
      { type: 'p', text: 'El usuario puede modificar la configuración de cookies desde su navegador.' },
    ],
  },
  {
    title: 'Derechos del Usuario',
    body: [
      { type: 'p', text: 'Como usuario tienes derecho a:' },
      {
        type: 'ul',
        items: [
          'Acceder a tus datos personales',
          'Solicitar la corrección de información incorrecta',
          'Solicitar la eliminación de tus datos cuando corresponda',
          'Revocar tu consentimiento en cualquier momento',
        ],
      },
      { type: 'p', text: 'Para ejercer estos derechos, contáctanos mediante nuestros canales oficiales.' },
    ],
  },
  {
    title: 'Retención de Datos',
    body: [
      { type: 'p', text: 'Conservaremos tu información únicamente durante el tiempo necesario para cumplir finalidades comerciales, legales o de seguridad.' },
    ],
  },
  {
    title: 'Enlaces Externos',
    body: [
      { type: 'p', text: 'Nuestro sitio puede contener enlaces a sitios externos. Kādo Gallery no se responsabiliza por las políticas de privacidad de terceros y te recomendamos revisarlas antes de proporcionar información personal.' },
    ],
  },
  {
    title: 'Cambios en la Política',
    body: [
      { type: 'p', text: 'Podemos actualizar esta Política de Privacidad en cualquier momento.' },
      { type: 'p', text: 'Las modificaciones entrarán en vigencia desde su publicación en el sitio web. Te recomendamos revisarla periódicamente.' },
    ],
  },
  {
    title: 'Contacto',
    body: [
      { type: 'p', text: 'Para consultas relacionadas con privacidad y protección de datos, puedes comunicarte mediante nuestros canales oficiales.' },
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      lastUpdated="Mayo 2026"
      intro="En Kādo Gallery respetamos y protegemos la privacidad de nuestros usuarios y clientes. Esta Política explica cómo recopilamos, utilizamos y protegemos tu información personal."
      sections={sections}
      icon={<ShieldCheck className="w-14 h-14 text-accent-primary" strokeWidth={1.5} />}
    />
  );
}
