import type { Metadata } from "next";
import LanguageProvider from "./languageProvider";
import "../globals.css";
import { Fredoka, Cairo } from "next/font/google"
import { Providers } from "./Providers";

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

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params as { lang: typeLang };
  const isArabic = lang === "ar";

  return (
    <html
      lang={lang}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${fredoka.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body
        className={isArabic ? cairo.className : fredoka.className}
        suppressHydrationWarning
      >
        <Providers>
          <LanguageProvider lang={lang}>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
