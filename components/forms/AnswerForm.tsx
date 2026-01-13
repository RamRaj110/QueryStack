"use client";

import React, { useRef, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "../ui/button";
import { Sparkles, Send } from "lucide-react";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

// Load Editor client-side only
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}
const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnswer, startTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const session = useSession();

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startTransition(async () => {
      try {
        const result = await createAnswer({
          questionId,
          content: values.content,
        });
        if (result.success) {
          form.reset();
          toast.success("Your answer has been posted successfully");

          if (editorRef.current) {
            editorRef.current.setMarkdown("");
          }
        } else {
          toast.error(result.error?.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while posting your answer");
      }
    });
  };

  const generateAIAnswer = async () => {
    setIsAISubmitting(true);
    if (session.status !== "authenticated") {
      return toast.warning("You need to be logged in to use this feature");
    }
    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent
      );
      if (!success) {
        return toast.error("Something went wrong");
      }
      const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();
      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }
      toast.success("AI answer generated successfully");
    } catch (error) {
      toast.error("An error occurred while generating AI answer");
      console.error(error);
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn-light-800_dark300 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500 bg-secondary/50 hover:bg-secondary"
          onClick={generateAIAnswer}
          disabled={isAISubmitting}
        >
          {isAISubmitting ? (
            <>Generating...</>
          ) : (
            <>
              <Sparkles size={16} className="text-primary" />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Editor
                    editorRef={editorRef}
                    value={field.value}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white bg-primary hover:bg-primary/90"
              disabled={isAnswer}
            >
              {isAnswer ? "Posting..." : "Post Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
