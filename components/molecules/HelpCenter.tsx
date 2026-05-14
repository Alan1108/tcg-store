'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
  q: string;
  a: string;
}

interface HelpCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  faqs: FAQ[];
}

interface HelpCenterProps {
  categories: HelpCategory[];
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
        isOpen ? 'border-border-accent bg-bg-elevated' : 'border-border bg-bg-surface hover:border-border-accent/50'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-4 w-full px-5 md:px-6 py-4 text-left"
      >
        <span className={`font-heading text-sm md:text-base font-semibold flex-1 transition-colors leading-snug ${isOpen ? 'text-accent-primary' : 'text-text-primary'}`}>
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-text-muted'}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-5 pt-1 border-t border-border-accent">
          <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export function HelpCenter({ categories }: HelpCenterProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const current = categories.find((c) => c.id === activeCategory);

  const toggleFAQ = (key: string) => setOpenFAQ((prev) => (prev === key ? null : key));

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10 flex gap-6 items-start">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] shrink-0 sticky top-6 bg-bg-surface rounded-2xl border border-border p-4 gap-1">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 px-1">
          Categorías
        </p>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setOpenFAQ(null); }}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-left transition-all ${
              activeCategory === cat.id
                ? 'text-accent-primary font-semibold bg-accent-primary/8 border-l-2 border-accent-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
            }`}
          >
            <span className={`w-4 h-4 shrink-0 ${activeCategory === cat.id ? 'text-accent-primary' : 'text-text-muted'}`}>
              {cat.icon}
            </span>
            {cat.label}
          </button>
        ))}

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[11px] text-text-muted leading-snug px-1 mb-3">
            ¿No encontraste lo que buscas?
          </p>
          <Link
            href="/contacto"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--whatsapp)]/10 border border-[var(--whatsapp)]/20 text-[13px] font-semibold text-[var(--whatsapp)] hover:bg-[var(--whatsapp)]/15 transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            Contactar
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Mobile category tabs */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenFAQ(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                activeCategory === cat.id
                  ? 'bg-accent-primary text-white border-accent-primary'
                  : 'bg-bg-surface text-text-secondary border-border hover:border-border-accent'
              }`}
            >
              <span className="w-3.5 h-3.5 shrink-0">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {current && (
          <>
            <div className="hidden md:flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent-primary/8 border border-border-accent text-accent-primary">
                {current.icon}
              </span>
              <h2 className="font-heading text-xl font-bold text-text-primary">{current.label}</h2>
              <span className="text-xs text-text-muted">({current.faqs.length} preguntas)</span>
            </div>

            <div className="flex flex-col gap-3">
              {current.faqs.map((faq, i) => {
                const key = `${activeCategory}-${i}`;
                return (
                  <FAQItem
                    key={key}
                    faq={faq}
                    isOpen={openFAQ === key}
                    onToggle={() => toggleFAQ(key)}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-2 bg-bg-surface rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--whatsapp)]/10 border border-[var(--whatsapp)]/20 shrink-0">
            <MessageCircle className="w-6 h-6 text-[var(--whatsapp)]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary">¿Necesitas ayuda personalizada?</p>
            <p className="text-xs text-text-secondary mt-0.5">Respuesta en menos de 24 horas por WhatsApp.</p>
          </div>
          <Link
            href="/contacto"
            className="flex items-center gap-2 px-5 h-10 rounded-lg bg-[var(--whatsapp)] hover:opacity-90 transition-opacity text-sm font-semibold text-white shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Escribir
          </Link>
        </div>
      </div>
    </div>
  );
}
