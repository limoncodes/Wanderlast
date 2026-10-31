"use client";

import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destination" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/myBook" },
  
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession()
  const user = session?.user
  const handlesignOut = () => {
    authClient.signOut()
  }



  return (
    <header
      data-slot="navbar"
      className="relative z-10 bg-background text-foreground"
    >
      <div className="relative flex h-14 items-center px-6">
        <nav aria-label="Main" className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "transition-colors outline-none  focus-visible:ring-2 focus-visible:ring-ring/50",
                  isActive ? "text-cyan-600" : "text-foreground/85"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Centered wordmark */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-2xl font-bold tracking-tight text-cyan-600"
        >
          Wanderlast
        </Link>

        <div className="ml-auto flex items-center gap-6 text-sm">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-foreground/85 transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <UserRound className="size-4" />
            Profile
          </Link>
          {
            user ? <Popover>
              <PopoverTrigger nativeButton={false} render={<Avatar>
                <AvatarImage referrerPolicy="no-referrer" src={user?.image ?? undefined} />

                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>}>

              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <Button variant={"destructive"} onClick={handlesignOut}>Signout</Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover> : <> <Link
              href="/login"
              className="text-foreground/85 transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Login
            </Link> </>
          }





          <Link
            href="/login"
            className="text-foreground/85 transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="text-foreground/85 transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}