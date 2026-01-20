import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import HomeFilter from "@/components/filter/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import ROUTES from "@/constant/route";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home - Ask Questions, Get Answers",
  description:
    "Browse thousands of programming questions and answers from developers worldwide. Ask technical questions, share knowledge, and learn from the community on Query Stack.",
});

export const revalidate = 60;

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });
  const { questions, isNext } = data || {};
  return (
    <div className="flex flex-col gap-10">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-background to-background p-8 border border-border/40 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="h1-bold text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              All Questions
            </h1>
            <p className="body-regular text-muted-foreground max-w-lg text-lg leading-relaxed">
              Explore the latest technical questions and join a community of
              passionate developers sharing knowledge.
            </p>
          </div>

          <Link
            href={ROUTES.ASK_QUESTION}
            className="flex shrink-0 transform justify-center transition-all hover:scale-105 active:scale-95"
          >
            <Button className="primary-gradient h-14 rounded-2xl px-8 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
              Ask a Question
            </Button>
          </Link>
        </div>
      </section>

      {/* --- SEARCH & FILTERS --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <LocalSearch
              route="/"
              placeholder="Search for questions..."
              otherClasses=""
            />
          </div>

          <CommonFilter
            filters={HomePageFilters}
            otherClasses="h-14 sm:min-w-[170px]"
            containerClasses="flex md:hidden"
          />
        </div>

        <HomeFilter />
      </section>

      {/* --- QUESTIONS LIST --- */}
      <div className="flex w-full flex-col gap-6">
        <DataRenderer
          success={success}
          error={error}
          data={questions}
          render={(questions) => (
            <div className="grid grid-cols-1 gap-6">
              {questions?.map((question, index) => (
                <QuestionCard key={index} question={question} />
              ))}
            </div>
          )}
        />
      </div>

      {/* --- PAGINATION --- */}
      {questions && questions.length > 0 && (
        <div className="mt-4 flex justify-center border-t border-border/50 pt-10">
          <Pagination page={page} isNext={isNext || false} />
        </div>
      )}
    </div>
  );
};

export default Home;
