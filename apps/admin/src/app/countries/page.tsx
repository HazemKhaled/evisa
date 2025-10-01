import { auth } from "@repo/auth";
import { redirect } from "next/navigation";
import { getCountries } from "@/actions/countries";
import { CountriesClient } from "./countries-client";

export default async function CountriesPage(): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const countries = await getCountries();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Countries</h1>
      </div>
      <CountriesClient countries={countries} />
    </div>
  );
}
