import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import TagCard from "../cards/TagCard";
import { ChevronRight, Divide } from "lucide-react";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  // const { success, data: hotQuestions, error } = await getHotQuestions();
  // const {
  //   success: tagSuccess,
  //   data: tags,
  //   error: tagError,
  // } = await getTopTags();

  // Optemize this code
  const [
    { success, data: hotQuestions, error },
    { success: tagSuccess, data: tags, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="sticky right-0 top-16 hidden h-[calc(100vh-64px)] w-[330px] flex-col border-l border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur-xl xl:flex overflow-y-auto custom-scrollbar transition-[background-color,border-color] duration-300">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-linear-to-b from-primary to-primary/40" />
          <h3 className="font-heading text-lg font-bold text-foreground uppercase tracking-widest text-[11px] opacity-70">
            Top Questions
          </h3>
        </div>

        <div className="flex flex-col gap-5">
          <DataRenderer
            data={hotQuestions}
            error={error}
            success={success}
            empty={{
              title: "No Questions Found",
              message: "No questions found",
            }}
            render={(hotQuestions) => (
              <div className="flex flex-col gap-5">
                {hotQuestions.map((question) => (
                  <Link
                    key={question.id}
                    href={ROUTES.QUESTION(question._id)}
                    className="group flex cursor-pointer items-start justify-between gap-4 transition-all"
                  >
                    <p className="font-body text-[13px] font-semibold leading-relaxed text-muted-foreground/90 transition-colors group-hover:text-primary line-clamp-2">
                      {question.title}
                    </p>

                    <ChevronRight
                      size={14}
                      className="mt-1 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* --- Popular Tags Section --- */}
      <div className="mt-12 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-linear-to-b from-indigo-500 to-indigo-500/40" />
          <h3 className="font-heading text-lg font-bold text-foreground uppercase tracking-widest text-[11px] opacity-70">
            Popular Tags
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <DataRenderer
            data={tags}
            error={tagError}
            success={tagSuccess}
            empty={{
              title: "No Tags Found",
              message: "No tags found",
            }}
            render={(tags) => (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagCard
                    key={tag._id}
                    id={tag._id!}
                    name={tag.name}
                    questions={tag.questionCount}
                    showCount
                    compact
                  />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
