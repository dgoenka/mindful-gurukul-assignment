import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";

const OPEN_ROUTES = ["/", "/login", "/signup"];

export function middleware(request: NextRequest) {
  const authentication = request.cookies.get("auth-token");
  console.log("request.url is: " + request.url);
  if (!request.nextUrl.pathname.startsWith("/apiProxy")) {
    if (!authentication) {
      if (!OPEN_ROUTES.includes(request.nextUrl.pathname)) {
        console.log("redirecting to login");
        return NextResponse.redirect(
          new URL(
            `/login?postLoginUrl=${encodeURIComponent(
              request.nextUrl.pathname,
            )}`,
            request.url,
          ),
        );
      }
    } else {
      if (OPEN_ROUTES.includes(request.nextUrl.pathname)) {
        console.log("redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }
  return NextResponse.next({ request });
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
