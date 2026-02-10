"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enHero from "./en/hero.json";
import arHero from "./ar/hero.json";
import enCategories from "./en/categories.json";
import arCategories from "./ar/categories.json";
import enNavbar from "./en/navbar.json";
import arNavbar from "./ar/navbar.json";


i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
            hero: enHero,
            categories: enCategories,
            navbar: enNavbar,
        }
      },
      ar: {
        translation: {
            hero: arHero,
            categories: arCategories,
            navbar: arNavbar,
          }
        }
      }
    }
  );

export default i18n;
