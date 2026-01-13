import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { Badge } from "../ui/badge";
import { getIconClassName, getTechDescription } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  children?: React.ReactNode;
}

const TagCard = ({
  id,
  name,
  questions,
  showCount,
  compact,
  children,
}: Props) => {
  const iconClass = getIconClassName(name);
  const description = getTechDescription(name);
  if (compact) {
    return (
      <Link
        href={ROUTES.TAG(id)}
        className="flex items-center justify-between gap-3 group"
      >
        <Badge className="bg-secondary/40 text-muted-foreground hover:bg-primary/20 hover:text-primary rounded-xl border-border/50 px-3 py-1.5 transition-all group-hover:scale-105 active:scale-95 shadow-none">
          <div className="flex items-center gap-2">
            <i className={`${iconClass} text-xs transition-colors`}></i>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {name}
            </span>
          </div>
        </Badge>

        {showCount && (
          <p className="text-xs font-bold text-muted-foreground/60 group-hover:text-primary transition-colors">
            {questions}+
          </p>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.TAG(id)}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-8 transition-[transform,border-color,box-shadow,background-color] duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 dark:bg-card/20 backdrop-blur-md"
    >
      {/* --- Animated Background Glow --- */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl transition-[opacity,transform,background-color] duration-700 group-hover:bg-primary/10 group-hover:scale-125 opacity-0 group-hover:opacity-100" />
      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/5 blur-2xl transition-[opacity,transform,background-color] duration-700 group-hover:bg-indigo-500/10 group-hover:scale-125 opacity-0 group-hover:opacity-100" />

      {/* Semi-transparent overlay for better text visibility */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/40 backdrop-blur-sm" />

      <div className="relative z-10 flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-secondary/80 text-foreground rounded-xl border border-border/50 px-4 py-2 shadow-sm transition-[transform,background-color,color,box-shadow,border-color] duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.15em]">
              <i
                className={`${iconClass} text-lg transition-transform duration-500 group-hover:rotate-12`}
              ></i>
              <span>{name}</span>
            </div>
          </Badge>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium leading-relaxed text-muted-foreground/80 line-clamp-2 transition-colors duration-300 group-hover:text-foreground/90">
            {description}
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
              {questions}+
            </span>
            <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
              Questions
            </span>
          </div>
        </div>
      </div>

      {/* --- View Topic Hover Indicator --- */}
      <div className="absolute bottom-4 right-8 translate-x-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
          Explore Topic
          <span className="text-lg">→</span>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
