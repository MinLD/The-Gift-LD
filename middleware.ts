import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/admin"];
const authPaths = [
  "/Authentication/Login",
  "/Authentication/Sign",
  "/Authentication/Verify/",
];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Nếu người dùng truy cập trang privatePaths mà không có token thì chuyển hướng về trang login
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/Authentication/Login", request.url));
  }

  // Nếu người dùng truy cập trang authPaths mà có token thì chuyển hướng về trang home
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/accounts/orthers", request.url));
  }

  return NextResponse.next();
}
