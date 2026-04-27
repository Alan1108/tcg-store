import type { Customer } from '@/types';
import type { PaginatedResponse } from './products.service';

export interface CustomerFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCustomerById(_id: string): Promise<Customer | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getAllCustomers(_filters?: CustomerFilters): Promise<PaginatedResponse<Customer>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  // TODO: Connect to backend API / auth
  return null;
}
