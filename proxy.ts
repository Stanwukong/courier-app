import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === "/admin/login" && isAuthenticated) {
    const adminUrl = new URL("/admin", req.nextUrl.origin);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
