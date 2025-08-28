"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const navigationLinks = [
  { href: "/" as const, key: "home" },
  { href: "/destinations" as const, key: "destinations" },
  { href: "/visa-checker" as const, key: "visaChecker" },
  { href: "/articles" as const, key: "articles" },
  { href: "/about" as const, key: "about" },
  { href: "/contact" as const, key: "contact" },
];

const legalLinks = [
  { href: "/terms" as const, key: "terms" },
  { href: "/privacy" as const, key: "privacy" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">eVisa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <Button variant="outline" size="sm">
              {t("login")}
            </Button>
            <Button size="sm">{t("register")}</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}

              {/* Legal Links in Mobile */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  {t("login")}
                </Button>
                <Button className="w-full">{t("register")}</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
