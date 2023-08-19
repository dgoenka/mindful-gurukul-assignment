import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { redirect } from 'next/navigation';

const OPEN_ROUTES = ["/","/login","/signup"];

export function middleware(request: NextRequest) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers)

    console.log("in middleware, request.nextUrl.pathname is:\n"+JSON.stringify(request.nextUrl.pathname,null,2));
    console.log("in middleware, requestHeaders.has(\"authentication\") is:\n"+JSON.stringify(requestHeaders.has("authentication"),null,2));

    if(!requestHeaders.has("authentication")){
        if(!OPEN_ROUTES.includes(request.nextUrl.pathname)){
            console.log("redirecting to login");
            redirect(`/login?postLoginUrl=${encodeURIComponent(request.nextUrl.pathname)}`);
        }
    } else {
        if(request.nextUrl.pathname==="/"){
            console.log("redirecting to dashboard");
            redirect(`/dashboard`);
        }
    }
    // You can also set request headers in NextResponse.rewrite
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    })

    return response;
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}