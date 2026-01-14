import { NextResponse } from "next/server";
import { Action } from "sonner";

export interface Author {
  _id: string;
  id?: string;
  name: string;
  image?: string;
}

export interface Tag {
  _id: string;
  id?: string;
  name: string;
  questions?: number;
}

export interface Question {
  _id: string;
  id?: string;
  title: string;
  content: string;
  description?: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
  createdAt: string;
}

export interface ActionResponse<T = null> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
  message?: string;
}

export type SuccessResponse<T = null> = ActionResponse<T> & {
  success: true;
};
export type ErrorResponse = ActionResponse<undefined> & { success: false };

export type APIErrorResponse = NextResponse<ErrorResponse>;
export type APIResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>;

export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

export interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

export interface Answers {
  _id: string;
  id?: string;
  content: string;
  author: Author;
  question: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  hasMoreAnswer: boolean;
}

export interface User {
  _id: string;
  id?: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt?: Date | string;
}

export interface Collection {
  _id: string;
  id?: string;
  author: string | Author;
  question: Question;
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}
