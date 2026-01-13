"use client";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useState, useEffect } from "react";
import { toast } from "sonner";
import { ActionResponse } from "@/Types/global";

const SaveQuestion = ({
  questionId,
  hasSavedPromise,
}: {
  questionId: string;
  hasSavedPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  // 1. Unwrap the promise to get the initial server state
  const { data } = use(hasSavedPromise);

  // 2. Create local state to manage UI updates immediately
  const [isSaved, setIsSaved] = useState(data?.saved || false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if the server promise data changes (edge case handling)
  useEffect(() => {
    setIsSaved(data?.saved || false);
  }, [data]);

  const handleSave = async () => {
    if (isLoading) return;

    if (!userId) {
      return toast.error("Please sign in to save a question");
    }

    setIsLoading(true);

    try {
      const {
        success,
        data: updatedData,
        error,
      } = await toggleSaveQuestion({ questionId });

      if (!success) {
        return toast.error(error?.message || "Failed to save question");
      }

      // 3. Update local state based on server response
      setIsSaved(updatedData?.saved || false);

      toast.success(
        updatedData?.saved
          ? "Question saved successfully"
          : "Question unsaved successfully"
      );
    } catch (error) {
      toast.error("Failed to save question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-primary"
      onClick={handleSave}
      disabled={isLoading}
    >
      {/* 4. Conditional Rendering for the Star Icon */}
      <Star
        size={18}
        className={`mr-1 transition-colors duration-200 ${
          isSaved
            ? "text-primary fill-current" // <<-- SAVED STATE: Solid Fill
            : "text-muted-foreground fill-none" // <<-- UNSAVED STATE: Transparent Fill
        }`}
      />
      {/* Optional: Add text label if needed */}
      {/* <span>{isSaved ? "Saved" : "Save"}</span> */}
    </Button>
  );
};

export default SaveQuestion;
