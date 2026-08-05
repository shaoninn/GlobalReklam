import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@/lib/auth";
import { getJwtSecretBytes } from "@/lib/jwt-secret";

function safeFrom(pathname: string): string {
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/duzenle")) &&
    !pathname.startsWith("//")
  ) {
    return pathname;
  }
  return "/admin";
}

function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.SITE_URL?.replace(/\/$/, "");
  if (!configured || configured.includes("localhost")) return null;

  let canonical: URL;
  try {
    canonical = new URL(configured);
  } catch {
    return null;
  }

  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host) return null;

  const want = canonical.hostname.toLowerCase();
  if (host === want) return null;

  // Collapse www ↔ apex into one hop (avoids http→https→www chains when host
  // already terminated TLS). Only remap the known pair.
  const wwwPair =
    (host === `www.${want}` && !want.startsWith("www.")) ||
    (want === `www.${host}` && !host.startsWith("www."));
  if (!wwwPair) return null;

  const url = request.nextUrl.clone();
  url.protocol = canonical.protocol;
  url.host = canonical.host;
  return NextResponse.redirect(url, 308);
}

export async function middleware(request: NextRequest) {
  const hostRedirect = canonicalHostRedirect(request);
  if (hostRedirect) return hostRedirect;

  const { pathname } = request.nextUrl;

  const isEditor = pathname.startsWith("/duzenle");
  const isAdmin =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  if (!isEditor && !isAdmin) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", safeFrom(pathname));
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getJwtSecretBytes());
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/admin/login", request.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete(COOKIE_NAME);
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Host canonicalization + auth.
     * Skip Next internals and common static extensions.
     */
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff2?)$).*)",
  ],
};
