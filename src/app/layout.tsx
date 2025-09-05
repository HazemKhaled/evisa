import type { Viewport } from "next";
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
        className={`${cairo.variable} ${geistMono.variable} bg-background text-foreground min-h-full antialiased`}
        style={{ fontFamily: "var(--font-cairo), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
