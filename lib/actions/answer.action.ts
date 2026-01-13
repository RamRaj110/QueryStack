"use server";

import {
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswerParams,
  IAnswerDoc,
} from "@/Types/action";
import { ActionResponse, Answers, ErrorResponse } from "@/Types/global";
import { AnswerSeverSchema, DeleteAnswerSchema, GetAnswerSchema } from "../validation";
import handleError from "../handlers/errors";
import action from "../handlers/action";
import mongoose from "mongoose";
import Questions from "@/database/question.modules";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constant/route";
import { Answer } from "@/database";
import Vote from "@/database/vote.modules";

export async function createAnswer(
  params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> {
  const validationResult = await action({
    params,
    schema: AnswerSeverSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Questions.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    const [newAnswer] = await Answer.create(
      [{ content, author: userId, question: questionId }],
      { session }
    );
    if (!newAnswer) {
      throw new Error("Failed to create answer");
    }
    question.answers += 1;
    await question.save({ session });
    await session.commitTransaction();
    revalidatePath(ROUTES.QUESTION(questionId));
    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({ id: newAnswer.id, ...newAnswer.toObject() })
      ),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error as Error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getAnswers(
  params: GetAnswerParams
): Promise<
  ActionResponse<{ answers: Answers[]; isNext: boolean; totalAnswers: number }>
> {
  const validationResult = await action({
    params,
    schema: GetAnswerSchema,
    authorize: false,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    questionId,
    page = 1,
    pageSize = 10,
    filter,
  } = validationResult.params!;
  const skip = (page - 1) * pageSize;
  const limit = pageSize;
  let sortCriteria = {};
  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }
  try {
    const totalAnswrs = await Answer.countDocuments({ question: questionId });
    const answers = await Answer.find({ question: questionId })
      .populate("author", "name image")
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria);
    const isNext = totalAnswrs > page * pageSize;
    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers: totalAnswrs,
      },
    };
  } catch (error) {
    return handleError(error as Error) as ErrorResponse;
  }
}

export async function deleteAnswer(
  params: DeleteAnswerParams
): Promise<ActionResponse<{ answerId: string }>> {
  const validationResult = await action({
    params,
    schema: DeleteAnswerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { answerId } = validationResult.params!;
  const { user } = validationResult.session!;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const answer = await Answer.findById(answerId).session(session);
    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer.author.toString() !== user?.id) {
      throw new Error("Unauthorized");
    }

    // Decrement answer count on the question
    await Questions.findByIdAndUpdate(
      answer.question,
      { $inc: { answers: -1 } },
      { session }
    );

    // Delete votes associated with this answer
    await Vote.deleteMany({
      actionId: answerId,
      actionType: "answer",
    }).session(session);

    // Delete the answer
    await Answer.findByIdAndDelete(answerId).session(session);

    await session.commitTransaction();
    session.endSession();

    revalidatePath(`/profile/${user?.id}`);

    return {
      success: true,
      data: { answerId: answer.id },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error as Error) as ErrorResponse;
  }
}
