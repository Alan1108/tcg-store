import type { Inquiry } from "@/types"
import { sdk } from "@/lib/sdk"

export interface SubmitInquiryData {
  customer_name: string
  email: string
  whatsapp?: string
  cards_description: string
  message?: string
  prefer_whatsapp?: boolean
  product_id?: string
}

export async function submitInquiry(data: SubmitInquiryData): Promise<Inquiry | null> {
  const response = await sdk.client.fetch<{ inquiry: Inquiry }>("/store/inquiries", {
    method: "POST",
    body: data,
  })
  return response.inquiry ?? null
}
