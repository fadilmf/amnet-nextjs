import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Mengambil token dari cookies
  const currentPath = req.nextUrl.pathname; // Mendapatkan path saat ini

  // Tentukan apakah pengguna berada di halaman login atau halaman admin
  const isLoginPage = currentPath === "/sign-in";
  const isAdminPage = currentPath.startsWith("/admin");

  // Jika token ada dan pengguna berada di halaman login, redirect ke beranda

  console.log("ini middleware");

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Jika tidak ada token dan pengguna mencoba mengakses halaman admin, arahkan ke halaman login
  if (!token && isAdminPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Izinkan akses ke halaman lain
  return NextResponse.next();
}

// Konfigurasi rute mana saja yang akan dilindungi middleware
export const config = {
  matcher: [
    "/((?!_next|api|_next/static|_next/image).*)", // Melindungi semua rute kecuali API, halaman login, dan aset statis
  ],
};
