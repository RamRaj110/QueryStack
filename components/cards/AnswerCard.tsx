import React, { Suspense } from "react";
import Link from "next/link";
import { cn, getTimestamp } from "@/lib/utils";
import ROUTES from "@/constant/route";
import Preview from "../editor/Preview";
import Votes from "../votes/Votes";
import { hasVoted } from "@/lib/actions/vote.action";
import { Answers } from "@/Types/global";
import EditDeleteAction from "../user/EditDeleteAction";
import Image from "next/image";

interface Props extends Answers {
  containerClass?: string;
  showMore?: boolean;
  showActionBtns?: boolean;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClass,
  showMore = false,
  showActionBtns = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article
      key={_id}
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-primary/30 hover:shadow-md dark:bg-card/40 dark:hover:bg-card/60 sm:p-8 mb-4",
        containerClass
      )}
    >
      {/* Decorative Gradient on Hover */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl" />

      <span id={`answer-${_id}`} className="absolute -top-20" />

      {/* --- Top Row: Author & Actions --- */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={ROUTES.PROFILE(author?._id)}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          {/* Avatar */}
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-border transition-all group-hover:ring-primary/40">
            {author?.image ? (
              <Image
                src={author.image}
                alt={author.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">
                {author?.name?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="font-heading text-sm font-semibold text-foreground sm:text-base">
              {author?.name || "Anonymous"}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              answered {getTimestamp(createdAt)}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {showActionBtns && (
            <div className="scale-90 opacity-0 transition-opacity group-hover:opacity-100">
              <EditDeleteAction id={_id} type="answer" />
            </div>
          )}

          {/* Votes - Desktop Position */}
          <div className="hidden sm:block">
            <Suspense
              fallback={
                <div className="h-8 w-24 animate-pulse rounded-md bg-secondary" />
              }
            >
              <Votes
                targetId={_id}
                targetType="answer"
                upvotes={upvotes}
                downvotes={downvotes}
                hasVotePromise={hasVotedPromise}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* --- Answer Content --- */}
      <div className="mt-2 prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed font-body">
        <Preview content={content} />
      </div>

      {/* --- Footer Area --- */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-6">
        {showMore && question && (
          <Link
            href={`/question/${question}#answer-${_id}`}
            className="text-sm font-semibold text-primary transition-all hover:translate-x-1"
          >
            Read full answer →
          </Link>
        )}

        {/* Votes - Mobile Position */}
        <div className="flex justify-end sm:hidden">
          <Suspense
            fallback={
              <div className="h-8 w-24 animate-pulse rounded-md bg-secondary" />
            }
          >
            <Votes
              targetId={_id}
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              hasVotePromise={hasVotedPromise}
            />
          </Suspense>
        </div>
      </div>
    </article>
  );
};

export default AnswerCard;
