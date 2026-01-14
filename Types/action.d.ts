interface SignWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
}

export interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

type IUserDoc = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
};

type IAccountDoc = {
  userId: string;
  name: string;
  provider: string;
  providerAccountId: string;
  password?: string;
};

type ITagDoc = {
  id: string;
  name: string;
  questionCount: number;
};
type IAnswerDoc = {
  id: string;
  content: string;
  author: string;
  question: string;
  createdAt: Date;
  updatedAt: Date;
};
type PaginatedSearchParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
};

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}
export interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}

export interface getQuestionsParams {
  questionId: string[];
}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, "filter"> {
  tagId: string;
  filter?: string;
}

interface IncreamentViewParams {
  questionId: string;
}

interface CreateAnswerParams {
  questionId: string;
  content: string;
}

interface GetAnswerParams extends PaginatedSearchParams {
  questionId: string;
}

interface DeleteAnswerParams {
  answerId: string;
}

interface CreateVoteParams {
  targetId: string;
  targetType: "question" | "answer";
  voteType: "upvote" | "downvote";
}

interface UpdateVoteParams extends CreateVoteParams {
  change: 1 | -1;
}

type HasVotedParams = Pick<CreateVoteParams, "targetId" | "targetType">;

interface HasVotedResponse {
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}

interface CollectionBaseParams {
  questionId: string;
}

interface GetUserParams {
  userId: string;
}

interface GetUserQuestionsParams
  extends Omit<PaginatedSearchParams, "filter" | "query" | "sort"> {
  userId: string;
}

interface GetUserAnswersParams extends PaginatedSearchParams {
  userId: string;
}

interface GetUserTagsParams {
  userId: string;
}
interface DeleteQuestionParams {
  questionId: string;
}

interface UpdateProfileParams {
  name: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
}
