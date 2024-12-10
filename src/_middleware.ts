import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const currentPath = req.nextUrl.pathname;

  // Izinkan akses ke API routes dan static files
  if (
    currentPath.startsWith("/api") ||
    currentPath.startsWith("/_next") ||
    currentPath.includes(".")
  ) {
    return NextResponse.next();
  }

  const isLoginPage = currentPath === "/sign-in";
  const isAdminPage = currentPath.startsWith("/admin");

  // Redirect ke home jika sudah login tapi mencoba akses halaman login
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect ke login jika mencoba akses halaman admin tanpa token
  if (!token && isAdminPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
