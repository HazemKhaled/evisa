import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CountryWithI18n } from "@/lib/services/country-service";

interface DestinationCardProps {
  destination: CountryWithI18n;
  locale: string;
  className?: string;
}

export function DestinationCard({
  destination,
  locale,
  className,
}: DestinationCardProps) {
  const destinationUrl = `/${locale}/d/${destination.code.toLowerCase()}`;

  return (
    <Link href={destinationUrl} className={cn("group", className)}>
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          {/* Flag placeholder - in a real app, you'd use actual flag images */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/20 p-4">
              <div className="text-4xl font-bold text-white">
                {destination.code.substring(0, 2)}
              </div>
            </div>
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {destination.localizedName}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{destination.code}</p>
        </div>
      </div>
    </Link>
  );
}
