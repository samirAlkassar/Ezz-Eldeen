import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Fredoka } from "next/font/google";
import { Providers } from "./Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fredoka = Fredoka({
  subsets: ["latin"], // required
  weight: ["400", "500", "600", "700"], // choose weights you want
  variable: "--font-fredoka", // CSS variable (optional but useful)
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ezz-Eldeen | Premium Online Store",
  description:
    "Shop high-quality products at Ezz-Eldeen. Premium selection, great prices, and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={fredoka.className}>
        <Providers>
            <Navbar />
            {children}
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
