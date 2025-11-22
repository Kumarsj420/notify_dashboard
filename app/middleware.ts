import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

const setCookieAndHeader = (
  response: NextResponse,
  cookieName: string,
  cookieValue: string
) => {
  response.headers.set(`x-${cookieName}`, cookieValue);
  response.cookies.set(cookieName, cookieValue);
};

const getIp = (request: NextRequest, response: NextResponse) => {
  // Try different IP sources in order of preference
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-client-ip") ||
    (request as unknown as { ip?: string }).ip ||
    "0.0.0.0";
  if (ip) {
    setCookieAndHeader(response, "ip", ip);
  }
  // @ts-expect-error error
  return ip || request?.ip || "0.0.0.0";
};

export const middleware = auth(async (request) => {
  const response = NextResponse.next();
  const user = request.auth?.user;

  // console.log('=== MIDDLEWARE REQUEST DEBUG ===');
  // console.log('URL:', request.url);
  // console.log('Method:', request.method);
  // console.log('All Headers:', Object.fromEntries(request.headers.entries()));
  // console.log('=== END REQUEST DEBUG ===');

  const isLoggedIn = !!request.auth?.user;
  const { pathname } = request.nextUrl;
  getIp(request, response);

  // If user is logged in and trying to access login/auth pages, redirect to home
  if (
    isLoggedIn &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/auth"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not authenticated and trying to access a protected route
  if (!isLoggedIn && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // set token if user is logged in
  const token = request.cookies.get("token")?.value;
  if (user && request.auth?.token && token !== request.auth?.token) {
    setCookieAndHeader(response, "token", request.auth?.token);
  } else if (!user) {
    response.cookies.delete("token");
    response.cookies.delete("__Secure-authjs.session-token");
  }

  return response;
});

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
