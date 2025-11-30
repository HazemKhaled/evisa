import "./globals.css";

import { ClerkProvider, UserButton } from "@repo/auth";
import {
  Input,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui";
import { Search } from "lucide-react";
import type { Metadata } from "next";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

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
        <body className="admin-content">
          <SidebarProvider>
            <AppSidebar className="admin-sidebar" />
            <SidebarInset className="flex flex-col">
              <header
                className="admin-header sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4"
                role="banner"
              >
                <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumbs />
                <div className="ml-auto flex items-center gap-4">
                  <div className="relative hidden md:block">
                    <Search
                      className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2"
                      aria-hidden="true"
                    />
                    <Input
                      placeholder="Search..."
                      className="admin-search w-64 pl-8"
                      aria-label="Search admin panel"
                    />
                  </div>
                  <UserButton afterSignOutUrl="/" />
                </div>
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
