import React from "react";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import Theme from "./Theme";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvtar from "@/components/UserAvtar";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02]"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full  shadow-sm">
              <Image
                className="object-cover transition-transform group-hover:scale-110"
                src="/queryStackLogo.png"
                alt="Logo"
                // width={164}
                // height={164}
                fill
              />
            </div>
            <p className="hidden font-heading text-2xl font-bold tracking-tight text-foreground sm:inline-block">
              Query
              <span className="bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                Stack
              </span>
            </p>
          </Link>
          <div className="flex flex-1 items-center justify-center max-w-md mx-auto">
            <div className="group relative w-full translate-z-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search
                  size={18}
                  className="text-muted-foreground transition-colors group-focus-within:text-primary"
                />
              </div>
              <input
                type="text"
                className="block w-full rounded-2xl border border-border/50 bg-secondary/30 p-2.5 pl-11 text-sm text-foreground transition-[background-color,border-color,ring-color] duration-300 placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                placeholder="Search everything..."
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Theme />
            </div>
            {session?.user?.id && (
              <div className="ring-offset-background transition-transform hover:scale-105 active:scale-95">
                <UserAvtar
                  id={session.user.id}
                  name={session.user.name || ""}
                  imageUrl={session.user?.image}
                />
              </div>
            )}

            <div className="sm:hidden">
              <Theme />
            </div>

            <div className="flex items-center sm:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
