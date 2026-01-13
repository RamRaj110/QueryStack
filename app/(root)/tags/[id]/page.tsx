import QuestionCard from "@/components/cards/QuestionCard";
import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { HomePageFilters } from "@/constant/filters";
import ROUTES from "@/constant/route";
import { EMPTY_QUESTION } from "@/constant/state";
import { getTagQuestions } from "@/lib/actions/tag.action";
import { getIconClassName, getTechDescription } from "@/lib/utils";
import { RouteParams } from "@/Types/global";
import { redirect } from "next/navigation";
import React from "react";

const TagDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
  });

  if (!success || !data) {
    redirect("/404");
  }

  const { tag, questions, isNext } = data;
  const iconClass = getIconClassName(tag.name);
  const description = getTechDescription(tag.name);

  return (
    <>
      {/* TAG HEADER */}
      <section className="flex w-full flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-secondary p-4">
            <i className={`${iconClass} text-4xl text-primary`}></i>
          </div>
          <div className="flex-1">
            <h1 className="h1-bold text-3xl font-bold capitalize">
              {tag.name}
            </h1>
            <p className="body-regular text-muted-foreground mt-2">
              {description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">
                  {tag.questionCount || 0}
                </span>{" "}
                Questions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTER */}
      <section className="mt-8 flex justify-between gap-4 max-sm:flex-col max-sm:items-center">
        <LocalSearch
          route={ROUTES.TAG(id)}
          placeholder="Search tag questions..."
          otherClasses="flex-1 max-sm:w-full text-center w-full"
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses="max-sm:w-full sm:min-w-32"
          containerClasses="max-sm:w-full"
        />
      </section>

      {/* QUESTIONS LIST */}
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question, index) => (
              <QuestionCard key={question._id || index} question={question} />
            ))}
          </div>
        )}
      />

      {/* PAGINATION */}
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default TagDetails;
