import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eVisa - Electronic Visa Processing",
  description:
    "Help users travel with minimal visa requirements through our centralized visa processing platform",
};

// The root layout is required for Next.js but the actual HTML structure
// is handled by the locale-specific layout in [locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
