"use server";

import { CollectionBaseParams, PaginatedSearchParams } from "@/Types/action";
import { ActionResponse, ErrorResponse, Collection } from "@/Types/global";
import action from "../handlers/action";
import {
  CollectionBaseSchema,
  PaginatedSearchParamsSchema,
} from "../validation";
import handleError from "../handlers/errors";
import { Collection as CollectionModel, Question } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constant/route";
import mongoose, { PipelineStage } from "mongoose";

export async function toggleSaveQuestion(
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return handleError(new Error("Question not found")) as ErrorResponse;
    }
    const collection = await CollectionModel.findOne({
      author: userId,
      question: questionId,
    });
    if (collection) {
      await CollectionModel.findByIdAndDelete(collection._id);
      revalidatePath(ROUTES.QUESTION(questionId));

      return {
        success: true,
        data: { saved: false },
      };
    }
    await CollectionModel.create({
      author: userId,
      question: questionId,
    });
    revalidatePath(ROUTES.QUESTION(questionId));

    return {
      success: true,
      data: { saved: true },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function hasSavedQuestion(
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;
  try {
    const collection = await CollectionModel.findOne({
      author: userId,
      question: questionId,
    });

    return {
      success: true,
      data: { saved: !!collection },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getSavedQuestions(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ collection: Collection[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const userId = validationResult.session?.user?.id;
  const {
    page = 1,
    pageSize = 10,
    query,
    filter,
    sort,
  } = validationResult.params!;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = pageSize;

  const sortOptions: Record<string, Record<string, 1 | -1>> = {
    mostrecent: { "question.createAt": -1 },
    oldest: { "question.createdAt": 1 },
    mostvoted: { "question.upvotes": -1 },
    mostviewed: { "question.views": -1 },
    mostanswered: { "question.answers": -1 },
  };
  const sortCriteria = sortOptions[filter as keyof typeof sortOptions] || {
    "question.createdAt": -1,
  };

  try {
    const pipeline: PipelineStage[] = [
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "question",
        },
      },
      { $unwind: "$question" },
      {
        $lookup: {
          from: "users",
          localField: "question.author",
          foreignField: "_id",
          as: "question.author",
        },
      },
      { $unwind: "$question.author" },
      {
        $lookup: {
          from: "tags",
          localField: "question.tags",
          foreignField: "_id",
          as: "question.tags",
        },
      },
    ];

    if (query) {
      pipeline.push({
        $match: {
          $or: [
            { "question.title": { $regex: query, $options: "i" } },
            { "question.content": { $regex: query, $options: "i" } },
          ],
        },
      });
    }

    const [totalCount] = await CollectionModel.aggregate([
      ...pipeline,
      { $count: "count" },
    ]);
    pipeline.push({ $sort: sortCriteria }, { $skip: skip }, { $limit: limit });
    pipeline.push({ $project: { question: 1, author: 1 } });

    const questions = await CollectionModel.aggregate(pipeline);
    const isNext = (totalCount?.count || 0) > skip + questions.length;
    return {
      success: true,
      data: { collection: JSON.parse(JSON.stringify(questions)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
