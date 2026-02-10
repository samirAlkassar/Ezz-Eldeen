"use client";

import { useRef } from "react";
import i18n from "@/i18n/i18n";

type LanguageProviderProps = {
  lang: string;
  children: React.ReactNode;
};

export default function LanguageProvider({
  lang,
  children,
}: LanguageProviderProps) {
  const synced = useRef(false);

  if (!synced.current && i18n.language !== lang) {
    i18n.changeLanguage(lang);
    synced.current = true;
  }

  return <>{children}</>;
}
