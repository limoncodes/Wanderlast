
'use client';

import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Eye,
  Trash2,
  CheckCircle2,
  Clock3,
  CalendarX,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type Booking = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate: string;
  bookingDate: string;
  description: string;
  image: string;
  imageUrl: string;
  username: string;
  email: string;
  status?: string;
};

type Props = {
  booking?: Booking[] | null;
  onCancel?: (id: string) => void;
  onView?: (booking: Booking) => void;
};

const MybookingCard = ({
  booking,
  onCancel,
  onView,
}: Props) => {
  const bookingList = Array.isArray(booking) ? booking : [];

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-normal tracking-tight text-[#171717] sm:text-[32px]">
            My Bookings
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Booking List */}
        {bookingList.length > 0 ? (
          <div className="space-y-3">

            {bookingList.map((item) => {
             



              const handlecancle = async () => {
                const res = await fetch(`http://localhost:5000/mybookings/${item._id}`,{
                  method:"DELETE"
                })
                const data = await res.json()
                console.log(data)

                redirect("/myBook")

              }




              return (
                <Card
                  key={item._id}
                  className="flex flex-col gap-3 rounded-none border border-gray-200 bg-white p-3 shadow-none transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:gap-3 sm:p-3.5"
                >
                  {/* Destination Image */}
                  <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-[130px] sm:w-[230px]">
                    <Image
                      src={
                        item.imageUrl ||
                        item.image ||
                        "/placeholder.png"
                      }
                      alt={item.destinationName}
                      fill
                      sizes="(max-width: 640px) 100vw, 230px"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Booking Information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:min-h-[130px]">

                    <div>




                      {/* Destination Name */}
                      <h2 className="mt-1 text-xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-[21px]">
                        {item.destinationName}
                      </h2>

                      {/* Departure Date */}
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500 sm:text-xs">
                        <CalendarDays className="size-3.5 shrink-0" />

                        <span>
                          Departure: {formatDate(item.departureDate)}
                        </span>
                      </div>

                      {/* Booking ID */}
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-500 sm:text-xs">
                        <MapPin className="size-3.5 shrink-0" />

                        <span className="break-all">
                          Booking ID: {item._id}
                        </span>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3">

                      {/* Price */}
                      <h3 className="text-2xl font-medium leading-none text-[#10A6C8]">
                        ${Number(item.price).toLocaleString("en-US")}
                      </h3>

                      {/* Actions */}
                      <div className="flex items-center gap-2">

                        {/* Cancel Button */}

                        <Button 
                        

                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handlecancle}
                          className="h-8 rounded-none border-red-300 bg-white px-3 text-[11px] font-normal text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-3.5" />
                          Cancel
                        </Button>


                        {/* View Button */}
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => onView?.(item)}
                          className="h-8 rounded-none bg-[#14A3C1] px-3 text-[11px] font-normal text-white hover:bg-[#1089A3]"
                        >
                          <Eye className="size-3.5" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (

          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center border border-gray-200 px-5 py-16 text-center">

            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100">
              <CalendarX className="size-8 text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              No Bookings Found
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              You haven&apos;t booked any trips yet. Explore our
              destinations and book your next adventure!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MybookingCard;
