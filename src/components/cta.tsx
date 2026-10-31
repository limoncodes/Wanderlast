import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EB_Garamond } from "next/font/google";
import { cn } from "cn";

const headingFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export function CTA({
  image = "/images/CTA.png",
  className,
}: {
  /** Background photo of the CTA strip. */
  image?: string
  className?: string
}) {
  return (
    <section
      data-slot="cta"
      className={cn(
        "relative flex min-h-[440px] items-center justify-center overflow-hidden px-6 py-24 text-center text-white",
        className
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/35" />

      <div className="relative flex flex-col items-center">
        <h2
          className={cn(
            headingFont.className,
            "text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl"
          )}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/85 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <div aria-hidden className="mt-5 h-px w-40 bg-white/70" />

        <a
          href="#"
          className="mt-8 flex h-12 items-center gap-2.5 rounded-md bg-white px-7 text-sm font-semibold tracking-wide text-slate-900 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-white/70"
        >
          BOOK YOUR TRIP TODAY
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
