import type { Metadata } from "next";
import "../globals.css";
import { Fredoka, Cairo } from "next/font/google"
import { Providers } from "./Providers";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';

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
  title: "Ezz-Eldeen | Premium Online Store",
  description:
    "Shop high-quality products at Ezz-Eldeen. Premium selection, great prices, and fast delivery.",
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
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
