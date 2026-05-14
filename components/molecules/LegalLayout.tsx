'use client';

import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'h3'; text: string };

export interface LegalSection {
  title: string;
  body: ContentBlock[];
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  icon: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, intro, sections, icon }: LegalLayoutProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (i: number) => {
    setOpenIndex(i);
    setTimeout(() => {
      sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div>
      {/* ── Hero banner ─────────────────────────────────────────── */}
      <div className="w-full bg-bg-surface border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 md:py-14 flex items-center gap-8">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
              Última actualización: {lastUpdated}
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-text-primary leading-tight">
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary max-w-2xl">
              {intro}
            </p>
          </div>

          {/* Icon card */}
          <div className="hidden md:flex items-center justify-center w-28 h-28 rounded-3xl bg-accent-primary/8 border border-border-accent shrink-0">
            {icon}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10 flex gap-6 items-start">

        {/* Sidebar with white background */}
        <aside className="hidden md:flex flex-col w-[220px] shrink-0 sticky top-6 bg-bg-surface rounded-2xl border border-border p-4">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3 px-1">
            Índice
          </p>
          <nav className="flex flex-col gap-0.5">
            {sections.map((s, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`flex items-start gap-2 text-left px-2 py-2 rounded-lg text-[13px] transition-all ${
                  openIndex === i
                    ? 'text-accent-primary font-semibold bg-accent-primary/8 border-l-2 border-accent-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                <span
                  className={`shrink-0 text-[11px] mt-0.5 w-4 text-right ${
                    openIndex === i ? 'text-accent-primary' : 'text-text-muted'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="leading-snug">{s.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Accordion sections */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {sections.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? 'border-border-accent bg-bg-elevated'
                    : 'border-border bg-bg-surface hover:border-border-accent/50'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex items-center gap-4 w-full px-5 md:px-6 py-4 text-left"
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold text-white shrink-0 transition-colors ${
                      isOpen ? 'bg-accent-primary' : 'bg-text-primary'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-heading text-base md:text-lg font-semibold flex-1 transition-colors ${
                      isOpen ? 'text-accent-primary' : 'text-text-primary'
                    }`}
                  >
                    {s.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-accent-primary' : 'text-text-muted'
                    }`}
                  />
                </button>

                {/* Body */}
                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 pt-1 border-t border-border-accent">
                    <div className="flex flex-col gap-4">
                      {s.body.map((block, j) => {
                        if (block.type === 'h3') {
                          return (
                            <h3
                              key={j}
                              className="font-heading text-base font-semibold text-accent-primary border-b border-border-accent pb-2 mt-2"
                            >
                              {block.text}
                            </h3>
                          );
                        }
                        if (block.type === 'ul') {
                          return (
                            <ul key={j} className="flex flex-col gap-2">
                              {block.items.map((item, k) => (
                                <li
                                  key={k}
                                  className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={j} className="text-sm text-text-secondary leading-relaxed">
                            {block.text}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
