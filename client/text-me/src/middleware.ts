import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./actions";

export async function middleware(request: NextRequest) {
  const user = await getUser();
  if (user) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dm/:path*",
    "/notification/:path*",
    "/post/:path*",
    "/search/:path*",
  ],
};
