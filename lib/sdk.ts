import Medusa from "@medusajs/js-sdk"

export const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

// NEXT_PUBLIC_ vars are baked into the client bundle at build time but must be
// explicitly present in the server runtime env to be read via process.env.
// MEDUSA_PUBLISHABLE_KEY is the private server-side fallback for the same value.
export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey:
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
    process.env.MEDUSA_PUBLISHABLE_KEY,
})
