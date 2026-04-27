import type { Inquiry, InquiryStatus } from '@/types';
import type { PaginatedResponse } from './products.service';

export interface InquiryFilters {
  status?: InquiryStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export async function submitInquiry(_data: {
  customerName: string;
  customerEmail: string;
  whatsapp: string;
  cardsDescription: string;
  message?: string;
  preferWhatsApp: boolean;
}): Promise<Inquiry | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getCustomerInquiries(_filters?: InquiryFilters): Promise<PaginatedResponse<Inquiry>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function getAllInquiries(_filters?: InquiryFilters): Promise<PaginatedResponse<Inquiry>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function updateInquiryStatus(_inquiryId: string, _status: InquiryStatus): Promise<Inquiry | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getInquiryById(_id: string): Promise<Inquiry | null> {
  // TODO: Connect to backend API
  return null;
}
