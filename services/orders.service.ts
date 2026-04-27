import type { Order, OrderStatus } from '@/types';
import type { PaginatedResponse, ProductFilters } from './products.service';

export interface OrderFilters {
  status?: OrderStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export async function createOrder(_data: {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: string;
}): Promise<Order | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getOrderById(_id: string): Promise<Order | null> {
  // TODO: Connect to backend API
  return null;
}

export async function getCustomerOrders(_filters?: ProductFilters): Promise<PaginatedResponse<Order>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function getAllOrders(_filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
  // TODO: Connect to backend API
  return { data: [], total: 0, page: 1, totalPages: 0 };
}

export async function updateOrderStatus(_orderId: string, _status: OrderStatus): Promise<Order | null> {
  // TODO: Connect to backend API
  return null;
}
