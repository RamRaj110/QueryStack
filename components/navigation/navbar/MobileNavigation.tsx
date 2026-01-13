import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constant/route";
import NavLink from "./NavLink";
import { auth, signOut } from "@/auth";
const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden transition-all hover:bg-secondary/80 active:scale-95"
        >
          <Menu className="h-6 w-6 text-foreground" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      {/* Sheet Content - Opens from Left */}
      <SheetContent
        side="left"
        className="w-[300px] border-r border-border bg-background/95 backdrop-blur-xl"
      >
        {/* Header: Logo & Brand Name */}
        <SheetHeader className="text-left py-4">
          <SheetTitle asChild>
            <Link
              href={ROUTES.HOME}
              className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full  shadow-sm">
                <Image
                  className="object-cover transition-transform group-hover:scale-110"
                  src="/queryStackLogo.png"
                  alt="Logo"
                  fill
                />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Query
                <span className="bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                  Stack
                </span>
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="">
          <NavLink isMobileNav />
        </div>

        {/* Authentication Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {userId ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                type="submit"
                variant="outline"
                className="h-11 w-full justify-start gap-3 rounded-xl border-border/50 bg-transparent px-4 font-body font-medium transition-all hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </Button>
            </form>
          ) : (
            <>
              {/* Login Button */}
              <Link href={ROUTES.SIGNIN || "/signin"}>
                <Button
                  variant="outline"
                  className="h-11 w-full justify-start gap-3 rounded-xl border-border/50 bg-transparent px-4 font-body font-medium transition-all hover:bg-secondary active:scale-[0.98]"
                >
                  <LogIn size={20} className="text-muted-foreground" />
                  <span>Log In</span>
                </Button>
              </Link>

              {/* Sign Up Button */}
              <Link href={ROUTES.SIGNUP || "/signup"}>
                <Button className="h-11 w-full justify-start gap-3 rounded-xl bg-primary px-4 font-heading font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]">
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
