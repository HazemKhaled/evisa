"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui";
import {
  CheckSquare,
  FileText,
  Globe,
  LayoutDashboard,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Countries",
    url: "/countries",
    icon: Globe,
  },
  {
    title: "Visa Types",
    url: "/visa-types",
    icon: FileText,
  },
  {
    title: "Eligibility",
    url: "/eligibility",
    icon: CheckSquare,
  },
  {
    title: "Blog Posts",
    url: "/blog-posts",
    icon: Newspaper,
  },
];

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.JSX.Element {
  const pathname = usePathname();

  const isActive = (url: string): boolean => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar
      collapsible="none"
      {...props}
      role="navigation"
      aria-label="Admin navigation"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" aria-label="Go to dashboard">
                <div
                  className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                  aria-hidden="true"
                >
                  <Globe className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">GetTravelVisa</span>
                  <span className="text-muted-foreground truncate text-xs">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                    className="sidebar-nav-item"
                    aria-current={isActive(item.url) ? "page" : undefined}
                  >
                    <Link href={item.url} aria-label={`Go to ${item.title}`}>
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="text-muted-foreground truncate text-xs">
                  Admin Panel
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
