import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loginToken = request.cookies.get("authjs.session-token");

  if (
    !loginToken &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.next();
  }

  if (
    loginToken &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }

  if (
    !loginToken &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/dashboard" ||
      request.nextUrl.pathname === "/documents")
  ) {
    return NextResponse.redirect(new URL("/login", request.url), {
      status: 302,
    });
  }

  return NextResponse.next();
}
