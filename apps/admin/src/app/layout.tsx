import type { Metadata } from "next";
import { ClerkProvider } from "@repo/auth";
import { AdminHeader } from "@/components/layout/admin-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "GetTravelVisa Admin",
  description: "Admin panel for managing visa applications and content",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-background min-h-screen">
          <AdminHeader />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
