import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMNET",
  description: "ASEAN Ecosystem Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <AdminSidebar />
        {/* <main className="flex-1 p-4 ml-64">{children}</main> */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
