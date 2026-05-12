"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { notFound } from "next/navigation";
import { BadgeGame, BadgeStock, Divider } from "@/components/atoms";
import { SealedProductCard } from "@/components/organisms";
import {
  getSealedProductById,
  getSealedProducts,
} from "@/services/products.service";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart-button";
import type { GameSystem } from "@/types";
import type { HttpTypes } from "@medusajs/types";

function getStockStatus(
  qty?: number | null,
  manageInventory?: boolean | null,
): "in_stock" | "low_stock" | "out_of_stock" {
  if (manageInventory === false) return "in_stock";
  if (!qty || qty <= 0) return "out_of_stock";
  if (qty <= 3) return "low_stock";
  return "in_stock";
}

function buildImageList(product: HttpTypes.StoreProduct): string[] {
  const urls: string[] = [];
  if (product.thumbnail) urls.push(product.thumbnail);
  for (const img of product.images ?? []) {
    if (img.url && !urls.includes(img.url)) urls.push(img.url);
  }
  return urls;
}

export function SealedDetailContent({ id }: { id: string }) {
  const [product, setProduct] = useState<HttpTypes.StoreProduct | null>(null);
  const [related, setRelated] = useState<HttpTypes.StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] =
    useState<HttpTypes.StoreProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getSealedProductById(id)
      .then((p) => {
        setProduct(p);
        if (p) {
          setSelectedVariant(p.variants?.[0] ?? null);
          getSealedProducts({ limit: 4 })
            .then((r) =>
              setRelated(r.data.filter((x) => x.id !== id).slice(0, 3)),
            )
            .catch(() => {});
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto w-full px-4 py-6 animate-pulse">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="w-full aspect-square rounded-xl bg-bg-elevated" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 rounded bg-bg-elevated" />
            <div className="h-8 w-3/4 rounded bg-bg-elevated" />
            <div className="h-6 w-1/3 rounded bg-bg-elevated" />
            <div className="h-10 w-1/2 rounded bg-bg-elevated" />
            <div className="h-11 rounded bg-bg-elevated" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();
  const gameNameNormalized: Record<GameSystem, string> ={
    onepiece: "One Piece",
    pokemon: "Pokemon",
    mtg: "Magic the Gathering",
    yugioh: "YuGi-Oh",
    lorcana: "Lorcana"
  }
  const VALID_GAMES: GameSystem[] = ["pokemon", "mtg", "yugioh", "lorcana", "onepiece"];
  const collectionHandle = product.collection?.handle ?? "";
  const game = (VALID_GAMES.includes(collectionHandle as GameSystem) ? collectionHandle : "") as GameSystem;
  const gameNormalized = gameNameNormalized[game]
  const setName = (product.metadata?.set_name as string) ?? product.subtitle ?? "";
  const TYPE_LABELS: Record<string, string> = { sealed: "Sellado", single: "Single" };
  const rawCategory = (product.metadata?.category as string) ?? product.type?.value ?? "";
  const category = TYPE_LABELS[rawCategory] ?? rawCategory;
  const description = product.description
  const images = buildImageList(product);
  const variants = product.variants ?? [];
  const hasVariantChoice = variants.length > 1;

  const price = selectedVariant?.calculated_price?.calculated_amount ?? 0;
  const currencyCode =
    selectedVariant?.calculated_price?.currency_code ?? "USD";
  const stockStatus = getStockStatus(
    selectedVariant?.inventory_quantity,
    selectedVariant?.manage_inventory,
  );
  const maxQty =
    selectedVariant?.manage_inventory !== false
      ? (selectedVariant?.inventory_quantity ?? 1)
      : 99;

  const prevImage = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col">
      <div className="max-w-[1280px] mx-auto w-full px-4">
        {/* Breadcrumb — on gradient */}
        <div className="flex items-center gap-3 py-3">
          <Link href="/sealed">
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </Link>
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            <Link href="/" className="hover:text-text-primary">
              Inicio
            </Link>
            <span>›</span>
            <Link href="/sealed" className="hover:text-text-primary">
              Sobres y Cajas
            </Link>
            <span>›</span>
            <span className="text-text-primary">{product.title}</span>
          </div>
        </div>

        {/* White card — contained, gradient visible around it */}
        <div className="bg-bg-surface rounded-2xl shadow-sm mb-6">
          {/* Two-column product section */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* LEFT — image gallery */}
              <div className="flex flex-col gap-3">
                {/* Main image */}
                <div className="relative w-full aspect-square rounded-xl bg-bg-surface border border-[var(--border)] overflow-hidden">
                  {images.length > 0 ? (
                    <Image
                      src={images[activeImage]}
                      alt={product.title ?? ""}
                      fill
                      className="object-contain p-6"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-bg-elevated" />
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-[var(--border)] shadow-sm hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-text-primary" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-[var(--border)] shadow-sm hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-text-primary" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors ${
                          idx === activeImage
                            ? "border-accent-primary"
                            : "border-[var(--border)] hover:border-accent-primary/50"
                        }`}
                      >
                        <Image
                          src={url}
                          alt={`${product.title} ${idx + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT — product info */}
              <div className="flex flex-col gap-4">
                {/* Badges */}
                <div className="flex items-center gap-2">
                  {game && <BadgeGame game={game} />}
                  <BadgeStock status={stockStatus} />
                </div>

                {/* Title + subtitle */}
                <div>
                  <h1 className="font-heading text-2xl font-bold text-text-primary">
                    {product.title}
                  </h1>
                  {(setName || product.subtitle) && (
                    <p className="text-sm text-text-secondary mt-1">
                      {setName || product.subtitle}
                    </p>
                  )}
                </div>

                {/* Price */}
                <span className="font-heading text-[32px] font-bold text-accent-primary leading-none">
                  {formatPrice(price, currencyCode)}
                </span>

                {/* Variant picker */}
                {hasVariantChoice && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                      Variante
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v) => {
                        const label =
                          v.title ??
                          v.options?.map((o) => o.value).join(" / ") ??
                          v.id;
                        const isSelected = v.id === selectedVariant?.id;
                        const vStock = getStockStatus(
                          v.inventory_quantity,
                          v.manage_inventory,
                        );
                        return (
                          <button
                            key={v.id}
                            onClick={() => {
                              setSelectedVariant(v);
                              setQuantity(1);
                            }}
                            disabled={vStock === "out_of_stock"}
                            className={`h-9 px-4 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                              isSelected
                                ? "border-accent-primary bg-accent-primary text-white"
                                : "border-[var(--border)] bg-bg-surface text-text-secondary hover:border-accent-primary"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity + Add to cart */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <AddToCartButton
                      variantId={selectedVariant?.id}
                      quantity={quantity}
                      disabled={stockStatus === "out_of_stock"}
                    />
                    <div className="flex items-center rounded-lg border border-border overflow-hidden shrink-0">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="flex items-center justify-center w-10 h-11 text-text-secondary hover:bg-bg-elevated transition-colors disabled:opacity-40"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-text-primary select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.min(maxQty, q + 1))
                        }
                        disabled={
                          quantity >= maxQty || stockStatus === "out_of_stock"
                        }
                        className="flex items-center justify-center w-10 h-11 text-text-secondary hover:bg-bg-elevated transition-colors disabled:opacity-40"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {stockStatus === "low_stock" && (
                    <span className="text-xs text-warning font-medium">
                      Solo {selectedVariant?.inventory_quantity} disponibles
                    </span>
                  )}
                </div>

                {/* Attributes inline */}
                {(game || setName || category) && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border">
                    {game && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Juego</span>
                        <span className="font-medium text-text-primary capitalize">
                          {gameNormalized}
                        </span>
                      </div>
                    )}
                    {setName && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Set</span>
                        <span className="font-medium text-text-primary">
                          {setName}
                        </span>
                      </div>
                    )}
                    {category && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Tipo</span>
                        <span className="font-medium text-text-primary">
                          {category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {description && (
                      <div className="flex flex-col justify-between text-sm pt-5">
                        <span className="text-black font-bold">Descripción</span>
                        <span className="font-medium text-text-secondary">
                          {description}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end white card */}
      </div>
      {/* end max-w container */}

      {/* Related products — on gradient */}
      {related.length > 0 && (
        <div className="px-4 py-6 flex flex-col gap-4 max-w-[1280px] mx-auto w-full">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/sealed/${p.id}`} className="block">
                <SealedProductCard product={p} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
