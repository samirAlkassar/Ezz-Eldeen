"use client";

import { useEffect } from "react";
import i18n from "@/i18n/i18n";

export default function LanguageProvider({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <>{children}</>;
}
