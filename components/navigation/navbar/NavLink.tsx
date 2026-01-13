"use client";

import { sidebarLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "@/components/ui/sheet";

function NavLink({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-full">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={`
              group relative flex items-center gap-4 rounded-xl p-3 transition-all duration-300
              ${
                !isMobileNav
                  ? "justify-start md:justify-center lg:justify-start"
                  : "justify-start"
              }
              ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground font-medium"
              }
            `}
          >
            {isActive && (
              <span className="absolute -left-1 hidden h-6 w-1 rounded-full bg-primary lg:block" />
            )}

            <span
              className={`transition-transform duration-300 group-hover:scale-110 ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, {
                size: 20,
              })}
            </span>

            {/* Label */}
            <p
              className={`
                font-body
                ${
                  isMobileNav
                    ? "text-[15px] font-semibold tracking-tight"
                    : "text-sm font-semibold max-lg:hidden"
                } 
                leading-none
            `}
            >
              {item.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </div>
  );
}

export default NavLink;
