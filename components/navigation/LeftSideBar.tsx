import React from "react";
import NavLink from "./navbar/NavLink";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { Button } from "../ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { auth, signOut } from "@/auth";

const LeftSideBar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <section className="sticky left-0 top-16 hidden h-[calc(100vh-64px)] flex-col justify-between overflow-y-auto border-r border-border/40 bg-background/60 pt-8 pb-6 shadow-sm backdrop-blur-xl transition-[width,background-color,border-color] duration-300 ease-in-out md:flex md:w-20 lg:w-64">
      {/* Top Section: Navigation */}
      <div className="flex flex-col gap-4 px-2 lg:px-4">
        <NavLink userId={userId} />
      </div>

      {/* Bottom Section: Auth Buttons */}
      <div className="flex flex-col gap-3 px-2 lg:px-4">
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
              className="h-11 w-full justify-start gap-3 rounded-xl border-border/50 bg-transparent px-4 font-body font-medium transition-[background-color,color,transform] duration-300 hover:bg-destructive/10 hover:text-destructive active:scale-[0.98] md:justify-center lg:justify-start"
            >
              <LogOut size={20} />
              <span className="max-lg:hidden">Logout</span>
            </Button>
          </form>
        ) : (
          <>
            <Link href={ROUTES.SIGNIN || "/signin"} className="w-full">
              <Button
                variant="outline"
                className="h-11 w-full justify-start gap-3 rounded-xl border-border/50 bg-transparent px-4 font-body font-medium transition-[background-color,color,transform] duration-300 hover:bg-secondary active:scale-[0.98] md:justify-center lg:justify-start"
              >
                <LogIn size={20} className="text-muted-foreground" />
                <span className="max-lg:hidden">Log In</span>
              </Button>
            </Link>

            <Link href={ROUTES.SIGNUP || "/signup"} className="w-full">
              <Button className="h-11 w-full justify-start gap-3 rounded-xl bg-primary px-4 font-heading font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-[background-color,box-shadow,transform] duration-300 hover:bg-primary/90 active:scale-[0.98] md:justify-center lg:justify-start">
                <UserPlus size={20} />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;
