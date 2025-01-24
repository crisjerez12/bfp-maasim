import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the auth cookie exists
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    if (path !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (authToken) {
    if (!path.startsWith("/dashboard"))
      return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Since we can't decrypt the cookie here, we'll allow access to all authenticated users
  // The actual role-based access control will need to be handled in the individual routes

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
