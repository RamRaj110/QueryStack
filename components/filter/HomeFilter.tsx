"use client";

import { Button } from "@/components/ui/button";
import { formUrlQuery, removeKeyformUrlQuery } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const HomePageFilters = [
  { name: "react", value: "react" },
  { name: "javascript", value: "javascript" },
  { name: "node", value: "node" },
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" },
];

function HomeFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState(searchParams.get("filter") || "");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = removeKeyformUrlQuery({
        params: searchParams.toString(),
        keyToRemove: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleTypeClick(item.value)}
          className={`body-medium rounded-xl px-6 py-3 capitalize transition-all duration-300 shadow-none hover:scale-105 active:scale-95 ${
            active === item.value
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60 border border-border/40"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
