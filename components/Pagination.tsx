"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { formUrlQuery } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number | undefined | string;
  isNext: boolean;
  containerClasses?: string;
}

const Pagination = ({ page = 1, isNext, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (type: "prev" | "next") => {
    const nextPageNumber =
      type === "prev" ? Number(page) - 1 : Number(page) + 1;

    // Ensure we don't go below 1
    const value = nextPageNumber > 1 ? nextPageNumber.toString() : "1";

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value,
    });
    router.push(newUrl, { scroll: false }); // Added scroll: false for smoother feel
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-4 py-8",
        containerClasses
      )}
    >
      {/* PREV BUTTON */}
      <Button
        variant="outline"
        size="sm"
        disabled={Number(page) <= 1} // Disable instead of hiding for better layout stability
        onClick={() => handleClick("prev")}
        className={cn(
          "min-h-[36px] min-w-[36px] px-4 gap-2 border-border transition-all",
          Number(page) <= 1 && "opacity-0 pointer-events-none" // Or remove this line to show disabled state
        )}
      >
        <ChevronLeft size={16} />
        <span className="max-sm:hidden">Prev</span>
      </Button>

      {/* PAGE NUMBER INDICATOR */}
      <div className="flex items-center justify-center rounded-md bg-primary px-3.5 py-2">
        <p className="body-semibold text-primary-foreground font-bold text-sm">
          {page}
        </p>
      </div>

      {/* NEXT BUTTON */}
      <Button
        variant="outline"
        size="sm"
        disabled={!isNext}
        onClick={() => handleClick("next")}
        className={cn(
          "min-h-[36px] min-w-[36px] px-4 gap-2 border-border transition-all",
          !isNext && "opacity-0 pointer-events-none"
        )}
      >
        <span className="max-sm:hidden">Next</span>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
