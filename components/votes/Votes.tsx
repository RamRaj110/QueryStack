"use client";
import React, { use, useState } from "react";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ActionResponse } from "@/Types/global";
import { HasVotedResponse } from "@/Types/action";
import { createVote } from "@/lib/actions/vote.action";

interface Params {
  targetId: string;
  targetType: "question" | "answer";
  upvotes: number;
  downvotes: number;
  hasVotePromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  upvotes,
  downvotes,
  hasVotePromise,
  targetId,
  targetType,
}: Params) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { success, data } = use(hasVotePromise);

  const [hasUpvoted, setHasUpvoted] = useState(
    success && data?.hasUpvoted ? data.hasUpvoted : false
  );
  const [hasDownvoted, setHasDownvoted] = useState(
    success && data?.hasDownvoted ? data.hasDownvoted : false
  );
  const [voteCount, setVoteCount] = useState(upvotes - downvotes);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast.error("You must be logged in to vote.");
    }

    setIsLoading(true);
    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });
      if (!result.success) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (voteType === "upvote") {
        const wasUpvoted = hasUpvoted;
        setHasUpvoted(!wasUpvoted);

        if (wasUpvoted) {
          setVoteCount((prev) => prev - 1);
        } else if (hasDownvoted) {
          setVoteCount((prev) => prev + 2);
          setHasDownvoted(false);
        } else {
          setVoteCount((prev) => prev + 1);
        }

        toast.success(wasUpvoted ? "Upvote removed" : "Upvoted successfully");
      } else {
        const wasDownvoted = hasDownvoted;
        setHasDownvoted(!wasDownvoted);

        if (wasDownvoted) {
          setVoteCount((prev) => prev + 1);
        } else if (hasUpvoted) {
          setVoteCount((prev) => prev - 2);
          setHasUpvoted(false);
        } else {
          setVoteCount((prev) => prev - 1);
        }

        toast.success(
          wasDownvoted ? "Downvote removed" : "Downvoted successfully"
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        disabled={isLoading}
        onClick={() => handleVote("upvote")}
        className={`text-muted-foreground transition-colors ${
          hasUpvoted
            ? "text-green-600 hover:text-green-700"
            : "hover:text-green-600"
        }`}
      >
        <ThumbsUp size={18} className={hasUpvoted ? "fill-current" : ""} />
      </Button>

      <div className="min-w-[40px] text-center">
        <p className="text-sm font-medium">{formatNumber(voteCount)}</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        disabled={isLoading}
        onClick={() => handleVote("downvote")}
        className={`text-muted-foreground transition-colors ${
          hasDownvoted
            ? "text-red-600 hover:text-red-700"
            : "hover:text-red-600"
        }`}
      >
        <ThumbsUp
          size={18}
          className={`rotate-180 ${hasDownvoted ? "fill-current" : ""}`}
        />
      </Button>
    </div>
  );
};

export default Votes;
