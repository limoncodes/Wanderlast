import { ArrowUpRight } from "lucide-react";
import { EB_Garamond } from "next/font/google";
import { cn } from "cn";

const headingFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#" },
      { label: "My Bookings", href: "#" },
      { label: "My Profile", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
]

function XMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-4 rounded-[3px]"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124M7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  )
}

function InstagramMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const socials = [
  { label: "X (Twitter)", href: "#", icon: XMark },
  { label: "LinkedIn", href: "#", icon: LinkedInMark },
  { label: "Instagram", href: "#", icon: InstagramMark },
]

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      data-slot="footer"
      className={cn("bg-[#0d0d0d] px-6 py-16 text-white sm:px-10 lg:px-16", className)}
    >
      <div className="mx-auto max-w-6xl">
        <p className={cn(headingFont.className, "text-5xl font-semibold sm:text-6xl lg:text-7xl")}>
          Wanderlast
        </p>
        <p className="mt-3 text-sm text-white/60">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className={cn(headingFont.className, "text-sm uppercase tracking-[0.15em]")}>
              Newsletter
            </h3>
            <p className="mt-3 text-xs text-white/55">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-5 max-w-[280px]">
              {/* eslint-disable-next-line jsx-a11y/no-autofocus -- placeholder demo form */}
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="h-11 w-full bg-[#2b2b2b] px-4 pr-12 text-sm text-white placeholder:text-white/45 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute inset-y-0 right-0 flex size-11 items-center justify-center text-white/60 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className={cn(headingFont.className, "text-sm uppercase tracking-[0.15em]")}>
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/75 outline-none transition-colors hover:text-white focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className={cn(headingFont.className, "text-sm uppercase tracking-[0.15em]")}>
              Contact Us
            </h3>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href="tel:+17869011622"
                  className="text-sm text-white/75 outline-none transition-colors hover:text-white focus-visible:underline"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlast.com"
                  className="text-sm text-white/75 outline-none transition-colors hover:text-white focus-visible:underline"
                >
                  info@wanderlast.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 h-px bg-white/10" />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/85 outline-none transition-colors hover:text-white focus-visible:text-white"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
