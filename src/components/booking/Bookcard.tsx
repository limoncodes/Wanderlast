
"use client";

import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

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

/** "7" → "7 Days/6 Nights" */
function formatDuration(duration: string) {
    const value = duration.trim();

    if (/^\d+$/.test(value)) {
        const days = Number(value);
        return days > 1
            ? `${value} Days/${days - 1} Nights`
            : `${value} Day`;
    }

    return value;
}

/** "2026-11-15" → "11/15/2026" */
function formatDate(date: string) {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("en-US");
}

const BookingCard = ({
    destination,
}: {
    destination: Destination;
}) => {
    const price =
        typeof destination.price === "number"
            ? `$${destination.price.toLocaleString()}`
            : destination.price;

    // user data 
    const { data: section } = authClient.useSession()
    const user = section?.user




    // handle button
    const handleBooknow = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);


        const departureDate = formData.get("departureDate"); // date
        const data = {
            destinationName: destination.destinationName,
            country: destination.country,
            category: destination.category,
            description: destination.description,
            duration: destination.duration,
            imageUrl: destination.imageUrl,
            price: destination.price,
            bookdate: departureDate,
            adddate: new Date(),
            username: user?.name,
            email: user?.email,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },)

        const result = await res.json();

        if (!res.ok) {
            alert(result.message);
            return;
        }

        alert("Booking successful!");
        console.log(result);



    };

    return (
        <Card className="w-full">
            <CardContent className="p-6 space-y-6">
                {/* Price section */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        Starting from
                    </p>

                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-emerald-600">
                            {price}
                        </span>

                        <span className="text-sm text-muted-foreground">
                            per person
                        </span>
                    </div>
                </div>

                {/* Booking form */}
                <form onSubmit={handleBooknow}>
                    {/* Date input */}
                    <div className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-muted-foreground shrink-0" />

                        <Input
                            type="date"
                            name="departureDate"
                            defaultValue={
                                destination.departureDate?.slice(0, 10) || ""
                            }
                            className="flex-1 bg-background/50"
                            required
                        />
                    </div>

                    {/* Book Now button */}
                    <Button
                        type="submit"
                        className="w-full bg-emerald-600 text-white hover:bg-emerald-700 mt-4"
                    >
                        Book Now
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </form>

                {/* Benefits list */}
                <div className="space-y-2">
                    {[
                        "Free cancellation up to 7 days",
                        "Travel insurance included",
                        "24/7 customer support",
                    ].map((benefit) => (
                        <div
                            key={benefit}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                            <span className="text-emerald-600 shrink-0">
                                ✓
                            </span>

                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingCard;
