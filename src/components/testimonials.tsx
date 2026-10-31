"use client";

import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { cn } from "cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const headingFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person2.png",
  },
  {
    quote:
      '"Kyoto In Cherry Blossom Season Was A Dream. The Ryokan Stay And Private Tea Ceremony Were Once-In-A-Lifetime Experiences."',
    name: "Emma Davis",
    location: "London, UK",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"The Patagonia Trek Was Challenging But The Scenery And Our Team Made It Worth Every Step. Flawless Planning From Start To Finish."',
    name: "James Rodriguez",
    location: "Madrid, Spain",
    photo: "/images/person2.png",
  },
]

export function Testimonials({ className }: { className?: string }) {
  return (
    <section
      data-slot="testimonials"
      className={cn(
        "bg-white py-20 px-6 text-slate-900 sm:px-10 lg:px-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: true }}>
          {/* Header: heading left, arrows right */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2
                className={cn(
                  headingFont.className,
                  "text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl"
                )}
              >
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious
                variant="outline"
                size="icon-lg"
                // Default is absolutely positioned outside the track; keep it inline in the header.
                style={{ position: "static" }}
                aria-label="Previous testimonials"
              />
              <CarouselNext
                variant="outline"
                size="icon-lg"
                style={{ position: "static" }}
                aria-label="Next testimonials"
              />
            </div>
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((item) => (
              <CarouselItem key={item.name} className="basis-full md:basis-1/2">
                <figure
                  data-slot="testimonial-card"
                  className="flex h-full flex-col overflow-hidden rounded-lg bg-[#F8FAFC] sm:flex-row"
                >
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <blockquote className="text-[15px] font-medium leading-snug text-slate-900">
                      {item.quote}
                    </blockquote>
                    <figcaption className="mt-auto border-t border-slate-200 pt-4">
                      <span className="mt-6 block text-sm text-cyan-600">
                        — {item.name}
                      </span>
                      <span className="mt-1 block text-xs text-slate-400">
                        {item.location}
                      </span>
                    </figcaption>
                  </div>
                  <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-[38%]">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 24vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
