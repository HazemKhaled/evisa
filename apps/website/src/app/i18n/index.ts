import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { getOptions, languages } from "./settings";

type I18nInstance = ReturnType<typeof createInstance>;

/**
 * Initialised instances keyed by `locale\0namespace`.
 *
 * `i18next` initialisation is not free: each call clones the resource bundle
 * into a fresh store and builds the plural resolver, which instantiates ICU
 * plural rules for the locale. A single page render asks for translations
 * several times over — once per layout, per section and, for the card and grid
 * components, once per rendered item — so doing it per call meant tens of
 * initialisations per request.
 *
 * The promise is cached rather than the resolved instance so that concurrent
 * callers for the same pair share one initialisation instead of racing.
 *
 * Only supported locales are memoised. `lng` reaches here from the `[locale]`
 * route segment, so an unsupported value must not be able to grow the map.
 * Those still resolve a translator — `supportedLngs` falls them back to
 * `fallbackLng` — they are just not cached.
 */
const instances = new Map<string, Promise<I18nInstance>>();

const supportedLocales = new Set<string>(languages);

async function initI18next(lng: string, ns: string): Promise<I18nInstance> {
  const key = `${lng}\u0000${ns}`;
  const cacheable = supportedLocales.has(lng);

  const cached = cacheable ? instances.get(key) : undefined;
  if (cached) {
    return cached;
  }

  const i18nInstance = createInstance();
  const ready = i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns))
    .then(() => i18nInstance)
    .catch((error: unknown) => {
      // Don't memoise a failed initialisation; the next request should retry.
      if (cacheable) {
        instances.delete(key);
      }
      throw error;
    });

  if (cacheable) {
    instances.set(key, ready);
  }

  return ready;
}

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
