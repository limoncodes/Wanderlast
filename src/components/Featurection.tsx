"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Star, ArrowRight, ArrowLeft } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FeaturedDestination {
  _id: string
  destinationName: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const COUNTRY_FLAGS: Record<string, string> = {
  Bangladesh: "🇧🇩",
  Indonesia: "🇮🇩",
  Nepal: "🇳🇵",
  Maldives: "🇲🇻",
  Thailand: "🇹🇭",
  India: "🇮🇳",
  "Sri Lanka": "🇱🇰",
  "United Arab Emirates": "🇦🇪",
}
const DEFAULT_FLAG = "🌍"
const DEFAULT_RATING = "4.5"
const ITEMS_PER_SLIDE = 3

export default function Featurection() {
  const [destinations, setDestinations] = useState<FeaturedDestination[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi | null>(null)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destination`)
      .then((res) => res.json())
      .then((json: FeaturedDestination[]) => {
        if (!cancelled) {
          setDestinations(json)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Chunk destinations into slides of 3 items each
  const slides = useMemo(() => {
    const chunks: FeaturedDestination[][] = []
    for (let i = 0; i < destinations.length; i += ITEMS_PER_SLIDE) {
      chunks.push(destinations.slice(i, i + ITEMS_PER_SLIDE))
    }
    return chunks
  }, [destinations])

  const handleSelect = useCallback(() => {
    setCurrentIndex(api?.selectedScrollSnap() ?? 0)
  }, [api])

  useEffect(() => {
    if (!api) return
    api.on("select", handleSelect)
    return () => {
      api.off("select", handleSelect)
    }
  }, [api, handleSelect])

  if (loading) {
    return (
      <div className="py-20 px-6 flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading featured destinations...</p>
      </div>
    )
  }

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Destinations
            </h2>
            <p className="text-slate-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/destinations")}
            className="flex items-center gap-2"
          >
            ALL DESTINATIONS
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        {/* Destination carousel: one slide = 3 cards */}
        <Carousel setApi={setApi}>
          <CarouselContent className="flex gap-6">
            {slides.map((slide, slideIndex) => (
              <CarouselItem key={slide[0]?._id ?? slideIndex}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {slide.map((destination) => (
                    <Card
                      key={destination._id}
                      className="overflow-hidden border border-slate-100/60 hover:border-slate-200 transition-colors"
                    >
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <Image
                          src={destination.imageUrl}
                          alt={destination.destinationName}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <Badge
                            variant="outline"
                            className="bg-white border-transparent backdrop-blur-sm px-2.5 py-1 font-medium"
                          >
                            <Star
                              className="mr-1 size-4 fill-yellow-400 text-yellow-400"
                            />
                            {DEFAULT_RATING}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="pt-6 pb-5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
                          <span>
                            {COUNTRY_FLAGS[destination.country] ?? DEFAULT_FLAG}
                          </span>
                          <span>{destination.country}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3">
                          {destination.destinationName}
                        </h3>
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-slate-500">
                            {destination.duration}
                          </span>
                          <span className="font-bold text-slate-900">
                            ${destination.price}/Person
                          </span>
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-cyan-600 font-semibold tracking-wide pl-0 pr-0 justify-start hover:underline hover:text-cyan-500"
                        >
                          BOOK NOW
                          <ArrowRight className="ml-1 size-3.5" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination controls */}
        <div className="mt-12 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {currentIndex + 1}/{slides.length}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => api?.scrollPrev()}
              disabled={!api?.canScrollPrev()}
              className="rounded-full p-1.5"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => api?.scrollNext()}
              disabled={!api?.canScrollNext()}
              className="rounded-full p-1.5"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
