import Link from "next/link";

import { getTranslation } from "@/app/i18n";

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  // Parallel fetch: both translations
  const [{ t: tNav }, { t: tCommon }] = await Promise.all([
    getTranslation(locale, "navigation"),
    getTranslation(locale, "common"),
  ]);

  return (
    <footer className="mt-16 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white">
              {tCommon("site.name")}
            </div>
            <p className="mt-4 text-gray-300">{tCommon("site.description")}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
              {tNav("footer.company")}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {tNav("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {tNav("footer.contact_us")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {tNav("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {tNav("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
              {tNav("footer.services")}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href={`/${locale}/d`}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {tNav("footer.document_center")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {tNav("footer.travel_blog")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-base text-gray-400">
          <p>
            {tNav("footer.copyright", {
              year: new Date().getFullYear(),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
