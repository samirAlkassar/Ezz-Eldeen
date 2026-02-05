import type { Metadata } from "next";
import "./globals.css";
import { Fredoka } from "next/font/google";
import { Providers } from "./Providers";

const fredoka = Fredoka({
  subsets: ["latin"], // required
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
