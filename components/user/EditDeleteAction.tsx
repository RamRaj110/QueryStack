"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constant/route";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  type: "question" | "answer";
}

const EditDeleteAction = ({ id, type }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    router.push(`${ROUTES.QUESTION(id)}/edit`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (type === "question") {
        const result = await deleteQuestion({ questionId: id });
        if (result.success) {
          toast.success("Question deleted successfully");
          router.push(ROUTES.HOME);
        } else {
          toast.error("Failed to delete question");
        }
      } else if (type === "answer") {
        const result = await deleteAnswer({ answerId: id });
        if (result.success) {
          toast.success("Answer deleted successfully");
          router.refresh();
        } else {
          toast.error("Failed to delete answer");
        }
      }
    } catch (error) {
      toast.error("Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {/* EDIT BUTTON (Only for Questions) */}
      {type === "question" && (
        <Button
          size="icon"
          variant="ghost"
          onClick={handleEdit}
          className="h-8 w-8 text-muted-foreground hover:text-primary"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}

      {/* DELETE BUTTON */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this{" "}
              {type} and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
