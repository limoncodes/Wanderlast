import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

const headingFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/ 3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
]

export function Banner({
  image = "/images/Banner.png",
  className,
}: {
  /** Background photo of the hero. */
  image?: string
  className?: string
}) {
  return (
    <section
      data-slot="banner"
      className={cn(
        "relative flex h-[calc(100svh-3.5rem)] min-h-[560px] flex-col overflow-hidden text-white",
        className
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/50"
      />

      {/* Hero copy + CTAs */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-12 text-center">
        <h1
          className={cn(
            headingFont.className,
            "max-w-4xl text-4xl leading-[1.08] tracking-wide sm:text-5xl lg:text-6xl xl:text-7xl"
          )}
        >
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex h-12 items-center gap-2.5 bg-cyan-500 px-7 text-sm font-semibold tracking-wide outline-none transition-colors hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-white/70"
          >
            EXPLORE NOW
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="h-12 bg-white/40 px-7 text-sm font-semibold tracking-wide text-slate-900 outline-none backdrop-blur-sm transition-colors hover:bg-white/55 focus-visible:ring-2 focus-visible:ring-white/70"
          >
            VIEW DESTINATION
          </button>
        </div>
      </div>

      {/* Bottom search strip */}
      <div
        role="search"
        className="relative grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-slate-900/70 backdrop-blur-sm sm:grid-cols-[repeat(4,1fr)_auto]"
      >
        {searchFields.map((field) => (
          <button
            key={field.label}
            type="button"
            className="px-6 py-4 text-left outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-inset"
          >
            <span className="block text-[15px] font-semibold">
              {field.label}
            </span>
            <span className="mt-0.5 block text-xs text-white/60">
              {field.value}
            </span>
          </button>
        ))}
        <button
          type="button"
          className="px-10 py-4 text-base font-semibold bg-cyan-500 outline-none transition-colors hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-inset"
        >
          Search
        </button>
      </div>
    </section>
  )
}
