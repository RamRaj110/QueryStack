import { getTags } from "@/lib/actions/tag.action";
import { RouteParams } from "@/Types/global";
import React from "react";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constant/route";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_TAGS } from "@/constant/state";
import { Tag } from "lucide-react";
import TagCard from "@/components/cards/TagCard";
import CommonFilter from "@/components/filter/CommonFilter";
import { TagFilters } from "@/constant/filters";
import Pagination from "@/components/Pagination";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Tags - Browse Topics",
  description:
    "Explore programming topics and technologies on Query Stack. Browse questions by tags including JavaScript, Python, React, Node.js, and more. Find the best answers in your area of expertise.",
});

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, search: query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });
  const { tags, isNext } = data!;

  return (
    <div className="flex flex-col gap-10">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-background to-background p-8 border border-border/40 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="h1-bold text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Tags
            </h1>
            <p className="body-regular text-muted-foreground max-w-lg text-lg leading-relaxed">
              Browse questions by tags. Explore specific topics and find the
              best answers in your area of interest.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEARCH & FILTERS --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <LocalSearch
              route={ROUTES.TAGS}
              placeholder="Search for tags..."
              otherClasses="h-14 bg-card border-border/50 shadow-sm focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
            />
          </div>

          <CommonFilter
            filters={TagFilters}
            otherClasses="h-14 sm:min-w-[170px]"
            containerClasses="flex"
          />
        </div>
      </section>

      {/* --- TAGS GRID --- */}
      <section>
        <DataRenderer
          success={success}
          data={tags}
          error={error}
          empty={EMPTY_TAGS}
          render={(tags) => (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map((tag) => (
                <TagCard
                  key={tag._id}
                  id={tag._id!}
                  name={tag.name}
                  questions={tag.questionCount}
                  showCount
                />
              ))}
            </div>
          )}
        />

        {tags && tags.length > 0 && (
          <div className="mt-10 flex justify-center border-t border-border/50 pt-10">
            <Pagination page={page} isNext={isNext || false} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Tags;
