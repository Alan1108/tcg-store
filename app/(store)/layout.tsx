import { AmbientCardRain } from '@/components/molecules/AmbientCardRain';
import { NavbarDesktop, NavbarMobile, FooterDesktop, FooterMobile } from '@/components/organisms';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--store-backdrop-base)]">
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
    </div>
  );
}
