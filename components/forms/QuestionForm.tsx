"use client";
import "@mdxeditor/editor/style.css";

import dynamic from "next/dynamic";
import React, { KeyboardEvent, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AskQuestionSchema } from "@/lib/validation";
import TagCard from "../cards/TagCard";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constant/route";
import { Question } from "@/Types/global";
const Editor = dynamic(() => import("@/components/editor/MDXeditor"), {
  ssr: false,
});
interface Params {
  question?: Question;
  isEdit?: boolean;
}
const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const { isSubmitting } = form.formState;

  const handleCreateQuestion = async (
    values: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question.id!,
          ...values,
        });

        if (result.success) {
          toast.success("Question updated successfully", {
            description: "Your question has been updated successfully",
          });
          if (result.data) {
            router.push(ROUTES.QUESTION(result.data._id!));
          }
        } else {
          toast.error(`Error ${result.status}`, {
            description: result.error?.message || "Something went wrong",
          });
        }
        return;
      }
      const result = await createQuestion(values);
      if (result.success) {
        toast.success("Question Created successfully", {
          description: "Your question has been created successfully",
        });
        if (result.data) {
          router.push(ROUTES.QUESTION(result.data._id));
        }
      } else {
        toast.error(`Error ${result.status}`, {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.currentTarget;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          if (field.value.length >= 3) {
            return form.setError("tags", {
              type: "required",
              message: "Max 3 tags allowed",
            });
          }
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.setError("tags", {
            type: "required",
            message: "Tag already exists.",
          });
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex w-full flex-col gap-8"
      >
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-base font-bold text-foreground">
                Question Title <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="min-h-[56px] rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  placeholder="e.g. How do I center a div in CSS?"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground mt-2">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-destructive font-medium" />
            </FormItem>
          )}
        />

        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base font-bold text-foreground">
                Detailed Explanation <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <div className="rounded-xl border border-border/50 bg-secondary/10 overflow-hidden transition-[border-color] duration-300 focus-within:border-primary/50">
                  <Editor value={field.value} fieldChange={field.onChange} />
                </div>
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground mt-2">
                Include all the information someone would need to answer your
                question. Use markdown for formatting.
              </FormDescription>
              <FormMessage className="text-destructive font-medium" />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base font-bold text-foreground">
                Tags <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    className="min-h-[56px] rounded-xl border-border/50 bg-secondary/20 text-base transition-[border-color,ring-color,background-color] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                    placeholder="Add tags... (Press Enter to add)"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          id="0"
                          name={tag}
                          compact
                          showCount={false}
                        >
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag, field)}
                            className="ml-2 focus:outline-none hover:text-destructive transition-colors duration-300"
                            aria-label={`Remove ${tag} tag`}
                          >
                            <X size={12} />
                          </button>
                        </TagCard>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground mt-2">
                Add up to 3 tags to describe what your question is about. Press
                Enter after typing each tag.
              </FormDescription>
              <FormMessage className="text-destructive font-medium" />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <Button
            type="submit"
            className="min-h-[48px] rounded-xl bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-[background-color,box-shadow,transform] duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                {isEdit ? "Updating..." : "Posting..."}
              </span>
            ) : isEdit ? (
              "Update Question"
            ) : (
              "Ask a Question"
            )}
          </Button>
          {isEdit && (
            <p className="text-sm text-muted-foreground">
              Your question will be updated immediately
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
