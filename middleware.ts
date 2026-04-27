import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isComingSoonEnabled(): boolean {
  const raw =
    process.env.COMING_SOON ?? process.env.NEXT_PUBLIC_COMING_SOON ?? "";
  const v = raw.toLowerCase().trim();
  if (v === "" || v === "false" || v === "0" || v === "no" || v === "off") {
    return false;
  }
  return v === "true" || v === "1" || v === "yes";
}

export function middleware(request: NextRequest) {
  if (!isComingSoonEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/coming-soon")) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  if (/\.(ico|png|jpg|jpeg|svg|gif|webp|woff2?|txt|xml)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
