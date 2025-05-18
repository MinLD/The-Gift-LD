import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/admin"];
const authPaths = [
  "/Authentication/Login",
  "/Authentication/Sign",
  "/Authentication/Verify/",
];
const sellerPaths = ["/seller/signup"];

const privateSellerPaths = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("token")?.value;
  const roles = request.cookies.get("roles")?.value;

  // nếu người dùng đã có roles là seller rồi thì ko được vào seller
  if (
    sellerPaths.some((path) => pathname.startsWith(path)) &&
    roles === "SELLER"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //nếu người dùng ko có role seller ko được vào trang dashboard
  if (
    privateSellerPaths.some((path) => pathname.startsWith(path)) &&
    roles !== "SELLER"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

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
