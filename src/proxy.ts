import { NextResponse, type NextRequest } from "next/server";

// English is served at the root ("/about") and Nepali under "/ne" ("/ne/about").
// Internally every page lives under app/[lang], so unprefixed URLs are rewritten to /en/...
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ne" || pathname.startsWith("/ne/")) return;

  // Keep one canonical English URL: /en/about -> /about
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, sitemap.xml, robots.txt, icon.svg).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
