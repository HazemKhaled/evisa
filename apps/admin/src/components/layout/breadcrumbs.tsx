"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";

const routeNames: Record<string, string> = {
  "": "Dashboard",
  countries: "Countries",
  "visa-types": "Visa Types",
  eligibility: "Eligibility",
  "blog-posts": "Blog Posts",
};

export function Breadcrumbs(): React.JSX.Element {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="breadcrumb-item"
            aria-label="Go to dashboard"
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const name = routeNames[segment] || segment;

          return (
            <div key={segment} className="flex items-center gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium">
                    {name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={path}
                    className="breadcrumb-item"
                    aria-label={`Go to ${name}`}
                  >
                    {name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
