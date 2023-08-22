import httpProxy from "http-proxy";
import Cookies from "cookies";
import { AuthCredentials } from "shared";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxyServer();

// You can export a config variable from any API apiProxyMiddleware in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const method = req.method;
  console.log("method is:\n" + JSON.stringify(method, null, 2));
  const pathname = req.nextUrl.pathname.substring("/apiProxy".length);
  console.log("pathname is:\n" + pathname);
  const headers = req.headers;
  console.log("headers is:\n" + headers);
  let body;
  try {
    body = await req.json();
  } catch (err) {}
  console.log("body is:\n" + JSON.stringify(body, null, 2));

  const isLogin = pathname === "/auth/login";
  const isSignOut = pathname === "/auth/signOut";
  console.log("isLogin is:\n" + JSON.stringify(body, null, 2));

  if (isSignOut) {
    cookies().delete("auth-token");
    return NextResponse.json({ loggedIn: true }, { status: 200 });
  }

  // Get the `auth-token` cookie:
  const authToken: Partial<AuthCredentials> = req.cookies.get("auth-token")
    ?.value
    ? JSON.parse(cookies().get("auth-token")?.value)
    : {};
  console.log("authToken is:\n" + JSON.stringify(authToken, null, 2));

  headers.set("cookie", "");

  console.log("headers is:\n" + JSON.stringify(headers, null, 2));
  console.log(
    "process.env.API_URL is:\n" + JSON.stringify(process.env.API_URL, null, 2),
  );

  const apiResponseBody = (
    await axios({
      method,
      baseURL: process.env.API_URL,
      maxBodyLength: Infinity,
      url: pathname,
      headers: {
        ...JSON.parse(JSON.stringify(headers || {})),
        "Content-Type": "application/json",
        ...(authToken?.access_token
          ? { "auth-token": authToken.access_token }
          : {}),
      },
      data: body,
    })
  ).data;
  console.log(
    "apiResponseBody is:\n" + JSON.stringify(apiResponseBody, null, 2),
  );

  if (isLogin) {
    const authCredentials: AuthCredentials = apiResponseBody;

    cookies().set("auth-token", JSON.stringify(authCredentials), {
      httpOnly: true,
      sameSite: "lax",
      expires: authCredentials.issued_at + 24 * 60 * 60 * 1000,
    });
  }

  return NextResponse.json(apiResponseBody, { status: 200 });
}
