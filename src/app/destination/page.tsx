import { Suspense } from "react";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const headingFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

/** "7" → "7 Days/6 Nights"; free-text values (e.g. "7 Days/6 Nights") pass through. */
function formatDuration(duration: string) {
  const value = duration.trim();
  if (/^\d+$/.test(value)) {
    const days = Number(value);
    return days > 1 ? `${value} Days/${days - 1} Nights` : `${value} Day`;
  }
  return value;
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="flex flex-col gap-2">
      {/* Cover image + rating badge */}
      <div className="relative aspect-[8/5] w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Static rating — the API has no rating field yet. */}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold shadow-sm">
          4.5
          <Star className="size-3 fill-black text-black" />
        </span>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="size-3.5" />
        {destination.country}
      </p>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className={cn(headingFont.className, "text-lg leading-snug")}>
          {destination.destinationName}
        </h3>
        <p className="shrink-0 font-semibold">
          ${destination.price}
          <span className="text-xs font-normal text-muted-foreground">
            /Person
          </span>
        </p>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="size-3.5" />
        {formatDuration(destination.duration)}
      </p>

      <Link
        href={`/destination/${destination._id}`}
        className="mt-0.5 flex w-fit items-center gap-1 rounded-sm text-xs font-semibold tracking-wider text-cyan-600 uppercase outline-none transition-colors hover:text-cyan-500 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        Book Now
        <ArrowUpRight className="size-3.5" />
      </Link>
    </article>
  );
}

/** Uncached fetch lives here so it can stream inside a Suspense boundary (cacheComponents). */
async function DestinationGrid() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`);
  const destinations = (await res.json()) as Destination[];

  if (destinations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No destinations yet.</p>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Showing {destinations.length} destination
        {destinations.length === 1 ? "" : "s"}
      </p>
      <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </>
  );
}

function DestinationGridSkeleton() {
  return (
    <>
      <Skeleton className="h-4 w-40" />
      <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="aspect-[8/5] w-full rounded-lg" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </>
  );
}

const AllDestinationPage = () => {
  return (
    <section className="px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<DestinationGridSkeleton />}>
          <DestinationGrid />
        </Suspense>
      </div>
    </section>
  );
};

export default AllDestinationPage;
