"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Loader2 } from "lucide-react";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    } else if (
      !isLoading &&
      user &&
      !["ADMIN", "SUPER_ADMIN"].includes(user.role)
    ) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  // Tampilkan loading spinner saat mengecek auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Jangan render layout jika user tidak valid
  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="flex min-h-screen mt-20">
        <AdminSidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
