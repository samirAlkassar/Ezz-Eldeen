"use client";

import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function LanguageSwitcher({isScrolled}: {isScrolled: boolean}) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{lang: "ar"|"en"}>();

  const toggleLanguage = (lang: "ar" | "en") => {
    if (params.lang === lang) return
    i18n.changeLanguage(lang);
    
    const newPath = pathname.replace(/^\/(en|ar)/, `/${lang}`);
    router.push(newPath, {scroll: false});
  };

  return (
    <div className={twMerge("rounded-full flex p-1",
        isScrolled? "bg-gray-200" : "bg-white/20"
    )}>
        <button 
            title={t("navbar.english")}
            aria-label="Change language to English"
            onClick={() => toggleLanguage("en")}
            className={twMerge("w-10 h-8 rounded-full flex items-center justify-center cursor-pointer font-medium",
            isScrolled? "text-gray-800 hover:bg-gray-300" : "text-white hover:bg-orange-500/20",
            i18n.language === "en" ? "bg-orange-500/40" : "bg-transparent"
        )}>{t("navbar.langButton.english")}</button>
        <button 
            title={t("navbar.arabic")}
            aria-label="Change language to Arabic"
            onClick={() => toggleLanguage("ar")}
            className={twMerge("w-10 h-8 rounded-full flex items-center justify-center cursor-pointer font-medium",
            isScrolled? "text-gray-800 hover:bg-gray-300" : "text-white hover:bg-orange-500/20",
            i18n.language === "ar" ? "bg-orange-500/40" : "bg-transparent"
        )}>{t("navbar.langButton.arabic")}</button>
    </div>
  );
}
