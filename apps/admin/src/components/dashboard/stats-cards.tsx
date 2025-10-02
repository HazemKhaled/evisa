import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardsProps {
  countriesCount: number;
  visaTypesCount: number;
  blogPostsCount: number;
}

export function StatsCards({
  countriesCount,
  visaTypesCount,
  blogPostsCount,
}: StatsCardsProps): React.JSX.Element {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link href="/countries">
        <Card className="hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Destinations
            </CardTitle>
            <TrendingUp className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countriesCount}</div>
            <p className="text-muted-foreground text-xs">
              Active destination countries
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/visa-types">
        <Card className="hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visas</CardTitle>
            <TrendingUp className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visaTypesCount}</div>
            <p className="text-muted-foreground text-xs">
              Available visa options
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/blog-posts">
        <Card className="hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <TrendingDown className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPostsCount}</div>
            <p className="text-muted-foreground text-xs">Published articles</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
