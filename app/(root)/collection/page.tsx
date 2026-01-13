import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import HomeFilter from "@/components/filter/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { CollectionFilters } from "@/constant/filters";
import ROUTES from "@/constant/route";
import { getSavedQuestions } from "@/lib/actions/collection.action";
import { redirect } from "next/navigation";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Collection = async ({ searchParams }: SearchParams) => {
  const session = await auth();
  if (!session) {
    return redirect(ROUTES.SIGNUP);
  }
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });
  const { collection, isNext } = data || {};
  return (
    <div className="flex flex-col gap-10">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-background to-background p-8 border border-border/40 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="h1-bold text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Saved Questions
            </h1>
            <p className="body-regular text-muted-foreground max-w-lg text-lg leading-relaxed">
              Your personal library of curated knowledge. Revisit the questions
              you've saved to keep learning.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEARCH & FILTERS --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <LocalSearch
              route={ROUTES.COLLECTION}
              placeholder="Search saved questions..."
              otherClasses="h-14 bg-card border-border/50 shadow-sm focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
            />
          </div>

          <CommonFilter
            filters={CollectionFilters}
            otherClasses="h-14 sm:min-w-[170px]"
            containerClasses="flex"
          />
        </div>
      </section>

      {/* --- QUESTIONS LIST --- */}
      <section>
        <DataRenderer
          success={success}
          error={error}
          data={collection}
          render={(collection) => (
            <div className="grid grid-cols-1 gap-6">
              {collection?.map((item) => (
                <QuestionCard key={item._id} question={item.question} />
              ))}
            </div>
          )}
        />

        {collection && collection.length > 0 && (
          <div className="mt-10 flex justify-center border-t border-border/50 pt-10">
            <Pagination page={page} isNext={isNext || false} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Collection;
