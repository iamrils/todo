import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token");
  const isAuthenticated = !!sessionToken;

  // Skip middleware for NextAuth routes and API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access login/register
  if (isAuthenticated && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/todos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
