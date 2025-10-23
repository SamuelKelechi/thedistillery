import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const passkey = req.cookies.get("admin_passkey")?.value;

    // If no cookie, redirect to passkey page
    if (!passkey || passkey !== process.env.ADMIN_PASSKEY) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin-access";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};