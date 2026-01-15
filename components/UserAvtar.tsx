"use client";

import ROUTES from "@/constant/route";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
  noLink?: boolean;
}

const UserAvatar = ({
  id,
  name,
  imageUrl,
  fallbackClassName,
  className = "h-9 w-9 rounded-full",
  noLink = false,
}: Props) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarContent = (
    <Avatar
      className={cn(
        "ring-2 ring-border/50 dark:ring-border/30 transition-all duration-200 hover:ring-primary/50 hover:scale-105",
        className
      )}
    >
      {imageUrl && !imgError ? (
        imageUrl.startsWith("data:image/") ? (
          <Image
            src={imageUrl}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        )
      ) : (
        <AvatarFallback
          className={cn(
            // Light theme: vibrant gradient
            "bg-linear-to-br from-primary to-primary/70 text-primary-foreground",
            // Dark theme: slightly muted but still visible
            "dark:from-primary/90 dark:to-primary/60",
            // Text styling
            "font-semibold text-sm",
            fallbackClassName
          )}
        >
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );

  if (noLink) {
    return avatarContent;
  }

  return <Link href={ROUTES.PROFILE(id)}>{avatarContent}</Link>;
};

export default UserAvatar;
