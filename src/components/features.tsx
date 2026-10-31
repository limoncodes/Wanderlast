import { Compass, Headphones, ShieldCheck } from "lucide-react";
import { EB_Garamond } from "next/font/google";
import { cn } from "cn";

const headingFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const features = [
  {
    icon: Compass,
    label: "Explore",
    title: "Curated Destinations",
    description:
      "Handpicked stays and experiences across 120+ destinations, vetted by our local travel experts.",
  },
  {
    icon: ShieldCheck,
    label: "Trust",
    title: "Price & Safety Guarantee",
    description:
      "Transparent pricing with no hidden fees, plus 24/7 trip protection on every booking.",
  },
  {
    icon: Headphones,
    label: "Support",
    title: "Always At Your Side",
    description:
      "Real humans, around the clock. One tap in the app connects you to a travel specialist.",
  },
]

export function Features({ className }: { className?: string }) {
  return (
    <section
      data-slot="features"
      className={cn(
        "bg-[#FDF6EC] py-20 px-6 text-slate-900 sm:px-10 lg:px-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Why Choose Us
          </p>
          <h2
            className={cn(
              headingFont.className,
              "mx-auto max-w-2xl mt-3 text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl"
            )}
          >
            Why Travel With Wanderlast
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              data-slot="feature-card"
              className="flex flex-col items-center rounded-xl bg-white/90 px-8 py-10 text-center ring-1 ring-slate-900/5 transition-shadow hover:shadow-lg hover:shadow-slate-900/5"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <feature.icon className="size-6" />
              </span>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {feature.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
