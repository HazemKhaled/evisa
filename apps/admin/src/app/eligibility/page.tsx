import { auth } from "@repo/auth";
import { redirect } from "next/navigation";
import { getEligibilityPaginated } from "@/actions/eligibility";
import { getCountries } from "@/actions/countries";
import { getVisaTypes } from "@/actions/visa-types";
import { EligibilityClient } from "./eligibility-client";

interface EligibilityPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function EligibilityPage({
  searchParams,
}: EligibilityPageProps): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const search = params.search || "";

  const [paginatedData, countries, visaTypes] = await Promise.all([
    getEligibilityPaginated({ page, pageSize, search }),
    getCountries(),
    getVisaTypes(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Visa Eligibility</h1>
        <p className="text-muted-foreground mt-2">
          Define visa eligibility rules for passport and destination
          combinations
        </p>
      </div>
      <EligibilityClient
        paginatedData={paginatedData}
        countries={countries}
        visaTypes={visaTypes}
      />
    </div>
  );
}
