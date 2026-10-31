
import Image from "next/image";
import Link from "next/link";
import { EB_Garamond } from "next/font/google";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    MapPin,
    Star,
    Trash2,
} from "lucide-react";
import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DestinationDialogEdit from "@/components/DestinationDialogEdit";
import DestinationdetailsDelet from "@/components/DestinationdetailsDelet";
import BookingCard from "@/components/booking/Bookcard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFormServer } from "@/lib/getTokenFormServer";


const headingFont = EB_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
});

type Destination = {
    _id: string;
    destinationName: string;
    country: string;
    category: string;
    price: number | string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

/** "7" → "7 Days/6 Nights"; free-text values (e.g. "3 Days/2 Nights") pass through. */
function formatDuration(duration: string) {
    const value = duration.trim();
    if (/^\d+$/.test(value)) {
        const days = Number(value);
        return days > 1 ? `${value} Days/${days - 1} Nights` : `${value} Day`;
    }
    return value;
}

/** "2026-11-15" → "11/15/2026" */
function formatDate(date: string) {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-US");
}

function Highlights({ destination }: { destination: Destination }) {
    const items = [
        `${destination.category} experiences in ${destination.country}`,
        `${formatDuration(destination.duration)} curated itinerary`,
        `Departure on ${formatDate(destination.departureDate)}`,
        "24/7 customer support",
    ];

    return (
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
// ============================BOOK CARD =========================================================================


const DestinationDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {

    const { id } = await params;
    const token = await await getTokenFormServer()
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination/${id}`,{
         headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return (
            <section className="px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
                <div className="mx-auto max-w-6xl text-center">
                    <p className="text-sm text-muted-foreground">
                        Destination not found.
                    </p>
                    <Link
                        href="/destination"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "mt-4 h-9 gap-2 rounded-md px-4",
                        )}
                    >
                        <ArrowLeft />
                        Back to Destinations
                    </Link>
                </div>
            </section>
        );
    }

    const destination = (await res.json()) as Destination;

    return (
        <section className="px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="mx-auto max-w-6xl">
                {/* Top bar: back link + actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/destination"
                        className="flex w-fit items-center gap-2 rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Destinations
                    </Link>

                    <div className="flex items-center gap-3">
                        
                        <DestinationDialogEdit destination={destination} />
                        <DestinationdetailsDelet id={destination._id}/>
                        
                    </div>
                </div>

                {/* Hero image */}
                <div className="relative mt-6 aspect-[16/7] w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                        src={destination.imageUrl}
                        alt={destination.destinationName}
                        fill
                        sizes="(min-width: 1024px) 1100px, 100vw"
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                    {/* Main content */}
                    <div>
                        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            {destination.country}
                        </p>

                        <h1
                            className={cn(
                                headingFont.className,
                                "mt-1 text-3xl leading-tight sm:text-4xl",
                            )}
                        >
                            {destination.destinationName}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                            <span className="flex items-center gap-1.5">
                                <Star className="size-4 fill-emerald-600 text-emerald-600" />
                                4.9
                                <span className="font-normal text-muted-foreground">
                                    (234 reviews)
                                </span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="size-4 text-muted-foreground" />
                                {formatDuration(destination.duration)}
                            </span>
                            <span className="flex items-center gap-1.5 font-normal text-muted-foreground">
                                {destination.category}
                            </span>
                        </div>

                        <h2 className={cn(headingFont.className, "mt-8 text-2xl")}>
                            Overview
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                            {destination.description}
                        </p>

                        <h2 className={cn(headingFont.className, "mt-8 text-2xl")}>
                            Highlights
                        </h2>
                        <Highlights destination={destination} />
                    </div>

                    {/* Booking sidebar */}
                    <div className="lg:sticky lg:top-8 lg:self-start">
                        <BookingCard destination={destination} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinationDetailsPage;
