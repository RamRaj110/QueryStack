import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { User } from "@/Types/global";
import UserAvatar from "../UserAvtar";
import { Badge } from "@/components/ui/badge";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const { _id, name, image, username, reputation } = user;

  return (
    <Link href={ROUTES.PROFILE(_id)} className="block group">
      <article className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-10 text-center transition-[transform,border-color,box-shadow,background-color] duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 dark:bg-card/20 backdrop-blur-md">
        {/* --- Animated Background Glow --- */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl transition-[opacity,transform,background-color] duration-700 group-hover:bg-primary/20 group-hover:scale-125 opacity-0 group-hover:opacity-100" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/5 blur-2xl transition-[opacity,transform,background-color] duration-700 group-hover:bg-indigo-500/10 group-hover:scale-125 opacity-0 group-hover:opacity-100" />

        {/* --- Avatar with Ring Animation --- */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-md group-hover:animate-none group-hover:bg-primary/30 group-hover:blur-lg transition-[opacity,background-color,filter]" />
          <div className="relative rounded-full border-4 border-background p-1 shadow-xl ring-1 ring-border/50 transition-[transform,ring-color] duration-300 group-hover:ring-primary/50 group-hover:scale-110">
            <UserAvatar
              id={_id}
              name={name}
              imageUrl={image}
              className="h-24 w-24"
              fallbackClassName="text-3xl font-bold bg-linear-to-br from-secondary to-secondary/60 text-secondary-foreground"
            />
          </div>
        </div>

        {/* --- Info --- */}
        <div className="relative z-10 w-full space-y-1">
          <h3 className="text-xl font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-1">
            {name}
          </h3>
          <p className="text-sm font-semibold text-muted-foreground/60 tracking-wide">
            @{username}
          </p>
        </div>

        {/* --- reputation & Badge --- */}
        <div className="relative z-10 mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-secondary/30 px-4 py-1.5 border border-border/50 transition-[background-color,border-color] duration-300 group-hover:border-primary/20 group-hover:bg-primary/5">
            <span className="text-xs font-bold text-foreground">
              {reputation || 0}{" "}
              <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">
                Reputation
              </span>
            </span>
          </div>

          <Badge
            variant="secondary"
            className="rounded-xl bg-primary/10 text-primary border-primary/20 px-6 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-[background-color,color,border-color] duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          >
            Member
          </Badge>
        </div>

        {/* --- View Profile Hover Indicator --- */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
            View Profile
          </p>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
