import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  BlurFade,
  MagicCard,
  AspectRatio,
} from "@/components/ui";
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
  const destinationUrl = `/${locale}/d/${destination.code}`;

  return (
    <BlurFade delay={0.25} inView>
      <Link href={destinationUrl} className={cn("group block", className)}>
        <MagicCard className="cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9} className="overflow-hidden">
                {destination.heroImage ? (
                  <Image
                    src={destination.heroImage}
                    alt={`${destination.localizedName} landscape`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="from-primary/80 to-primary absolute inset-0 bg-gradient-to-br">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-background/20 rounded-full p-4">
                        <div className="text-primary-foreground text-4xl font-bold">
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
              </AspectRatio>

              {destination.about && (
                <div className="p-4">
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {destination.about}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </MagicCard>
      </Link>
    </BlurFade>
  );
}
