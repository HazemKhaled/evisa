"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@repo/utils";

interface MobileNavProps {
  locale: string;
  navigationLabels: {
    home: string;
    destinations: string;
    blog: string;
  };
}

export function MobileNav({ locale, navigationLabels }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: `/${locale}`, label: navigationLabels.home },
    { href: `/${locale}/d`, label: navigationLabels.destinations },
    { href: `/${locale}/blog`, label: navigationLabels.blog },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 p-0"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <div className="fixed inset-x-0 top-16 z-50 border-b bg-white shadow-lg md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-6">
              <NavigationMenu className="w-full">
                <NavigationMenuList className="flex-col space-y-2 space-x-0">
                  {navigationItems.map(item => (
                    <NavigationMenuItem key={item.href} className="w-full">
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full justify-start text-left"
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </>
      )}
    </>
  );
}
