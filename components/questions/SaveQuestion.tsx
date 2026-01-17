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

  const { data } = use(hasSavedPromise);

  const [isSaved, setIsSaved] = useState(data?.saved || false);
  const [isLoading, setIsLoading] = useState(false);

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

      setIsSaved(updatedData?.saved || false);

      toast.success(
        updatedData?.saved
          ? "Question saved successfully"
          : "Question unsaved successfully",
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
      className="text-muted-foreground hover:text-primary cursor-pointer"
      onClick={handleSave}
      disabled={isLoading}
    >
      <Star
        size={18}
        className={`mr-1 transition-colors duration-200 ${
          isSaved
            ? "text-primary fill-current"
            : "text-muted-foreground fill-none"
        }`}
      />
    </Button>
  );
};

export default SaveQuestion;
