import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import { redirect } from "next/navigation";
import { Sparkles, HelpCircle } from "lucide-react";
import React from "react";

const AskQuestion = async () => {
  const session = await auth();
  if (!session) return redirect("/signin");

  return (
    <div className="flex flex-col gap-10">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background p-8 sm:p-12">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HelpCircle size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Ask a Question
              </h1>
              <p className="text-muted-foreground mt-1">
                Get help from our community of developers
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-4 py-2 border border-border/30">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-foreground font-medium">
                Be specific and clear
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-4 py-2 border border-border/30">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-foreground font-medium">
                Include all relevant details
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-4 py-2 border border-border/30">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-foreground font-medium">
                Add appropriate tags
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUESTION FORM --- */}
      <section className="rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8 backdrop-blur-sm">
        <QuestionForm />
      </section>
    </div>
  );
};

export default AskQuestion;
