import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Use default locale if undefined (for static generation)
  const validLocale = locale || routing.defaultLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(validLocale as "en" | "ar")) {
    throw new Error(`Invalid locale: ${validLocale}`);
  }

  return {
    locale: validLocale as "en" | "ar",
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
