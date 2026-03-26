import { getCurrentUser } from "@/lib/auth/session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const user = await getCurrentUser();
  const protectedPage = ["/data", "/nutrition", "/search"];
  const authPage = ["/login", "/register"];

  if (!user && protectedPage.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && authPage.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/data",
    "/nutrition",
    "/search",
    "/nutrition/:path*",
    "/search/:path*",
    "/login",
    "/register",
  ],
};
