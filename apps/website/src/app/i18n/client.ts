"use client";

import { useEffect, useRef } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./settings";

const runsOnServerSide = typeof window === "undefined";

// Initialize i18next only once
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
      caches: ["cookie"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(
  lng: string,
  ns = "common",
  options: { keyPrefix?: string } = {}
) {
  const ret = useTranslationOrg(ns, { ...options });
  const { i18n } = ret;

  // Use a ref to track if we need to change language
  const prevLngRef = useRef(lng);

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    if (prevLngRef.current !== lng) {
      prevLngRef.current = lng;
      void i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return ret;
}
