"use server";
import { ZodError } from "zod";
import { z } from "zod";
import { UnauthorizedError, ValidationError } from "../http-errors";
import { Session } from "next-auth";
import dbConnect from "../mongoose";
import { auth } from "@/auth";

type ActionOptions<T> = {
  params?: T;
  schema?: z.ZodType<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      const validatedParams = schema.parse(params);
      params = validatedParams;
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      return new UnauthorizedError();
    }
  }
  await dbConnect();
  return { params, session };
}

export default action;
