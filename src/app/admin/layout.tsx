"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("ini user di admin user: ", user);
    // Redirect ke sign-in jika user belum login atau bukan admin
    // if (!user) {
    //   router.push("/");
    // } else if (user.role !== "ADMIN") {
    //   router.push("/"); // atau halaman lain yang sesuai
    // }
  }, [user, router]);

  // Tampilkan loading atau null saat mengecek auth
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
