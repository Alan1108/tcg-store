'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { sdk } from '@/lib/sdk';
import { formatPrice } from '@/lib/format';
import type { HttpTypes } from '@medusajs/types';

const SEALED_TYPE_ID = process.env.NEXT_PUBLIC_SEALED_TYPE_ID;
const SINGLE_TYPE_ID = process.env.NEXT_PUBLIC_SINGLE_TYPE_ID;

const FIELDS = '*variants.calculated_price,+type,+images';

function ResultRow({
  product,
  href,
  onSelect,
}: {
  product: HttpTypes.StoreProduct;
  href: string;
  onSelect: () => void;
}) {
  const image = product.images?.[0]?.url;
  const variant = product.variants?.[0];
  const amount = variant?.calculated_price?.calculated_amount;
  const currency = variant?.calculated_price?.currency_code ?? 'USD';

  return (
    <Link
      href={href}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-elevated transition-colors"
    >
      <div className="relative w-10 h-10 rounded-lg bg-bg-elevated flex-shrink-0 overflow-hidden">
        {image && (
          <Image src={image} alt={product.title ?? ''} fill className="object-cover" sizes="40px" />
        )}
      </div>
      <p className="flex-1 text-sm font-medium text-text-primary truncate">{product.title}</p>
      {amount != null && (
        <span className="text-sm font-semibold text-accent-primary flex-shrink-0">
          {formatPrice(amount, currency)}
        </span>
      )}
    </Link>
  );
}

interface Props {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  onSelect?: () => void;
}

export function HeaderSearch({
  className = '',
  inputClassName = '',
  placeholder = 'Buscar cartas, sets, productos...',
  onSelect,
}: Props) {
  const [query, setQuery] = useState('');
  const [sealed, setSealed] = useState<HttpTypes.StoreProduct[]>([]);
  const [singles, setSingles] = useState<HttpTypes.StoreProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query.trim()) {
      setSealed([]);
      setSingles([]);
      setOpen(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { products } = await sdk.store.product.list({
          q: query,
          limit: 10,
          fields: FIELDS,
        } as Parameters<typeof sdk.store.product.list>[0]);

        setSealed(
          products.filter((p) =>
            SEALED_TYPE_ID ? p.type_id === SEALED_TYPE_ID : p.type?.value === 'sealed'
          )
        );
        setSingles(
          products.filter((p) =>
            SINGLE_TYPE_ID ? p.type_id === SINGLE_TYPE_ID : p.type?.value === 'single'
          )
        );
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  function clear() {
    setQuery('');
    setOpen(false);
  }

  function handleSelect() {
    clear();
    onSelect?.();
  }

  const hasResults = sealed.length + singles.length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`bg-white flex items-center gap-2.5 rounded-[10px] border h-10 px-3.5 ${inputClassName}`}>
        <Search className="w-[18px] h-[18px] text-text-muted flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent text-sm font-normal text-text-primary placeholder:text-text-muted outline-none w-full"
        />
        {query && (
          <button onClick={clear} className="flex-shrink-0">
            <X className="w-4 h-4 text-text-muted hover:text-text-primary transition-colors" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-12 left-0 right-0 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {hasResults ? (
            <>
              {sealed.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    Sobres y Cajas
                  </p>
                  {sealed.slice(0, 4).map((p) => (
                    <ResultRow key={p.id} product={p} href={`/sealed/${p.id}`} onSelect={handleSelect} />
                  ))}
                </div>
              )}
              {singles.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    Singles
                  </p>
                  {singles.slice(0, 4).map((p) => (
                    <ResultRow key={p.id} product={p} href={`/singles/${p.id}`} onSelect={handleSelect} />
                  ))}
                </div>
              )}
            </>
          ) : (
            !loading && (
              <p className="px-4 py-6 text-sm text-text-muted text-center">
                No se encontraron productos para &ldquo;{query}&rdquo;
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
