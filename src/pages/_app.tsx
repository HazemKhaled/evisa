import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Cairo, Geist_Mono } from "next/font/google";
import { getTextDirection } from "@/lib/utils";
import nextI18NextConfig from "../../next-i18next.config.js";
import "@/styles/globals.css";

// Cairo font for Arabic, English, and other supported languages
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Geist Mono for code and monospace text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const { locale } = router;
  const direction = getTextDirection(locale || "en");

  return (
    <div className={`${cairo.variable} ${geistMono.variable}`}>
      <div
        lang={locale}
        dir={direction}
        className="bg-background text-foreground min-h-screen font-sans antialiased"
      >
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
