import { Suspense } from 'react';
import { AmbientCardRain } from '@/components/molecules/AmbientCardRain';
import { NavbarDesktop, NavbarMobile, FooterDesktop, FooterMobile, AuthModal } from '@/components/organisms';
import { AuthProvider } from '@/providers/auth';
import { WishlistProvider } from '@/providers/wishlist';
import { AuthTrigger } from './auth-trigger';
import { Analytics } from "@vercel/analytics/next";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
      <Analytics/>
      <div className="relative flex min-h-screen flex-col bg-(--store-backdrop-base)">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="store-ambient-gradient absolute inset-0" />
          <AmbientCardRain variant="light" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <NavbarDesktop />
          <NavbarMobile />
          <main className="flex-1">{children}</main>
          <FooterDesktop />
          <FooterMobile />
        </div>
        <AuthModal />
        <Suspense><AuthTrigger /></Suspense>
      </div>
      </WishlistProvider>
    </AuthProvider>
  );
}
