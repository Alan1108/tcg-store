'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/organisms';

const routeToKey: Record<string, string> = {
  '/admin': 'dashboard',
  '/admin/orders': 'orders',
  '/admin/sealed': 'sealed',
  '/admin/singles': 'singles',
  '/admin/inquiries': 'inquiries',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeItem = routeToKey[pathname] || 'dashboard';

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeItem={activeItem} orderCount={5} inquiryCount={3} />
      <main className="flex-1 bg-[var(--bg-base)]">{children}</main>
    </div>
  );
}
