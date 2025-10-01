import { auth } from "@repo/auth";
import { redirect } from "next/navigation";
import { getEligibilityRules } from "@/actions/eligibility";
import { getCountries } from "@/actions/countries";
import { getVisaTypes } from "@/actions/visa-types";
import { EligibilityClient } from "./eligibility-client";

export default async function EligibilityPage(): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const [eligibilityRules, countries, visaTypes] = await Promise.all([
    getEligibilityRules(),
    getCountries(),
    getVisaTypes(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visa Eligibility</h1>
      </div>
      <EligibilityClient
        eligibilityRules={eligibilityRules}
        countries={countries}
        visaTypes={visaTypes}
      />
    </div>
  );
}
