import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import SaveQuestion from "@/components/questions/SaveQuestion";
import { Button } from "@/components/ui/button";
import Votes from "@/components/votes/Votes";
import ROUTES from "@/constant/route";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";
import { getQuestion, increamentView } from "@/lib/actions/question.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import {
  Clock,
  Eye,
  MessageCircle,
  Share2,
  ThumbsUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { after } from "next/server";
import React, { Suspense } from "react";
import { RouteParams } from "@/Types/global";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: RouteParams) {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: [id] });

  if (!success || !question) {
    return createMetadata({
      title: "Question Not Found",
      description: "This question could not be found.",
      noIndex: true,
    });
  }

  const contentSnippet = question.content
    .substring(0, 150)
    .replace(/<[^>]*>/g, "");
  const tags = question.tags.map((tag) => tag.name).join(", ");

  return createMetadata({
    title: question.title,
    description: `${contentSnippet}... | Tags: ${tags} | ${question.answers} answers | Asked by ${question.author?.name}`,
  });
}

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, filter } = await searchParams;

  const {
    success,
    data: question,
    error,
  } = await getQuestion({ questionId: [id] });

  after(async () => {
    await increamentView({ questionId: id });
  });

  if (!success && error?.message === "Unauthorized") {
    redirect(ROUTES.SIGNIN);
  }

  if (!success || !question) {
    notFound();
  }

  const {
    success: areAnswersSuccess,
    data: answersResult,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });

  const hasSavedPromise = hasSavedQuestion({
    questionId: question._id,
  });

  return (
    <div className="flex flex-col gap-8">
      {/* --- QUESTION CARD --- */}
      <article className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/40 p-6 sm:p-8 backdrop-blur-sm">
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="relative z-10">
          {/* Author \u0026 Actions Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Author Info */}
            <Link
              href={ROUTES.PROFILE(question.author?._id || "")}
              className="group flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-md opacity-50" />
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-border transition-[ring-color,transform] duration-300 group-hover:ring-primary/50 group-hover:scale-105">
                  {question.author?.image ? (
                    <Image
                      src={question.author.image}
                      alt={question.author.name || "Author"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-lg font-bold text-primary">
                      {question.author?.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {question.author?.name || "Anonymous"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Asked {getTimestamp(question.createdAt)}</span>
                </div>
              </div>
            </Link>

            {/* Vote \u0026 Save Actions */}
            <div className="flex items-center gap-3">
              <Suspense
                fallback={
                  <div className="h-10 w-32 animate-pulse rounded-xl bg-secondary/50" />
                }
              >
                <Votes
                  upvotes={question.upvotes}
                  downvotes={question.downvotes}
                  targetId={question._id}
                  targetType="question"
                  hasVotePromise={hasVotedPromise}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-secondary/50" />
                }
              >
                <SaveQuestion
                  questionId={question._id}
                  hasSavedPromise={hasSavedPromise}
                />
              </Suspense>
            </div>
          </div>

          {/* Question Title */}
          <h1 className="mt-8 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            {question.title}
          </h1>

          {/* Stats Row */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2 border border-blue-500/20">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold text-foreground">
                {formatNumber(question.views)} views
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 border border-emerald-500/20">
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-semibold text-foreground">
                {formatNumber(question.answers)}{" "}
                {question.answers === 1 ? "answer" : "answers"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-yellow-500/10 px-4 py-2 border border-yellow-500/20">
              <ThumbsUp className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">
                {formatNumber(question.upvotes)} votes
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-border/50" />

          {/* Question Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none sm:prose-base lg:prose-lg">
            <Preview content={question.content} />
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <TagCard
                key={tag._id}
                id={tag._id}
                name={tag.name}
                compact={true}
              />
            ))}
          </div>
        </div>
      </article>

      {/* --- ANSWER FORM SECTION --- */}
      <section className="rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8 backdrop-blur-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-primary to-primary/40" />
          <h2 className="text-2xl font-bold text-foreground">Your Answer</h2>
        </div>
        <AnswerForm
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>

      {/* --- ANSWERS SECTION --- */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-500/40" />
            <h2 className="text-2xl font-bold text-foreground">
              {formatNumber(question.answers)}{" "}
              {question.answers === 1 ? "Answer" : "Answers"}
            </h2>
          </div>
        </div>
        <AllAnswers
          page={Number(page) || 1}
          isNext={answersResult?.isNext || false}
          data={answersResult?.answers}
          success={areAnswersSuccess}
          error={answersError}
          totalAnswers={question.answers}
        />
      </section>
    </div>
  );
};

export default QuestionDetails;
