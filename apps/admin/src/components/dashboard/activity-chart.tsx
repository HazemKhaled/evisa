"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface ActivityChartProps {
  countriesCount: number;
  visaTypesCount: number;
  blogPostsCount: number;
}

const chartConfig = {
  countries: {
    label: "Countries",
    color: "hsl(var(--chart-1))",
  },
  visas: {
    label: "Visa Types",
    color: "hsl(var(--chart-2))",
  },
  posts: {
    label: "Blog Posts",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ActivityChart({
  countriesCount,
  visaTypesCount,
  blogPostsCount,
}: ActivityChartProps): React.JSX.Element {
  // Generate mock data for visualization (in real app, this would come from database)
  const [chartData] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 6 }, (_, i) => ({
      month: new Date(now - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleString(
        "default",
        { month: "short" }
      ),
      countries: Math.floor((countriesCount / 6) * (i + 1)),
      visas: Math.floor((visaTypesCount / 6) * (i + 1)),
      posts: Math.floor((blogPostsCount / 6) * (i + 1)),
    }));
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Growth</CardTitle>
        <CardDescription>
          Showing content growth over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillCountries" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-countries)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-countries)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVisas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-posts)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-posts)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="posts"
              type="natural"
              fill="url(#fillPosts)"
              fillOpacity={0.4}
              stroke="var(--color-posts)"
              stackId="a"
            />
            <Area
              dataKey="visas"
              type="natural"
              fill="url(#fillVisas)"
              fillOpacity={0.4}
              stroke="var(--color-visas)"
              stackId="a"
            />
            <Area
              dataKey="countries"
              type="natural"
              fill="url(#fillCountries)"
              fillOpacity={0.4}
              stroke="var(--color-countries)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
