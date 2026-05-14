import type { Metadata } from 'next';
import { HelpCenter } from '@/components/molecules/HelpCenter';
import {
  Package,
  Truck,
  CreditCard,
  Star,
  User,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Centro de Ayuda – Kādo Gallery',
  description: 'Encuentra respuestas a tus preguntas sobre pedidos, envíos, pagos y productos en Kādo Gallery.',
  alternates: { canonical: '/ayuda' },
};

const categories = [
  {
    id: 'pedidos',
    label: 'Pedidos',
    icon: <Package className="w-4 h-4" />,
    faqs: [
      {
        q: '¿Cómo realizo un pedido?',
        a: 'Agrega los productos que deseas a tu carrito, procede al checkout e ingresa tus datos de envío y pago. Recibirás una confirmación por correo electrónico una vez que el pedido sea procesado.',
      },
      {
        q: '¿Puedo modificar o cancelar mi pedido?',
        a: 'Puedes solicitar cambios o cancelaciones dentro de las primeras 2 horas tras confirmar el pago. Escríbenos por WhatsApp lo antes posible con tu número de pedido.',
      },
      {
        q: '¿Cómo sé que mi pedido fue confirmado?',
        a: 'Recibirás un correo de confirmación automático. También puedes revisar el estado en la sección "Mis Pedidos" dentro de tu cuenta.',
      },
      {
        q: '¿Puedo pedir productos en preventa?',
        a: 'Sí. Los productos en preventa están marcados claramente. El cobro se realiza al momento de la compra y el envío se gestiona cuando el producto esté disponible según la fecha estimada de lanzamiento.',
      },
      {
        q: '¿Qué hago si hay un error en mi pedido?',
        a: 'Contáctanos por WhatsApp con evidencia fotográfica dentro de las 48 horas de recibido el paquete. Revisamos cada caso para ofrecerte la solución más adecuada.',
      },
    ],
  },
  {
    id: 'envios',
    label: 'Envíos',
    icon: <Truck className="w-4 h-4" />,
    faqs: [
      {
        q: '¿A qué ciudades de Ecuador envían?',
        a: 'Enviamos a nivel nacional. Para ciudades principales (Quito, Guayaquil, Cuenca) el tiempo estimado es de 2–4 días hábiles. Ciudades secundarias pueden tardar entre 3–7 días hábiles.',
      },
      {
        q: '¿Cuánto cuesta el envío?',
        a: 'El costo de envío se calcula al finalizar tu pedido según el peso, dimensiones y destino. Pedidos superiores a cierto monto aplican envío gratuito según nuestras promociones vigentes.',
      },
      {
        q: '¿Cómo puedo rastrear mi paquete?',
        a: 'Una vez despachado, recibirás un número de guía por correo. Puedes usarlo directamente en el sitio web de la empresa de transporte asignada.',
      },
      {
        q: '¿Hacen envíos internacionales?',
        a: 'Por el momento solo realizamos envíos dentro de Ecuador. Estamos trabajando para expandir nuestra cobertura internacional próximamente.',
      },
      {
        q: '¿Qué pasa si mi paquete llega dañado?',
        a: 'Documentamos cada paquete antes del despacho. Si tu pedido llega con daños visibles en el embalaje, toma fotos y contáctanos por WhatsApp dentro de las 48 horas de recepción.',
      },
    ],
  },
  {
    id: 'pagos',
    label: 'Pagos',
    icon: <CreditCard className="w-4 h-4" />,
    faqs: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencias bancarias y pagos por billeteras digitales habilitadas en el sitio. Los métodos disponibles se muestran al finalizar tu compra.',
      },
      {
        q: '¿Es seguro pagar en Kādo Gallery?',
        a: 'Sí. Utilizamos pasarelas de pago certificadas con encriptación SSL. En ningún momento almacenamos los datos de tu tarjeta en nuestros servidores.',
      },
      {
        q: '¿Cuándo se realiza el cobro?',
        a: 'El cobro se efectúa inmediatamente al confirmar tu pedido, incluyendo productos en preventa.',
      },
      {
        q: '¿Puedo pagar contra entrega?',
        a: 'Por el momento no ofrecemos pago contra entrega. Todos los pedidos requieren pago previo para ser procesados.',
      },
      {
        q: '¿Cómo funcionan los reembolsos?',
        a: 'Los reembolsos aprobados se procesan por el mismo medio de pago original en un plazo de 5–10 días hábiles, dependiendo de tu banco o entidad financiera.',
      },
    ],
  },
  {
    id: 'productos',
    label: 'Productos',
    icon: <Star className="w-4 h-4" />,
    faqs: [
      {
        q: '¿Cómo se determina la condición de las cartas singles?',
        a: 'Clasificamos las cartas según el estándar internacional: Mint (M), Near Mint (NM), Lightly Played (LP), Moderately Played (MP) y Heavily Played (HP). La condición se indica en cada publicación.',
      },
      {
        q: '¿Los productos sellados son originales?',
        a: 'Absolutamente. Trabajamos únicamente con distribuidores oficiales. Todos los productos sellados son 100% originales con garantía de autenticidad.',
      },
      {
        q: '¿Puedo solicitar una carta que no está publicada?',
        a: 'Sí. Usa nuestro formulario de Consulta de Singles o escríbenos por WhatsApp indicando el nombre de la carta, set, idioma y condición deseada. Revisamos disponibilidad y te respondemos a la brevedad.',
      },
      {
        q: '¿Las imágenes de los productos son exactas?',
        a: 'Para productos sellados, las imágenes son referenciales del producto oficial. Para singles, mostramos fotos reales de la carta en el estado indicado. Pueden existir variaciones menores de iluminación o centrado.',
      },
      {
        q: '¿Venden accesorios como sleeves, deck boxes o playmats?',
        a: 'Sí, contamos con una selección de accesorios TCG. Puedes encontrarlos navegando la tienda o preguntarnos directamente por WhatsApp por productos específicos.',
      },
    ],
  },
  {
    id: 'cuenta',
    label: 'Mi Cuenta',
    icon: <User className="w-4 h-4" />,
    faqs: [
      {
        q: '¿Cómo creo una cuenta?',
        a: 'Haz clic en el ícono de usuario en la barra de navegación. Puedes registrarte con tu correo electrónico o con tu cuenta de Google.',
      },
      {
        q: '¿Dónde veo el historial de mis pedidos?',
        a: 'Inicia sesión y accede a "Mi Cuenta". Ahí encontrarás el historial completo de tus pedidos con su estado actual.',
      },
      {
        q: '¿Puedo guardar productos favoritos?',
        a: 'Sí. Usa el ícono de corazón en cualquier producto para agregarlo a tu lista de deseos. La lista es accesible desde el ícono en la barra de navegación.',
      },
      {
        q: '¿Qué hago si olvidé mi contraseña?',
        a: 'En la pantalla de inicio de sesión, selecciona "¿Olvidaste tu contraseña?" e ingresa tu correo. Recibirás un enlace para restablecerla.',
      },
    ],
  },
  {
    id: 'garantias',
    label: 'Garantías',
    icon: <ShieldCheck className="w-4 h-4" />,
    faqs: [
      {
        q: '¿Qué garantía tienen los productos sellados?',
        a: 'Los productos sellados son garantizados como originales. Si recibes un producto que no cumple con las características descritas, contáctanos dentro de las 48 horas con evidencia fotográfica.',
      },
      {
        q: '¿Aceptan devoluciones?',
        a: 'No aceptamos devoluciones de productos abiertos, manipulados o usados. Los productos sellados pueden devolverse únicamente si llegan dañados o son distintos al pedido original.',
      },
      {
        q: '¿Qué cubre la política de devolución?',
        a: 'Cubre productos que lleguen físicamente dañados, productos incorrectos (diferente al pedido) o productos defectuosos de fábrica. El reporte debe realizarse dentro de las 48 horas de recibido el pedido.',
      },
      {
        q: '¿Cómo inicio un proceso de garantía?',
        a: 'Escríbenos por WhatsApp o al correo oficial con tu número de pedido y fotos claras del problema. Nuestro equipo evaluará el caso y te contactará para coordinar la solución en un plazo de 1–3 días hábiles.',
      },
    ],
  },
];

export default function AyudaPage() {
  return (
    <div>
      {/* Hero */}
      <div className="w-full bg-bg-surface border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 md:py-14 flex items-center gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
              Soporte
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-text-primary leading-tight">
              Centro de Ayuda
            </h1>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary max-w-2xl">
              Encuentra respuestas rápidas sobre pedidos, envíos, pagos y productos. Si no encuentras lo que buscas, nuestro equipo está disponible por WhatsApp.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-28 h-28 rounded-3xl bg-accent-primary/8 border border-border-accent shrink-0">
            <ShieldCheck className="w-14 h-14 text-accent-primary" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <HelpCenter categories={categories} />
    </div>
  );
}
