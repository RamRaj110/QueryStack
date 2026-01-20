import { unstable_cache } from "next/cache";

export const CACHE_TAGS = {
  QUESTIONS: "questions",
  QUESTION: "question",
  TAGS: "tags",
  TAG: "tag",
  USERS: "users",
  USER: "user",
  ANSWERS: "answers",
  ANSWER: "answer",
  HOT_QUESTIONS: "hot-questions",
} as const;

export const CACHE_REVALIDATE = {
  SHORT: 30,
  MEDIUM: 60,
  LONG: 300,
  VERY_LONG: 3600,
} as const;

export function createCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts: string[],
  tags: string[],
  revalidate: number = CACHE_REVALIDATE.MEDIUM,
): T {
  return unstable_cache(fn, keyParts, {
    revalidate,
    tags,
  }) as T;
}

export function generateCacheKey(
  prefix: string,
  params: Record<string, any>,
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${params[key]}`)
    .join("-");
  return `${prefix}-${sortedParams}`;
}
