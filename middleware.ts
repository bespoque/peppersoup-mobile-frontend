// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if token exists in cookies (or local storage depending on implementation)
  const token = request.cookies.get("token")?.value;

  // List of protected paths
  const protectedPaths = ["/home", "/orders"];

  const url = request.nextUrl;

  // If trying to access a protected path without a token, redirect to login
  if (protectedPaths.includes(url.pathname) && !token) {
    // Redirect user to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

// Specify paths for the middleware to run on
export const config = {
  matcher: ["/home", "/orders", "/feedback", "/(dashboard)/(.*)"], // Add other paths as needed
};
