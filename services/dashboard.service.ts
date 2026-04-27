import type { DashboardStats } from '@/types';

export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: Connect to backend API
  return {
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    newInquiries: 0,
    topProducts: [],
    recentOrders: [],
  };
}
