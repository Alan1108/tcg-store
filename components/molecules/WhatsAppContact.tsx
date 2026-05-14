'use client';

import { useState } from 'react';
import { MessageCircle, Clock, CheckCircle, Package, Truck, Star, HelpCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '593982976973';

const quickTopics = [
  {
    icon: Package,
    label: 'Estado de mi pedido',
    message: 'Hola, quisiera consultar el estado de mi pedido.',
  },
  {
    icon: Star,
    label: 'Consulta de singles',
    message: 'Hola, me gustaría consultar disponibilidad de singles.',
  },
  {
    icon: Truck,
    label: 'Información de envío',
    message: 'Hola, tengo una pregunta sobre el envío de mi pedido.',
  },
  {
    icon: HelpCircle,
    label: 'Otra consulta',
    message: 'Hola, tengo una consulta.',
  },
];

const hours = [
  { day: 'Lunes – Viernes', time: '9:00 – 20:00' },
  { day: 'Sábado', time: '10:00 – 18:00' },
  { day: 'Domingo', time: 'Cerrado' },
];

function buildWhatsAppURL(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppContact() {
  const [customMessage, setCustomMessage] = useState('');

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
              Contacto WhatsApp
            </h1>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary max-w-2xl">
              Estamos disponibles para ayudarte con pedidos, consultas de productos y más. Respondemos en menos de 24 horas en horario de atención.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-28 h-28 rounded-3xl bg-[var(--whatsapp)]/10 border border-[var(--whatsapp)]/20 shrink-0">
            <MessageCircle className="w-14 h-14 text-[var(--whatsapp)]" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Left – main contact */}
          <div className="flex flex-col gap-6">

            {/* Quick topics */}
            <div className="bg-bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-text-primary">Temas frecuentes</h2>
                <p className="text-xs text-text-muted mt-1">Selecciona un tema para abrir WhatsApp con un mensaje predefinido.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <a
                      key={topic.label}
                      href={buildWhatsAppURL(topic.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-bg-surface hover:border-[var(--whatsapp)]/40 hover:bg-[var(--whatsapp)]/5 transition-all group active:scale-[0.98]"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--whatsapp)]/10 border border-[var(--whatsapp)]/20 shrink-0 group-hover:bg-[var(--whatsapp)]/15 transition-colors">
                        <Icon className="w-4 h-4 text-[var(--whatsapp)]" />
                      </span>
                      <span className="text-sm font-medium text-text-primary flex-1 leading-snug">{topic.label}</span>
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-[var(--whatsapp)] transition-colors shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Custom message */}
            <div className="bg-bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-text-primary">Mensaje personalizado</h2>
                <p className="text-xs text-text-muted mt-1">Escribe tu consulta y abre WhatsApp directamente con ese mensaje.</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Tu mensaje
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Hola, quisiera consultar sobre..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[var(--whatsapp)]/50 focus:ring-2 focus:ring-[var(--whatsapp)]/10 resize-none transition-colors"
                />
              </div>
              <a
                href={buildWhatsAppURL(customMessage || 'Hola, tengo una consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[var(--whatsapp)] hover:opacity-90 active:scale-[0.98] transition-all text-sm font-semibold text-white w-full sm:w-auto sm:self-start"
              >
                <MessageCircle className="w-4 h-4" />
                Abrir en WhatsApp
              </a>
            </div>
          </div>

          {/* Right – info sidebar */}
          <div className="flex flex-col gap-4">

            {/* Response time */}
            <div className="bg-bg-surface rounded-2xl border border-border p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--whatsapp)] shrink-0" />
                <span className="text-sm font-bold text-text-primary">Tiempo de respuesta</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Respondemos en un máximo de <span className="font-semibold text-text-primary">24 horas</span> en días hábiles. Durante horario de atención, la respuesta suele ser mucho más rápida.
              </p>
            </div>

            {/* Hours */}
            <div className="bg-bg-surface rounded-2xl border border-border p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-primary shrink-0" />
                <span className="text-sm font-bold text-text-primary">Horario de atención</span>
              </div>
              <div className="flex flex-col gap-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-text-secondary">{h.day}</span>
                    <span className={`text-xs font-semibold ${h.time === 'Cerrado' ? 'text-text-muted' : 'text-text-primary'}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-text-muted leading-snug border-t border-border pt-2">
                Horario Ecuador (GMT-5). Mensajes fuera de horario son respondidos el siguiente día hábil.
              </p>
            </div>

            {/* Centro de Ayuda link */}
            <div className="bg-bg-elevated rounded-2xl border border-border p-5 flex flex-col gap-3">
              <p className="text-xs font-semibold text-text-secondary">
                ¿Buscas respuestas rápidas?
              </p>
              <Link
                href="/ayuda"
                className="flex items-center gap-2 text-sm font-semibold text-accent-primary hover:underline transition-colors"
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                Visita el Centro de Ayuda
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
              <p className="text-[11px] text-text-muted leading-snug">
                Resolvemos las dudas más comunes sobre pedidos, envíos, pagos y más.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
