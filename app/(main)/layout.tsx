import type { Metadata } from "next";
import "../globals.css";
import { Fredoka } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fredoka = Fredoka({
  subsets: ["latin"], // required
  weight: ["400", "500", "600", "700"], // choose weights you want
  variable: "--font-fredoka", // CSS variable (optional but useful)
});


export const metadata: Metadata = {
  title: "Ezz-Eldeen | Login to your account",
  description:
    "Shop high-quality products at Ezz-Eldeen. Premium selection, great prices, and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={fredoka.className}>
      <Navbar />
          {children}
      <Footer />
    </div>
  );
}
