import type { Metadata, Viewport } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "GetTravelVisa.com - Your Trusted Visa Application Partner",
  description:
    "Simplify your visa application process with our comprehensive visa checking and application services. Get expert guidance for travel visas worldwide.",
  keywords: [
    "visa application",
    "travel visa",
    "visa checker",
    "visa services",
    "international travel",
  ],
  authors: [{ name: "GetTravelVisa.com" }],
  creator: "GetTravelVisa.com",
  publisher: "GetTravelVisa.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "GetTravelVisa.com - Your Trusted Visa Application Partner",
    description:
      "Simplify your visa application process with our comprehensive visa checking and application services.",
    siteName: "GetTravelVisa.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetTravelVisa.com - Your Trusted Visa Application Partner",
    description:
      "Simplify your visa application process with our comprehensive visa checking and application services.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${geistMono.variable} bg-background text-foreground min-h-full font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
