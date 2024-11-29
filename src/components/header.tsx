"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { ChevronDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookie from "js-cookie"; // Import js-cookie untuk mengakses cookies

export function Header() {
  const [user, setUser] = useState<any>(null); // State untuk menyimpan data user
  const [unreadNotifications, setUnreadNotifications] = useState(0); // Notifications mock-up

  // Mengambil data pengguna dari API /api/auth/me jika token ada
  useEffect(() => {
    const token = Cookie.get("token"); // Ambil token JWT dari cookies

    console.log("ini token: ", token);
    if (token) {
      // Jika token ada, ambil data pengguna dari API
      fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Mengirimkan token dalam header
          // Authorization: `${token}`, // Mengirimkan token dalam header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user); // Set data user jika berhasil
            console.log("ini data: ", data);
            console.log("ini data user: ", data.user);
          } else {
            setUser(null); // Reset user jika tidak ada data
          }
        })
        .catch(() => {
          setUser(null); // Reset user jika terjadi error
        });
    }
  }, []);

  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo_amnet.png" alt="Logo" width={40} height={40} />
          </Link>
          <Link href="/" className="hover:text-primary hover:underline">
            Home
          </Link>
          <Link href="/content" className="hover:text-primary hover:underline">
            Best Practices
          </Link>
          {/* <Link href="/news" className="hover:text-primary">
            News
          </Link> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="hover:text-primary p-0">
                About <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/country-profile" className="w-full">
                  Country Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/statistics" className="w-full">
                  Statistics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/faq" className="w-full">
                  FAQ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about-us" className="w-full">
                  About Amnet
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem className="font-semibold">
                  Notifications
                </DropdownMenuItem>
                {/* Display notifications */}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.role} - {user.country.countryName}
                    </span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/admin/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sign-out" className="w-full">
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-white" />
            <Link
              href="/sign-in"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 hover:scale-105"
            >
              Admin Log-In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
