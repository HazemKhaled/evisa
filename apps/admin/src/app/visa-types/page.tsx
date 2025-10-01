import { auth } from "@repo/auth";
import { redirect } from "next/navigation";
import { getVisaTypes } from "@/actions/visa-types";
import { getCountries } from "@/actions/countries";
import { VisaTypesClient } from "./visa-types-client";

export default async function VisaTypesPage(): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const [visaTypes, countries] = await Promise.all([
    getVisaTypes(),
    getCountries(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visa Types</h1>
      </div>
      <VisaTypesClient visaTypes={visaTypes} countries={countries} />
    </div>
  );
}
