import type { Metadata } from "next";
import { ClerkProvider } from "@repo/auth";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Separator,
} from "@repo/ui";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
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
        <body className="min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col">
              <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumbs />
              </header>
              <div className="flex-1 overflow-auto">
                <div className="container mx-auto p-6 pb-8">{children}</div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
