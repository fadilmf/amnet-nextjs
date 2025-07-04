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
import { useAuth } from "@/contexts/AuthContext";

const getFormattedRole = (role: string) => {
  switch (role) {
    case "SUPER_ADMIN":
      return "Super Admin";
    case "ADMIN":
      return "Admin";
    case "USER":
      return "User";
    default:
      return role;
  }
};

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  // const { user, logout } = useAuth();

  // useEffect(() => {
  //   console.log("ini user: ", user);
  // }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookie.get("token");

      if (!token || user) return; // Skip if no token or user already exists

      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data.user || null);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="border-b">
      <nav className="fixed bg-white border-b z-50 w-full mx-auto px-16 py-4 flex items-center justify-between">
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
              {/* <DropdownMenuItem asChild>
                <Link href="/statistics" className="w-full">
                  Statistics
                </Link>
              </DropdownMenuItem> */}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="hover:text-primary p-0">
                Documents <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  href="/documents/asean-strategy-mangrove"
                  className="w-full"
                >
                  ASEAN Strategy on Sustainable Mangrove Ecosystem Management
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/documents/strategy-executive-summary"
                  className="w-full"
                >
                  ASEAN Strategy on Sustainable Mangrove Ecosystem Management
                  Executive Summary
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
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
                    <span className="text-xs text-muted-foreground">
                      {getFormattedRole(user?.role)} -{" "}
                      {user?.country.countryName}
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
                  <button
                    onClick={() => {
                      Cookie.remove("token"); // Lebih sederhana dengan js-cookie
                      window.location.href = "/sign-in";
                    }}
                    className="w-full text-left"
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-white" />
            <Link href="/sign-in">
              <Button className="text-white rounded-xl">Sign In</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
