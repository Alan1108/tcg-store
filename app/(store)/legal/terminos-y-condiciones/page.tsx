import type { Metadata } from 'next';
import { ScrollText } from 'lucide-react';
import { LegalLayout, type LegalSection } from '@/components/molecules/LegalLayout';

export const metadata: Metadata = {
  title: 'Términos y Condiciones – Kādo Gallery',
  description: 'Lee nuestros Términos y Condiciones de uso, compra y envío en Kādo Gallery, tu tienda de cartas TCG en Ecuador.',
  alternates: { canonical: '/legal/terminos-y-condiciones' },
};

const sections: LegalSection[] = [
  {
    title: 'Información General',
    body: [
      { type: 'p', text: 'Kādo Gallery es una tienda en línea dedicada a la venta de cartas TCG (Trading Card Games), productos sellados, accesorios y cartas individuales coleccionables.' },
      { type: 'p', text: 'Al utilizar este sitio web, el usuario declara ser mayor de edad o contar con autorización de un representante legal para realizar compras.' },
    ],
  },
  {
    title: 'Productos',
    body: [
      { type: 'p', text: 'Todos los productos publicados en Kādo Gallery están sujetos a disponibilidad de stock.' },
      { type: 'p', text: 'Debido a la naturaleza coleccionable de los productos TCG:' },
      {
        type: 'ul',
        items: [
          'Las imágenes son referenciales.',
          'Los colores y detalles pueden variar ligeramente.',
          'Las cartas individuales pueden presentar variaciones menores de estado o centrado propias de fábrica.',
        ],
      },
      { type: 'p', text: 'Las descripciones y condiciones de cada producto serán indicadas en la publicación correspondiente.' },
    ],
  },
  {
    title: 'Precios y Pagos',
    body: [
      { type: 'p', text: 'Todos los precios están expresados en la moneda especificada en el sitio web e incluyen impuestos aplicables, salvo indicación contraria.' },
      { type: 'p', text: 'Aceptamos los siguientes métodos de pago:' },
      {
        type: 'ul',
        items: [
          'Tarjeta de crédito o débito',
          'Transferencia bancaria',
          'Plataformas de pago habilitadas en el sitio',
        ],
      },
      { type: 'p', text: 'Kādo Gallery se reserva el derecho de cancelar pedidos ante errores evidentes de precio, fraude o pagos no autorizados.' },
    ],
  },
  {
    title: 'Envíos',
    body: [
      { type: 'p', text: 'Realizamos envíos nacionales e internacionales según disponibilidad.' },
      { type: 'p', text: 'Los tiempos de entrega son estimados y pueden variar por:' },
      {
        type: 'ul',
        items: [
          'Procesos logísticos',
          'Aduanas',
          'Retrasos del transportista',
          'Eventos fuera de nuestro control',
        ],
      },
      { type: 'p', text: 'Kādo Gallery no se responsabiliza por retrasos ocasionados por terceros una vez entregado el paquete al operador logístico.' },
      { type: 'p', text: 'El cliente es responsable de proporcionar una dirección correcta y completa.' },
    ],
  },
  {
    title: 'Cancelaciones y Reembolsos',
    body: [
      { type: 'p', text: 'Debido a la naturaleza de los productos coleccionables:' },
      {
        type: 'ul',
        items: [
          'No se aceptan devoluciones de productos abiertos, manipulados o utilizados.',
          'Los productos sellados únicamente podrán devolverse si llegan dañados o incorrectos.',
        ],
      },
      { type: 'p', text: 'Para solicitar una revisión, el cliente deberá contactar dentro de las primeras 48 horas posteriores a la recepción del pedido, adjuntando evidencia fotográfica.' },
      { type: 'p', text: 'Los reembolsos aprobados serán procesados mediante el mismo método de pago utilizado originalmente.' },
    ],
  },
  {
    title: 'Preventas',
    body: [
      { type: 'p', text: 'Los productos en preventa tienen fechas estimadas de lanzamiento y entrega.' },
      { type: 'p', text: 'Estas fechas pueden modificarse por parte del fabricante o distribuidor oficial. Kādo Gallery no se responsabiliza por cambios externos relacionados con lanzamientos oficiales.' },
    ],
  },
  {
    title: 'Propiedad Intelectual',
    body: [
      { type: 'p', text: 'Todo el contenido del sitio web, incluyendo:' },
      {
        type: 'ul',
        items: [
          'Logotipos',
          'Diseño',
          'Imágenes',
          'Textos',
          'Elementos gráficos',
        ],
      },
      { type: 'p', text: 'Pertenece a Kādo Gallery o a sus respectivos propietarios y se encuentra protegido por derechos de propiedad intelectual.' },
      { type: 'p', text: 'Queda prohibida la reproducción total o parcial sin autorización previa.' },
    ],
  },
  {
    title: 'Uso del Sitio',
    body: [
      { type: 'p', text: 'El usuario se compromete a utilizar el sitio de manera legal y respetuosa.' },
      { type: 'p', text: 'Está prohibido:' },
      {
        type: 'ul',
        items: [
          'Intentar vulnerar la seguridad del sitio',
          'Realizar actividades fraudulentas',
          'Utilizar información falsa',
          'Revender productos de manera ilícita utilizando la marca Kādo Gallery',
        ],
      },
    ],
  },
  {
    title: 'Limitación de Responsabilidad',
    body: [
      { type: 'p', text: 'Kādo Gallery no será responsable por:' },
      {
        type: 'ul',
        items: [
          'Daños indirectos o incidentales',
          'Uso indebido de productos',
          'Errores ocasionados por terceros',
          'Interrupciones temporales del sitio web',
        ],
      },
    ],
  },
  {
    title: 'Modificaciones',
    body: [
      { type: 'p', text: 'Kādo Gallery podrá actualizar estos Términos y Condiciones en cualquier momento sin previo aviso.' },
      { type: 'p', text: 'El uso continuo del sitio implica la aceptación de las modificaciones realizadas.' },
    ],
  },
  {
    title: 'Contacto',
    body: [
      { type: 'p', text: 'Para consultas relacionadas con pedidos, soporte o aspectos legales, puedes contactarnos mediante los canales oficiales publicados en el sitio web.' },
    ],
  },
];

export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      lastUpdated="Mayo 2026"
      intro="Al acceder y utilizar nuestro sitio web, aceptas los siguientes Términos y Condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier compra."
      sections={sections}
      icon={<ScrollText className="w-14 h-14 text-accent-primary" strokeWidth={1.5} />}
    />
  );
}
