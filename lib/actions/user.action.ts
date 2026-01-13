"use server";

import {
  GetUserAnswersParams,
  GetUserParams,
  GetUserQuestionsParams,
  GetUserTagsParams,
  PaginatedSearchParams,
  UpdateProfileParams,
} from "@/Types/action";
import {
  ActionResponse,
  Answers,
  ErrorResponse,
  Question as GlobalQuestion,
} from "@/Types/global";
import action from "../handlers/action";
import {
  GetUserAnswersSchema,
  GetUserQuestionsSchema,
  GetUserSchema,
  GetUserTagsSchema,
  PaginatedSearchParamsSchema,
  UpdateProfileSchema,
} from "../validation";
import handleError from "../handlers/errors";
import { QueryFilter, Types, PipelineStage } from "mongoose";
import { Answer, IQuestion, Question, User } from "@/database";
import { IUser } from "@/database/user.modules";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getUsers(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ users: IUser[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = pageSize;
  const filterQuery: QueryFilter<typeof User> = {};
  if (query) {
    filterQuery.$or = [
      { name: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }
  try {
    const totalUsers = await User.countDocuments(filterQuery);
    const users = await User.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    const isNext = totalUsers > skip + limit;
    return {
      success: true,
      data: { users: JSON.parse(JSON.stringify(users)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUser(params: GetUserParams): Promise<
  ActionResponse<{
    user: IUser;
    totalQuestions: number;
    totalAnswers: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { userId } = validationResult.params!;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleError(new Error("User not found")) as ErrorResponse;
    }
    const totalQuestions = await Question.countDocuments({ author: userId });
    const totalAnswers = await Answer.countDocuments({ author: userId });

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
        totalQuestions,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserQuestions(params: GetUserQuestionsParams): Promise<
  ActionResponse<{
    questions: GlobalQuestion[];
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserQuestionsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { userId, page = 1, pageSize = 10 } = validationResult.params!;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ author: userId });
    const questions = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name")
      .skip(skip)
      .limit(limit);
    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserAnswers(params: GetUserAnswersParams): Promise<
  ActionResponse<{
    answers: Answers[];
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserAnswersSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { userId, page = 1, pageSize = 10 } = validationResult.params!;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = pageSize;
  try {
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const answers = await Answer.find({ author: userId })
      .populate("question", "title")
      .populate("author", "name")
      .skip(skip)
      .limit(limit);
    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserTags(params: GetUserTagsParams): Promise<
  ActionResponse<{
    tags: { _id: string; name: string; questionCount: number }[];
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserTagsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { userId } = validationResult.params!;
  try {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          author: new Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          name: { $first: "$tags.name" },
          questionCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tagInfo",
        },
      },
      {
        $unwind: "$tagInfo",
      },
      {
        $sort: { questionCount: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: "$tagInfo._id",
          name: "$tagInfo.name",
          questionCount: 1,
        },
      },
    ];
    const tags = await Question.aggregate(pipeline);
    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateProfile(
  params: UpdateProfileParams
): Promise<ActionResponse<IUser>> {
  const validationResult = await action({
    params,
    schema: UpdateProfileSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, bio, image, location, portfolio } =
    validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) {
    return handleError(new Error("Unauthorized")) as ErrorResponse;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        bio: bio || "",
        image,
        location: location || "",
        portfolio: portfolio || "",
      },
      { new: true }
    );

    if (!updatedUser) {
      return handleError(new Error("User not found")) as ErrorResponse;
    }

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
