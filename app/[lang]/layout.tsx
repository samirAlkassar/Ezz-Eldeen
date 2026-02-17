import type { Metadata } from "next";
import "../globals.css";
import { Fredoka, Cairo } from "next/font/google"
import { Providers } from "./Providers";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import MobileBottomNavServer from "@/components/layout/navbar/MobileBottomNavServer";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ezz-eldeen.vercel.app"),

  title: {
    default: "Ezz-Eldeen | Premium Online Store",
    template: "%s | Ezz-Eldeen",
  },

  description:
    "Discover premium-quality products at Ezz-Eldeen. Shop toys, gifts, and trending items with unbeatable prices and fast delivery across Egypt.",

  keywords: [
    "Ezz-Eldeen",
    "online store Egypt",
    "buy toys online",
    "premium gifts Egypt",
    "best toy shop Egypt",
    "ecommerce Egypt",
  ],

  authors: [{ name: "Ezz-Eldeen Store" }],
  creator: "Ezz-Eldeen",
  publisher: "Ezz-Eldeen",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ezz-eldeen.vercel.app",
    siteName: "Ezz-Eldeen",
    title: "Ezz-Eldeen | Premium Online Store",
    description:
      "Shop high-quality toys, gifts, and trending products at Ezz-Eldeen. Great prices. Fast delivery. Trusted quality.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Ezz-Eldeen Premium Online Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ezz-Eldeen | Premium Online Store",
    description:
      "Premium toys and trending products with fast delivery across Egypt.",
    images: ["/og-image.jpg"],
  },

  category: "ecommerce",
};


type Props = {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params as { lang: typeLang };
  const isArabic = lang === "ar";
    if (!hasLocale(routing.locales, lang)) {
    notFound();
  };

  setRequestLocale(lang);

  return (
    <html
      lang={lang}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${fredoka.variable} ${cairo.variable}`}
      suppressHydrationWarning>
      <body
        className={isArabic ? cairo.className : fredoka.className}
        suppressHydrationWarning>
        <NextIntlClientProvider>
          <Providers>
              {children}
            <MobileBottomNavServer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
