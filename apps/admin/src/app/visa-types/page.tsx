import { auth } from "@repo/auth/server";
import { redirect } from "next/navigation";
import { getVisaTypesPaginated } from "@/actions/visa-types";
import { getCountries } from "@/actions/countries";
import { VisaTypesClient } from "./visa-types-client";

interface VisaTypesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function VisaTypesPage({
  searchParams,
}: VisaTypesPageProps): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const search = params.search || "";

  const [paginatedData, countries] = await Promise.all([
    getVisaTypesPaginated({ page, pageSize, search }),
    getCountries(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Visa Types</h1>
        <p className="text-muted-foreground mt-2">
          Configure visa options and requirements
        </p>
      </div>
      <VisaTypesClient paginatedData={paginatedData} countries={countries} />
    </div>
  );
}
