import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VILIKE FAB TECH | Circular Knitting Machines — Tirupur",
  description: "Official VILIKE agent in Tirupur. Machines, finance, live shipment tracking, German engineering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-vilike-bg text-white antialiased`}>
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
