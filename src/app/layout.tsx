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
  title: "eVisa Platform - Travel with Minimal Visa Requirements",
  description:
    "Simplify your travel with our comprehensive visa processing platform. Get destination-based visa information, eligibility checking, and seamless application services.",
  keywords: [
    "visa",
    "travel",
    "passport",
    "visa application",
    "travel visa",
    "visa requirements",
    "visa eligibility",
    "travel planning",
  ],
  authors: [{ name: "eVisa Platform" }],
  creator: "eVisa Platform",
  publisher: "eVisa Platform",
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
    title: "eVisa Platform - Travel with Minimal Visa Requirements",
    description:
      "Simplify your travel with our comprehensive visa processing platform.",
    siteName: "eVisa Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "eVisa Platform - Travel with Minimal Visa Requirements",
    description:
      "Simplify your travel with our comprehensive visa processing platform.",
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
    <html lang="en" dir="ltr" className="h-full">
      <body
        className={`${cairo.variable} ${geistMono.variable} bg-background text-foreground min-h-full font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
