import { AuthCredentials } from "shared";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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
  const isMe = pathname === "/auth/me";

  console.log("isLogin is: " + JSON.stringify(isLogin, null, 2));
  console.log("isSignOut is: " + JSON.stringify(isSignOut, null, 2));
  console.log("isMe is: " + JSON.stringify(isMe, null, 2));

  if (isSignOut) {
    cookies().delete("auth-token");
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  // Get the `auth-token` cookie:
  const authToken: Partial<AuthCredentials> = req.cookies.get("auth-token")
    ?.value
    ? JSON.parse(cookies().get("auth-token")?.value || "null")
    : null;
  console.log("authToken is:\n" + JSON.stringify(authToken, null, 2));

  if (isMe) {
    if (authToken) return NextResponse.json(authToken, { status: 200 });
    else return NextResponse.json({ loggedIn: false }, { status: 400 });
  }

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
