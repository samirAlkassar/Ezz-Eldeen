"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isScrolled: boolean;
};

export default function LocalSwitcherSelect({ isScrolled }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function changeLanguage(nextLocale: string) {
    startTransition(() => {
      router.replace(
        { pathname },
        { locale: nextLocale }
      );
    });
  }

  function toggleLanguage() {
    changeLanguage(locale === "en" ? "ar" : "en");
  }

  return (
    <div
      className={twMerge(
        "rounded-full flex items-center gap-1 p-1",
        isScrolled ? "bg-gray-200" : "bg-white/20"
      )}
    >
      {/* Desktop EN */}
      <button
        aria-label="Change language to English"
        disabled={isPending}
        onClick={() => changeLanguage("en")}
        className={twMerge(
          "w-10 h-8 rounded-full hidden md:flex items-center justify-center font-medium cursor-pointer",
          isScrolled
            ? "text-gray-800 hover:bg-gray-300"
            : "text-white hover:bg-orange-500/20",
          locale === "en" ? "bg-orange-500/40" : "bg-transparent"
        )}
      >
        EN
      </button>

      {/* Desktop AR */}
      <button
        aria-label="Change language to Arabic"
        disabled={isPending}
        onClick={() => changeLanguage("ar")}
        className={twMerge(
          "w-10 h-8 rounded-full hidden md:flex items-center justify-center font-medium cursor-pointer",
          isScrolled
            ? "text-gray-800 hover:bg-gray-300"
            : "text-white hover:bg-orange-500/20",
          locale === "ar" ? "bg-orange-500/40" : "bg-transparent"
        )}
      >
        AR
      </button>

      {/* Mobile toggle */}
      <button
        disabled={isPending}
        onClick={toggleLanguage}
        className={twMerge(
          "w-8 h-8 flex items-center justify-center rounded-full md:hidden cursor-pointer",
          isScrolled
            ? "text-gray-700 hover:bg-gray-300"
            : "text-white hover:bg-orange-500/20"
        )}
      >
        <Globe size={20} />
      </button>
    </div>
  );
}
