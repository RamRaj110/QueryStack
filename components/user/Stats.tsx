import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/Types/global";
import { MessageSquare, HelpCircle, Medal } from "lucide-react";
import StatsCard from "../cards/StastsCard";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation?: number;
}

function Stats({
  totalQuestions,
  totalAnswers,
  badges,
  reputation = 0,
}: Props) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-primary to-primary/40" />
        <h3 className="text-2xl font-bold text-foreground">Overview</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* --- Questions Card --- */}
        <div className="group relative flex items-center gap-5 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:bg-card/40 dark:hover:bg-card/60">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-110">
            <HelpCircle size={28} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(totalQuestions)}
            </p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Questions
            </p>
          </div>
        </div>

        {/* --- Answers Card --- */}
        <div className="group relative flex items-center gap-5 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:bg-card/40 dark:hover:bg-card/60">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-transform group-hover:scale-110">
            <MessageSquare size={28} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(totalAnswers)}
            </p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Answers
            </p>
          </div>
        </div>

        {/* --- Reputation Card (Placeholder for now) --- */}
        <div className="group relative flex items-center gap-5 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:bg-card/40 dark:hover:bg-card/60">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 transition-transform group-hover:scale-110">
            <Medal size={28} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(reputation)}
            </p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Reputation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
