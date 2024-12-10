import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMNET",
  description: "ASEAN Ecosystem Management Platform",
  icons: {
    icon: "/logo_amnet.png?v=1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_amnet.png?v=1" type="image/png" />
      </head>
      <body className={inter.className}>
        {/* <Header /> */}
        <AuthProvider>{children}</AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
