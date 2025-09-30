import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function getTranslation(
  lng: string,
  ns: string = "common",
  options: { keyPrefix?: string } = {}
): Promise<{
  t: ReturnType<typeof import("i18next").default.getFixedT>;
  i18n: import("i18next").i18n;
}> {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns : [ns],
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
