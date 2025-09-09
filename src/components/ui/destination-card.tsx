import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { DestinationMetadata } from "@/lib/services/country-service";

interface DestinationCardProps {
  destination: DestinationMetadata;
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
        <div className="relative h-48 overflow-hidden">
          {destination.heroImage ? (
            <Image
              src={destination.heroImage}
              alt={`${destination.localizedName} landscape`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/20 p-4">
                  <div className="text-4xl font-bold text-white">
                    {destination.code.substring(0, 2)}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Country name overlay on image */}
          <div className="absolute right-4 bottom-4 left-4">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {destination.localizedName}
            </h3>
            <p className="text-xs font-medium tracking-wide text-white/80 uppercase">
              {destination.code}
            </p>
          </div>
        </div>

        {destination.about && (
          <div className="p-4">
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {destination.about}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
