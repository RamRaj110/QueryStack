import React from "react";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_ANSWER } from "@/constant/state";
import AnswerCard from "@/components/cards/AnswerCard";
import { Answers, ActionResponse } from "@/Types/global";
import { formatNumber } from "@/lib/utils";
import CommonFilter from "../filter/CommonFilter";
import { AnswerFilters } from "@/constant/filters";
import Pagination from "../Pagination";
import { MessageCircle } from "lucide-react";

interface Props extends ActionResponse<Answers[]> {
  totalAnswers: number;
  page: number;
  isNext: boolean;
}

const AllAnswers = ({
  data,
  success,
  error,
  totalAnswers,
  page,
  isNext,
}: Props) => {
  return (
    <div className="mt-8 sm:mt-11">
      {/* --- Header Section --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Answer Count with Icon */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground sm:text-xl">
            {formatNumber(totalAnswers)}{" "}
            <span className="text-muted-foreground font-normal">
              {totalAnswers === 1 ? "Answer" : "Answers"}
            </span>
          </h3>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-auto">
          <CommonFilter
            filters={AnswerFilters}
            otherClasses="w-full sm:min-w-[180px]"
            containerClasses="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="my-6 h-px bg-border" />

      {/* --- Answer List --- */}
      <DataRenderer
        data={data}
        success={success}
        error={error}
        empty={EMPTY_ANSWER}
        render={(answers) => (
          <div className="space-y-0">
            {answers.map((answer) => (
              <AnswerCard key={answer._id} {...answer} />
            ))}
          </div>
        )}
      />

      {/* --- Pagination --- */}
      {data && data.length > 0 && (
        <Pagination page={page} isNext={isNext || false} />
      )}
    </div>
  );
};

export default AllAnswers;
