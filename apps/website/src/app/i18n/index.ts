import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

type I18nInstance = ReturnType<typeof createInstance>;

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
  ns = "common",
  options: { keyPrefix?: string } = {}
): Promise<{
  t: ReturnType<I18nInstance["getFixedT"]>;
  i18n: I18nInstance;
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
