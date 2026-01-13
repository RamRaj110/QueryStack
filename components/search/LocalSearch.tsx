"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeyformUrlQuery } from "@/lib/url";

interface Props {
  route?: string;
  placeholder?: string;
  otherClasses?: string;
}

function LocalSearch({ route, placeholder, otherClasses }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const searchQuery = searchParam.get("search") || "";

  const [query, setQuery] = useState(searchQuery);

  const searchParamsString = searchParam.toString();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const currentSearchParams = new URLSearchParams(searchParam.toString());
      const currentSearch = currentSearchParams.get("search") || "";

      if (query) {
        if (query !== currentSearch) {
          const newUrl = formUrlQuery({
            params: searchParam.toString(),
            key: "search",
            value: query,
          });
          router.push(newUrl, { scroll: false });
        }
      } else {
        if (currentSearch) {
          const newUrl = removeKeyformUrlQuery({
            params: searchParam.toString(),
            keyToRemove: ["search"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, pathname, route, router, searchParam]);

  return (
    <div className={`group relative w-full ${otherClasses}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
      </div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="h-full w-full rounded-2xl border border-border/50 bg-secondary/20 pl-12 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:ring-primary/20 focus-visible:border-primary/50"
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
}

export default LocalSearch;
