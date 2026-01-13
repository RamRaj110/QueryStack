import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { formatNumber, getTimestamp } from "@/lib/utils";
import TagCard from "./TagCard";
import Metric from "../Matric";
import { Question } from "@/Types/global";
import EditDeleteAction from "../user/EditDeleteAction";

interface Props {
  question: Question;
  showActionBtns?: boolean;
}

const QuestionCard = ({ question, showActionBtns = false }: Props) => {
  const {
    _id,
    title,
    tags,
    author,
    upvotes,
    views,
    answers,
    createdAt,
    description,
    content,
  } = question;

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:bg-card/20 sm:p-8 backdrop-blur-sm">
      {/* Decorative Gradient on Hover */}
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-[opacity,background-color] duration-500 group-hover:opacity-100 rounded-2xl" />

      {/* --- Top Row: Timestamp & Actions --- */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="subtle-regular text-muted-foreground font-medium">
            {getTimestamp(createdAt)}
          </span>
        </div>
        {showActionBtns && (
          <div className="flex scale-90 opacity-0 transition-[transform,opacity] duration-300 group-hover:opacity-100 group-hover:scale-100">
            <EditDeleteAction id={_id} type="question" />
          </div>
        )}
      </div>

      {/* --- Title --- */}
      <Link
        href={ROUTES.QUESTION ? ROUTES.QUESTION(_id) : "#"}
        className="block group/title"
      >
        <h3 className="font-heading text-xl font-bold text-foreground transition-colors duration-300 group-hover/title:text-primary sm:text-2xl line-clamp-2 leading-tight">
          {title}
        </h3>
      </Link>

      {/* --- Description --- */}
      <div className="w-full">
        <p className="font-body text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">
          {description || content || "No description provided."}
        </p>
      </div>

      {/* --- Tags --- */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <TagCard key={index} id={tag._id} name={tag.name} compact={true} />
        ))}
      </div>

      {/* --- Footer --- */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6">
        {/* Author */}
        {author ? (
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex items-center gap-2.5 transition-all hover:opacity-80"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-border/50 transition-all group-hover:ring-primary/30">
              {author.image && author?.image !== "undefined" ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-[12px] font-bold text-primary">
                  {author.name ? author.name[0].toUpperCase() : "?"}
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-foreground/90">
              {author.name}
            </p>
          </Link>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[12px] font-bold text-muted-foreground">
              ?
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Anonymous
            </p>
          </div>
        )}

        {/* Metrics */}
        <div className="flex items-center gap-4 bg-secondary/20 rounded-full px-4 py-2 border border-border/30">
          <Metric
            icon={ThumbsUp}
            value={formatNumber(upvotes)}
            title="Votes"
            textStyles="text-foreground text-xs font-bold"
            imgStyles="text-primary"
          />
          <div className="h-4 w-px bg-border/50" />
          <Metric
            icon={MessageCircle}
            value={formatNumber(answers)}
            title="Answers"
            textStyles="text-foreground text-xs font-bold"
            imgStyles="text-indigo-500"
          />
          <div className="h-4 w-px bg-border/50" />
          <Metric
            icon={Eye}
            value={formatNumber(views)}
            title="Views"
            textStyles="text-foreground text-xs font-bold"
            imgStyles="text-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
