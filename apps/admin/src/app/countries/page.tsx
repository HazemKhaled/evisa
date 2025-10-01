import { auth } from "@repo/auth";
import { redirect } from "next/navigation";

export default async function CountriesPage(): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Countries</h1>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium">
          Add Country
        </button>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="p-6">
          <p className="text-muted-foreground">
            Country management interface coming soon. This will include:
          </p>
          <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2 text-sm">
            <li>List view with pagination and search</li>
            <li>Create/Edit forms with multilingual support</li>
            <li>Country code management (alpha-2 and alpha-3)</li>
            <li>Hero image upload</li>
            <li>Soft delete with confirmation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
