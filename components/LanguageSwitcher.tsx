"use client";

import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ lang: "ar" | "en" }>();

  const currentLang = params.lang;

  const changeLanguage = (lang: "ar" | "en") => {
    if (currentLang === lang) return;
    const newPath = pathname.replace(/^\/(en|ar)/, `/${lang}`);
    router.push(newPath, { scroll: false });
  };
  

  const toggleLanguage = () => {
    changeLanguage(currentLang === "ar" ? "en" : "ar");
  };

  return (
    <div
      className={twMerge(
        "rounded-full flex items-center gap-1 p-1",
        isScrolled ? "bg-gray-200" : "bg-white/20"
      )}>
      <button
        title={t("navbar.english")}
        aria-label="Change language to English"
        onClick={() => changeLanguage("en")}
        className={twMerge(
          "w-10 h-8 rounded-full hidden md:flex items-center justify-center font-medium cursor-pointer",
          isScrolled
            ? "text-gray-800 hover:bg-gray-300"
            : "text-white hover:bg-orange-500/20",
          currentLang === "en" ? "bg-orange-500/40" : "bg-transparent"
        )}>
        {t("navbar.langButton.english")}
      </button>

      <button
        title={t("navbar.arabic")}
        aria-label="Change language to Arabic"
        onClick={() => changeLanguage("ar")}
        className={twMerge(
          "w-10 h-8 rounded-full hidden md:flex items-center justify-center font-medium cursor-pointer",
          isScrolled
            ? "text-gray-800 hover:bg-gray-300"
            : "text-white hover:bg-orange-500/20",
          currentLang === "ar" ? "bg-orange-500/40" : "bg-transparent"
        )}>
        {t("navbar.langButton.arabic")}
      </button>

      <button
        onClick={toggleLanguage}
        aria-label={params.lang === "en" ? t("navbar.langButton.changeLangToArabic") : t("navbar.langButton.changeLangToEnglish")}
        title={params.lang === "en" ? t("navbar.langButton.changeLangToArabic") : t("navbar.langButton.changeLangToEnglish")}
        className={twMerge("w-8 h-8 flex items-center justify-center rounded-full md:hidden cursor-pointer",
          isScrolled
            ? "text-gray-700 hover:bg-gray-300"
            : "text-white hover:bg-orange-500/20")}>
        <Globe size={20} />
      </button>
    </div>
  );
}
