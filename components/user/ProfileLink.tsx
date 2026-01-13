import Link from "next/link";
import React from "react";

interface Props {
  icon: any; // Lucide Icon component
  href?: string;
  title: string;
}

const ProfileLink = ({ icon: Icon, href, title }: Props) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-2 border border-border/30 transition-[background-color,border-color] duration-300 hover:bg-secondary/50 hover:border-border/50">
      <Icon size={16} className="text-muted-foreground shrink-0" />

      {href ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors duration-300 truncate"
        >
          {title}
        </Link>
      ) : (
        <span className="text-foreground font-medium text-sm truncate">
          {title}
        </span>
      )}
    </div>
  );
};

export default ProfileLink;
