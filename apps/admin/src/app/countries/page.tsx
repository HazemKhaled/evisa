import { auth } from "@repo/auth/server";
import { redirect } from "next/navigation";

import { getCountriesPaginated } from "@/actions/countries";

import { CountriesClient } from "./countries-client";

interface CountriesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function CountriesPage({
  searchParams,
}: CountriesPageProps): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const search = params.search || "";

  const paginatedData = await getCountriesPaginated({
    page,
    pageSize,
    search,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
        <p className="text-muted-foreground mt-2">
          Manage destination and passport countries
        </p>
      </div>
      <CountriesClient paginatedData={paginatedData} />
    </div>
  );
}
