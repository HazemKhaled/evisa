import { SignedIn, SignedOut } from "@repo/auth";
import Link from "next/link";
import {
  getDb,
  count,
  isNull,
  countries,
  visaTypes,
  blogPosts,
} from "@repo/database";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityChart } from "@/components/dashboard/activity-chart";

async function getDashboardStats() {
  try {
    const db = getDb();

    const [countriesResult, visaTypesResult, blogPostsResult] =
      await Promise.all([
        db
          .select({ count: count() })
          .from(countries)
          .where(isNull(countries.deletedAt)),
        db
          .select({ count: count() })
          .from(visaTypes)
          .where(isNull(visaTypes.deletedAt)),
        db
          .select({ count: count() })
          .from(blogPosts)
          .where(isNull(blogPosts.deletedAt)),
      ]);

    return {
      countriesCount: Number(countriesResult[0]?.count || 0),
      visaTypesCount: Number(visaTypesResult[0]?.count || 0),
      blogPostsCount: Number(blogPostsResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      countriesCount: 0,
      visaTypesCount: 0,
      blogPostsCount: 0,
    };
  }
}

export default async function HomePage(): Promise<React.JSX.Element> {
  const stats = await getDashboardStats();

  return (
    <div>
      <SignedOut>
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <h2 className="mb-4 text-3xl font-bold">Welcome to Admin Panel</h2>
          <p className="text-muted-foreground mb-8">
            Please sign in to access the admin panel
          </p>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your visa management system
          </p>
        </div>

        <div className="space-y-6">
          <StatsCards
            countriesCount={stats.countriesCount}
            visaTypesCount={stats.visaTypesCount}
            blogPostsCount={stats.blogPostsCount}
          />

          <ActivityChart
            countriesCount={stats.countriesCount}
            visaTypesCount={stats.visaTypesCount}
            blogPostsCount={stats.blogPostsCount}
          />

          <div>
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/countries"
                className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
              >
                <p className="font-medium">Manage Countries</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Add or edit destination countries
                </p>
              </Link>
              <Link
                href="/visa-types"
                className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
              >
                <p className="font-medium">Manage Visa Types</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Configure visa options
                </p>
              </Link>
              <Link
                href="/eligibility"
                className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
              >
                <p className="font-medium">Set Eligibility</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Define visa requirements
                </p>
              </Link>
              <Link
                href="/blog-posts"
                className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
              >
                <p className="font-medium">Create Content</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Write new blog posts
                </p>
              </Link>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
