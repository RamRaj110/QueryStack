import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores and hyphens",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/, {
      message: "Password must contain at least one special character",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters" })
    .max(130, { message: "Title must be less than 130 characters" }),

  content: z
    .string()
    .min(1, { message: "Content is required" })
    .min(20, { message: "Content must be at least 20 characters" }),

  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required" })
    .max(3, { message: "Maximum 3 tags allowed" }),
});

export type AskQuestionSchemaType = z.infer<typeof AskQuestionSchema>;

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores and hyphens",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  bio: z.string().optional(),
  image: z.string().url({ message: "Image must be a valid URL" }),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Portfolio must be a valid URL" })
    .optional(),
  reputation: z.number().optional(),
});

export const AccountValidationSchema = z.object({
  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId format" })
    .describe("Reference to the owning User document"),
  name: z.string().min(1, { message: "Name is required" }),
  image: z.string().url().optional().or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/, {
      message: "Password must contain at least one special character",
    }), // [web:5][web:14]

  provider: z.string().min(1, { message: "Provider is required" }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider account ID is required" }),
});

export type AccountDTO = z.infer<typeof AccountValidationSchema>;

export const SignInOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required" }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(50, { message: "Username must be at most 50 characters long" })
      .regex(/^[a-zA-Z0-9_.-]+$/, {
        // Updated regex to allow hyphens and dots
        message:
          "Username can only contain letters, numbers, underscores, hyphens, and dots",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    image: z.string().url({ message: "Image must be a valid URL" }).optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const GetQuestionsSchema = z.object({
  questionId: z
    .array(z.string().min(1))
    .min(1, { message: "At least one Question ID is required" }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetQuestionByIdSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { message: "Tag ID is required" }),
});

export const GetTagQuestionsSchema = z.object({
  tagId: z.string().min(1, { message: "Tag ID is required" }),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
  query: z.string().optional(),
});

export const IncreamentViewSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, { message: "Answer has to be at least 100 characters long." }),
});

export const AnswerSeverSchema = AnswerSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const GetAnswerSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(1, { message: "Question is required" })
    .max(500, { message: "Question has to be at most 500 characters long." }),
  content: z
    .string()
    .min(100, { message: "Answer has to be at least 100 characters long." }),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, { message: "Target ID is required" }),
  targetType: z.enum(["question", "answer"]),
  voteType: z.enum(["upvote", "downvote"]),
});

export const UpdateVoteCounteSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVoteSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, { message: "Answer ID is required" }),
});

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  bio: z
    .string()
    .max(300, { message: "Bio must be at most 300 characters long" })
    .optional(),

  image: z.string().refine(
    (val) => {
      // Allow base64 data URLs or regular URLs
      return (
        val.startsWith("data:image/") || z.string().url().safeParse(val).success
      );
    },
    { message: "Image must be a valid URL or base64 image" }
  ),

  location: z
    .string()
    .max(100, { message: "Location must be at most 100 characters long" })
    .optional(),

  portfolio: z
    .string()
    .url({ message: "Portfolio must be a valid URL" })
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
