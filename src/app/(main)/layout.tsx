import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

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
    <body className={inter.className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
