import { NavbarDesktop, NavbarMobile, FooterDesktop, FooterMobile } from '@/components/organisms';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="flex-1">{children}</main>
      <FooterDesktop />
      <FooterMobile />
    </div>
  );
}
